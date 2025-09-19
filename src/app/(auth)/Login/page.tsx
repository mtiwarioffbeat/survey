"use client"
import Spinner from '@/components/Spinner'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxhooks'
import { useNavigation } from '@/hooks/useNavigation'
import { setLoading, setLogin, setLoginErrors } from '@/redux/AuthSlice/AuthSlice'
import { UserService } from '@/services/api/UserService'
import { Auth } from '@/types/auth'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import z from 'zod'

const page = () => {
  const {router} = useNavigation()
  const dispatch = useAppDispatch()
  const {loading,loginErrors,login} = useAppSelector((store)=>store.auth)
  const [loginData,setLoginData] = useState<Auth['login']>({
    email:""
  })
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    dispatch(setLoginErrors({email:''}))
    const {name,value} = e.target
    setLoginData((prev)=>({...prev, [name]:value}))
  }
  console.log(loginData)
  
 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  dispatch(setLoading(true));
  dispatch(setLoginErrors({ email: "" }));
  dispatch(setLogin(loginData));

  // --- Zod validation ---
  const LoginSchema = z.object({
    email: z.string().email("Invalid email format"),
  });

  const result = LoginSchema.safeParse(loginData);

  if (!result.success) {
    const zodErrors: Auth["login"] = { email: "" };
    const errorObj = result.error.format();

    for (let key in errorObj) {
      const typedKey = key as keyof Auth["login"];
      if (errorObj[typedKey]?._errors?.length) {
        zodErrors[typedKey] = errorObj[typedKey]._errors[0];
      }
    }

    dispatch(setLoginErrors(zodErrors));
    dispatch(setLoading(false));
    return;
  }

  try {
    const payload = {
      email: loginData.email,
    };

    const res = await UserService.LoginUser(payload);
    console.log("login response", res);

    if (!res?.success) {
      toast.error(res?.message || res?.error || "An unknown error occurred");
      return;
    }

    toast.success(res.message);
    await router.push("/verify");

  } catch (error) {
    console.error("Login error:", error);
    toast.error("An unexpected error occurred.");
  } finally {
    dispatch(setLoading(false));
  }
};

  return (
    <div className='w-full flex flex-col items-center justify-center'>
        <div className="w-full max-w-md bg-white rounded-2xl shadow p-8 my-13 mx-10 pb-20 pt-10">
           <p className="mb-0">Welcome Back!</p>
              <h2 className="text-2xl font-bold  text-gray-800 mb-4">Login to your account</h2>
          <form className="space-y-2" onSubmit={(e)=>handleSubmit(e)}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name='email'
                placeholder="Enter your Email"
                className="w-full mt-1 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={loginData.email}
                onChange={(e)=>handleChange(e)}
              />
                {loginErrors?.email && <p className="text-red-500">{loginErrors.email}</p>}
            </div>
            <button
              type="submit"
              className=" mt-2 w-full bg-blue-600 text-white cursor-pointer py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
           
            >
              {loading ?(<Spinner/>):('Login')}
            </button>
            <p className="text-center text-sm text-gray-600 mt-4">
           Don&#39;t have an Account?
            <Link href={'/signup'} className="text-blue-600 hover:underline" >{' '}Signup</Link>
          </p>
          </form>
        </div>
      </div>

    
  )
}

export default page