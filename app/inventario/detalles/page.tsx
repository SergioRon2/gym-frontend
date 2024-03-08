'use client';
import { apiRestDelete, apiRestGet } from '@/services/services'
import { useEffect, useState } from 'react'
import StyleArticulos from 'styles/inventario.module.css'
import swal from 'sweetalert'
import { AiOutlineEye } from "react-icons/ai";
import LoadingSpinner from '@/components/loading';


export default function Inventario(){

  const [loading, setLoading] = useState(true);


  useEffect(() => {
      setLoading(false);
  }, []);
  
  const [articulos, setArticulos] = useState([])

  useEffect(() => {
    const datosArticulos = async () => {
      const res = await apiRestGet('articulos');
      setArticulos(res.articulos);
      console.log(res.articulos)
    }

    datosArticulos()
  }, [])



  // ------------------------- ACTUALIZAR ARTICULO --------------------------------


  const actualizarArticulo = async (itemId: any) => {
    // Redirige a la página de actualización con la ID como parámetro
    window.location.href = `/inventario/actualizar-articulo?id=${itemId}`;
  }


  // ------------------------- DETALLES DEL ARTICULO --------------------------------

  const detallesArticulo = async (itemId:any) => {
    try {
      const res = await apiRestGet(`detalle_articulo/${itemId}`);
      console.log(res)
      swal({
        title: `Detalles del articulo: ${res.nombre}`,
        text: `ID: ${res.id}\nDescripcion: ${res.descripcion}\nPrecio: $${res.precio}\nCantidad: ${res.cantidad_disponible}`,
        icon: 'info',
      });
    } catch (error) {
      // Manejar errores en la solicitud API
      console.error('Error al obtener detalles del articulo:', error);
      swal('Error', 'Hubo un problema al obtener detalles del Articulo', 'error');
    }
  };


  // ------------------------- ELIMINAR ARTICULO --------------------------------



  // Función para manejar la eliminación del articulo
  const eliminarArticulo = async (itemId: number) => {
    // Mostrar una SweetAlert de confirmación
    const confirmDelete = await swal({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      buttons: ['Cancelar', 'Sí, eliminar'],
      dangerMode: true,
    });

    // Verificar si el articulo confirmó la eliminación
    if (confirmDelete) {
      try {
        // Realizar la solicitud DELETE a la API
        const response = await apiRestDelete(`eliminar_articulo/${itemId}`);
        console.log(response)

        // Verificar si la eliminación fue exitosa
        if (response.success) {
          // La eliminación fue exitosa, mostrar SweetAlert de éxito
          swal({
            title:'Éxito',
            text: response.mensaje,
            icon: 'success',
          }).then(function(){
            window.location.href = '/inventario'
          });
        } else {
          // La eliminación falló, mostrar SweetAlert de error
          swal('Error', response.mensaje, 'error');
        }
      } catch (error:any) {
        // Manejar errores de la solicitud DELETE, si es necesario
        console.error('Error al eliminar el articulo:', error);
  
        // Mostrar SweetAlert de error con el mensaje adecuado
        swal('Error', error, 'error');
      }
    } 
  };



  return <>
          {
            loading ? <LoadingSpinner/> : (
              <div className={StyleArticulos.container}>
                <div className={StyleArticulos.menu}>
                  <a href={"/inventario/articulos"} className={StyleArticulos.links}>Articulos</a>
                  <a href={"/inventario/reportes"} className={StyleArticulos.links}>Reportes</a>
                  <a href={"/inventario/detalles"} className={StyleArticulos.links}>Detalles</a>
                </div>
                <div className={StyleArticulos.contenido}>
                  <h3 className={StyleArticulos.title}>Articulos</h3>
                  <div className={StyleArticulos.nuevoArticulo}>
                    <a href={'/nuevo-articulo'}>+ Nuevo articulo</a> 
                  </div>
                  <div className={StyleArticulos.titulos}>
                    <h2>Nombre del articulo</h2>
                    <h2>Opciones</h2>
                  </div>
                  <div className={StyleArticulos.scrollArticulos}>
                  {/* {articulos.length > 0 ? (
                    articulos.map((item:any, index:any) => (
                      <div className={StyleArticulos.card} key={index}>
                        <h2>{item.nombre}</h2>
                        <div className={StyleArticulos.buttons}>
                          <button onClick={() => {detallesArticulo(item.id)}} className={StyleArticulos.buttonBlue}>Ver</button>
                          <button onClick={() => {actualizarArticulo(item.id)}} className={StyleArticulos.buttonGreen}>Actualizar</button>
                          <button onClick={() => {eliminarArticulo(item.id)}} className={StyleArticulos.buttonRed}>Eliminar</button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className={StyleArticulos.h2}>
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
