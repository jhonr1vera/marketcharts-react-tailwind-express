import React, { useEffect, useState } from "react";
import { Container, Content, Breadcrumb, Header } from "rsuite";
import NavHeader from "../components/NavHeader";
import { noInfo, errorRequest } from "../components/SwalFunctions";
import Footer from "../components/Footer";
import "datatables.net-dt/css/dataTables.dataTables.css";
import $ from "jquery";
import "datatables.net-dt";
import LoadFunctions from "../components/LoadCSV";

export default function NoInscritos() {
  const [noInscritosData, setNoInscritosData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/noinscritos")
      .then((res) => res.json())
      .then((data) => {
        setNoInscritosData(data);
        if (data.length === 0) {
          setTimeout(noInfo, 800);
        }
        if (
          data.length > 0 &&
          !$.fn.DataTable.isDataTable("#noInscritosTable")
        ) {
          $(document).ready(function () {
            $("#noInscritosTable").DataTable({
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
    <Container className="bg-slate-200 flex flex-col min-h-screen min-w-max">
      <Header>
        <NavHeader />
      </Header>

      <Content className="">
        <div className="my-3 mx-4">
          <Breadcrumb>
            <Breadcrumb.Item href="/">Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item href="/noinscritos">No Inscritos</Breadcrumb.Item>
          </Breadcrumb>
          <div className="justify-between flex mx-[1.3rem]">
            <div className="grid">
              <h1 className="text-2xl tracking-wide text-slate-700 mt-5">
                Estudiantes No Inscritos
              </h1>
              <h3 className="text-lg mt-2 text-slate-700">
              {noInscritosData.length} en total
              </h3>
              <h2>Última carga: {new Date(noInscritosData[0]?.fecha_carga).toLocaleDateString(
                          "es-ES"
                        )}</h2>
            </div>
            <LoadFunctions api="no_inscritos"/>
          </div>

          <div className="">
            <table
              className="min-w-full divide-y divide-gray-200 mt-10"
              id="noInscritosTable"
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
                    Último lapso
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
                    Dirección
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {noInscritosData.map((no_inscritos) => (
                  <tr key={no_inscritos.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {no_inscritos.cedula}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {no_inscritos.nombre}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {no_inscritos.apellido}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {new Date(no_inscritos.fecha_nacimiento).toLocaleDateString(
                          "es-ES"
                        )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {no_inscritos.sexo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {no_inscritos.tipo_doc}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {no_inscritos.carrera}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {no_inscritos.mencion}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {no_inscritos.lapso}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {no_inscritos.turno}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {no_inscritos.correo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {no_inscritos.telefono}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {no_inscritos.motivo_ingreso}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {no_inscritos.direccion}
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
