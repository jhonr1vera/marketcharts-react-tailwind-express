import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Eye from '../assets/eye.svg';
import Swal from 'sweetalert2'

export default function Login() {

    const handleError = () => {
        Swal.fire({
            icon: "error",
            title: "Error al iniciar",
            text: 'Usuario o contraseña incorrectos'
          });
    }

    const navigate = useNavigate();
    
    const [visible, setVisible] = useState(false);
    const passwordInputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre_usuario: e.target.username.value,
                contrasenia: e.target.password.value,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    handleError();
                    throw new Error('Login Failed');
                }
                return response.json();
            })
            .then((data) => {
                navigate('/');
                const Toast = Swal.mixin({
                    toast: true,
                    position: "center",
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.onmouseenter = Swal.stopTimer;
                      toast.onmouseleave = Swal.resumeTimer;
                    }
                  });
                  Toast.fire({
                    icon: "success",
                    title: "Has ingresado exitosamente!"
                  });
            })
            .catch((err) => console.log(err));
    };

    const toggleVisibility = () => {
        setVisible((prevVisible) => !prevVisible);
    };

    useEffect(() => {
        if (passwordInputRef.current) {
            passwordInputRef.current.type = visible ? 'text' : 'password';
        }
    }, [visible]);

    return (
        <main className='flex items-center justify-center bg-slate-200 h-screen'>
            <div className='flex bg-white py-[2.8rem] pl-[4.3rem] pr-[4rem] rounded-xl'>
                <form onSubmit={handleSubmit}>
                    <h1 className='mb-2 text-slate-800'>MARKETCHARTS</h1>
                    <h1 className='text-2xl mb-3 text-slate-800 tracking-wide'>INICIO DE SESIÓN</h1>
                    <div className="mb-6">
                        <label htmlFor="username" className="block text-slate-600 text-base tracking-wide mb-1">
                            USUARIO
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            placeholder='Ingresa tu nombre de usuario'
                            required
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 w-[320px]"
                        />
                    </div>

                    <div className="mb-1">
                        <label htmlFor="passwordInput" className="block text-slate-600 text-base tracking-wide mb-1">
                            CONTRASEÑA
                        </label>
                        <div className='relative items-center flex'>
                            <input
                                id="passwordInput"
                                name="password"
                                type="password"
                                autoComplete="off"
                                placeholder='Ingresa tu contraseña'
                                required
                                ref={passwordInputRef}
                                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 w-[320px]"
                            />
                            <button
                                type='button'
                                onClick={toggleVisibility}
                                className='absolute right-2 top-1/2 transform -translate-y-1/2'>
                                <img src={Eye} alt="Toggle visibility" />
                            </button>
                        </div>
                    </div>

                    <p className='text-xs mb-6 mt-1 flex justify-end underline text-purple-500'>
                        <a href="#">¿Olvidaste tu contraseña?</a>
                    </p>

                    <div className='justify-around flex'>
                        <button type="submit" className="bg-slate-800 text-white py-2 px-4 rounded-2xl hover:bg-slate-700">
                            Entrar
                        </button>
                        <span className='text-xs text-center text-slate-600'>
                            Opción de registro no disponible,
                            <br />
                            consultar con administrador.
                        </span>
                    </div>
                </form>
            </div>
        </main>
    );
}