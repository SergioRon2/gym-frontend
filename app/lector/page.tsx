'use client'
import LoadingSpinner from '@/components/loading';
import { useEffect, useState } from 'react';
import LectorStyle from 'styles/lector.module.css'

export default function Lector(){


    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(false);
    }, []);


    return <>
        {
            loading ? <LoadingSpinner /> : (
                <>
                    <h1 className={LectorStyle.title}>Scan QR para asistencias</h1>
                    <div className={LectorStyle.container}>
                        <div className={LectorStyle.containerLector}>
                            <input type="file" name="" id="" />
                            <a className={LectorStyle.registrarAsistencia} href="">Registrar asistencia</a>
                        </div>
                    </div>
                </>
            )
        }
    </>
}