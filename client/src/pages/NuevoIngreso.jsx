import React, {useState, useEffect} from 'react'
import {Container, Header, Content, Breadcrumb} from 'rsuite'
import NavHeader from '../components/NavHeader';

export default function NuevoIngreso() {

    const [nuevoingreso, setNuevoIngreso] = useState([]);
    const [totalNuevoIngreso, setTotalNuevoIngreso] = useState(0);

    useEffect(() => {
      fetch('http://localhost:5000/api/nuevoingreso')
        .then(response => response.json())
        .then(data => {setNuevoIngreso(data);
          console.log(data.nuevo_ingreso)
        })
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
      fetch('http://localhost:5000/api/nuevoingreso?count=true')
      .then(res => res.json())
            .then(data => setTotalNuevoIngreso(data.total))
            .catch(err => console.log(err))
    })


  return (
    <Container className='flex flex-1 overflow-auto flex-col'>

          <Header>
            <NavHeader/>
          </Header>
        
          <Container className=''>
            <div className='flex'>
              <Content className='bg-slate-200 h-screen'>
                <div className='my-3 mx-4'>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Dashboard</Breadcrumb.Item>
                        <Breadcrumb.Item href="/nuevoingreso">Nuevo Ingreso</Breadcrumb.Item>
                    </Breadcrumb>
                    <div>

                        <div className='justify-between flex mx-[1.3rem]'>
                            <div className='grid'>
                                <h1 className='text-2xl tracking-wide text-slate-700 mt-5'>Estudiantes Nuevo Ingreso</h1>
                                <h3 className='text-lg mt-2 text-slate-700'>{totalNuevoIngreso} en  total</h3>
                            </div>

                        </div>

                        <div className='flex justify-center mx-4'>
                            <table className="min-w-full divide-y divide-gray-200 mt-10">
                                <thead className="bg-gray-50 dark:bg-slate-400">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cédula</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apellido</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de Nacido</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sexo</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nacionalidad</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Carrera</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mencion</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lapso</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Turno</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Motivo de Ingreso</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dirección</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {nuevoingreso.map(nuevo_ingreso => (
                                    <tr key={nuevo_ingreso.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{nuevo_ingreso.cedula}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{nuevo_ingreso.nombre}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{nuevo_ingreso.apellido}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{nuevo_ingreso.fecha_nacimiento}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{nuevo_ingreso.sexo}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{nuevo_ingreso.tipo_doc}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{nuevo_ingreso.carrera}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{nuevo_ingreso.mencion}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{nuevo_ingreso.lapso}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{nuevo_ingreso.turno}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{nuevo_ingreso.motivo_ingreso}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{nuevo_ingreso.direccion}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

                    </div>

                </div>
              </Content>

            </div>
  
          </Container>
          
      </Container>
  )
}
