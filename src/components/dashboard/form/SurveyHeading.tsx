import React from 'react'
import "@/app/globals.css"

export default function SurveyHeading() {
    return (
   
            <div className=''>
                <div className='bg-white px-4  items-center border-t-8 border-indigo-500 rounded-lg'>
                    {/* <input className='text-3xl font-medium outline-none my-5 '/> */}
                    <h1 className='text-3xl font-medium outline-none my-5 '>Form Heading</h1>
                
                    <hr className='text-gray-300' />
                     <div   className=" outline-none " role="textbox" aria-label="Form description" contentEditable="true"></div>
                    <hr className='text-gray-300 p-2' />
                </div>
            </div>
        

    )
}



