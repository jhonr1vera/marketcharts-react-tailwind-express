import React, { useState, useEffect } from 'react';
import { Sidenav, Nav, Navbar, Avatar } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import ExitIcon from '@rsuite/icons/Exit';
import TableIcon from '@rsuite/icons/Table';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logo_ISUM.png';

function NavHeader({ aditionalClass }) {
  const [user, setUser] = useState({ name: '', rol: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/user', {
          method: 'GET',
          credentials: 'include',
        });

        const data = await response.json();

        if (response.ok) {
          setUser(data);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className={`${aditionalClass}`}>
      <Navbar className="dark:bg-Very-Dark-Blue-Top w-screen px-2">
        <Navbar.Brand
          href="/"
          className="text-2xl flex items-center tracking-wide dark:text-slate-400 mobile:ml-2 mobile:text-xl"
        >
          MarketCharts
          <span className="translate-y-[3px] text-sm font-bold">&nbsp;x&nbsp;</span>
          <img className="h-8" src={logo} alt="Logo ISUM" />
        </Navbar.Brand>
        <Nav className="items-center flex mr-4" pullRight>
          <button type="button" className="">
            <Nav.Item
              href="/"
              icon={<DashboardIcon />}
              className="dark:hover:bg-slate-600"
            >
              Dashboard
            </Nav.Item>
          </button>

          <Nav.Menu
            title="Tablas"
            icon={<TableIcon />}
            className="text-sm dark:text-slate-400 dark:bg-Very-Dark-Blue"
          >
            <a href={user.rol === 'admin' ? '/nuevoingreso' : '/user_nuevoingreso'}>
              <Nav.Item className="dark:text-slate-400 hover:decoration-wavy">
                Nuevo Ingreso
              </Nav.Item>
            </a>
            <a href={user.rol === 'admin' ? '/regulares' : '/user_regulares'}>
              <Nav.Item className="dark:text-slate-400">Regulares</Nav.Item>
            </a>
            <a href={user.rol === 'admin' ? '/reincorporados' : '/user_reincorporados'}>
              <Nav.Item className="dark:text-slate-400">Reincorporados</Nav.Item>
            </a>
            <a href={user.rol === 'admin' ? '/noinscritos' : '/user_noinscritos'}>
              <Nav.Item className="dark:text-slate-400">No inscritos</Nav.Item>
            </a>
            <a href={user.rol === 'admin' ? '/extension' : '/user_extension'}>
              <Nav.Item className="dark:text-slate-400">Extensión</Nav.Item>
            </a>
            <a href={user.rol === 'admin' ? '/egresados' : '/user_egresados'}>
              <Nav.Item className="dark:text-slate-400">Egresados</Nav.Item>
            </a>
          </Nav.Menu>

          <Nav.Menu
            as="button"
            className="gap-4 dark:hover:bg-slate-600 dark:hover:text-white mobile:text-base dark:text-slate-400 dark:bg-Very-Dark-Blue"
            title={user.name}
            icon={<div className='w-8 h-8 rounded-full bg-purple-300 items-center flex justify-center'>{user.name[0]}</div>}
          >
            <Nav.Item
              icon={<ExitIcon />}
              className="dark:text-slate-400"
              onClick={handleLogout}
            >
              Salir
            </Nav.Item>
          </Nav.Menu>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavHeader;
