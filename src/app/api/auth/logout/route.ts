import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out" });

  try {
    // Clear the cookie
    response.cookies.set("session", "", {
      path: "/",                // must match where the cookie was set
      maxAge: 0,                // expires immediately
      httpOnly: true,           // server-only cookie
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    console.log("Session cookie cleared successfully");
  } catch (err) {
    console.error("Error clearing session cookie:", err);
  }
  return response;
}
