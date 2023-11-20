'use client';
import { apiRestPut } from '@/services/services';
import { useState, useEffect } from 'react';
import NuevoStyle from 'styles/actualizar.module.css';
import Image from 'next/image'
import swal from 'sweetalert'


export default function ActualizarMiembro({ id }:any) {

    const [formData, setFormData] = useState({
      id: '',
      nombre: '',
      apellido: '',
      tipo_id: '',
      id_usuario: '',
      plan: '',
      fechaInicio: '',
    });
  
    const handleChange = (e:any) => {
      const {name, value} = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    useEffect(() => {
      const fetchUsuario = async () => {
        try {
          const response = await apiRestPut(`/editar/${id}`);
          setFormData(response.usuario); // Ajusta esto según la estructura de tu API
        } catch (error) {
          console.error('Error al obtener datos del usuario:', error);
        }
      };
    
      fetchUsuario();
    }, [id]);
  
    const handleSubmit = async (e:any) => {
      e.preventDefault();

      const confirmarActualizacion = await swal({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        buttons: ['Cancelar', 'Aceptar'],
        dangerMode: false,
      });

      if (confirmarActualizacion){
        try {
          const response = await apiRestPut(`/editar_usuario/${formData.id}`, formData);
          console.log(response)
          if (response.success) {
            console.log(response.usuario)
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
      <div className={NuevoStyle.general}>
        <div className={NuevoStyle.container1}>
          <h1 className={NuevoStyle.title}>Actualizar Miembro</h1>
          <Image src='/banner-nuevo-usuario.png' width={300} height={300} alt="banner-nuevo-usuario.png" />
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
                <option value="ti">Tarjeta de identidad</option>
                <option value="cedula">Cedula de ciudadania</option>
                <option value="ce">Cedula de extranjeria</option>
                <option value="pasaporte">Pasaporte</option>
                <option value="pep">Permiso especial de Permanencia</option>
              </select>
            </div>
            <div className={NuevoStyle.inputs}>
              <label htmlFor="id_usuario">Numero de ID:</label>
              <input type="number" name="id_usuario" value={formData.id_usuario} onChange={handleChange} required/>
            </div>
            <div className={NuevoStyle.select}>
              <label htmlFor="plan">Plan:</label>
              <select name="plan" value={formData.plan} onChange={handleChange} required>
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
              <input type="date" name="fechaInicio" value={formData.fechaInicio} onChange={handleChange} required/>
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
  