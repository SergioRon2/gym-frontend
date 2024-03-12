'use client';
import { apiRestDelete, apiRestGet } from '@/services/services'
import { useEffect, useState } from 'react'
import StyleInventario from 'styles/inventario.module.css'
import swal from 'sweetalert'
import { AiOutlineEye } from "react-icons/ai";
import LoadingSpinner from '@/components/loading';



export default function Inventario(){

  const [loading, setLoading] = useState(true);


  useEffect(() => {
      setLoading(false);
  }, []);

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
                  <div className={StyleInventario.nuevoArticulo}>
                    <a href={'/nuevo-articulo'}>+ Nuevo articulo</a> 
                  </div>
                  <div className={StyleInventario.titulos}>
                    <h2>Nombre del articulo</h2>
                    <h2>Opciones</h2>
                  </div>
                  <div className={StyleInventario.scrollArticulos}>
                  {/* {articulos.length > 0 ? (
                    articulos.map((item:any, index:any) => (
                      <div className={StyleInventario.card} key={index}>
                        <h2>{item.nombre}</h2>
                        <div className={StyleInventario.buttons}>
                          <button onClick={() => {detallesArticulo(item.id)}} className={StyleInventario.buttonBlue}>Ver</button>
                          <button onClick={() => {actualizarArticulo(item.id)}} className={StyleInventario.buttonGreen}>Actualizar</button>
                          <button onClick={() => {eliminarArticulo(item.id)}} className={StyleInventario.buttonRed}>Eliminar</button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className={StyleInventario.h2}>
                      <h2>Para crear un articulo, haz clic en <b>Nuevo Articulo</b>.</h2>
                    </div>
                  )}   */}
                  </div>
                </div>
              </div>
            )
          }
    </>
}
