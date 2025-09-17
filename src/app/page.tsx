'use client'
import React, { useEffect } from 'react'
import { useAppSelector } from '@/hooks/reduxhooks'
import { redirect } from 'next/navigation'

import { useNavigation } from '@/hooks/useNavigation'
const page = () => {
  const {router} = useNavigation()
  const {text} = useAppSelector((state) => state.auth)
 useEffect(()=>{
  router.push('/signup')
 },[])
  return (
    <>
      <div className='text-3xl text-red'>{text}</div>
    </>
  
  )
}

export default page