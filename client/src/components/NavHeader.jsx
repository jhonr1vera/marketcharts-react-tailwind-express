import React, {useState, useEffect} from 'react'
import { Sidenav, Nav, Navbar, Avatar, Header } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import ExitIcon from '@rsuite/icons/Exit';
import TableIcon from '@rsuite/icons/Table';
import Sun from '../assets/sun.svg';
import Moon from '../assets/moon.svg';
import NavItem from 'rsuite/esm/Nav/NavItem';
import { useNavigate } from 'react-router-dom';

function NavHeader({aditionalClass}) {

  const navigate = useNavigate();

    // const [darkMode, setDarkMode] = useState(false);

    // const handleDarkMode = () => {
    //     setDarkMode(!darkMode);
    // };

    // useEffect(() => {
    //     if (darkMode) {
    //         document.documentElement.classList.add('dark');
    //     } else {
    //         document.documentElement.classList.remove('dark');
    //     }
    // }, [darkMode]);

    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/login')
    };


  return (
    <div className={aditionalClass} >

        <Navbar className='dark:bg-Very-Dark-Blue-Top w-screen'>
                <Navbar.Brand href="/" className='  text-2xl flex items-center tracking-wide dark:text-slate-400 mobile:ml-2 mobile:text-xl'>
                    MarketCharts
                </Navbar.Brand>
                <Nav className=' items-center flex mr-4' pullRight>
                  

                    <button type='button'className=''>
                      <Nav.Item href='/' icon={<DashboardIcon/>} className=' dark:hover:bg-slate-600'>
                          Dashboard
                      </Nav.Item>
                    </button>

                    <Nav.Menu 
                    title="Tablas"
                    icon={<TableIcon/>}
                    className='text-sm dark:text-slate-400 dark:bg-Very-Dark-Blue'>
                      <a href="/nuevoingreso" ><Nav.Item className='dark:text-slate-400 hover:decoration-wavy'>Nuevo Ingreso</Nav.Item></a>
                      <a href="/regulares"><Nav.Item className='dark:text-slate-400'>Regulares</Nav.Item></a>
                      <a href="/reincorporados"><Nav.Item className='dark:text-slate-400'>Reincorporados</Nav.Item></a>
                      <a href="/noinscritos"><Nav.Item className='dark:text-slate-400'>No inscritos</Nav.Item></a>
                      <a href="/extension"><Nav.Item className='dark:text-slate-400'>Extensión</Nav.Item></a>
                      <a href="/egresados"><Nav.Item className='dark:text-slate-400'>Egresados</Nav.Item></a>
                    </Nav.Menu>
                    
                    {/* <button type='button' onClick={handleDarkMode} className=''>
                      <Nav.Item className=' dark:hover:bg-slate-600'>
                          <img src={darkMode ? Sun : Moon} alt="" />
                      </Nav.Item>
                    </button> */}

                    <Nav.Menu  
                    as='button' 
                    className='gap-4  dark:hover:bg-slate-600 dark:hover:text-white mobile:text-base  dark:text-slate-400 dark:bg-Very-Dark-Blue' 
                    title = 'Usuario' icon={<Avatar src="https://i.pravatar.cc/150?u=1" circle></Avatar>}>                     
                      
                      <Nav.Item icon={<ExitIcon/>}
                      className=' dark:text-slate-400'
                      onClick={handleLogout}
                      >
                        Salir
                      </Nav.Item>
                    </Nav.Menu>
                </Nav>

        </Navbar>

    </div> 
  )
}

export default NavHeader