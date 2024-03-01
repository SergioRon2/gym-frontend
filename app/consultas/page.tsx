'use client'
import { apiRestDelete, apiRestGet } from '@/services/services'
import { useEffect, useState } from 'react'
import ConsultaStyle from 'styles/consulta.module.css'
import Image from 'next/image'
import Mistery from '../../public/mistery.png'
import swal from 'sweetalert'
import LoadingSpinner from '@/components/loading'

export default function Consultas(){

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);


    const [asistencias, setAsistencias] = useState([])

    useEffect(()=>{
        const fetchAsistencias = async() =>{
            const res = await apiRestGet('/consulta-asistencia')
            setAsistencias(res.asistencias)
            console.log(res.asistencias)
        }
        fetchAsistencias()
    }, [])

    const confirmarEliminacion = async (asistenciaId:any) => {
        const confirmacion = await swal({
            title: "¿Estás seguro?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            buttons: ["Cancelar", "Aceptar"],
            dangerMode: true,
        });
    
        if (confirmacion) {
            eliminarAsistencia(asistenciaId);
        } else {
            swal("Cancelado", "La eliminación ha sido cancelada", "info");
        }
    };

    const eliminarAsistencia = async (id:any) => {
        try {
            const response = await apiRestDelete(`/eliminar-asistencia/${id}`);
    
            if (response.success) {
                // Actualizar la lista de asistencias después de eliminar la asistencia
                const updatedAsistencias = asistencias.filter((asistencia:any) => asistencia.id !== id);
                setAsistencias(updatedAsistencias);
    
                // Mostrar un SweetAlert de éxito
                swal("¡Éxito!", "La asistencia ha sido eliminada correctamente.", "success");
            } else {
                // Mostrar un SweetAlert de error
                swal("Error", "Hubo un problema al eliminar la asistencia. Por favor, intenta de nuevo más tarde.", "error");
            }
        } catch (error) {
            console.error("Error al eliminar la asistencia:", error);
            // Mostrar un SweetAlert de error en caso de problemas de comunicación con el servidor
            swal("Error", "Hubo un problema al comunicarse con el servidor. Por favor, intenta de nuevo más tarde.", "error");
        }
    };

    return <>
        {
            loading ? <LoadingSpinner/> : (
                <div className={ConsultaStyle.container}>
                    <div className={ConsultaStyle.respuestaConsulta}>
                            {
                                asistencias.length > 0 ? 
                                <div className={ConsultaStyle.response}>
                                    <h1 className={ConsultaStyle.title}>Todas las asistencias</h1>
                                    <table className={ConsultaStyle.tabla}>
                                        <tr className={ConsultaStyle.headingTabla}>
                                            <th className={ConsultaStyle.titulosTabla}>ID especial</th>
                                            <th className={ConsultaStyle.titulosTabla}>Nombre</th>
                                            <th className={ConsultaStyle.titulosTabla}>Fecha</th>
                                            <th className={ConsultaStyle.titulosTabla}>Numero de identificacion</th>
                                            <th className={ConsultaStyle.titulosTabla}>Presente</th>
                                            <th className={ConsultaStyle.titulosTabla}>Eliminar</th>
                                        </tr>
                                        {
                                            asistencias.map((data:any)=>(
                                                <tr key={data} className={ConsultaStyle.estructuraTabla}>
                                                    <td className={ConsultaStyle.respuestaTabla}>{data.usuario__id}</td>
                                                    <td className={ConsultaStyle.respuestaTabla}>{data.usuario__nombre}</td>
                                                    <td className={ConsultaStyle.respuestaTabla}>{data.fecha}</td>
                                                    <td className={ConsultaStyle.respuestaTabla}>{data.usuario__id_usuario}</td>
                                                    <td className={ConsultaStyle.respuestaTabla}>{data.presente == true ? '✔' : '✘'}</td>
                                                    <td className={ConsultaStyle.eliminarAsistencia} onClick={()=>{eliminarAsistencia(data.id)}}>🗑️</td>
                                                </tr>
                                            )) 
                                        }
                                    </table>
                                </div>
                                : 
                                <div className={ConsultaStyle.NA}>
                                    <h1>No hay asistencias</h1>
                                    <Image draggable={'false'} width={350} height={350} src={Mistery} alt='mistery.png' />
                                </div>
                            }
                    </div>
                    <div className={ConsultaStyle.formulario}>
                        <h1 className={ConsultaStyle.title}>Consulta de Asistencias</h1>
                        <form action="">
                            <div className={ConsultaStyle.datos}>
                                <label className="mr-2 text-light">Selecciona una fecha:</label>
                                <input type="date" id="fechaSelector" name="fecha" className="form-control" />
                            </div>
                            <div className={ConsultaStyle.datos}>
                                <label className="mr-2 text-light">ID especial del Usuario (<i className={ConsultaStyle.i}>opcional, por si se quiere ser especifico en la busqueda</i>):</label>
                                <input type="text" id="idUsuario" name="id_usuario" className="form-control" placeholder="Ingrese ID" />
                            </div>
                            <a className={ConsultaStyle.consultarAsistencia} href="">Consultar asistencia</a>
                        </form>
                    </div>
                </div>
            )
        }
    </>
}