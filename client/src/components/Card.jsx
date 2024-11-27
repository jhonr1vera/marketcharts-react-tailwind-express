import React from 'react'

export default function Card({title, quantity, bgcolor}) {
  return (
    <div className={`h-40 w-48 rounded-xl shadow-md text-center ${bgcolor} ${bgcolor==='bg-blue-500' ? 'text-white' : 'text-slate-600'}`}>
        <h1 className='mt-1 '>{title}</h1>
        <h3 className={`text-3xl font-semibold tracking-wide ${bgcolor==='bg-blue-500' ? 'text-white' : 'text-black'}`}>{quantity}</h3>
        <h1 className=''>en total</h1>
    </div>
  )
}
