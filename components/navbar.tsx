import navbar from '../styles/navbar.module.css'
import Link from 'next/link'

export default function Navbar(){



    return <>
            <nav className={navbar.navbar}>
                <div className="">
                    <Link className={navbar.gymsoftware} href={"/"}>GymSoftware</Link>
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
                            <Link className={navbar.link} href={"/inventario"}>Inventario</Link>
                        </li>
                    </ul>
                </div>
            </nav>
    </>
};