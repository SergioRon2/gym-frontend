'use client'
import { apiRestDelete, apiRestGet, apiRestPost } from '@/services/services'
import { useEffect, useState } from 'react'
import ModificarPlanes from 'styles/modificar-planes.module.css'
import Link from 'next/link'
import swal from 'sweetalert'

const ModificacionPlanes = () => {

// Se empiezan a tomar los planes desde el backend para mostrarlos en pantalla

    const [planes, setPlanes] = useState([])

    useEffect(()=>{
        const datos = async() => {
            const res = await apiRestGet('obtener_plan')
            setPlanes(res.planes_gym)
            console.log(res.planes_gym)
        }
        datos()
    }, []);

// -------------------------- Hasta aqui -----------------------------

    const [formulario, setFormulario] = useState({
      tipo_plan: '',
      precio: '',
      dias: '',
    });
  
    const handleInputChange = (event:any) => {
      const { name, value } = event.target;
      setFormulario({
        ...formulario,
        [name]: value,
      });
    };
  
    const handleSubmit = async (event:any) => {
        event.preventDefault();

        const confirmarPlan = await swal({
            title: '¿Estás seguro?',
            text: 'Esta acción añadira un nuevo plan',
            icon: 'warning',
            buttons: ['Cancelar', 'Crear'],
          });
      
        if (confirmarPlan) {
            try {
                const res = await apiRestPost('/crear_plan/', formulario);
                console.log(res);

                if(res.success){
                    swal({
                        icon: 'success',
                        title: 'Plan creado con éxito',
                        text: 'El nuevo plan ha sido creado correctamente.',
                    }).then(() => {
                        window.location.href = '/modificar-planes';
                    });

                } else{
                    swal('Error', 'Error al tomar los datos del plan', 'error')
                }

            } catch (error) {
                console.error(error);
                swal({
                    icon: 'error',
                    title: 'Error al crear el plan',
                    text: 'Hubo un problema al intentar crear el plan. Por favor, inténtalo de nuevo.',
                });
            }
        } else{
            swal('Cancelado', 'La creacion del plan no se llevo a cabo', 'error')
        }
      };


    const eliminarPlan = async() =>{
        const confirmDelete = await swal({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            buttons: ['Cancelar', 'Sí, eliminar'],
            dangerMode: true,
          });

          if (confirmDelete){
            try{
                const res = await apiRestDelete('')
                swal({
                    title: 'Exito',
                    text: 'El plan ha sido eliminado correctamente',
                    icon: 'success'
                })
            } catch(error){
                console.error(error)
            }
          }
    }

    return <>
        <div className={ModificarPlanes.container}>
            <h1>Modificacion de planes</h1>
            <div className={ModificarPlanes.planesActuales}>
                <div className={ModificarPlanes.categoria}>
                    <p>Plan</p>
                    <p>Precio</p>
                    <p>Dias</p>
                    <p>Accion</p>
                </div>
                {
                    planes.map((plan:any)=> (
                        <div className={ModificarPlanes.listaPlanes}><p>{plan.tipo_plan}</p><p>{plan.precio}</p><p>{plan.dias}</p><p className={ModificarPlanes.eliminar}>Eliminar</p></div>
                    ))
                }
            </div>
            <div className={ModificarPlanes.formulario}>
                <div className={ModificarPlanes.campos}>
                    <form onSubmit={handleSubmit}>
                        <div className="">
                            <label htmlFor="tipo_plan">Plan</label>
                            <input type="text" value={formulario.tipo_plan} onChange={handleInputChange} name='tipo_plan' />
                        </div>
                        <div className="">
                            <label htmlFor="precio">Precio</label>
                            <input type="number" value={formulario.precio} onChange={handleInputChange} name='precio' />
                        </div>
                        <div className="">
                            <label htmlFor="dias">Dias</label>
                            <input type="number" value={formulario.dias} onChange={handleInputChange} name='dias' />
                        </div>
                        <div className={ModificarPlanes.opciones}>
                            <input type="submit" className={ModificarPlanes.button} value="Ingresar plan" />
                            <Link href="/usuarios">
                                <p className={ModificarPlanes.volver}>Volver</p>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>

}



export default ModificacionPlanes