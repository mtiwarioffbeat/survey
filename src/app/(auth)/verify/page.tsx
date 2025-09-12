"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

import { UserService } from "@/services/api/UserService";
import { Auth, ResendOTP } from "@/types/auth";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
import { setLoading } from "@/redux/AuthSlice/AuthSlice";
import { toast } from "react-toastify";
import { useNavigation } from "@/hooks/useNavigation";
import Spinner from "@/components/auth/Spinner";
import RunningTime from "@/components/auth/RemainingTime"
import RemainingTime from "@/components/auth/RemainingTime";
export default function Otppage() {
  const [timeLeft, setTimeLeft] = useState(60);
  const { signup, loading,login } = useAppSelector((store) => store.auth)
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

 

  const { router } = useNavigation()
  const dispatch = useAppDispatch();
  

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    console.log(value)
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // understand the below code 
    if (value && index < 3) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      console.log("input ref", inputsRef)
      inputsRef.current[index - 1]?.focus();
    }
  };

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  dispatch(setLoading(true));

  const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
  const userEmail = signup?.email || login?.email;

  try {
    let res;

    if (submitter.name === "submitOtp") {
      const otpString = otp.join('');

      if (!otpString) {
        toast.error("Please enter the OTP.");
        return;
      }

      if (!userEmail) {
        toast.error("User email is not available.");
        return;
      }

      const payload = { email: userEmail, otp: otpString };
      res = await UserService.OtpVerify(payload);
    }

    if (submitter.name === "resendOtp") {
      if (!userEmail) {
        toast.error("User email is not available for resend.");
        return;
      }

      res = await UserService.ResendOtp(userEmail);
    }

    if (res?.success) {
      toast.success(res.message);
      router.push('/dashboard')
    } else if (res) {
      toast.error(res.message || res.error || "An unknown error occurred.");
    }

  } catch (error) {
    toast.error("An unexpected error occurred.");
  } finally {
    dispatch(setLoading(false));
    router.push('/dashboard')
  }
};
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-90 max-w-md bg-white rounded-2xl shadow p-8 my-13 mx-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">OTP Verification</h1>
        <p className="text-sm">
          Please enter the OTP sent to your registered email to complete your verification
        </p>
        <div className="flex flex-col items-center justify-center p-4 bg-gray-50">
          <div className="flex gap-4">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => {
                  inputsRef.current[idx] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="w-10 h-10 text-center text-2xl border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                value={digit}
                onChange={e => handleChange(idx, e.target.value)}
                onKeyDown={e => handleKeyDown(idx, e)}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <RemainingTime timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
          <div className="flex">


          <p className="text-xs mr-2" >Didn’t get the code?</p>
          <Link
            href="#"
            className={`${timeLeft === 0
                ? "text-blue-600 cursor-pointer text-xs"
                : "text-gray-400 cursor-not-allowed pointer-events-none text-xs"
              }`}
          >
            Resend
          </Link>                                                                                                                                                                                                                                                                                                                                                                                                                                                              


        </div>
          
        </div>
        <button type="submit"
          className="mt-4 w-full bg-blue-600 cursor-pointer  text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200">
          Verify
        </button>
        <button
          className="mt-2 w-full bg-white border-2 cursor-pointer border-blue-600 text-blue-600 py-2 rounded-lg font-semibold transition duration-200" onClick={()=>router.back()}>
          Cancel
        </button>
      </div>

    </div >
  );
}
