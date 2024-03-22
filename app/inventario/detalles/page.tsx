'use client';
import { apiRestDelete, apiRestGet } from '@/services/services'
import { useEffect, useState } from 'react'
import StyleInventario from 'styles/inventario.module.css'
import swal from 'sweetalert'
import { AiOutlineEye } from "react-icons/ai";
import LoadingSpinner from '@/components/loading';
import classNames from 'classnames';


export default function Detalles(){

  const [loading, setLoading] = useState(true);


  useEffect(() => {
      setLoading(false);
  }, []);


  const [registros, setRegistros] = useState([])
  
  useEffect(() => {
    async function fetchRegistros() {
      try {
        const res = await apiRestGet('ganancia/');
        setRegistros(res.registros_ganancia)
      } catch (error) {
        console.error('Error al obtener los registros de ganancia:', error);
      }
    }

    fetchRegistros();
  }, []);

  const totalMensual = registros.reduce((total, registro:any) => {
    return total + parseFloat(registro.total_mensual);
  }, 0);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className={StyleInventario.container}>
          <div className={StyleInventario.menu}>
            <a href="/inventario/articulos" className={StyleInventario.links}>Articulos</a>
            <a href="/inventario/reportes" className={StyleInventario.links}>Reportes</a>
            <a href="/inventario/detalles" className={classNames(StyleInventario.links, StyleInventario.active)}>Detalles</a>
          </div>
          <div className={classNames(StyleInventario.contenido, StyleInventario.contenidoDetalles)}>
            <h3 className={StyleInventario.title}>Detalles</h3>
            <div className={StyleInventario.containerDetalles}>
              <div className={StyleInventario.detallesGenerales}>
                <div className={StyleInventario.tablaContainer}>
                  <table className={StyleInventario.tablaRegistros}>
                    <thead>
                      <tr>
                        <th className={StyleInventario.titulosTabla}>Fecha</th>
                        <th className={StyleInventario.titulosTabla}>Ganancia Diaria</th>
                        <th className={StyleInventario.titulosTabla}>Gasto Diario</th>
                        <th className={StyleInventario.titulosTabla}>Ganancia Mensual</th>
                        <th className={StyleInventario.titulosTabla}>Gasto Mensual</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registros.map((registro:any) => (
                        <tr key={registro.fecha}>
                          <td className={StyleInventario.atributosTabla}>{registro.fecha}</td>
                          <td className={StyleInventario.atributosTabla}>${registro.ganancia_diaria}</td>
                          <td className={StyleInventario.atributosTabla}>${registro.gasto_diario}</td>
                          <td className={StyleInventario.atributosTabla}>${registro.ganancia_mensual}</td>
                          <td className={StyleInventario.atributosTabla}>${registro.gasto_mensual}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className={StyleInventario.total}>
                      <h1 className={StyleInventario.h1Total}><b>Total Mensual</b></h1>
                      <div>
                        <h2>{totalMensual}</h2>
                      </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
