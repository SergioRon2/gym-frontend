'use client'
import AsistenciasStyle from 'styles/asistencia.module.css'
import { useEffect, useState } from 'react'; 
import { apiRestPost } from '@/services/services';
import swal from 'sweetalert';

export default function Asistencias(){

    const [idUsuario, setIdUsuario] = useState('');
    const [fecha, setFecha] = useState('');

    const handleRegistrarAsistencia = async (event:any) => {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
        
        try {
            // Realizar la solicitud POST al backend para registrar la asistencia
            const response = await apiRestPost('/crear-asistencia/', {
                usuario_id: idUsuario,
                presente: true, // Opcional, dependiendo de tus requisitos
                fecha: fecha
            });

            if(response.success){
                swal('Solicitud fallida', 'La asistencia no se pudo registrar', 'error')
            } else{
                // Mostrar un SweetAlert de éxito
                swal({
                    title: '¡Asistencia registrada!',
                    text: 'La asistencia ha sido registrada exitosamente.',
                    icon: 'success',
                }).then(() => {
                    // Limpia los campos después de registrar la asistencia
                    setIdUsuario('');
                    setFecha('');
                });
            }
        } catch (error) {
            // Mostrar un SweetAlert de error
            swal('Error', 'Hubo un problema al registrar la asistencia. Por favor, intenta de nuevo más tarde.', 'error');
        }
    };



    return (
        <div className={AsistenciasStyle.container}>
            <div className={AsistenciasStyle.formulario}>
                <h1 className={AsistenciasStyle.title}>Asistencia</h1>
                <form onSubmit={handleRegistrarAsistencia}>
                    <div className={AsistenciasStyle.datos}>
                        <label className="mr-2 text-light">ID del Usuario:</label>
                        <input 
                            type="text" 
                            value={idUsuario} 
                            onChange={(event) => setIdUsuario(event.target.value)} 
                            className="form-control" 
                            placeholder="Ingrese ID" 
                        />
                    </div>
                    <div className={AsistenciasStyle.datos}>
                        <label className="mr-2 text-light">Selecciona una fecha:</label>
                        <input 
                            type="date" 
                            value={fecha} 
                            onChange={(event) => setFecha(event.target.value)} 
                            className="form-control" 
                        />
                    </div>
                    <button type="submit" className={AsistenciasStyle.registrarAsistencia}>
                        Registrar asistencia
                    </button>
                </form>
            </div>
        </div>
    );
}