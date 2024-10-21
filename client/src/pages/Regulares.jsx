import React, { useEffect, useState } from "react";
import { Container, Header, Breadcrumb, Content } from "rsuite";
import NavHeader from "../components/NavHeader";
import Footer from "../components/Footer";
import { noInfo, errorRequest } from "../components/SwalFunctions";
import "datatables.net-dt/css/dataTables.dataTables.css";
import $ from "jquery";
import "datatables.net-dt";

export default function Regulares() {
  const [regularesData, setRegularesData] = useState([]);
  const [totalRegulares, setTotalRegulares] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/api/regulares")
      .then((response) => response.json())
      .then((data) => {
        setRegularesData(data);

        if (data.length === 0 || data.length < 0) {
          setTimeout(noInfo, 800);
        }

        if (data.length > 0 && !$.fn.DataTable.isDataTable("#myTable")) {
          $(document).ready(function () {
            $("#myTable").DataTable({
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

  useEffect(() => {
    fetch("http://localhost:5000/api/regulares?count=true")
      .then((res) => res.json())
      .then((data) => setTotalRegulares(data.total))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container className="bg-slate-200 flex flex-col">
      <Header>
        <NavHeader />
      </Header>
      <Content className="">
        <div className="my-3 mx-4">
          <Breadcrumb>
            <Breadcrumb.Item href="/">Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item href="/regulares">Regulares</Breadcrumb.Item>
          </Breadcrumb>

          <div className="justify-between flex mb-10 mx-[1.3rem]">
            <div className="grid">
              <h1 className="text-2xl tracking-wide text-slate-700 mt-5">
                Estudiantes Regulares
              </h1>
              <h3 className="text-lg mt-2 text-slate-700">
                {totalRegulares} en total
              </h3>
            </div>
          </div>

          <div className="">
            <table
              className="min-w-full divide-y divide-gray-200 mt-10"
              id="myTable"
            >
              <thead className="bg-gray-50 dark:bg-slate-400 dark:text-black">
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
                    Motivo de Ingreso
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dirección
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {regularesData.map((regulares) => (
                  <tr key={regulares.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {regulares.cedula}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {regulares.nombre}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {regulares.apellido}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {new Date(regulares.fecha_nacimiento).toLocaleDateString(
                          "es-ES"
                        )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {regulares.sexo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {regulares.tipo_doc}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {regulares.carrera}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {regulares.mencion}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {regulares.lapso}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {regulares.turno}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {regulares.motivo_ingreso}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {regulares.direccion}
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
