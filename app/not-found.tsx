import style404 from '../styles/404.module.css'
import Image from 'next/image'

export default function Custom404() {
    return <>
        <div className={style404.container}>
            <Image className={style404.error} draggable={false} src="/ghost.png" alt='ghost.png' width={400} height={300} />
            <br />
            <div className={style404.sombra}></div>
            <h3 className={style404.titulo}>Página no encontrada - 404</h3>
            <p>La página que estás buscando no existe.</p>
        </div>
    </>
}