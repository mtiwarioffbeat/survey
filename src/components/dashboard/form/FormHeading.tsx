import React from 'react'
import "@/app/globals.css"

export default function FormHeading() {
    return (
        // <div className='items-center flex  '>
            <div className='   flex items-center justify-center mt-10'>
                <div className='bg-white px-4 w-194 items-center border-t-8 border-indigo-500 rounded-lg'>
                    <h1 className='text-3xl font-medium py-7'>Utitled form</h1>
                    <hr className='text-gray-300' />
                     <div   className=" outline-none " role="textbox" aria-label="Form description" contentEditable="true" ></div>
                    <hr className='text-gray-300 p-2' />
                </div>
            </div>
        // </div>

    )
}



