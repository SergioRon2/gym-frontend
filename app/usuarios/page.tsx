'use client';
import { apiRestGet } from '@/services/services'
import { useEffect, useState } from 'react'
import StyleUsuarios from 'styles/usuarios.module.css'



export default function Miembros(){

    const [usuarios, setUsuarios] = useState([])

    useEffect(()=>{
        const datosUsuarios = async() => {
            const res = await apiRestGet('plan');
            setUsuarios(res.tarjetas);
            console.log(res.tarjetas)
        }

        datosUsuarios()
    }, [])

    return <>
        <div className={StyleUsuarios.container}>
            {
                (usuarios ?? [])?.map((user:any, index:any) => (
                    <div className={StyleUsuarios.card}>
                        <h2>{user.usuario.nombre} {user.usuario.apellido}</h2>
                        <h4>ID: {user.usuario.id}</h4>
                        <h4>Dias restantes: {user.dias_restantes}</h4>
                        <div className={StyleUsuarios.buttons}>
                            <button className={StyleUsuarios.buttonBlue}>Ver</button>
                            <button className={StyleUsuarios.buttonGreen}>Actualizar</button>
                            <button className={StyleUsuarios.buttonRed}>Eliminar</button>
                        </div>
                    </div>
                ))
            }
        </div>
    </>
}
