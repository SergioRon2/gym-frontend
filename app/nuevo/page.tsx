'use client';
import { apiRestPost } from '@/services/services';
import { useState } from 'react';
import NuevoStyle from 'styles/nuevo.module.css';

export default function MiembroNuevo() {
    const [formData, setFormData] = useState({
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
  
    const handleSubmit = async (e:any) => {
      e.preventDefault();
      try {
        const response = await apiRestPost('/nuevo_usuario/', formData);
        console.log(response)
        if (response.success) {
          // Aquí manejas el caso de éxito
        } else {
          // Aquí manejas el caso de error
          console.log('Error al registrar nuevo miembro:', response.errors)
          // Puedes mostrar mensajes de error específicos para cada campo si lo deseas
        // Aquí puedes manejar la respuesta, redireccionar, mostrar mensajes, etc.
        }
      } catch (error) {
        console.error('Error al registrar nuevo miembro:', error);
        console.log(error)
      }

      console.log(formData)
    };
  
    return (
      <div className={NuevoStyle.general}>
        <div className={NuevoStyle.container}>
          <h1 className={NuevoStyle.title}>Registrar Nuevo Miembro</h1>
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
            <button type="submit" className={NuevoStyle.registrarNuevo}>
              Registrar nuevo miembro
            </button>
          </form>
        </div>
      </div>
    );
  }
  