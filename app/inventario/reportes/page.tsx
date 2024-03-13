'use client';
import { apiRestDelete, apiRestGet } from '@/services/services'
import { useEffect, useState } from 'react'
import StyleInventario from 'styles/inventario.module.css'
import swal from 'sweetalert'
import { AiOutlineEye } from "react-icons/ai";
import LoadingSpinner from '@/components/loading';
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);


export default function Reportes(){

  const [loading, setLoading] = useState(true);


  useEffect(() => {
      setLoading(false);
  }, []);


  const [planes, setPlanes] = useState([])
  
  useEffect(()=>{
    const fetchPlanes = async() =>{
      const res = await apiRestGet('/planes')
      setPlanes(res.planes_gym)
      console.log(res.planes_gym)
    }
    fetchPlanes()
  }, [])


  const [registros, setRegistros] = useState([])
  
  useEffect(() => {
    async function fetchRegistros() {
      try {
        const res = await apiRestGet('ganancia/');
        setRegistros(res.registros_ganancia)
        console.log(res.registros_ganancia)
      } catch (error) {
        console.error('Error al obtener los registros de ganancia:', error);
      }
    }

    fetchRegistros();
  }, []);


  const optionsBar = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Graficos de la gestion de los planes',
      },
    },
  };
  
  const optionsPie = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Graficos de los ingresos',
      },
    },
  };

  const labels : string[] = []
  const precios : string[] = []
  
  planes.map((plan:any)=>{
    labels.push(plan.tipo_plan)
    precios.push(plan.precio)
  });
  
  const dataBar = {
    labels,
    datasets: [
      {
        label: 'Planes mensuales',
        data: precios,
        backgroundColor: 'rgba(0, 99, 132, 0.5)',
      }
    ],
  };

  const ingresos : string[] = []
  const mes : string[] = []

  registros.map((reg:any)=>{
    ingresos.push(reg.ganancia_mensual)
    ingresos.push(reg.gasto_mensual)
    mes.push(reg.fecha)
  })

  console.log(ingresos)

  const dataPie = {
    labels: [`Ingresos`, `Perdidas`],
    datasets: [
      {
        label: 'Valor por mes',
        data: [ingresos[2], ingresos[3]],
        backgroundColor: [
          'rgba(0, 99, 132, 0.5)',
          'rgba(0, 0, 50, 0.5)',
        ],
        borderColor: [  
          'rgba(0, 99, 132, 1)',
          'rgba(0, 0, 50, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  

  return <>
          {
            loading ? <LoadingSpinner/> : (
              <div className={StyleInventario.container}>
                <div className={StyleInventario.menu}>
                  <a href={"/inventario/articulos"} className={StyleInventario.links}>Articulos</a>
                  <a href={"/inventario/reportes"} className={StyleInventario.links}>Reportes</a>
                  <a href={"/inventario/detalles"} className={StyleInventario.links}>Detalles</a>
                </div>
                <div className={StyleInventario.contenido}>
                  <h3 className={StyleInventario.title}>Reporte mensual</h3>
                  <div className={StyleInventario.scrollReportes}>
                    <div className={StyleInventario.bar}>
                      <Bar data={dataBar} options={optionsBar} />
                    </div>
                    <div className={StyleInventario.reportePlanes}>
                      Hola
                    </div>
                    <div className={StyleInventario.pie}>
                      <Pie data={dataPie} options={optionsPie} />
                    </div>
                    <div className={StyleInventario.reporteIngresos}>
                        <h2 className={StyleInventario.reporteParrafo}>El mes 03/2024 se presento un reporte donde podemos ver que tenemos un total de ingresos de {ingresos[2]} y un total de perdidas de {ingresos[3]}</h2>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
    </>
}
