import React, { useEffect, useState } from "react";
import { Container, Content, Breadcrumb } from "rsuite";
import NavHeader from "../components/NavHeader";
import Footer from "../components/Footer";
import EditUser from "../components/EditUser";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";

export default function Admin() {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);

  const [userData, setUserData] = useState([]);
  const [createUser, setCreateUser] = useState({
    nombre_usuario: "",
    contrasenia: "",
    name: "",
    rol: "",
  });

  const route = "http://localhost:5000/api";

  // Fetch de usuarios al cargar el componente
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${route}/user_data`);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error al obtener datos de usuarios:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateUser({
      ...createUser,
      [name]: value,
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${route}/insert_user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createUser),
      });

      if (response.ok) {
        Swal.fire(
          "¡Creado!",
          "El usuario ha sido creado con éxito.",
          "success"
        );
        setCreateUser({
          nombre_usuario: "",
          contrasenia: "",
          name: "",
          rol: "",
        });
        fetchUsers();
      } else {
        Swal.fire("Error", "Hubo un problema al crear el usuario.", "success");
      }
    } catch (error) {
      console.error("Error in the request:", error);
      Swal.fire(
        "Error",
        "Hubo un problema al conectarse con el servidor.",
        "error"
      );
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${route}/delete_user/${id}`, {
            method: "DELETE",
          });

          if (response.ok) {
            Swal.fire(
              "¡Eliminado!",
              "El usuario ha sido eliminado con éxito.",
              "success"
            );
            setUserData(userData.filter((user) => user.id_usuario !== id));
          } else {
            Swal.fire(
              "Error",
              "Hubo un problema al eliminar el usuario.",
              "error"
            );
          }
        } catch (error) {
          console.error("Error in the request:", error);
          Swal.fire(
            "Error",
            "Hubo un problema al conectarse con el servidor.",
            "error"
          );
        }
      }
    });
  };

  return (
    <div>
      <Container className="min-h-screen">
        <NavHeader />
        <Container>
          <Content className="px-6 py-5 bg-slate-200">
            <Breadcrumb>
              <Breadcrumb.Item href="/">Dashboard</Breadcrumb.Item>
              <Breadcrumb.Item href="/admin_options">
                Gestionar Usuarios
              </Breadcrumb.Item>
            </Breadcrumb>
            <div>
              <h1 className="px-36 mb-2 text-3xl tracking-wide text-slate-700 justify-center flex">
                Gestionar Usuarios
              </h1>
            </div>
            <div className="grid justify-center mt-10 min-w-full mb-20">
              <div className="h-[500px] w-[90em] p-2">
                <div className="mb-4">
                  <h1 className="ml-36 mb-2 text-2xl tracking-wide text-slate-700">
                    Nuevo Usuario
                  </h1>
                  <form
                    onSubmit={handleCreate}
                    className="flex gap-4 justify-center items-center"
                  >
                    <div className="grid">
                      <label className="text" htmlFor="nombre_usuario">
                        Usuario
                      </label>
                      <input
                        type="text"
                        id="nombre_usuario"
                        name="nombre_usuario"
                        value={createUser.nombre_usuario}
                        onChange={handleChange}
                        className="h-10 rounded-lg border-2 border-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 p-1"
                        placeholder="Ingresa el usuario"
                        required
                      />
                    </div>
                    <div className="grid">
                      <label htmlFor="contrasenia">Contraseña</label>
                      <input
                        type="password"
                        id="contrasenia"
                        name="contrasenia"
                        value={createUser.contrasenia}
                        onChange={handleChange}
                        className="h-10 rounded-lg border-2 border-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 p-1"
                        placeholder="Ingresa la contraseña"
                        required
                      />
                    </div>
                    <div className="grid">
                      <label htmlFor="name">Nombre del Usuario</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={createUser.name}
                        onChange={handleChange}
                        className="h-10 rounded-lg border-2 border-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 p-2"
                        placeholder="Ingresa el nombre"
                        required
                      />
                    </div>
                    <div className="grid">
                      <label htmlFor="rol">Rol del Usuario</label>
                      <select
                        id="rol"
                        name="rol"
                        value={createUser.rol}
                        onChange={handleChange}
                        className="h-10 rounded-lg border-2 border-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 p-2"
                        required
                      >
                        <option value="">--</option>
                        <option value="user">Usuario</option>
                        <option value="admin">Administrador</option>
                      </select>
                    </div>
                    <div>
                      <input
                        className="bg-green-600 p-3 pb-4 text-white h-10 rounded-lg mt-5"
                        type="submit"
                        value="Crear Usuario"
                      />
                    </div>
                  </form>
                </div>
                <table className="w-[500px] divide-y divide-gray-200 min-w-full">
                  <thead className="bg-gray-50 h-10">
                    <tr>
                      <th className="uppercase">Usuario</th>
                      <th className="uppercase">Contraseña</th>
                      <th className="uppercase">Nombre del Usuario</th>
                      <th className="uppercase">Rol</th>
                      <th className="uppercase">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {userData.map((user) => (
                      <tr className="h-10" key={user.id_usuario}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {user.nombre_usuario}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          ******
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {user.name}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {user.rol}
                        </td>
                        <td className="flex gap-4 justify-center items-center">
                          <EditUser
                            user={user}
                            fetchUsers={fetchUsers}
                            className=""
                          />
                          {user.name === decoded.username ? (
                            ""
                          ) : (
                            <button
                              className="bg-red-500 p-2 text-md text-white rounded-md mt-2"
                              onClick={() => handleDelete(user.id_usuario)}
                            >
                              Eliminar
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Content>
        </Container>
        <Footer />
      </Container>
    </div>
  );
}
