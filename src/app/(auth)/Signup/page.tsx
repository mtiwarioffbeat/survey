"use client"

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'


const page = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const route = useRouter()

  const handleLogin = () => {
    route.push("/Login")
  }
  const handleSignUp = (name: string, email: string) => {
    console.log(name, email);
  }
  return (
    <div>
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-8 my-13 mx-10">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Account</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name={name}
              placeholder="Enter Your Name"
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
              className="w-full mt-1 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>


          <button
            type="submit"
            onClick={() => handleSignUp(name, email)}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Sign Up
          </button>
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?
            <a href="#" className="text-blue-600 hover:underline" onClick={() => handleLogin()}>Login</a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default page