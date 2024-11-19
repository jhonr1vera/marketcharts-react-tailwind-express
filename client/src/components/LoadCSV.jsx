import React, { useState, useEffect } from "react";
import { successLoad, failedLoad } from "./SwalFunctions";

export default function LoadFunctions({ api, onDateChange }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      document.getElementById("addFile").click();
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`http://localhost:5000/api/upload/${api}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Hubo un error al cargar el archivo.");
      }

      sessionStorage.setItem("loadStatus", "success");
      location.reload();

    } catch (error) {
      console.error("Error cargando el archivo:", error);
      sessionStorage.setItem("loadStatus", "failed");
      location.reload();
    }
  };

  useEffect(() => {
    const loadStatus = sessionStorage.getItem("loadStatus");

    if (loadStatus === "success") {
      successLoad();

      sessionStorage.removeItem("loadStatus");
      
    } else if (loadStatus === "failed") {
      failedLoad();
      sessionStorage.removeItem("loadStatus");
    }
  }, []);


  return (
    <div className="flex items-center justify-center">
      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 rounded text-lg"
      >
        Cargar tabla
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg w-1/3 relative h-60">
            <h2 className="text-xl text-slate-800 font-bold mb-4">CARGAR ARCHIVO</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="ml-4 block text-md font-medium text-gray-700 uppercase">
                  Selecciona o arrastra tu archivo <b>.csv</b>
                </label>
                <input
                  type="file"
                  id="addFile"
                  onChange={handleFileChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-md" 
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-slate-800 text-white px-4 py-2 rounded mr-2"
                >
                  Subir
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
