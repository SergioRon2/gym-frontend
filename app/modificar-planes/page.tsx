'use client'
import { apiRestDelete, apiRestGet, apiRestPost, apiRestPut } from '@/services/services'
import { useEffect, useState } from 'react'
import ModificarPlanes from 'styles/modificar-planes.module.css'
import Link from 'next/link'
import swal from 'sweetalert'
import LoadingSpinner from '@/components/loading'
import { FaPencilAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

const ModificacionPlanes = () => {

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(false);
    }, []);

    const [planes, setPlanes] = useState([])
    

    useEffect(()=>{
        const datos = async() => {
            const res = await apiRestGet('planes')
            const planes = res.planes_gym;
            setPlanes(planes);
            console.log(planes);
        }
        datos()
    }, []);

// -------------------------- Hasta aqui -----------------------------
    const [formularioEditado, setFormularioEditado] = useState({
        editable : false,
        id : null
    })

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
            text: formularioEditado.editable ? `Esta accion editara el plan ${formulario.tipo_plan}` : 'Esta acción añadira un nuevo plan',
            icon: 'warning',
            buttons: ['Cancelar', 'Confirmar'],
        });

        if (confirmarPlan) {
            try {
                console.log('formulario: ', formulario)
                const res = formularioEditado.editable ? await apiRestPut(`editar-plan/${formularioEditado.id}`, {...formulario, id:formularioEditado.id}) : await apiRestPost('crear-plan/', formulario);
                console.log(res);

                if(res.success){
                    swal({
                        icon: 'success',
                        title: formularioEditado.editable ? 'Plan editado con exito' : 'Plan creado con éxito',
                        text: formularioEditado.editable ? 'El plan ha sido editado correctamente' : 'El nuevo plan ha sido creado correctamente.',
                    }).then(() => {
                        setFormularioEditado({editable : false, id : null})
                        window.location.href = '/modificar-planes';
                    });

                } else{
                    swal('Error', 'Error al tomar los datos del plan', 'error')
                }

            } catch (error) {
                console.error(error);
                swal({
                    icon: 'error',
                    title: formularioEditado.editable ? 'Error al editar el plan' : 'Error al crear el plan',
                    text: formularioEditado.editable ? 'Hubo un problema al intentar editar el plan. Por favor, inténtalo de nuevo.' : 'Hubo un problema al intentar crear el plan. Por favor, inténtalo de nuevo.',
                });
            }
        } else{
            swal('Cancelado', formularioEditado.editable ? 'La edicion del plan no se llevo a cabo' : 'La creacion del plan no se llevo a cabo', 'error')
        }
    };

    const editarPlan = async(plan:any) =>{
        setFormulario({tipo_plan : plan.tipo_plan, dias : plan.dias, precio : plan.precio})

        setFormularioEditado({editable : true, id : plan.id})
    }


    const eliminarPlan = async(plan:any) =>{

        const confirmDelete = await swal({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            buttons: ['Cancelar', 'Sí, eliminar'],
            dangerMode: true,
        });

        if (confirmDelete){
            try{
                const res = await apiRestDelete(`eliminar-plan/${plan.id}`)
                console.log(res)
                if (res.success){
                    swal({
                        title: 'Exito',
                        text: 'El plan ha sido eliminado correctamente',
                        icon: 'success'
                    }).then(()=>{
                        window.location.href = '/modificar-planes'
                    })
                } else{
                    swal({
                        title: 'Error',
                        text: 'El plan no pudo ser eliminado',
                        icon: 'error'
                    })
                }
            } catch(error){
                console.error(error)
            }
        }
    }

    const href = () => {
        window.location.href = '#formulario'
    }



    return <>
        {
            loading ? <LoadingSpinner /> : (
                <div className={ModificarPlanes.container}>
                    <h1>Modificacion de planes</h1>
                    <div className={ModificarPlanes.planesActuales}>
                        <div className={ModificarPlanes.categoria}>
                            <p>Plan</p>
                            <p>Precio</p>
                            <p>Dias</p>
                            <p>Accion</p>
                        </div>
                        <div className={ModificarPlanes.scrollPlanes}>
                            {
                                planes.map((plan:any)=> (
                                    <>
                                        <div className={ModificarPlanes.listaPlanes}>
                                            <p>{plan.tipo_plan}</p>
                                            <p>$ {plan.precio}</p>
                                            <p>{plan.dias}</p>
                                            <div className={ModificarPlanes.acciones}>
                                                <p className={ModificarPlanes.editar} onClick={()=>{editarPlan(plan), href()}}><FaPencilAlt style={{display: 'flex', margin: '4px auto'}} /></p>
                                                <p className={ModificarPlanes.eliminar} onClick={()=>{eliminarPlan(plan)}}><FaTrash style={{display: 'flex', margin: '4px auto'}} /></p>
                                            </div>
                                        </div>
                                    </>
                                ))
                            }
                        </div>
                    </div>
                    <div className={ModificarPlanes.formulario}>
                        <div className={ModificarPlanes.campos}>
                            <form onSubmit={handleSubmit} id='formulario'>
                                <div className="">
                                    <label htmlFor="tipo_plan">Plan</label>
                                    <input type="text" value={formulario.tipo_plan} onChange={handleInputChange} name='tipo_plan' required />
                                </div>
                                <div className="">
                                    <label htmlFor="precio">Precio</label>
                                    <input type="number" value={formulario.precio} onChange={handleInputChange} name='precio' required />
                                </div>
                                <div className="">
                                    <label htmlFor="dias">Dias</label>
                                    <input type="number" value={formulario.dias} onChange={handleInputChange} name='dias' required />
                                </div>
                                <div className={ModificarPlanes.opciones}>
                                    <input type="submit" className={ModificarPlanes.button} value={formularioEditado.editable ? 'Editar plan' : 'Crear plan'} />
                                    <Link href="/usuarios">
                                        <p className={ModificarPlanes.volver}>Volver</p>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
    </>

}



export default ModificacionPlanes