"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Countdown } from "@/utils/Auth/Countdown";

export default function Otppage() {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    const timer = new Countdown(
      60,
      (time) => setTimeLeft(time), // onTick
      () => console.log("Time over!") // onComplete
    );
    timer.start();
    return () => timer.stop(); // cleanup when component unmounts
  }, []);

  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  // ⏳ use countdown hook
  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
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
          <div className="flex flex-col items-center justify-center">
            <p className="text-xs">
              Remaining Time:{" "}
              <span className="text-blue-600">
                {`00:${timeLeft < 10 ? `0 ${timeLeft}` : timeLeft}`}
              </span>
            </p>
          </div>
          <p className="text-xs">
            Didn’t get the code?
            <Link href="#" className="text-blue-600">Resend</Link>
          </p>
        </div>
        <button type="submit"
          className="mt-4 w-full bg-blue-600 cursor-pointer  text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200">
          Verify
        </button>
        <button
          type="button"
          className="mt-2 w-full bg-white border-2 cursor-pointer border-blue-600 text-blue-600 py-2 rounded-lg font-semibold transition duration-200">
          Cancel
        </button>
      </div>
    </div >
  );
}
