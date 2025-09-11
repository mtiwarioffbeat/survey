"use client"

import {  useAppSelector } from '@/hooks/reduxhooks';
import Link from 'next/link';
import { useAppDispatch } from '@/hooks/reduxhooks';
import { setSignup, setSignupErrors, setLoading, setError, setSuccess } from '@/redux/AuthSlice/AuthSlice';
import { Auth } from '@/types/auth';
import { useState } from 'react';
import { UserService } from '@/services/api/UserService';
import z from 'zod'
import Spinner from '@/components/auth/Spinner';
import { toast } from 'react-toastify';
import { useNavigation } from '@/hooks/useNavigation'; 
import  main  from '@/services/db/nodemailer';

const page = () => {
  const dispatch = useAppDispatch();
  const [signupData, setSignupData] = useState<Auth['signup']>({
    name: '',
    email: ''
  })
  const {signupErrors, loading } = useAppSelector((store) => store.auth)

  //  used to navigate btw pages 
  const {router} = useNavigation()

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSignupErrors({ name: '', email: '' }))
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }))

  }
 
const handlSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  dispatch(setLoading(true));
  dispatch(setError(null));
  dispatch(setSignupErrors({ name: "", email: "" }));

  // frontend validation with Zod
  const zodErrors: Auth["zodErrors"] = { name: "", email: "" };
  const UserSchema = z.object({
    name: z.string().min(3, "Name must be atleast 3 characters"),
    email: z.string().email("Invalid email format"),
  });

  const result = UserSchema.safeParse(signupData);
  if (!result.success) {
    const errorObj = result.error.format();
    for (let key in errorObj) {
      const typedKey = key as keyof Auth["zodErrors"];
      if (errorObj[typedKey]?._errors?.length) {
        zodErrors[typedKey] = errorObj[typedKey]._errors[0];
      }
    }
    dispatch(setSignupErrors(zodErrors));
    dispatch(setLoading(false));
    return;
  }

  //   user exists 
  const res = await UserService.SignupUser(signupData);
  console.log("response",res)
  if (res.success) {
    if (res.data.exists) {
      toast.error(res.data.message);
     dispatch(setLoading(false))
      return 
    } else {
      toast.success("please verify OTP");
      dispatch(setSignup(signupData)); // temp signup data
    router.push('/verify')
    }
  } else {
    toast.error(res.message); // general error
  }


  dispatch(setLoading(false));
};

  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-8 my-13 mx-10 pb-20 pt-10">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Account</h2>
        <form className="space-y-4 " onSubmit={handlSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name<span className='text-red-600'>*</span></label>
            <input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              onChange={(e) => handleChange(e)}
              value={signupData.name}
              className="w-full mt-1 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {signupErrors?.name && <p className="text-red-500">{signupErrors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email<span className='text-red-600'>*</span></label>
            <input
              type="email"
              name="email"
              value={signupData.email}
              onChange={(e) => handleChange(e)}
              placeholder="Enter your Email"
              className="w-full mt-1 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {signupErrors?.email && <p className="text-red-500">{signupErrors.email}</p>}
          </div>
          <button
            disabled={loading}
            className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            {loading ? (<Spinner />) : ("Sign Up")}
          </button>
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?
            <Link href={'/login'} className="text-blue-600 hover:underline" >{' '}Login</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default page