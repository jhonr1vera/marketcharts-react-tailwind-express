import React, { useState, useEffect } from "react";
import { Container, Content, Breadcrumb, Header } from "rsuite";
import NavHeader from "../components/NavHeader";
import Footer from "../components/Footer";
import { noInfo, errorRequest } from "../components/SwalFunctions";
import LoadFunctions from "../components/LoadCSV";
import "datatables.net-dt/css/dataTables.dataTables.css";
import $ from "jquery";
import "datatables.net-dt";

export default function Entension() {
  const [extensionData, setExtensionData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/extension")
      .then((res) => res.json())
      .then((data) => {
        setExtensionData(data);
        if (data.length === 0) {
          setTimeout(noInfo, 800);
        }

        if (data.length > 0 && !$.fn.DataTable.isDataTable("#extensionTable")) {
          $(document).ready(function () {
            $("#extensionTable").DataTable({
              language: {
                decimal: "",
                emptyTable: "No hay información",
                info: "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
                infoEmpty: "Mostrando 0 to 0 of 0 Entradas",
                infoFiltered: "(Filtrado de _MAX_ total entradas)",
                infoPostFix: "",
                thousands: ",",
                lengthMenu: "Mostrar _MENU_ Entradas",
                loadingRecords: "Cargando...",
                processing: "Procesando...",
                search: "Buscar:",
                zeroRecords: "Sin resultados encontrados",
                paginate: {
                  first: "Primero",
                  last: "Ultimo",
                  next: "Siguiente",
                  previous: "Anterior",
                },
              },
            });
          });
        }
      })
      .catch((err) => {
        console.log(err);
        errorRequest();
      });
  }, []);

  return (
    <Container className="bg-slate-200 flex flex-1 flex-col min-h-screen">
      <Header>
        <NavHeader />
      </Header>

      <Content className="">
        <div className="my-3 mx-4">
          <Breadcrumb>
            <Breadcrumb.Item href="/">Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item href="/extension">Extensión</Breadcrumb.Item>
          </Breadcrumb>
          <div>
            <div className="justify-between flex mx-[1.3rem]">
              <div className="grid">
                <h1 className="text-2xl tracking-wide text-slate-700 mt-5">
                  Estudiantes de Extensión
                </h1>
                <h3 className="text-lg mt-2 text-slate-700">
                  {extensionData.length} en total
                </h3>
              </div>
              <LoadFunctions api="extension" />
            </div>

            <div className="">
              <table
                className="min-w-full divide-y divide-gray-200 mt-10"
                id="extensionTable"
              >
                <thead className="bg-gray-50 dark:bg-slate-400">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cédula
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nombre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Apellido
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha de Nacido
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sexo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nacionalidad
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Diplomado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Correo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Teléfono
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Motivo de Ingreso
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dirección
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Promoción
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {extensionData.map((extension) => (
                    <tr key={extension.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {extension.cedula}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {extension.nombre}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {extension.apellido}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {new Date(
                          extension.fecha_nacimiento
                        ).toLocaleDateString("es-ES")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {extension.sexo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {extension.tipo_doc}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {extension.diplomado}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {extension.correo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {extension.telefono}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {extension.motivo_ingreso}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {extension.direccion}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {new Date(extension.promocion).toLocaleDateString(
                          "es-ES"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        </Content>
      <Footer/>
    </Container>
  );
}
