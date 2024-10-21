import React, { useState, useEffect, useLayoutEffect } from "react";
import NavHeader from "../components/NavHeader";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { Container, Header, Content, Breadcrumb } from "rsuite";
// Amcharts
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export default function Home() {
  // Conteos

  const [totalNoInscritos, setTotalNoInscritos] = useState(0);
  const [totalNuevoIngreso, setTotalNuevoIngreso] = useState(0);
  const [totalRegulares, setTotalRegulares] = useState(0);
  const [totalReincorporados, setTotalReincorporados] = useState(0);
  const [totalEgresados, setTotalEgresados] = useState(0);
  const [totalExtension, setTotalExtension] = useState(0);

  // Charts

  const [carrerasCount, setCarrerasCount] = useState([]);
  const [lapsosCount, setLapsosCount] = useState([]);
  const [turnosCount, setTurnosCount] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [motivos, setMotivos] = useState([]);

  // Conteos

  useEffect(() => {
    fetch("http://localhost:5000/api/noinscritos?count=true")
      .then((res) => res.json())
      .then((data) => setTotalNoInscritos(data.total))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/nuevoingreso?count=true")
      .then((res) => res.json())
      .then((data) => setTotalNuevoIngreso(data.total))
      .catch((err) => console.log(err));
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/regulares?count=true")
      .then((res) => res.json())
      .then((data) => setTotalRegulares(data.total))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/reincorporados?count=true")
      .then((res) => res.json())
      .then((data) => setTotalReincorporados(data.total))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/egresados?count=true")
      .then((res) => res.json())
      .then((data) => {
        setTotalEgresados(data.total);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/extension?count=true")
      .then((res) => res.json())
      .then((data) => {
        setTotalExtension(data.total);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/count_motivos")
      .then((res) => res.json())
      .then((data) => setMotivos(data))
      .catch((err) => console.log(err))
  }, [])

  // Carreras Charts

  useEffect(() => {
    fetch("http://localhost:5000/api/count_carreras")
      .then((res) => res.json())
      .then((data) => {
        setCarrerasCount(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useLayoutEffect(() => {
    if (carrerasCount.length > 0 && document.getElementById("chartCarreras")) {
      let root = am5.Root.new("chartCarreras");

      root.setThemes([am5themes_Animated.new(root)]);

      let chart = root.container.children.push(
        am5percent.PieChart.new(root, {
          layout: root.verticalHorizontal,
        })
      );

      let series = chart.series.push(
        am5percent.PieSeries.new(root, {
          name: "Carreras",
          valueField: "count",
          categoryField: "carrera",
        })
      );
      series.data.setAll(carrerasCount);

      let legend = chart.children.push(
        am5.Legend.new(root, {
          centerX: am5.percent(50),
          x: am5.percent(50),
          layout: root.horizontalLayout,
        })
      );
      legend.data.setAll(series.dataItems);

      return () => {
        root.dispose();
      };
    }
  }, [carrerasCount]);

  // Lapso charts

  useEffect(() => {
    fetch("http://localhost:5000/api/count_lapsos")
      .then((res) => res.json())
      .then((data) => setLapsosCount(data))
      .catch((err) => console.log(err));
  }, []);

  useLayoutEffect(() => {
    let root = am5.Root.new("chartLapsos");
    root.setThemes([am5themes_Animated.new(root)]);

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: false,
        layout: root.verticalLayout,
      })
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {}),
        categoryField: "lapso",
      })
    );
    xAxis.data.setAll(lapsosCount);

    let series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Estudiantes por Lapso",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "count",
        categoryXField: "lapso",
      })
    );
    series1.data.setAll(lapsosCount);

    let legend = chart.children.push(am5.Legend.new(root, {}));
    legend.data.setAll(chart.series.values);

    chart.set("cursor", am5xy.XYCursor.new(root, {}));

    return () => {
      root.dispose();
    };
  }, [lapsosCount]);

  // Turnos Charts

  useEffect(() => {
    fetch("http://localhost:5000/api/count_turnos")
      .then((res) => res.json())
      .then((data) => setTurnosCount(data))
      .catch((err) => console.log(err));
  }, []);

  useLayoutEffect(() => {
    let root = am5.Root.new("chartTurnos");
    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalHorizontal,
      })
    );

    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Turnos",
        valueField: "count",
        categoryField: "turno",
      })
    );
    series.data.setAll(turnosCount);

    let legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        layout: root.horizontalLayout,
      })
    );

    legend.data.setAll(series.dataItems);

    return () => {
      root.dispose();
    };
  }, [turnosCount]);

  // Generos charts

  useEffect(() => {
    fetch("http://localhost:5000/api/count_generos")
      .then((res) => res.json())
      .then((data) => setGeneros(data))
      .catch((err) => console.log(err));
  }, []);

  useLayoutEffect(() => {
    let root = am5.Root.new("chartGeneros");
    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalHorizontal,
      })
    );

    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Generos",
        valueField: "count",
        categoryField: "sexo",
      })
    );
    series.data.setAll(generos);

    let legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        layout: root.horizontalLayout,
      })
    );

    legend.data.setAll(series.dataItems);

    return () => {
      root.dispose();
    };
  }, [generos]);

  // For Work

  useLayoutEffect(() => {
    let root = am5.Root.new("chartEstudiantes");
    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalHorizontal,
      })
    );

    let data = [
      { category: "Nuevo Ingreso", count: totalNuevoIngreso },
      { category: "Regulares", count: totalRegulares },
      { category: "Egresados", count: totalEgresados },
      { category: "Reincorporados", count: totalReincorporados },
      { category: "No inscritos", count: totalNoInscritos },
    ];

    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Series",
        valueField: "count",
        categoryField: "category",
      })
    );

    series.data.setAll(data);

    let legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        layout: root.horizontalLayout,
      })
    );

    legend.data.setAll(series.dataItems);

    return () => {
      root.dispose();
    };
  }, [
    totalNuevoIngreso,
    totalRegulares,
    totalEgresados,
    totalReincorporados,
    totalNoInscritos,
  ]);

  // Motivos Charts

  useLayoutEffect(() => {
    let root = am5.Root.new("chartMotivos");
    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push( 
      am5percent.PieChart.new(root, {
        layout: root.verticalHorizontal
      }) 
    );

    // Create series
    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Motivo de Ingreso",
        valueField: "count",
        categoryField: "motivo_ingreso"
      })
    );
    series.data.setAll(motivos);

    // Add legend
    let legend = chart.children.push(am5.Legend.new(root, {
      centerX: am5.percent(50),
      x: am5.percent(50),
      layout: root.horizontalLayout
    }));

    legend.data.setAll(series.dataItems);

    return () => {
      root.dispose();
    };
  }, [motivos]);

  return (
    <div>
      <Container>
        <Header>
          <NavHeader aditionalClass={"fixed"}></NavHeader>
        </Header>
      </Container>
      <Container>
        <Content className="bg-slate-200 dark:bg-Dark-Desaturated-Blue">
          <div className="mt-16 mx-6 inline-flex">
            <h1 className="text-xl tracking-wide flex text-slate-700 justify-center dark:text-Desaturated-Blue">
              Dashboard
            </h1>
          </div>
          <div className="mx-6 my-4">
            <div className="flex flex-wrap gap-4 justify-center mb-4">
              <Card
                title={"Estudiantes Egresados"}
                quantity={totalEgresados}
              ></Card>
              <Card
                title={"Estudiantes Regulares"}
                quantity={totalRegulares}
              ></Card>
              <Card
                title={"Estudiantes Nuevo Ingreso"}
                quantity={totalNuevoIngreso}
              ></Card>
              <Card
                title={"Estudiantes Reincorporados"}
                quantity={totalReincorporados}
              ></Card>
              <Card
                title={"Estudiantes No Inscritos"}
                quantity={totalNoInscritos}
              ></Card>
              <Card
                title={"Estudiantes Extensión"}
                quantity={totalExtension}
              ></Card>
            </div>
            <div className="flex flex-wrap gap-5 justify-center">
              <div className="bg-white shadow-md rounded-md w-[47%] p-4">
                <h1 className="text-center text-xl mb-4 font-medium text-slate-700">
                  Estudiantes por Tipo
                </h1>
                <div
                  className="my-5"
                  id="chartEstudiantes"
                  style={{ width: "100%", height: "300px" }}
                ></div>
              </div>
              <div className="bg-white shadow-md rounded-md w-[47%] p-4">
                <h1 className="text-center text-xl mb-4 font-medium text-slate-700">
                  Estudiantes por Carrera
                </h1>
                <div
                  id="chartCarreras"
                  style={{ width: "100%", height: "300px" }}
                ></div>
              </div>
              <div className="bg-white shadow-md rounded-md w-[47%] p-4">
                <h1 className="text-center text-xl mb-4 font-medium text-slate-700">
                  Estudiantes por Turno
                </h1>
                <div
                  className="my-5"
                  id="chartTurnos"
                  style={{ width: "100%", height: "300px" }}
                ></div>
              </div>
              <div className="bg-white shadow-md rounded-md w-[47%] p-4">
                <h1 className="text-center text-xl mb-4 font-medium text-slate-700">
                  Estudiantes por Período
                </h1>
                <div
                  className="my-5"
                  id="chartLapsos"
                  style={{ width: "100%", height: "300px" }}
                ></div>
              </div>
              <div className="bg-white shadow-md rounded-md w-[47%] p-4">
                <h1 className="text-center text-xl mb-4 font-medium text-slate-700">
                  Estudiantes por Genero
                </h1>
                <div
                  className="my-5"
                  id="chartGeneros"
                  style={{ width: "100%", height: "300px" }}
                ></div>
              </div>
              <div className="bg-white shadow-md rounded-md w-[47%] p-4">
                <h1 className="text-center text-xl mb-4 font-medium text-slate-700">
                  Motivo de Ingreso
                </h1>
                <div
                  className="my-5"
                  id="chartMotivos"
                  style={{ width: "100%", height: "300px" }}
                ></div>
              </div>
            </div>
          </div>
        </Content>
        <Footer></Footer>
      </Container>
    </div>
  );
}
