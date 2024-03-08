import navbar from '../styles/navbar.module.css'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar(){



    return <>
            <nav className={navbar.navbar}>
                <div className="">
                    <Link className={navbar.logo} href={"/"}>
                        <Image src={'/logo.png'} alt="logo.png" width={100} height={20} />
                    </Link>
                    <p className={navbar.x}>X</p>
                    <ul className={navbar.links}>
                        <li className="">
                            <Link className={navbar.link} aria-current="page" href={"/usuarios"}>Usuarios</Link>
                        </li>
                        <li className="">
                            <Link className={navbar.link} href={"/asistencia"}>Registrar asistencia</Link>
                        </li>
                        <li className="">
                            <Link className={navbar.link} href={"/consultas"}>Consultas de asistencias</Link>
                        </li>
                        <li className="">
                            <Link className={navbar.link} href={"/lector"}>Lector</Link>
                        </li>
                        <li className="">
                            <Link className={navbar.link} href={"/modificar-planes"}>Modificar Planes</Link>
                        </li>
                        <li className="">
                            <Link className={navbar.link} href={"/inventario/articulos"}>Inventario</Link>
                        </li>
                    </ul>
                </div>
            </nav>
    </>
};