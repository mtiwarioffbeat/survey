'use client'
import React from 'react'
import { useAppSelector, useAppDispatch } from '@/hooks/reduxhooks'
const page = () => {
   const {text} = useAppSelector((state) => state.auth)
  return (
    <>
      <div className='text-3xl text-red'>{text}</div>
    </>
  
  )
}

export default page