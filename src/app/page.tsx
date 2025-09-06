'use client'
import React, { useEffect } from 'react'
import { useAppSelector } from '@/hooks/reduxhooks'
import { redirect } from 'next/navigation'
const page = () => {

  const {text} = useAppSelector((state) => state.auth)
 useEffect(()=>{
  redirect('/signup')
 },[])
  return (
    <>
      <div className='text-3xl text-red'>{text}</div>
    </>
  
  )
}

export default page