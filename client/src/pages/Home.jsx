import React from 'react'
import NavHeader from '../components/NavHeader'
import Footer from '../components/Footer'
import { Container, Header, Content, Breadcrumb } from 'rsuite'

export default function Home() {

  return (
    <Container>
      <Header>
        <NavHeader aditionalClass={'fixed'}></NavHeader>
      </Header>
      <Content className='bg-slate-200 h-screen dark:bg-Dark-Desaturated-Blue'>
        <div  className='mt-16 mx-4 inline-flex'>
          <h1 className='text-xl tracking-wide flex text-slate-700 justify-center dark:text-Desaturated-Blue' >Dashboard</h1> 
        </div>
      </Content>
      <Footer></Footer>
    </Container>
  )
}
