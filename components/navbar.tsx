import navbar from '../styles/navbar.module.css'
import Link from 'next/link'

export default function Navbar(){
    return <>
            <nav className={navbar.navbar}>
                <div className="">
                    <Link className={navbar.gymsoftware} href={"/usuarios"}>GymSoftware</Link>
                    <ul className={navbar.links}>
                        <li className="">
                            <Link className={navbar.link} aria-current="page" href={"/usuarios"}>Inicio</Link>
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
                            <Link className={navbar.link} href={"/nuevo"}>Nuevo Usuario</Link>
                        </li>
                    </ul>
                </div>
            </nav>
    </>
};