import React from 'react'
import { useEffect,useState } from 'react';
const RemainingTime = ( {timeLeft , setTimeLeft}  :any ) => {
    

    useEffect(()=>{
        if (timeLeft <= 0) return;
        const intervalId =  setInterval(()=>{
            setTimeLeft( timeLeft-1 )
        },1000)
       return () => clearInterval(intervalId); 
    },[timeLeft])

      console.log("outside", timeLeft)
    return (
        <div>
            <span className="flex flex-col items-center justify-center">
                <p className="text-xs">
                   
                    Remaining Time:{" "}
                    <span className="text-blue-600">
                        {/* {`00:${timeLeft < 10 ? `0${timeLeft}` : timeLeft}`} */}
                        {timeLeft}
                    </span>
                </p>
            </span>
            
        </div>
    )
}

export default RemainingTime
