'use client';
import { apiRestDelete, apiRestGet } from '@/services/services'
import { useEffect, useState } from 'react'
import StyleUsuarios from 'styles/usuarios.module.css'
import swal from 'sweetalert'
import classNames from 'classnames'
import LoadingSpinner from '../../components/loading'


export default function Miembros(){
  
  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {
    const datosUsuarios = async () => {
      const res = await apiRestGet('plan');
      setUsuarios(res.tarjetas);
      console.log(res.tarjetas)
    }

    datosUsuarios()
  }, [])



  // ------------------------- ACTUALIZAR USUARIO --------------------------------



  const actualizarUsuario = async (userId: any) => {
    // Redirige a la página de actualización con la ID como parámetro
    window.location.href = `/actualizar?id=${userId}`;
  }


  // ------------------------- DETALLES DEL USUARIO --------------------------------

  const detallesUsuario = async (userId:any) => {
    try {
      const res = await apiRestGet(`detalle/${userId}`);
      console.log(res)
      swal({
        title: `Detalles de ${res.nombre} ${res.apellido}`,
        text: `ID: ${res.id_usuario}\nPlan: ${res.tipo_plan}\nTipo de identificacion: ${res.tipo_id}\nFecha de inicio: ${res.fecha_inicio_gym}\nDias restantes: ${res.dias_restantes}`,
        icon: 'info',
      });
    } catch (error) {
      // Manejar errores en la solicitud API
      console.error('Error al obtener detalles del usuario:', error);
      swal('Error', 'Hubo un problema al obtener detalles del usuario', 'error');
    }
  };

    

  // ------------------------- ELIMINAR USUARIO --------------------------------



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
        } else {
          // La eliminación falló, mostrar SweetAlert de error
          swal('Error', response.mensaje, 'error');
        }
      } catch (error:any) {
        // Manejar errores de la solicitud DELETE, si es necesario
        console.error('Error al eliminar el usuario:', error);
  
        // Mostrar SweetAlert de error con el mensaje adecuado
        swal('Error', error, 'error');
      }
    } 
  };



  return <>
          <div className={StyleUsuarios.container}>
            {usuarios.length > 0 ? (
              usuarios.map((user:any, index:any) => (
                <div className={classNames({ [StyleUsuarios.cardRed]: user.dias_restantes <= 0 }, { [StyleUsuarios.card]: user.dias_restantes > 0 })} key={index}>
                  <h2>{user.nombre} {user.apellido}</h2>
                  <h4>ID: {user.id_usuario}</h4>
                  <h4>Dias restantes: {user.dias_restantes}</h4>
                  <div className={StyleUsuarios.buttons}>
                    <button onClick={() => {detallesUsuario(user.id)}} className={StyleUsuarios.buttonBlue}>Ver</button>
                    <button onClick={() => {actualizarUsuario(user.id)}} className={StyleUsuarios.buttonGreen}>Actualizar</button>
                    <button onClick={() => {eliminarUsuario(user.id)}} className={StyleUsuarios.buttonRed}>Eliminar</button>
                  </div>
                </div>
              ))
            ) : (
              <h2>Para crear un usuario, haz clic en "Nuevo Usuario" en el navbar.</h2>
            )}
      </div>
    </>
}
