"use client";
import { apiRestDelete, apiRestGet } from "@/services/services";
import { useEffect, useState } from "react";
import StyleInventario from "styles/inventario.module.css";
import swal from "sweetalert";
import { AiOutlineEye } from "react-icons/ai";
import LoadingSpinner from "@/components/loading";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Reportes() {
  const [loading, setLoading] = useState(true);
  const [isBarModalOpen, setIsBarModalOpen] = useState(false);
  const [isPieModalOpen, setIsPieModalOpen] = useState(false);

  // Funciones para abrir y cerrar el modal del gráfico de barras
  const openBarModal = () => {
    setIsBarModalOpen(true);
  };

  const closeBarModal = () => {
    setIsBarModalOpen(false);
  };

  // Funciones para abrir y cerrar el modal del gráfico de pie
  const openPieModal = () => {
    setIsPieModalOpen(true);
  };

  const closePieModal = () => {
    setIsPieModalOpen(false);
  };

  useEffect(() => {
    setLoading(false);
  }, []);


  const [mesActual, setMesActual] = useState('');

  useEffect(() => {
    async function fetchMesActual() {
      try {
        // Obtener el mes actual
        const fechaActual = new Date();
        const nombreMes = fechaActual.toLocaleString("default", {
          month: "long",
        });
        setMesActual(nombreMes);
      } catch (error) {
        console.error("Error al obtener el mes actual:", error);
      }
    }
    fetchMesActual()
  });

  const [planesVendidosPorMes, setPlanesVendidosPorMes] = useState([]);

  useEffect(() => {
    const fetchPlanesVendidosPorMes = async () => {
      try {
        const res = await apiRestGet("/cantidad-planes-vendidos-por-mes");
        console.log(res);
        setPlanesVendidosPorMes(res.cantidad_planes_vendidos);
      } catch (error) {
        console.error(
          "Error al obtener la cantidad de planes vendidos por mes:",
          error
        );
      }
    };

    fetchPlanesVendidosPorMes();
  }, []);

  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    async function fetchRegistros() {
      try {
        const res = await apiRestGet("ganancia/");
        setRegistros(res.registros_ganancia);
        console.log(res.registros_ganancia);
      } catch (error) {
        console.error("Error al obtener los registros de ganancia:", error);
      }
    }

    fetchRegistros();
  }, []);

  const optionsBar = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Graficos de la gestion de los planes",
      },
    },
  };

  const optionsPie = {
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
      },
      title: {
        display: true,
        text: "Graficos de los ingresos",
      },
    },
  };

  const labels: string[] = [];
  const cantidad: string[] = [];

  planesVendidosPorMes.map((planVendido: any) => {
    labels.push(planVendido.plan);
    cantidad.push(planVendido.cantidad);
  });

  const dataBar = {
    labels,
    datasets: [
      {
        label: mesActual,
        data: cantidad,
        backgroundColor: "rgba(0, 99, 132, 0.5)",
      },
    ],
  };

  const ingresos: string[] = [];
  const mes: string[] = [];

  registros.map((reg: any) => {
    ingresos.push(reg.ganancia_mensual);
    ingresos.push(reg.gasto_mensual);
    mes.push(reg.fecha);
  });

  console.log(ingresos);

  const dataPie = {
    labels: [`Ingresos`, `Perdidas`],
    datasets: [
      {
        label: "Valor por mes",
        data: [ingresos[0], ingresos[1]],
        backgroundColor: ["rgba(0, 99, 132, 0.5)", "rgba(0, 0, 50, 0.5)"],
        borderColor: ["rgba(0, 99, 132, 1)", "rgba(0, 0, 50, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className={StyleInventario.container}>
          <div className={StyleInventario.menu}>
            <a href={"/inventario/articulos"} className={StyleInventario.links}>
              Articulos
            </a>
            <a href={"/inventario/reportes"} className={StyleInventario.links}>
              Reportes
            </a>
            <a href={"/inventario/detalles"} className={StyleInventario.links}>
              Detalles
            </a>
          </div>
          <div className={StyleInventario.contenido}>
            <h3 className={StyleInventario.title}>Reporte mensual</h3>
            <div className={StyleInventario.scrollReportes}>
              <div
                className={`${StyleInventario.bar} ${isMobile ? "hidden" : ""}`}
              >
                <Bar data={dataBar} options={optionsBar} />
              </div>
              <div
                className={`${StyleInventario.pie} ${isMobile ? "hidden" : ""}`}
              >
                <Pie data={dataPie} options={optionsPie} />
              </div>
              {/* Botones para abrir los modales en dispositivos móviles */}
              <div className="block sm:hidden ">
                <button
                  className="bg-transparent backdrop-blur text-white font-bold py-2 px-4 rounded p-2"
                  onClick={openBarModal}
                >
                  Abrir modal de gráfico de los planes
                </button>
                <button
                  className="bg-transparent backdrop-blur text-white font-bold py-2 px-4 rounded p-2"
                  onClick={openPieModal}
                >
                  Abrir modal de gráfico de los ingresos
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal del gráfico de barras */}
      {isBarModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={closeBarModal}
        >
          <div
            className="bg-white p-8 max-w-sm rounded shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4">
              <Bar data={dataBar} options={optionsBar} />
            </div>
          </div>
        </div>
      )}

      {/* Modal del gráfico de pie */}
      {isPieModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={closePieModal}
        >
          <div
            className="bg-white p-8 max-w-sm rounded shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4">
              <Pie data={dataPie} options={optionsPie} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
