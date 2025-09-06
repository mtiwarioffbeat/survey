"use client"

import { useAppSelector } from '@/hooks/reduxhooks';
import Link from 'next/link';
import { useAppDispatch } from '@/hooks/reduxhooks';
import { setSignup } from '@/redux/AuthSlice/AuthSlice';
const page = () => {
//  const [signupData,setSignupData] = useState<Auth['signup'] | null>(null)
  const {signup} = useAppSelector((store)=>store.auth)
  
  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
     const { name, value } = e.target;
       useAppDispatch(setSignup((prev) => ({
      ...prev,
      [name]: value
    })))
        
    }
  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-8 my-13 mx-10 ">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Account</h2>
        <form className="space-y-4">
          <div>

            
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name='name'
              placeholder="Enter Your Name"
              onChange={(e) => handleChange(e)}
              value={signup?.name}
              className="w-full mt-1 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name='email'
              value={signup?.email}
              onChange={(e) => handleChange(e)}
              placeholder="Enter your Email"
              className="w-full mt-1 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>


          <button
            
            // onClick={() => handleSignUp(name, email)}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Sign Up
          </button>
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?
            <Link href={'/login'} className="text-blue-600 hover:underline" >Login</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default page