import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get the session token from cookies
  const token = request.cookies.get('session')?.value
  console.log('Middleware - Path:', pathname, 'Token:', token ? 'Present' : 'Missing');

  // Define protected routes
  const protectedRoutes = ['/dashboard']
  const authRoutes = ['/login', '/signup', '/verify']
  const protectedApiRoutes = ['/api/survey', '/api/search']
  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))
  const isProtectedApiRoute = protectedApiRoutes.some(route => pathname.startsWith(route))
  // If accessing protected route without token, redirect to login
  if (isProtectedRoute && !token) {
    console.log('Redirecting to login - no token for protected route');
    return NextResponse.redirect(new URL('/login', request.url))
  }
  // Simple token validation function for Edge runtime
  function isValidToken(token: string): boolean {
    try {
      // Basic JWT structure validation (header.payload.signature)
      const parts = token.split('.');
      if (parts.length !== 3) return false;
      
      // Decode payload to check expiration
      const payload = JSON.parse(atob(parts[1]));
      const now = Math.floor(Date.now() / 1000);
      // Check if token is expired
      if (payload.exp && payload.exp < now) {
        return false;
      }   
      // Check if token has required fields
      if (!payload.id || !payload.email) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }
  // If accessing auth routes with valid token, redirect to dashboard
  if (isAuthRoute && token) {
    if (isValidToken(token)) {
      console.log('Redirecting to dashboard - valid token on auth route');
      return NextResponse.redirect(new URL('/dashboard', request.url))
    } else {
      console.log('Invalid token on auth route, clearing cookie');
      // Invalid token, clear it and allow access to auth routes
      const response = NextResponse.next()
      response.cookies.set('session', '', { maxAge: 0 })
      return response
    }
  }
  
  // If accessing protected route with token, verify it
  if (isProtectedRoute && token) {
    if (isValidToken(token)) {
      console.log('Access granted to protected route');
      return NextResponse.next()
    } else {
      console.log('Invalid token on protected route, redirecting to login');
      // Invalid token, redirect to login
      const response = NextResponse.redirect(new URL('/login', request.url))
      response.cookies.set('session', '', { maxAge: 0 })
      return response
    }
  }

  // If accessing protected API route without token, return 401
  if (isProtectedApiRoute && !token) {
    console.log('Unauthorized API access - no token');
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // If accessing protected API route with token, verify it
  if (isProtectedApiRoute && token) {
    if (isValidToken(token)) {
      console.log('Access granted to protected API route');
      return NextResponse.next()
    } else {
      console.log('Invalid token on protected API route, returning 401');
      // Invalid token, return 401
      const response = NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      response.cookies.set('session', '', { maxAge: 0 })
      return response
    }
  }

  return NextResponse.next()
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/draft/:path*',
    '/login',
    '/signup',
    '/verify',
    '/api/survey/:path*',
    '/api/search/:path*'
  ],
}