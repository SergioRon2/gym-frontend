'use client'
import LoadingSpinner from '@/components/loading';
import { apiRestPost } from '@/services/services';
import { useEffect, useState } from 'react';
import LectorStyle from 'styles/lector.module.css'

export default function Lector(){


    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(false);
    }, []);


    const handleFileUpload = async (event:any) => {
        setLoading(true); // Establece el estado de carga a true mientras se procesa la imagen

        try {
            const formData = new FormData();
            formData.append('imagen', event.target.files[0]);

            // Realiza la llamada a la API utilizando la función apiRestPost de services.ts
            const response = await apiRestPost('/lector/', formData);

            // Maneja la respuesta de la API según sea necesario
            console.log(response);

        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false); // Establece el estado de carga a false después de procesar la imagen
        }
    };


    return <>
        {
            loading ? <LoadingSpinner /> : (
                <>
                    <h1 className={LectorStyle.title}>Scan QR para asistencias</h1>
                    <div className={LectorStyle.container}>
                        <div className={LectorStyle.containerLector}>
                            <input type="file" name="" id="" />
                            <a className={LectorStyle.registrarAsistencia} href={"/consultas"}>Registrar asistencia</a>
                        </div>
                    </div>
                </>
            )
        }
    </>
}