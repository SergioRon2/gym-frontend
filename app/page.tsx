'use client'
import HomeStyle from 'styles/home.module.css'
import Image from 'next/image'
import MenBanner from '../public/men-banner.png'
import { useEffect, useState } from 'react'; 
import LoadingSpinner from '@/components/loading';


export default function Home() {

  const [loading, setLoading] = useState(true);


  useEffect(() => {
      setLoading(false);
  }, []);


  return (
    <>
      {
        loading ? <LoadingSpinner /> : (
          <div className={HomeStyle.container}>
            <Image className={HomeStyle.menBanner} draggable={false} width={500} src={MenBanner} alt='Men-banner' />
            <h1 className={HomeStyle.title}>Bienvenido a GymSoftware!</h1>
            <h4 className={HomeStyle.encabezado}>En la barra de navegacion puedes encontrar las diferentes opciones que tiene nuestra plataforma</h4>
          </div>
        )
      }
    </>
  )
}
