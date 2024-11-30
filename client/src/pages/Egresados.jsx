import React, { useEffect, useState } from "react";
import { Container, Content, Header, Breadcrumb } from "rsuite";
import NavHeader from "../components/NavHeader";
import Footer from "../components/Footer";
import { noInfo, errorRequest } from "../components/SwalFunctions";
import LoadFunctions from "../components/LoadCSV";
import "datatables.net-dt/css/dataTables.dataTables.css";
import $ from "jquery";
import "datatables.net-dt";

export default function Egresados() {
  const [egresadosData, setEgresadosData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/egresados")
      .then((res) => res.json())
      .then((data) => {
        setEgresadosData(data);
        if (data.length === 0) {
          setTimeout(noInfo, 800);
        }
        if (data.length > 0 && !$.fn.DataTable.isDataTable("#egresadosTable")) {
          $(document).ready(function () {
            $("#egresadosTable").DataTable({
              retrieve: true,
              responsive: true,
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
    <Container className="bg-slate-200 flex flex-col min-h-screen min-w-max">
      <Header>
        <NavHeader aditionalClass={""} />
      </Header>

      <Content className="">
        <div className="my-3 mx-4">
          <Breadcrumb>
            <Breadcrumb.Item href="/">Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item href="/egresados">Egresados</Breadcrumb.Item>
          </Breadcrumb>

          <div className="justify-between flex mx-[1.3rem]">
            <div className="grid">
              <h1 className="text-2xl tracking-wide text-slate-700 mt-5">
                Estudiantes Egresados
              </h1>
              <h3 className="text-lg mt-2 text-slate-700">
                {egresadosData.length} en total
              </h3>
              <h2>Última carga: {new Date(egresadosData[0]?.fecha_carga).toLocaleDateString(
                          "es-ES"
                        )}</h2>
            </div>
            <LoadFunctions api="egresados" />
          </div>
          <div className="mt-10">
            <table
              className="min-w-full divide-y divide-gray-200 mt-10"
              id="egresadosTable"
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
                    Doc
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Carrera
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mención
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha de Egreso
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {egresadosData.map((egresados) => (
                  <tr key={egresados.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {egresados.cedula}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {egresados.nombre}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {egresados.apellido}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {new Date(egresados.fecha_nacimiento).toLocaleDateString(
                          "es-ES"
                        )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {egresados.sexo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {egresados.tipo_doc}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {egresados.carrera}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {egresados.mencion}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {egresados.turno}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {egresados.correo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {egresados.telefono}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {egresados.motivo_ingreso}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {egresados.motivo_eleccion}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {egresados.direccion}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {new Date(egresados.fecha_egreso).toLocaleDateString(
                          "es-ES"
                        )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Content>
      <Footer/>
    </Container>
  );
}
