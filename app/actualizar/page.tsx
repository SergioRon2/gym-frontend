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

    const [initialUserData, setInitialUserData] = useState({
      id: '',
      nombre: '',
      apellido: '',
      tipo_id: '',
      id_usuario: '',
      plan: '',
      fechaInicio: '',
    });

    const [formData, setFormData] = useState({
      id: '',
      nombre: '',
      apellido: '',
      tipo_id: '',
      id_usuario: '',
      plan: '',
      fechaInicio: '',
    });

    useEffect(() => {
      const fetchUsuario = async () => {
        try {
          const response = await apiRestGet(`/plan/${id}`);
          setInitialUserData(response.usuario);
          setFormData(response.usuario);
        } catch (error) {
          console.log('Error al obtener datos del usuario:', error);
        }
      };

      fetchUsuario();
    }, [id]);

    const handleChange = (e:any) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
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
          console.log('antes:', initialUserData)
          const response = await apiRestPut(`/editar/${formData.id}`, formData);
          console.log('despues:', formData)


          console.log(response);
          if (response.success) {
            // Actualizar el estado del formulario con los nuevos datos
            setFormData(response.usuario);
      
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
            console.log('Error al actualizar miembro:', response.errors);
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
        swal('Cancelado', 'El registro ha sido cancelado', 'info');
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
              <input type="text" name="nombre" value={formData?.nombre || ''} onChange={handleChange} required/>
            </div>
            <div className={NuevoStyle.inputs}>
              <label htmlFor="apellido">Apellido(s):</label>
              <input type="text" name="apellido" value={formData?.apellido || ''} onChange={handleChange} required/>
            </div>
            <div className={NuevoStyle.select}>
              <label htmlFor="tipo_id">Identificacion:</label>
              <select name="tipo_id" value={formData?.tipo_id || ''} onChange={handleChange} required>
                <option value="">Seleccione el tipo de Identificacion</option>
                <option value="ti">Tarjeta de identidad</option>
                <option value="cedula">Cedula de ciudadania</option>
                <option value="ce">Cedula de extranjeria</option>
                <option value="pasaporte">Pasaporte</option>
                <option value="pep">Permiso especial de Permanencia</option>
              </select>
            </div>
            <div className={NuevoStyle.inputs}>
              <label htmlFor="id_usuario">Numero de ID:</label>
              <input type="number" name="id_usuario" value={formData?.id_usuario || ''} onChange={handleChange} required/>
            </div>
            <div className={NuevoStyle.select}>
              <label htmlFor="plan">Plan:</label>
              <select name="plan" value={formData?.plan || ''} onChange={handleChange} required>
                <option value="">Seleccione su plan</option>
                <option value="A">Anual - $1000</option>
                <option value="T">Trimestral - $300</option>
                <option value="M">Mensual - $100</option>
                <option value="S3">Semana x3 - $90</option>
                <option value="S2">Semana x2 - $75</option>
                <option value="S">Semanal - $10</option>
                <option value="D">Diario - $1</option>
                <option value="O">Personalizado - $??</option>
              </select>
            </div>
            <div className={NuevoStyle.inputs}>
              <label htmlFor="fechaInicio">Fecha de inicio</label>
              <input type="date" name="fechaInicio" value={formData?.fechaInicio || ''} onChange={handleChange} required/>
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
  