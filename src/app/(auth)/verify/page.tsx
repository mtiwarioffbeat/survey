"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Countdown } from "@/utils/Auth/Countdown";
import { UserService } from "@/services/api/UserService";
import { Auth, ResendOTP } from "@/types/auth";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
import { setLoading } from "@/redux/AuthSlice/AuthSlice";
import { toast } from "react-toastify";
import { useNavigation } from "@/hooks/useNavigation";
import Spinner from "@/components/Spinner";

export default function Otppage() {
  const [timeLeft, setTimeLeft] = useState(180);
  const { signup, loading,login } = useAppSelector((store) => store.auth)
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    const timer = new Countdown(
      180,
      (time) => setTimeLeft(time), // onTick
      () => console.log("Time over!") // onComplete
    );
    timer.start();
    return () => timer.stop(); // cleanup when component unmounts
  }, []);

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
    } else{
      return
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
      
    if (res?.success) {
      toast.success(res.message);
      router.push('/dashboard')
    } else if (res) {
      toast.error(res.message || res.error || "An unknown error occurred.");
    }
    }

    if (submitter.name === "resendOtp") {
      if (!userEmail) {
        toast.error("User email is not available for resend.");
        return;
      }

      res = await UserService.ResendOtp(userEmail);
      
    if (res?.success) {
      toast.success(res.message);
    
    } else if (res) {
      toast.error(res.message || res.error || "An unknown error occurred.");
    }
    }


  } catch (error) {
    toast.error("An unexpected error occurred.");
  } finally {
    dispatch(setLoading(false));
    // router.push('/dashboard')
  }
};



  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-90 max-w-md bg-white rounded-2xl shadow p-8 my-13 mx-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">OTP Verification</h1>
        <p className="text-sm">
          Please enter the OTP sent to your registered email to complete your verification
        </p>
        <form onSubmit={(e) => handleSubmit(e)}>
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
            <div className="flex flex-col items-center justify-center">
              <p className="text-xs">
                Remaining Time:{" "}
                <span className="text-indigo-600">
                   {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}

                </span>
              </p>
            </div>
            <p className="text-xs">
              Didn’t get the code?
              <button className="text-indigo-600 cursor-pointer hover:underline " type="submit" name="resendOtp">Resend</button>
            </p>
          </div>
          <button type="submit"
            name="submitOtp"
            disabled={loading}
            className={`mt-4 w-full ${loading ? "bg-indigo-300" : "bg-indigo-600"} bg-indigo-600 cursor-pointer  text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 `}>
            {loading ? (<Spinner />) : ("Verify")}
          </button>
        </form>
        <button
      
          
          className="mt-2 w-full bg-white border-2 cursor-pointer border-blue-600 text-blue-600 py-2 rounded-lg font-semibold transition duration-200" onClick={()=>router.back()}>
          Cancel
        </button>
      </div>

    </div >
  );
}