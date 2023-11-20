'use client';
import { apiRestDelete, apiRestGet } from '@/services/services'
import { useEffect, useState } from 'react'
import StyleUsuarios from 'styles/usuarios.module.css'
import swal from 'sweetalert'



export default function Miembros(){

    const [usuarios, setUsuarios] = useState([])

    useEffect(()=>{
        const datosUsuarios = async() => {
            const res = await apiRestGet('plan');
            setUsuarios(res.tarjetas);
            console.log(res.tarjetas[0])
        }

        datosUsuarios()
    }, [])

  const actualizarUsuario = async (userId: any) => {
    // Redirige a la página de actualización con la ID como parámetro
    window.location.href = `/actualizar/${userId}`;
  }

    
  // Función para manejar la eliminación del usuario
  const eliminarUsuario = async (userId: number) => {
    // Mostrar una SweetAlert de confirmación
    const confirmDelete = await swal({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      buttons: ['Cancelar', 'Sí, eliminar'],
      dangerMode: true,
    });

    // Verificar si el usuario confirmó la eliminación
    if (confirmDelete) {
      try {
        // Realizar la solicitud DELETE a la API
        const response = await apiRestDelete(`eliminar/${userId}`);
        console.log(response)

        // Verificar si la eliminación fue exitosa
        if (response.success) {
          // La eliminación fue exitosa, mostrar SweetAlert de éxito
          swal({
            title:'Éxito',
            text: response.mensaje,
            icon: 'success',
          }).then(function(){
            window.location.href = '/usuarios'
          });
          // Puedes realizar otras acciones después de la eliminación si es necesario
        } else {
          // La eliminación falló, mostrar SweetAlert de error
          swal('Error', response.mensaje, 'error');
        }
      } catch (error:any) {
        // Manejar errores de la solicitud DELETE, si es necesario
        console.error('Error al eliminar el usuario:', error);
      
        // Verificar si hay un mensaje de error específico
        const errorMessage = error.response ? error.response.data : 'Error al eliminar el usuario';
      
        // Mostrar SweetAlert de error con el mensaje adecuado
        swal('Error', errorMessage, 'error');
      }
    } else {
      // El usuario canceló la eliminación, puedes mostrar un mensaje opcional
      swal('Cancelado', 'La eliminación ha sido cancelada', 'info');
    }

  };



  return <>
        <div className={StyleUsuarios.container}>
            {
                usuarios.map((user:any, index:any) => (
                    <div className={StyleUsuarios.card}>
                        <h2>{user.usuario.nombre} {user.usuario.apellido}</h2>
                        <h4>ID: {user.usuario.id_usuario}</h4>
                        <h4>Dias restantes: {user.dias_restantes}</h4>
                        <div className={StyleUsuarios.buttons}>
                            <button className={StyleUsuarios.buttonBlue}>Ver</button>
                            <button onClick={()=>{actualizarUsuario(user.usuario.id)}} className={StyleUsuarios.buttonGreen}>Actualizar</button>
                            <button onClick={()=>{eliminarUsuario(user.usuario.id)}} className={StyleUsuarios.buttonRed}>Eliminar</button>
                        </div>
                    </div>
                ))
            }
        </div>
    </>
}
