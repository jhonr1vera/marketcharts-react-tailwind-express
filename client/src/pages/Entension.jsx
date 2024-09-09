import React, {useState, useEffect} from 'react'
import {Container, Content, Breadcrumb, Header} from 'rsuite'
import NavHeader from '../components/NavHeader'


export default function Entension() {

    const [extensionData, setExtensionData] = useState([])

    useEffect(()=>{
        fetch('http://localhost:5000/api/extension')
            .then(res => res.json())
            .then(data => {
                setExtensionData(data)
            })
            .catch(err => console.log(err))
        },[])

  return (
    <Container className='flex flex-1 overflow-auto flex-col'>
        
        <Header>
            <NavHeader/>
        </Header>

        <Content className='mt-[55px] bg-slate-200 h-screen'>
        <div className='my-3 mx-4'>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Dashboard</Breadcrumb.Item>
                        <Breadcrumb.Item href="/extension">Extension</Breadcrumb.Item>
                    </Breadcrumb>
                    <div>

                        <div className='justify-between flex mx-[1.3rem]'>
                            <div className='grid'>
                                <h1 className='text-2xl tracking-wide text-slate-700 mt-8'>Estudiantes de Extension</h1>
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
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diplomado</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Motivo de Ingreso</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dirección</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Promoción</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {extensionData.map(extension => (
                                    <tr key={extension.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{extension.cedula}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{extension.nombre}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{extension.apellido}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{extension.fecha_nacimiento}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{extension.sexo}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{extension.tipo_doc}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{extension.diplomado}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{extension.motivo_ingreso}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{extension.direccion}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{extension.promocion}</td>
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
