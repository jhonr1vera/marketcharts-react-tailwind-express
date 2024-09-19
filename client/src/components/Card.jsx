import React from 'react'

export default function Card({title, quantity}) {
  return (
    <div className='h-40 bg-white w-48 rounded-xl shadow-md text-center'>
        <h1 className='mt-1 text-slate-500'>{title}</h1>
        <h3 className='text-3xl font-semibold tracking-wide'>{quantity}</h3>
        <h1 className='text-slate-500'>en total</h1>
    </div>
  )
}
