'use client';
import { apiRestGet, apiRestPost } from '@/services/services';
import { useEffect, useState } from 'react';
import NuevoStyle from 'styles/nuevo.module.css';
import Image from 'next/image'
import swal from 'sweetalert'
import LoadingSpinner from '@/components/loading';

export default function MiembroNuevo() {

  const [loading, setLoading] = useState(true);


  useEffect(() => {
      setLoading(false);
  }, []);

    const [formData, setFormData] = useState({
      nombre: '',
      apellido: '',
      tipo_id: '',
      id_usuario: '',
      plan: '',
      fechaInicio: '',
    });


  // obtener planes

  const [planes, setPlanes] = useState([])

  useEffect(() => {
    const datosPlanes = async () => {
      const res = await apiRestGet('planes')
      setPlanes(res.planes_gym)
      console.log(res.planes_gym)
    }
    datosPlanes()
  }, [])


  // obtener tipoId

  const [tiposId, setTiposId] = useState([])

  useEffect(() => {
    const datosTipoId = async () => {
      const resTipoId = await apiRestGet('tipos-id')
      setTiposId(resTipoId.tipos_id)
      console.log(resTipoId.tipos_id)
    }
    datosTipoId()
  }, [])
  
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
        text: 'Esta acción registra un nuevo usuario',
        icon: 'warning',
        buttons: ['Cancelar', 'Aceptar'],
        dangerMode: false,
      });

      if (confirmarRegistro){
        try {
          const response = await apiRestPost('/nuevo_usuario/', formData);
          console.log(response)
          if (response.success) {
            // En caso de éxito, muestra el SweetAlert
            swal({
                title: '¡Éxito!',
                text: 'Usuario creado correctamente.',
                icon: 'success',
            }).then(() => {
                window.location.href = '/usuarios'
            });
          } else {
              // En caso de error, muestra el SweetAlert con el mensaje de error
              swal({
                  title: 'Error',
                  text: 'Error al registrar nuevo miembro. Verifica los campos e inténtalo de nuevo.',
                  icon: 'error',
              });
              console.log('Error al registrar nuevo miembro:', response.errors)
          }
        } catch (error) {
            console.error('Error al registrar nuevo miembro:', error);
            // Muestra SweetAlert para indicar un error inesperado
            swal({
                title: 'Error',
                text: 'Error inesperado al intentar registrar el nuevo miembro. Inténtalo de nuevo más tarde.',
                icon: 'error',
            });
        }
      } else{
        swal('Cancelado', 'El registro ha sido cancelada', 'info');
      }

      console.log(formData)
    }
  
    return (
      <>
        {
          loading ? <LoadingSpinner /> : (
            <div className={NuevoStyle.general}>
              <div className={NuevoStyle.container1}>
                <h1 className={NuevoStyle.title}>Registrar Nuevo Miembro</h1>
                <Image draggable={false} src='/banner-nuevo-usuario.png' width={300} height={300} alt="banner-nuevo-usuario.png" />
              </div>
              <div className={NuevoStyle.container2}>
                <form onSubmit={handleSubmit} className={NuevoStyle.formulario}>
                  <div className={NuevoStyle.inputs}>
                    <label htmlFor="nombre">Nombre(s):</label>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required/>
                  </div>
                  <div className={NuevoStyle.inputs}>
                    <label htmlFor="apellido">Apellido(s):</label>
                    <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} required/>
                  </div>
                  <div className={NuevoStyle.select}>
                    <label htmlFor="tipo_id">Identificacion:</label>
                    <select name="tipo_id" value={formData.tipo_id} onChange={handleChange} required>
                      <option value="">Seleccione el tipo de Identificacion</option>
                      {
                        tiposId.map((tipo:any)=>(
                          // eslint-disable-next-line react/jsx-key
                          <option value={tipo.tipo_id}>{tipo.tipo_id}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className={NuevoStyle.inputs}>
                    <label htmlFor="id_usuario">Numero de ID:</label>
                    <input type="number" name="id_usuario" value={formData.id_usuario} onChange={handleChange} minLength={6} required/>
                  </div>
                  <div className={NuevoStyle.select}>
                    <label htmlFor="plan">Plan:</label>
                    <select name="plan" value={formData.plan} onChange={handleChange} required>
                      <option value="">Seleccione un plan</option>
                      {
                        planes.map((plan:any)=>(
                          <option key={plan} value={plan.tipo_plan}>{plan.tipo_plan} - ${plan.precio}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className={NuevoStyle.inputs}>
                    <label htmlFor="fechaInicio">Fecha de inicio</label>
                    <input type="date" name="fechaInicio" value={formData.fechaInicio} onChange={handleChange} required/>
                  </div>
                  <div className={NuevoStyle.buttons}>
                    <a className={NuevoStyle.volver} href="/usuarios">Volver</a>
                    <button type="submit" className={NuevoStyle.registrarNuevo}>
                      Registrar nuevo miembro
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
  