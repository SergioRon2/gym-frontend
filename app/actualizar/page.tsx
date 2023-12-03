'use client';
import { apiRestPut, apiRestGet } from '@/services/services';
import { useState, useEffect } from 'react';
import NuevoStyle from 'styles/actualizar.module.css';
import Image from 'next/image'
import swal from 'sweetalert'
import { useSearchParams } from 'next/navigation'



export default function ActualizarMiembro() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    // Inicializa formData con algunas propiedades iniciales
    const [formData, setFormData] = useState({
      id: '',
      nombre: '',
      apellido: '',
      tipo_id: '',
      id_usuario: '',
      tipo_plan: '',
      fecha_inicio: '',
    });



    // obtener planes

    const [planes, setPlanes] = useState([])

    useEffect(()=>{
      const datosPlanes = async () =>{
        const resPlanes = await apiRestGet('obtener_plan/')
        setPlanes(resPlanes.planes_gym)
        console.log(resPlanes.planes_gym)
      }
      datosPlanes()
    }, [])


      // obtener tipoId

      const [tiposId, setTiposId] = useState([])

      useEffect(() => {
        const datosTipoId = async () => {
          const resTipoId = await apiRestGet('obtener_tipos_id/')
          setTiposId(resTipoId.tipos_id)
          console.log(resTipoId.tipos_id)
        }
        datosTipoId()
      }, [])


      // obtener datos 

    useEffect(() => {
      const fetchUsuario = async () => {
          const response = await apiRestGet(`/plan/${id}`);
          console.log(response.tarjeta)
          setFormData(response.tarjeta);
      };

      fetchUsuario();
    }, [id]);

    console.log(formData)

    
    const handleChange = (e: any) => {
      const { name, value } = e.target;

      // Actualiza formData incluyendo el cambio
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (e:any) => {
      e.preventDefault();

      const confirmarActualizacion = await swal({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        buttons: ['Cancelar', 'Aceptar'],
        dangerMode: false,
      });

      if (confirmarActualizacion) {
        swal('Éxito', 'La actualización se procesó de manera exitosa', 'success');
        try {
          const response = await apiRestPut(`/editar/${formData.id}`, formData);
          console.log(response)

          if (response.success) {
            // Actualizar el estado del formulario con los nuevos datos
            swal({
              title: '¡Éxito!',
              text: 'Usuario actualizado correctamente.',
              icon: 'success',
            }).then(() => {
              window.location.href = '/usuarios';
            });
          } else {
            swal({
              title: 'Error',
              text: 'Error al actualizar miembro. Verifica los campos e inténtalo de nuevo.',
              icon: 'error',
            });
            console.log('Error al actualizar miembro:', response.errores);
          }
        } catch (error) {
          console.error('Error al actualizar miembro:', error);
          // Muestra SweetAlert para indicar un error inesperado
          swal({
            title: 'Error',
            text: 'Error inesperado al intentar actualizar el miembro. Inténtalo de nuevo más tarde.',
            icon: 'error',
          });
        }
      } else {
        swal('Cancelado', 'La actualizacion ha sido cancelada', 'info');
      }
      
    }
  
    return (
      <div className={NuevoStyle.general}>
        <div className={NuevoStyle.container1}>
          <h1 className={NuevoStyle.title}>Actualizar Miembro</h1>
          <Image src='/banner-nuevo-usuario.png' width={300} height={300} alt="banner-nuevo-usuario.png" />
        </div>
        <div className={NuevoStyle.container2}>
          <form onSubmit={handleSubmit} className={NuevoStyle.formulario}>
            <div className={NuevoStyle.inputs}>
              <label htmlFor="nombre">Nombre(s):</label>
              <input type="text" name="nombre" value={formData?.nombre || ''} onChange={handleChange} />
            </div>
            <div className={NuevoStyle.inputs}>
              <label htmlFor="apellido">Apellido(s):</label>
              <input type="text" name="apellido" value={formData?.apellido || ''} onChange={handleChange} />
            </div>
            <div className={NuevoStyle.select}>
              <label htmlFor="tipo_id">Identificacion:</label>
              <select name="tipo_id" value={formData?.tipo_id || ''} onChange={handleChange} >
                <option value="">Seleccione el tipo de Identificacion</option>
                {
                  tiposId.map((tipo:any)=>(
                    <option key={tipo.tipo_id} value={tipo.tipo_id}>{tipo.tipo_id}</option>
                  ))
                }
              </select>
            </div>
            <div className={NuevoStyle.inputs}>
              <label htmlFor="id_usuario">Numero de ID:</label>
              <input type="number" name="id_usuario" value={formData?.id_usuario || ''} onChange={handleChange} />
            </div>
            <div className={NuevoStyle.select}>
              <label htmlFor="tipo_plan">Plan:</label>
              <select name="tipo_plan" value={formData?.tipo_plan || ''} onChange={handleChange} >
                {
                  planes.map((plan:any)=>(
                    <option value={plan.tipo_plan}>{plan.tipo_plan}</option>
                  ))
                }
              </select>
            </div>
            <div className={NuevoStyle.inputs}>
              <label htmlFor="fecha_inicio">Fecha de inicio</label>
              <input type="date" name="fecha_inicio" value={formData?.fecha_inicio || ''} onChange={handleChange} />
            </div>
            <div className={NuevoStyle.buttons}>
              <a className={NuevoStyle.volver} href="/usuarios">Volver</a>
              <button type="submit" className={NuevoStyle.registrarNuevo}>
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  