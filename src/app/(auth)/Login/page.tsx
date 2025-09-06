"use client"
import React from 'react'

const page = () => {
  return (
    <div>
        <div className="w-full max-w-md bg-white rounded-2xl shadow p-8 my-13 mx-10">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Login Page</h2>
          <form className="space-y-2">
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
          </form>
        </div>
      </div>

    
  )
}

export default page