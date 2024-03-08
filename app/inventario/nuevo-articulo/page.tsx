'use client';
import { apiRestPost } from '@/services/services';
import { useEffect, useState } from 'react';
import NuevoArticuloStyle from 'styles/nuevo-articulo.module.css';
import Image from 'next/image'
import swal from 'sweetalert'
import LoadingSpinner from '@/components/loading';

export default function CrearArticulo() {

  const [loading, setLoading] = useState(true);


  useEffect(() => {
      setLoading(false);
  }, []);

    const [formData, setFormData] = useState({
      nombre: '',
      descripcion: '',
      precio: '',
      cantidad_disponible: '',
    });
  
    const handleChange = (e:any) => {
      const {name, value} = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleSubmit = async (e:any) => {
      e.preventDefault();

      const confirmarRegistro = await swal({
        title: '¿Estás seguro?',
        text: 'Esta acción registra un nuevo articulo',
        icon: 'warning',
        buttons: ['Cancelar', 'Aceptar'],
        dangerMode: false,
      });

      if (confirmarRegistro){
        try {
          const response = await apiRestPost('/crear_articulo/', formData);
          console.log(response)
          if (response.success) {
            // En caso de éxito, muestra el SweetAlert
            swal({
                title: '¡Éxito!',
                text: 'Articulo creado correctamente.',
                icon: 'success',
            }).then(() => {
                window.location.href = '/inventario'
            });
          } else {
              // En caso de error, muestra el SweetAlert con el mensaje de error
              swal({
                  title: 'Error',
                  text: 'Error al registrar nuevo articulo. Verifica los campos e inténtalo de nuevo.',
                  icon: 'error',
              });
              console.log('Error al registrar nuevo articulo:', response.errors)

          }
        } catch (error) {
            console.error('Error al registrar nuevo articulo:', error);
            // Muestra SweetAlert para indicar un error inesperado
            swal({
                title: 'Error',
                text: 'Error inesperado al intentar registrar el nuevo articulo. Inténtalo de nuevo más tarde.',
                icon: 'error',
            });
        }
      } else{
        swal('Cancelado', 'El registro ha sido cancelado', 'info');
      }

      console.log(formData)
    }
  
    return (
      <>
        {
          loading ? <LoadingSpinner /> : (
            <div className={NuevoArticuloStyle.general}>
              <div className={NuevoArticuloStyle.container1}>
                <h1 className={NuevoArticuloStyle.title}>Registrar articulo</h1>
                <Image src='/banner-nuevo-articulo.png' width={300} height={300} alt="banner-nuevo-articulo.png" />
              </div>
              <div className={NuevoArticuloStyle.container2}>
                <form onSubmit={handleSubmit} className={NuevoArticuloStyle.formulario}>
                  <div className={NuevoArticuloStyle.inputs}>
                    <label htmlFor="nombre">Nombre:</label>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required/>
                  </div>
                  <div className={NuevoArticuloStyle.textarea}>
                    <label htmlFor="descripcion">Descripcion:</label>
                    <textarea maxLength={100} name="descripcion" value={formData.descripcion} onChange={handleChange} required/>
                  </div>
                  <div className={NuevoArticuloStyle.inputs}>
                    <label htmlFor="precio">Precio:</label>
                    <input type="number" name="precio" value={formData.precio} onChange={handleChange}  required/>
                  </div>
                  <div className={NuevoArticuloStyle.inputs}>
                    <label htmlFor="cantidad_disponible">Cantidad disponible</label>
                    <input type="number" name="cantidad_disponible" value={formData.cantidad_disponible} onChange={handleChange} required/>
                  </div>
                  <div className={NuevoArticuloStyle.buttons}>
                    <a className={NuevoArticuloStyle.volver} href="/inventario">Volver</a>
                    <button type="submit" className={NuevoArticuloStyle.registrarNuevo}>
                      Registrar nuevo articulo
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )
        }
      </>
    );
  }
  