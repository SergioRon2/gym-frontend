'use client';
import { apiRestPost } from '@/services/services';
import { useState } from 'react';
import NuevoStyle from 'styles/nuevo.module.css';

export default function MiembroNuevo() {
    const [formData, setFormData] = useState({
      nombre: '',
      apellido: '',
      tipo_id: '',
      id_usuario: 0,
      plan: '',
      fechaInicio: '',
    });
  
    const handleChange = (e:any) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleSubmit = async (e:any) => {
      e.preventDefault();
  
      try {
        const response = await apiRestPost('/nuevo_usuario/', formData);
        console.log(response);
        // Aquí puedes manejar la respuesta, redireccionar, mostrar mensajes, etc.
      } catch (error) {
        console.error('Error al registrar nuevo miembro:', error);
      }
    };
  
    return (
      <div className={NuevoStyle.general}>
        <div className={NuevoStyle.container}>
          <h1 className={NuevoStyle.title}>Registrar Nuevo Miembro</h1>
          <form onSubmit={handleSubmit} className={NuevoStyle.formulario}>
            <div className={NuevoStyle.inputs}>
              <label htmlFor="nombre">Nombre(s):</label>
              <input type="text" name="nombre" value={formData.nombre} onChange={handleChange}/>
            </div>
            <div className={NuevoStyle.inputs}>
              <label htmlFor="apellido">Apellido(s):</label>
              <input type="text" name="apellido" value={formData.apellido} onChange={handleChange}/>
            </div>
            <div className={NuevoStyle.select}>
              <label htmlFor="tipo_id">Identificacion:</label>
              <select name="tipo_id" value={formData.tipo_id} onChange={handleChange}>
                <option value="">Tarjeta de identidad</option>
                <option value="">Cedula de ciudadania</option>
                <option value="">Cedula de extranjeria</option>
                <option value="">Pasaporte</option>
                <option value="">Permiso especial de Permanencia</option>
              </select>
            </div>
            <div className={NuevoStyle.inputs}>
              <label htmlFor="id_usuario">Numero de ID:</label>
              <input type="number" name="id_usuario" value={formData.id_usuario} onChange={handleChange}/>
            </div>
            <div className={NuevoStyle.select}>
              <label htmlFor="plan">Plan:</label>
              <select name="plan" value={formData.plan} onChange={handleChange}>
                <option value="">Mensual - $100</option>
                <option value="">Semanal - $10</option>
                <option value="">Anual - $1000</option>
                <option value="">Diario - $1</option>
                <option value="">15 dias - $75</option>
                <option value="">21 dias - $90</option>
              </select>
            </div>
            <div className={NuevoStyle.inputs}>
              <label htmlFor="fechaInicio">Fecha de inicio</label>
              <input type="date" name="fechaInicio" value={formData.fechaInicio} onChange={handleChange}/>
            </div>
            <button type="submit" className={NuevoStyle.registrarNuevo}>
              Registrar nuevo miembro
            </button>
          </form>
        </div>
      </div>
    );
  }
  