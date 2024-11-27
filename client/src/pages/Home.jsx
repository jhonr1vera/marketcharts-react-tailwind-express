import React, { useState, useEffect, useLayoutEffect } from "react";
import NavHeader from "../components/NavHeader";
import Footer from "../components/Footer";
import Card from "../components/Card";
import InfoCard from "../components/InfoCard";
import SocialMediaCard from "../components/SocialMediaCard";
import { Container, Header, Content } from "rsuite";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import logo from "../assets/Logo_ISUM.png";
import logo_ceu from "../assets/Logo_isum_ceu.png";
import sheetIcon from "../assets/sheetIcon.svg";
import chartIcon from "../assets/chartIcon.svg";
// Amcharts
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { errorGenerate } from "../components/SwalFunctions";

export default function Home() {
  // actual date
  let opcionesFecha = { year: "numeric", month: "short", day: "numeric" };
  let fecha = new Date()
    .toLocaleDateString("es", opcionesFecha)
    .replace(/ /g, "-")
    .replace(".", "")
    .replace(/-([a-z])/, function (x) {
      return "-" + x[1].toUpperCase();
    });

  // export dashboard data
  useEffect(() => {
    const button = document.getElementById("reportImage");
    const handleClick = () => {
      const element = document.getElementById("printReport");
      const infoCard = document.getElementById("infoCard");

      infoCard.style.display = "none";
  
      html2canvas(element, { 
        scale: 2, 
        logging: true, 
        ignoreElements: (node) => node.id === "infoCard",
       }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imgData;
        link.download = `informe-${fecha}.png`;
        link.click();
  
        infoCard.style.display = "block";
      });
    };
  
    if (button) {
      button.addEventListener("click", handleClick);
    }
  
    return () => {
      if (button) {
        button.removeEventListener("click", handleClick);
      }
    };
  }, []);

  // export written report

  const handleReportDownload = async () => {
    try {
      const studentsType = document.getElementById("chartEstudiantes");
      const studentCareer = document.getElementById("chartCarreras");
      const studentCDayShift = document.getElementById("chartTurnos");
      const studentGender = document.getElementById("chartGeneros");
      const studentPeriod = document.getElementById("chartLapsos");
      const studentMotive = document.getElementById("chartMotivos");

      // Generar canvas con html2canvas
      const canvasType = await html2canvas(studentsType);
      const canvasCareer = await html2canvas(studentCareer);
      const canvasDayShift = await html2canvas(studentCDayShift);
      const canvasGender = await html2canvas(studentGender);
      const canvasPeriod = await html2canvas(studentPeriod);
      const canvasMotive = await html2canvas(studentMotive);

      // Convertir canvas a imágenes base64
      const imgStudentsType = canvasType.toDataURL("image/png");
      const imgStudentCareer = canvasCareer.toDataURL("image/png");
      const imgStudentDayShift = canvasDayShift.toDataURL("image/png");
      const imgStudentGender = canvasGender.toDataURL("image/png");
      const imgStudentPeriod = canvasPeriod.toDataURL("image/png");
      const imgStudentMotive = canvasMotive.toDataURL("image/png");

      // Crear el documento PDF
      const doc = new jsPDF({
        format: "a4",
      });

      doc.setProperties({
        title: "Informe general del ISUM",
        subject: "",
        author: "ISUM",
        keywords: "PDF, JavaScript",
        creator: "jsPDF",
      });

      // TotalStudents
      const studentTypeSum =
        totalNoInscritos +
        totalEgresados +
        totalNuevoIngreso +
        totalRegulares +
        totalReincorporados;

      // Career
      const informaticaData = carrerasCount.find(
        (item) => item.carrera === "Informática"
      ) ?? { count: 0 };

      const gestionFiscalData = carrerasCount.find(
        (item) => item.carrera === "Gestión Fiscal y Tributaria"
      ) ?? { count: 0 };

      const administracionData = carrerasCount.find(
        (item) => item.carrera === "Administración"
      ) ?? { count: 0 };

      const mercadeoData = carrerasCount.find(
        (item) => item.carrera === "Mercadeo"
      ) ?? { count: 0 };

      // DayShift
      const diurnoData = turnosCount.find(
        (item) => item.turno === "Diurno"
      ) ?? { count: 0 };

      const nocturnoData = turnosCount.find(
        (item) => item.turno === "Nocturno"
      ) ?? { count: 0 };

      // Gender
      const masculinoData = generos.find(
        (item) => item.sexo === "M"
      ) ?? { count: 0 };

      const femeninoData = generos.find(
        (item) => item.sexo === "F"
      ) ?? { count: 0 };

      // Period
      const firstLapso = lapsosCount.find(
        (item) => item.lapso === 1
      ) ?? { count: 0 };

      const secondLapso = lapsosCount.find(
        (item) => item.lapso === 2
      ) ?? { count: 0 };

      const thirdLapso = lapsosCount.find(
        (item) => item.lapso === 3
      ) ?? { count: 0 };

      const fourthLapso = lapsosCount.find(
        (item) => item.lapso === 4
      ) ?? { count: 0 };

      const fifthLapso = lapsosCount.find(
        (item) => item.lapso === 5
      ) ?? { count: 0 };

      const sixthLapso = lapsosCount.find(
        (item) => item.lapso === 6
      ) ?? { count: 0 };

      // Motive
      const colegioMotive = motivos.find(
        (item) => item.motivo_ingreso === "Colegio"
      ) ?? { count: 0 };

      const panfletoMotive = motivos.find(
        (item) => item.motivo_ingreso === "Panfletos"
      ) ?? { count: 0 };

      const redesSocialMotive = motivos.find(
        (item) => item.motivo_ingreso === "Redes Sociales"
      ) ?? { count: 0 };

      const pagWebMotive = motivos.find(
        (item) => item.motivo_ingreso === "Pagina Web"
      ) ?? { count: 0 };

      // Añadir contenido al PDF
      doc.setFontSize(18);
      doc.text("Informe", 32, 30, { align: "center" });

      doc.setFontSize(12);
      doc.text(
        20,
        45,
        "En este informe, se presentan los resultados del análisis de datos realizado sobre los estu-"
      );
      doc.text(
        20,
        55,
        "diantes del ISUM. El objetivo principal es proporcionar una visión clara y entendible de los "
      );
      doc.text(
        20,
        65,
        "datos a través de gráficos y visualizaciones que faciliten la interpretación de la información."
      );
      doc.text(
        "Para llevar a cabo este análisis, se utilizaron diversas técnicas de procesamiento y visuali-",
        20,
        80
      );
      doc.text(
        "zación de datos. Los datos fueron recopilados de Control de estudios y se procesaron utili-",
        20,
        90
      );
      doc.text(
        "zando el sistema MarketCharts. A continuación, se presentan los gráficos más relevantes",
        20,
        100
      );
      doc.text("que ilustran los hallazgos clave del análisis.", 20, 110);

      // First Chart
      doc.text("1.", 20, 120);
      doc.addImage(imgStudentsType, "PNG", 20, 125, 165, 85);
      doc.text(
        "El primer grafico muestra la cantidad de estudiantes según el tipo de estudiante, lo que",
        20,
        220
      );
      doc.text("deja en evidencia que:", 20, 230);
      doc.text(
        `Del 100% de los estudiantes, que representa en enteros: ${studentTypeSum}, se clasifican en:`,
        20,
        240
      );
      doc.text(
        `${((totalNoInscritos / studentTypeSum) * 100).toFixed(
          2
        )}% son No Inscritos (${totalNoInscritos} en enteros)`,
        20,
        250
      );
      doc.text(
        `${((totalRegulares / studentTypeSum) * 100).toFixed(
          2
        )}% son Regulares (${totalRegulares} en enteros)`,
        20,
        260
      );
      doc.text(
        `${((totalEgresados / studentTypeSum) * 100).toFixed(
          2
        )}% son Egresados (${totalEgresados} en enteros)`,
        20,
        270
      );
      doc.text(
        `${((totalNuevoIngreso / studentTypeSum) * 100).toFixed(
          2
        )}% son Nuevo Ingreso (${totalNuevoIngreso} en enteros)`,
        20,
        280
      );

      doc.addPage();
      // Second Chart
      doc.text(
        `${((totalReincorporados / studentTypeSum) * 100).toFixed(
          2
        )}% son Reincorporados, en (${totalReincorporados} en enteros)`,
        20,
        30
      );
      doc.text(20, 40, "2.");
      doc.addImage(imgStudentCareer, "PNG", 20, 50, 165, 85);
      doc.text(
        "El segundo grafico muestra la cantidad de estudiantes ACTIVOS según la carrera que ",
        20,
        150
      );
      doc.text("estudian, lo que deja en evidencia que:", 20, 160);
      doc.text(
        `Del 100% de los estudiantes activos, que representan en enteros: ${activeStudents}, se clasifican en:`,
        20,
        170
      );
      doc.text(
        `${((informaticaData.count / activeStudents) * 100).toFixed(
          2
        )}% son Informática (${informaticaData.count} en enteros)`,
        20,
        180
      );
      doc.text(
        `${((gestionFiscalData.count / activeStudents) * 100).toFixed(
          2
        )}% son Gestión Fiscal y Tributaria (${
          gestionFiscalData.count
        } en enteros)`,
        20,
        190
      );
      doc.text(
        `${((administracionData.count / activeStudents) * 100).toFixed(
          2
        )}% son Administración (${administracionData.count} en enteros)`,
        20,
        200
      );
      doc.text(
        `${((mercadeoData.count / activeStudents) * 100).toFixed(
          2
        )}% son Mercadeo (${mercadeoData.count} en enteros)`,
        20,
        210
      );

      doc.addPage();
      // Third Chart
      doc.text(20, 30, "3.");
      doc.addImage(imgStudentDayShift, "PNG", 20, 40, 165, 80);
      doc.text(
        "El segundo grafico muestra la cantidad de estudiantes ACTIVOS según el turno en el",
        20,
        140
      );
      doc.text("que estudian, lo que deja en evidencia que:", 20, 150);
      doc.text(
        `Del 100% de los estudiantes activos, que representan en enteros: ${activeStudents}, se clasifican en:`,
        20,
        160
      );
      doc.text(
        `${((diurnoData.count / activeStudents) * 100).toFixed(
          2
        )}% son Diurno (${diurnoData.count} en enteros)`,
        20,
        170
      );
      doc.text(
        `${((nocturnoData.count / activeStudents) * 100).toFixed(
          2
        )}% son Nocturno (${nocturnoData.count} en enteros)`,
        20,
        180
      );

      doc.addPage();
      // Fourth Chart
      doc.text(20, 30, "4.");
      doc.addImage(imgStudentGender, "PNG", 20, 40, 165, 80);
      doc.text(
        "El cuarto grafico muestra la cantidad de estudiantes ACTIVOS según su genero, lo que ",
        20,
        140
      );
      doc.text("deja en evidencia que:", 20, 150);
      doc.text(
        `Del 100% de los estudiantes activos, que representan en enteros: ${activeStudents}, se clasifican en:`,
        20,
        160
      );
      doc.text(
        `${((masculinoData.count / activeStudents) * 100).toFixed(
          2
        )}% son Masculino (${masculinoData.count} en enteros)`,
        20,
        170
      );
      doc.text(
        `${((femeninoData.count / activeStudents) * 100).toFixed(
          2
        )}% son Femenino (${femeninoData.count} en enteros)`,
        20,
        180
      );

      doc.addPage();
      // Fifth Chart
      doc.text(20, 30, "5.");
      doc.addImage(imgStudentPeriod, "PNG", 20, 40, 165, 80);
      doc.text(
        "El cuarto grafico muestra la cantidad de estudiantes REGULARES según el periodo que ",
        20,
        140
      );
      doc.text("cursan, lo que deja en evidencia que:", 20, 150);
      doc.text(
        `Del 100% de los estudiantes regulares, que representan en enteros: ${totalRegulares}, se clasifican en:`,
        20,
        160
      );
      doc.text(
        `${((firstLapso.count / totalRegulares) * 100).toFixed(
          2
        )}% son de Primer Período (${firstLapso.count} en enteros)`,
        20,
        170
      );
      doc.text(
        `${((secondLapso.count / totalRegulares) * 100).toFixed(
          2
        )}% son de Segundo Período (${secondLapso.count} en enteros)`,
        20,
        180
      );
      doc.text(
        `${((thirdLapso.count / totalRegulares) * 100).toFixed(
          2
        )}% son de Tercer Período (${thirdLapso.count} en enteros)`,
        20,
        190
      );
      doc.text(
        `${((fourthLapso.count / totalRegulares) * 100).toFixed(
          2
        )}% son de Cuarto Período (${fourthLapso.count} en enteros)`,
        20,
        200
      );
      doc.text(
        `${((fifthLapso.count / totalRegulares) * 100).toFixed(
          2
        )}% son de Quinto Período (${fifthLapso.count} en enteros)`,
        20,
        210
      );
      doc.text(
        `${((sixthLapso.count / totalRegulares) * 100).toFixed(
          2
        )}% son de Sexto Período (${sixthLapso.count} en enteros)`,
        20,
        220
      );

      doc.addPage();
      // Sixth Chart
      doc.text(20, 30, "6.");
      doc.addImage(imgStudentMotive, "PNG", 20, 40, 165, 90);
      doc.text(
        "El sexto grafico muestra la cantidad de estudiantes NUEVO INGRESO segun el motivo de",
        20,
        140
      );
      doc.text("ingreso, lo que deja en evidencia que:", 20, 150);
      doc.text(
        `Del 100% de los estudiantes regulares, que representan en enteros: ${totalRegulares}, se clasifican en:`,
        20,
        160
      );
      doc.text(
        `${((panfletoMotive.count / totalNuevoIngreso) * 100).toFixed(
          2
        )}% son por Panfleto (${panfletoMotive.count} en enteros)`,
        20,
        170
      );
      doc.text(
        `${((colegioMotive.count / totalNuevoIngreso) * 100).toFixed(
          2
        )}% son por Colegio (${colegioMotive.count} en enteros)`,
        20,
        180
      );
      doc.text(
        `${((redesSocialMotive.count / totalNuevoIngreso) * 100).toFixed(
          2
        )}% son por Redes Sociales (${redesSocialMotive.count} en enteros)`,
        20,
        190
      );
      doc.text(
        `${((pagWebMotive.count / totalNuevoIngreso) * 100).toFixed(
          2
        )}% son por Página Web (${pagWebMotive.count} en enteros)`,
        20,
        200
      );
      // doc.text(`${((otrosMotive.count / totalNuevoIngreso) * 100).toFixed(2)}% son por otros motivos (${otrosMotive.count} en enteros)`, 20, 210);

      doc.save(`Informe_general-${fecha}.pdf`);
    } catch (error) {
      console.error("Error al generar el PDF:", error);
      errorGenerate();
    }
  };

  // Conteos
  const [totalNoInscritos, setTotalNoInscritos] = useState(0);
  const [totalNuevoIngreso, setTotalNuevoIngreso] = useState(0);
  const [totalRegulares, setTotalRegulares] = useState(0);
  const [totalReincorporados, setTotalReincorporados] = useState(0);
  const [totalEgresados, setTotalEgresados] = useState(0);
  const [totalExtension, setTotalExtension] = useState(0);
  // activeStudents
  const activeStudents =
    totalReincorporados + totalNuevoIngreso + totalRegulares;

  // Charts
  const [carrerasCount, setCarrerasCount] = useState([]);
  const [lapsosCount, setLapsosCount] = useState([]);
  const [turnosCount, setTurnosCount] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [motivos, setMotivos] = useState([]);
  const [fechas, setFechas] = useState([]);
  const [diplomadosExt, setDiplomadosExt] = useState([]);
  const [generosExt, setGenerosExt] = useState([]);
  const [motivosExt, setMotivosExt] = useState([]);

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
      .catch((err) => console.log(err));
  }, []);

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
          layout: root.verticalLayout,
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
          layout: am5.GridLayout.new(root, {
            maxColumns: 2,
            spacing: 10,
          }),
        })
      );

      legend.labels.template.setAll({
        width: 160,
        truncate: true,
      });

      legend.data.setAll(series.dataItems);

      chart.set("paddingTop", 10);
      chart.set("paddingBottom", 10);
      chart.set("paddingRight", 10);
      chart.set("paddingLeft", 10);

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
        layout: root.verticalLayout,
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
        layout: am5.GridLayout.new(root, {
          maxColumns: 2,
          spacing: 10,
        }),
      })
    );

    legend.labels.template.setAll({
      width: 130,
      truncate: true,
    });

    legend.data.setAll(series.dataItems);

    chart.set("paddingTop", 10);
    chart.set("paddingBottom", 10);
    chart.set("paddingRight", 10);
    chart.set("paddingLeft", 10);

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
        layout: root.verticalLayout,
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
        layout: am5.GridLayout.new(root, {
          maxColumns: 2,
          spacing: 10,
        }),
      })
    );

    legend.labels.template.setAll({
      width: 130,
      truncate: true,
    });

    legend.data.setAll(series.dataItems);

    chart.set("paddingTop", 10);
    chart.set("paddingBottom", 10);
    chart.set("paddingRight", 10);
    chart.set("paddingLeft", 10);

    return () => {
      root.dispose();
    };
  }, [generos]);

  // Tipo Estudiante

  useLayoutEffect(() => {
    let root = am5.Root.new("chartEstudiantes");
    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
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
        layout: am5.GridLayout.new(root, {
          maxColumns: 2,
          spacing: 10,
        }),
      })
    );

    legend.labels.template.setAll({
      width: 130,
      truncate: true,
    });

    legend.data.setAll(series.dataItems);

    chart.set("paddingTop", 10);
    chart.set("paddingBottom", 10);
    chart.set("paddingRight", 10);
    chart.set("paddingLeft", 10);

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
        layout: root.verticalLayout,
      })
    );

    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Motivo de Ingreso",
        valueField: "count",
        categoryField: "motivo_ingreso",
      })
    );
    series.data.setAll(motivos);

    let legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        layout: am5.GridLayout.new(root, {
          maxColumns: 2,
          spacing: 10,
        }),
      })
    );

    legend.labels.template.setAll({
      width: 130,
      truncate: true,
    });

    legend.data.setAll(series.dataItems);

    chart.set("paddingTop", 10);
    chart.set("paddingBottom", 10);
    chart.set("paddingRight", 10);
    chart.set("paddingLeft", 10);

    return () => {
      root.dispose();
    };
  }, [motivos]);

  // Years

  useEffect(() => {
    fetch("http://localhost:5000/api/fecha_egreso")
      .then((res) => res.json())
      .then((data) => {
        setFechas(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useLayoutEffect(() => {
    if (fechas.length === 0) return;

    let root = am5.Root.new("chartEgreso");
    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
      })
    );

    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: "month", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    let series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Egresos",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
        }),
      })
    );

    series.fills.template.setAll({
      visible: true,
      fillOpacity: 0.3,
    });

    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, {
        orientation: "horizontal",
      })
    );

    series.data.setAll(fechas);
    xAxis.data.setAll(fechas);

    series.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [fechas]);

  // Extension Diplomados

  useEffect(() => {
    fetch("http://localhost:5000/api/diplomado_ext")
      .then((res) => res.json())
      .then((data) => {
        setDiplomadosExt(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useLayoutEffect(() => {
    if (
      diplomadosExt.length > 0 &&
      document.getElementById("chartDiplomadoExt")
    ) {
      let root = am5.Root.new("chartDiplomadoExt");

      root.setThemes([am5themes_Animated.new(root)]);

      let chart = root.container.children.push(
        am5percent.PieChart.new(root, {
          layout: root.verticalLayout,
        })
      );

      let series = chart.series.push(
        am5percent.PieSeries.new(root, {
          name: "Carreras",
          valueField: "count",
          categoryField: "diplomado",
        })
      );
      series.data.setAll(diplomadosExt);

      let legend = chart.children.push(
        am5.Legend.new(root, {
          centerX: am5.percent(50),
          x: am5.percent(50),
          layout: am5.GridLayout.new(root, {
            maxColumns: 4,
            spacing: 20,
          }),
        })
      );

      legend.labels.template.setAll({
        width: 220,
        truncate: true,
      });

      legend.data.setAll(series.dataItems);

      chart.set("paddingTop", 10);
      chart.set("paddingBottom", 10);
      chart.set("paddingRight", 10);
      chart.set("paddingLeft", 10);

      return () => {
        root.dispose();
      };
    }
  }, [diplomadosExt]);

  // Extension Generos

  useEffect(() => {
    fetch("http://localhost:5000/api/generos_ext")
      .then((res) => res.json())
      .then((data) => setGenerosExt(data))
      .catch((err) => console.log(err));
  }, []);

  useLayoutEffect(() => {
    let root = am5.Root.new("chartGenerosExt");
    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
      })
    );

    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Generos",
        valueField: "count",
        categoryField: "sexo",
      })
    );
    series.data.setAll(generosExt);

    let legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        layout: am5.GridLayout.new(root, {
          maxColumns: 2,
          spacing: 10,
        }),
      })
    );

    legend.labels.template.setAll({
      width: 130,
      truncate: true,
    });

    legend.data.setAll(series.dataItems);

    chart.set("paddingTop", 10);
    chart.set("paddingBottom", 10);
    chart.set("paddingRight", 10);
    chart.set("paddingLeft", 10);

    return () => {
      root.dispose();
    };
  }, [generosExt]);

  // motivos Extension

  useEffect(() => {
    fetch("http://localhost:5000/api/motivos_extension")
      .then((res) => res.json())
      .then((data) => setMotivosExt(data))
      .catch((err) => console.log(err));
  }, []);

  useLayoutEffect(() => {
    let root = am5.Root.new("chartMotivosExt");
    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
      })
    );

    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Motivo de Ingreso",
        valueField: "count",
        categoryField: "motivo_ingreso",
      })
    );
    series.data.setAll(motivosExt);

    let legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        layout: am5.GridLayout.new(root, {
          maxColumns: 2,
          spacing: 15,
        }),
      })
    );

    legend.labels.template.setAll({
      width: 150,
      truncate: true,
    });

    legend.data.setAll(series.dataItems);

    chart.set("paddingTop", 10);
    chart.set("paddingBottom", 10);
    chart.set("paddingRight", 10);
    chart.set("paddingLeft", 10);

    return () => {
      root.dispose();
    };
  }, [motivosExt]);

  return (
    <div className="">
      <Container>
        <Header>
          <NavHeader aditionalClass={"fixed"}></NavHeader>
        </Header>
      </Container>
      <Container>
        <Content className="bg-slate-200 dark:bg-Dark-Desaturated-Blue">
          <div className="mt-20 px-6 inline-flex items-center justify-between w-[100%]">
            <h1 className="text-xl tracking-wide flex text-slate-700">
              Dashboard
            </h1>
            <div className="inline-flex gap-4">
              <button
                className="text-lg text-white bg-blue-500 rounded-md px-2 py-[0.6rem] flex hover:bg-blue-600 items-center gap-1"
                id="reportImage"
              >
                <img src={chartIcon} alt="" />
                Extraer Dashboard
              </button>
              <button
                className="text-lg text-white bg-blue-500 rounded-md px-2 py-[0.6rem] flex hover:bg-blue-600 items-center gap-1"
                onClick={handleReportDownload}
              >
                {" "}
                <img src={sheetIcon} alt="SheetIcon" />
                Extraer Informe
              </button>
            </div>
          </div>
          <div className="grid mt-2 px-10">
            <h1 className=" text-2xl font-sans text-slate-700 tracking-wide">Redes Sociales</h1> 
            <div className="flex gap-4 flex-wrap justify-center">
              <SocialMediaCard title="Youtube" />
              <SocialMediaCard title="Chill Break"/>
            </div>
          </div>
          <div className="mb-1">
              <h1 className="text-2xl font-sans px-10 text-slate-700 tracking-wide">Estadísticas Generales</h1>
            </div>
          <div className="mx-6 my-4 bg-slate-200" id="printReport">
            <div className="flex flex-wrap gap-4 justify-center mb-4 mt-3">
              <Card
                title={"Estudiantes Egresados"}
                quantity={totalEgresados}
                bgcolor={"bg-white"}
              ></Card>
              <Card
                title={"Estudiantes Regulares"}
                quantity={totalRegulares}
                bgcolor={"bg-white"}
              ></Card>
              <Card
                title={"Estudiantes Nuevo Ingreso"}
                quantity={totalNuevoIngreso}
                bgcolor={"bg-white"}
              ></Card>
              <Card
                title={"Estudiantes Reincorporados"}
                quantity={totalReincorporados}
                bgcolor={"bg-white"}
              ></Card>
              <Card
                title={"Estudiantes No Inscritos"}
                quantity={totalNoInscritos}
                bgcolor={"bg-white"}
              ></Card>
              <Card
                title={"Estudiantes Extensión"}
                quantity={totalExtension}
                bgcolor={"bg-blue-500"}
              ></Card>
              <Card
                title={"Estudiantes Activos"}
                quantity={activeStudents}
                bgcolor={"bg-blue-500"}
              ></Card>
            </div>

            <div className="flex justify-center items-center">
              <h1 className="text-3xl mb-4 h-16 text-slate-700 font-bold flex justify-center">
                <img src={logo} alt="" srcset="" />
              </h1>
              <InfoCard
                style={"translate-y-[-50%]"}
                text={"Instituto Universitario de Mercadotecnia"}
              ></InfoCard>
            </div>

            <div className="flex flex-wrap gap-5 justify-center ">
              <div className="bg-white shadow-md rounded-md w-[47%] p-4">
                <div className="flex justify-center items-center">
                  <h1 className="text-center text-xl mb-4 font-medium text-slate-700">
                    Estudiantes por Tipo
                  </h1>
                  <InfoCard
                    style="ml-3 mb-3"
                    text={
                      "Esta gráfica muestra el porcentaje de estudiantes según su tipo, excluyendo a Extension Universitaria"
                    }
                  ></InfoCard>
                </div>
                <div
                  className="my-5 w-full h-full"
                  id="chartEstudiantes"
                  style={{ width: "100%", height: "500px" }}
                ></div>
              </div>
              <div className="bg-white shadow-md rounded-md w-[47%] p-4">
                <div className="flex justify-center items-center">
                  <h1 className="text-center text-xl mb-4 font-medium text-slate-700">
                    Estudiantes por Carrera
                  </h1>
                  <InfoCard
                    style="ml-3 mb-3"
                    text={
                      "Esta gráfica muestra el porcentaje de estudiantes activos según su carrera"
                    }
                  ></InfoCard>
                </div>
                <div
                  id="chartCarreras"
                  style={{ width: "100%", height: "500px" }}
                ></div>
              </div>
              <div className="bg-white shadow-md rounded-md w-[47%] p-4">
                <div className="flex justify-center items-center">
                  <h1 className="text-center text-xl mb-4 font-medium text-slate-700">
                    Estudiantes por Turno
                  </h1>
                  <InfoCard
                    style="ml-3 mb-3"
                    text={
                      "Esta gráfica muestra el porcentaje de estudiantes activos según su turno de estudio"
                    }
                  ></InfoCard>
                </div>
                <div
                  className="my-5"
                  id="chartTurnos"
                  style={{ width: "100%", height: "440px" }}
                ></div>
              </div>
              <div className="bg-white shadow-md rounded-md w-[47%] p-4">
                <div className="flex justify-center items-center">
                  <h1 className="text-center text-xl mb-4 font-medium text-slate-700">
                    Estudiantes por Período
                  </h1>
                  <InfoCard
                    style="ml-3 mb-3"
                    text={
                      "Esta gráfica muestra el porcentaje de estudiantes regulares según su período"
                    }
                  ></InfoCard>
                </div>
                <div
                  className="my-5"
                  id="chartLapsos"
                  style={{ width: "100%", height: "500px" }}
                ></div>
              </div>
              <div className="bg-white shadow-md rounded-md w-[47%] p-4">
                <div className="flex justify-center items-center">
                  <h1 className="text-center text-xl mb-4 font-medium text-slate-700">
                    Estudiantes por Género
                  </h1>
                  <InfoCard
                    style="ml-3 mb-3"
                    text={
                      "Esta gráfica muestra el porcentaje de estudiantes activos según su género"
                    }
                  ></InfoCard>
                </div>
                <div
                  className="my-5"
                  id="chartGeneros"
                  style={{ width: "100%", height: "440px" }}
                ></div>
              </div>
              <div className="bg-white shadow-md rounded-md w-[47%] p-4">
                <div className="flex justify-center items-center">
                  <h1 className="text-center text-xl mb-4 font-medium text-slate-700">
                    Motivo de Ingreso
                  </h1>
                  <InfoCard
                    style="ml-3 mb-3"
                    text={
                      "Esta gráfica muestra el porcentaje de estudiantes nuevo ingreso según su motivo de ingreso"
                    }
                  ></InfoCard>
                </div>
                <div
                  className="my-5"
                  id="chartMotivos"
                  style={{ width: "100%", height: "500px" }}
                ></div>
              </div>
              <div className="bg-white shadow-md rounded-md w-[95%] p-4">
                <div className="flex justify-center items-center">
                  <h1 className="text-center text-xl mb-4 font-medium text-slate-700">
                    <span className="font-semibold">Histórico:</span> Fechas de
                    Egreso
                  </h1>
                  <InfoCard
                    style="ml-3 mb-3"
                    text={
                      "Este gráfico muestra el crecimiento o decrecimiento de numero de egresados desde la fundacion de la institución"
                    }
                  ></InfoCard>
                </div>

                <div
                  id="chartEgreso"
                  style={{ width: "100%", height: "550px" }}
                ></div>
              </div>

              <div className="flex items-center">
                <h1 className="text-3xl mb-2 h-20 text-slate-700 font-bold w-[100%] flex justify-center">
                  <img src={logo_ceu} alt="" srcset="" />
                </h1>
                <InfoCard
                  style={"translate-y-[-50%]"}
                  text={"Extensión Universitaria"}
                ></InfoCard>
              </div>

              <div className="bg-white shadow-md rounded-md w-[95%] p-4">
                <div className="flex justify-center items-center">
                  <h1 className="text-center text-xl mb-4 font-medium text-slate-700">
                    Estudiantes por Diplomado
                  </h1>
                  <InfoCard
                    style="ml-3 mb-3"
                    text={
                      "Esta gráfica muestra el porcentaje de estudiantes de extensión según el diplomado que cursan"
                    }
                  ></InfoCard>
                </div>
                <div
                  id="chartDiplomadoExt"
                  style={{ width: "100%", height: "450px" }}
                ></div>
              </div>
              <div className="bg-white shadow-md rounded-md w-[47%] p-4">
                <div className="flex justify-center items-center">
                  <h1 className="text-center text-xl mb-4 font-medium text-slate-700">
                    Estudiantes por Genero
                  </h1>
                  <InfoCard
                    style="ml-3 mb-3"
                    text={
                      "Esta gráfica muestra el porcentaje de estudiantes de extensión según su género"
                    }
                  ></InfoCard>
                </div>
                <div
                  className="my-5"
                  id="chartGenerosExt"
                  style={{ width: "100%", height: "440px" }}
                ></div>
              </div>
              <div className="bg-white shadow-md rounded-md w-[47%] p-4">
                <div className="flex justify-center items-center">
                  <h1 className="text-center text-xl mb-4 font-medium text-slate-700">
                    Motivo de Ingreso
                  </h1>
                  <InfoCard
                    style="ml-3 mb-3"
                    text={
                      "Esta gráfica muestra el porcentaje de estudiantes de extension según su motivo de ingreso"
                    }
                  ></InfoCard>
                </div>
                <div
                  className="my-5"
                  id="chartMotivosExt"
                  style={{ width: "100%", height: "500px" }}
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
