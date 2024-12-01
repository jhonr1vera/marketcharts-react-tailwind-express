import React, { useState, useRef, useEffect } from "react";
import { successLoad, failedLoad, errorRequest } from "./SwalFunctions";
import Eye from "../assets/eye.svg";

export default function EditUserModal({ user, onUpdateUser }) {
  const [showModal, setShowModal] = useState(false);
  const [updateUser, setUpdateUser] = useState({
    nombre_usuario: user?.nombre_usuario || "",
    contrasenia: user?.contrasenia || "",
    name: user?.name || "",
    rol: user?.rol || "",
  });

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [visible, setVisible] = useState(false);
  const passwordInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/api/update_user/${user.id_usuario}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateUser),
        }
      );

      if (response.ok) {
        sessionStorage.setItem("loadUserStatus", "success");
        handleCloseModal();
        location.reload();
      } else {
        sessionStorage.setItem("loadUserStatus", "failed");
        location.reload();
      }
    } catch (error) {
      console.error("There was an error updating data", error);
      errorRequest();
    }
  };

  useEffect(() => {
    const loadUserStatus = sessionStorage.getItem("loadUserStatus");

    if (loadUserStatus === "success") {
      successLoad("Usuario actualizado con éxito");
      sessionStorage.removeItem("loadUserStatus");
    } else if (loadUserStatus === "failed") {
      failedLoad("Hubo un error al actualizar el usuario");
      sessionStorage.removeItem("loadUserStatus");
    }
  }, []);

  const toggleVisibility = () => {
    setVisible((prevVisible) => !prevVisible);
  };

  useEffect(() => {
    if (passwordInputRef.current) {
      passwordInputRef.current.type = visible ? "text" : "password";
    }
  }, [visible]);

  return (
    <div>
      <button
        onClick={handleOpenModal}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        Editar Usuario
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold flex">Editar Usuario</h2>
            <form onSubmit={handleUpdateUser} action="put">
              <div className="mb-4">
                <label className="block mb-1" htmlFor="edit_nombre_usuario">
                  Usuario
                </label>
                <input
                  type="text"
                  id="edit_nombre_usuario"
                  name="nombre_usuario"
                  value={updateUser.nombre_usuario}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1" htmlFor="edit_contrasenia">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="edit_contrasenia"
                  name="contrasenia"
                  value={updateUser.contrasenia}
                  ref={passwordInputRef}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <button
                type="button"
                onClick={toggleVisibility}
                className="absolute translate-y-[-49px] translate-x-[295px]"
              >
                <img src={Eye} alt="Toggle visibility" />
              </button>
              <div className="mb-4">
                <label className="block mb-1" htmlFor="edit_name">
                  Nombre del Usuario
                </label>
                <input
                  type="text"
                  id="edit_name"
                  name="name"
                  value={updateUser.name}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1" htmlFor="edit_rol">
                  Rol
                </label>
                <select
                  id="edit_rol"
                  name="rol"
                  value={updateUser.rol}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                >
                  <option value="user">Usuario</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-300 px-4 py-2 rounded mr-2"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
