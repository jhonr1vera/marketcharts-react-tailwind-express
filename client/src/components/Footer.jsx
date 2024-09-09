import React from 'react'

export default function Footer() {
  return (
    <div className='flex justify-between tablet:px-7
    tablet:py-12
    mobile:px-2  px-60 py-12 bg-slate-100 dark:bg-Very-Dark-Blue-Top'>
        <div>
            <h1 className='text-xl font-bold mb-4'>MarketCharts</h1>
            <p>Todos los derechos reservados a:</p>
            <p>MarketCharts inc.</p>
        </div>
        <div className='grid'>
            <h1 className='underline mobile:text-sm font-bold'>Enlaces rápidos</h1>
            <div className='translate-y-[-5px] grid gap-2'>
              <a href="">Dashboard</a>
              <a href="">Nuevo Ingreso</a>
              <a href="">Regulares</a>
              <a href="">Reincorporados</a>
              <a href="">No inscritos</a>
              <a href="">Extensión</a>
              <a href="">Egresados</a>
            </div>
        </div>
        <div className=''>
          <h1 className='font-bold underline text-md mobile:text-sm'>Proyecto desarrollado por:</h1>
          <p className='translate-y-[-5px]'>Raymond Aponte</p>
          <p>Jhon Rivera</p>
        </div>
    </div>
  )
}
