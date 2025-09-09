"use client"
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='w-full flex flex-col items-center justify-center'>
        <div className="w-full max-w-md bg-white rounded-2xl shadow p-8 my-13 mx-10 pb-20 pt-10">
           <p className="mb-0">Welcome Back!</p>
              <h2 className="text-2xl font-bold  text-gray-800 mb-4">Login to your account</h2>
          <form className="space-y-2" >
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter your Email"
                className="w-full mt-1 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className=" mt-2 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
            >
              Login
            </button>
            <p className="text-center text-sm text-gray-600 mt-4">
           Don't have an Account?
            <Link href={'/signup'} className="text-blue-600 hover:underline" >{' '}Signup</Link>
          </p>
          </form>
        </div>
      </div>

    
  )
}

export default page