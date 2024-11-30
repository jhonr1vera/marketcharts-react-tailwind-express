import React, { useState, useEffect } from "react";
import { Container, Header, Content, Breadcrumb } from "rsuite";
import NavHeader from "../components/NavHeader";
import Footer from "../components/Footer";
import { noInfo, errorRequest } from "../components/SwalFunctions";
import LoadFunctions from "../components/LoadCSV";
import "datatables.net-dt/css/dataTables.dataTables.css";
import $ from "jquery";
import "datatables.net-dt";

export default function NuevoIngreso() {
  const [nuevoingreso, setNuevoIngreso] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/nuevoingreso")
      .then((response) => response.json())
      .then((data) => {
        setNuevoIngreso(data);
        if (data.length === 0) {
          setTimeout(noInfo, 800);
        }
        if (data.length > 0 && !$.fn.DataTable.isDataTable("#ningresoTable")) {
          $(document).ready(function () {
            $("#ningresoTable").DataTable({
              retrieve: true,
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
    <Container className=" bg-slate-200 flex flex-col min-h-screen min-w-max">
      <Header>
        <NavHeader />
      </Header>

      <Content className="">
        <div className="my-3 mx-4">
          <Breadcrumb>
            <Breadcrumb.Item href="/">Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item href="/nuevoingreso">
              Nuevo Ingreso
            </Breadcrumb.Item>
          </Breadcrumb>

          <div className="justify-between flex mx-[1.3rem]">
            <div className="grid">
              <h1 className="text-2xl tracking-wide text-slate-700 mt-5">
                Estudiantes Nuevo Ingreso
              </h1>
              <h3 className="text-lg mt-2 text-slate-700">
                {nuevoingreso.length} en total
              </h3>
              <h2>Última carga: {new Date(nuevoingreso[0]?.fecha_carga).toLocaleDateString(
                          "es-ES"
                        )}</h2>
            </div>
            <LoadFunctions api="nuevo_ingreso" />
          </div>

          <div className="mt-10">
            <table
              className="min-w-full divide-y divide-gray-200 mt-10"
              id="ningresoTable"
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
                    Carrera
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mencion
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lapso
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Turno
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
                    Motivo Elección
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dirección
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {nuevoingreso.map((nuevo_ingreso) => (
                  <tr key={nuevo_ingreso.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {nuevo_ingreso.cedula}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {nuevo_ingreso.nombres}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {nuevo_ingreso.apellidos}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {new Date(nuevo_ingreso.fecha_nacimiento).toLocaleDateString(
                          "es-ES"
                        )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {nuevo_ingreso.sexo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {nuevo_ingreso.tipo_doc}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {nuevo_ingreso.carrera}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {nuevo_ingreso.mencion}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {nuevo_ingreso.lapso}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {nuevo_ingreso.turno}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {nuevo_ingreso.correo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {nuevo_ingreso.telefono}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {nuevo_ingreso.motivo_ingreso}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {nuevo_ingreso.motivo_eleccion}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {nuevo_ingreso.direccion}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Content>

      <Footer />
    </Container>
  );
}
