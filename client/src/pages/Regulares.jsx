import React, {useEffect, useState} from 'react'
import {Container, Header, Breadcrumb, Content} from 'rsuite';
import NavHeader from '../components/NavHeader';

export default function Regulares() {

    const [regularesData, setRegularesData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/regulares')
        .then(response => response.json())
        .then(data => {setRegularesData(data);
            if (regularesData.length = 0){
                console.log('sin info')
            }
        })
        .catch(err => console.log(err))
    }, [])
        
    

  return (
        <Container className='flex flex-1 overflow-auto flex-col'>
            <Header>
                <NavHeader/>
            </Header>
            <Content className='mt-[55px] bg-slate-200 h-screen'>
            <div className='my-3 mx-4'>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Dashboard</Breadcrumb.Item>
                        <Breadcrumb.Item href="/regulares">Regulares</Breadcrumb.Item>
                    </Breadcrumb>
                    <div>

                        <div className='justify-between flex mx-[1.3rem]'>
                            <div className='grid'>
                                <h1 className='text-2xl tracking-wide text-slate-700 mt-8'>Estudiantes Regulares</h1>
                                <h3 className='text-lg mt-2 text-slate-700'># en  total</h3>
                            </div>

                        </div>

                        <div className='flex justify-center mx-4'>
                            <table className="min-w-full divide-y divide-gray-200 mt-10">
                                <thead className="bg-gray-50 dark:bg-slate-400">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cedúla</th>
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
                                {regularesData.map(regulares => (
                                    <tr key={regulares.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{regulares.cedula}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{regulares.nombre}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{regulares.apellido}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{regulares.fecha_nacimiento}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{regulares.sexo}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{regulares.tipo_doc}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{regulares.carrera}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{regulares.mencion}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{regulares.lapso}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{regulares.turno}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{regulares.motivo_ingreso}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{regulares.direccion}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

                    </div>

                </div>
            </Content>
        </Container>
  )
}