'use client'
import LoadingSpinner from '@/components/loading';
import { apiRestPost } from '@/services/services';
import { useEffect, useState } from 'react';
import LectorStyle from 'styles/lector.module.css'
import swal from 'sweetalert'

export default function Lector(){

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(false);
    }, []);


    const handleFileUpload = async (event:any) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('imagen', event.target.files[0]);
    
            const response = await apiRestPost('/lector/', formData);
            console.log(response);
    
            // Muestra un SweetAlert dependiendo de la respuesta de la API
            if (response && response.success) {
                swal({
                    title: 'Éxito',
                    text: 'Imagen procesada correctamente.',
                    icon: 'success',
                });
            } else {
                swal({
                    title: 'Error',
                    text: 'Ocurrió un error al procesar la imagen.',
                    icon: 'error',
                });
            }
        } catch (error) {
            console.error('Error:', error);
            swal({
                title: 'Error',
                text: 'Ocurrió un error al subir la imagen.',
                icon: 'error',
            });
        } finally {
            setLoading(false); 
        }
    };


    return <>
        {
            loading ? <LoadingSpinner /> : (
                <>
                    <h1 className={LectorStyle.title}>Scan QR para asistencias</h1>
                    <div className={LectorStyle.container}>
                        <div className={LectorStyle.containerLector}>
                            <input type="file" name="imagen" id="" onChange={handleFileUpload} />
                            <a className={LectorStyle.registrarAsistencia}>Registrar asistencia</a>
                        </div>
                    </div>
                </>
            )
        }
    </>
}