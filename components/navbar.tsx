import { useState } from 'react';
import navbar from '../styles/navbar.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className={`bg-gray-900 ${navbar.navbar}`}>
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center justify-around">
                        <div className="flex-shrink-0">
                            <Link href={"/"}>
                                <Image className={navbar.logo} src={'/logo.png'} alt="logo.png" width={80} height={20} />
                            </Link>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link href="/usuarios">
                                    <span className="text-white hover:text-gray-300 cursor-pointer px-3 py-2 rounded-md text-sm font-medium">Clientes</span>
                                </Link>
                                <Link href="/asistencia">
                                    <span className="text-white hover:text-gray-300 cursor-pointer px-3 py-2 rounded-md text-sm font-medium">Registrar asistencia</span>
                                </Link>
                                <Link href="/consultas">
                                    <span className="text-white hover:text-gray-300 cursor-pointer px-3 py-2 rounded-md text-sm font-medium">Consultas de asistencias</span>
                                </Link>
                                <Link href="/lector">
                                    <span className="text-white hover:text-gray-300 cursor-pointer px-3 py-2 rounded-md text-sm font-medium">Lector</span>
                                </Link>
                                <Link href="/modificar-planes">
                                    <span className="text-white hover:text-gray-300 cursor-pointer px-3 py-2 rounded-md text-sm font-medium">Modificar Planes</span>
                                </Link>
                                <Link href="/inventario/articulos">
                                    <span className="text-white hover:text-gray-300 cursor-pointer px-3 py-2 rounded-md text-sm font-medium">Inventario</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button onClick={toggleMenu} type="button" className="bg-transparent inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-transparent">
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link href="/usuarios">
                            <span className="text-white hover:text-gray-300 cursor-pointer block px-3 py-2 rounded-md text-base font-medium">Clientes</span>
                        </Link>
                        <Link href="/asistencia">
                            <span className="text-white hover:text-gray-300 cursor-pointer block px-3 py-2 rounded-md text-base font-medium">Registrar asistencia</span>
                        </Link>
                        <Link href="/consultas">
                            <span className="text-white hover:text-gray-300 cursor-pointer block px-3 py-2 rounded-md text-base font-medium">Consultas de asistencias</span>
                        </Link>
                        <Link href="/lector">
                            <span className="text-white hover:text-gray-300 cursor-pointer block px-3 py-2 rounded-md text-base font-medium">Lector</span>
                        </Link>
                        <Link href="/modificar-planes">
                            <span className="text-white hover:text-gray-300 cursor-pointer block px-3 py-2 rounded-md text-base font-medium">Modificar Planes</span>
                        </Link>
                        <Link href="/inventario/articulos">
                            <span className="text-white hover:text-gray-300 cursor-pointer block px-3 py-2 rounded-md text-base font-medium">Inventario</span>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
