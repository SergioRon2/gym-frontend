'use client'
import { useEffect, useState } from 'react';
import style404 from '../styles/404.module.css'
import Image from 'next/image'
import LoadingSpinner from '@/components/loading';

export default function Custom404() {

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(false);
    }, []);

    return <>
        {
            loading ? <LoadingSpinner /> : (
                <div className={style404.container}>
                    <Image className={style404.error} draggable={false} src="/ghost.png" alt='ghost.png' width={400} height={300} />
                    <br />
                    <div className={style404.sombra}></div>
                    <h3 className={style404.titulo}>Página no encontrada - 404</h3>
                    <p>La página que estás buscando no existe.</p>
                </div>
            )
        }
    </>
}