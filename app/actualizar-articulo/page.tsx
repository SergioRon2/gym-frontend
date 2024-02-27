"use client";
import { apiRestGet, apiRestPost, apiRestPut } from "@/services/services";
import { useEffect, useState } from "react";
import ActualizarArticuloStyle from "styles/actualizar-articulo.module.css";
import Image from "next/image";
import swal from "sweetalert";
import { useSearchParams } from "next/navigation";

export default function CrearArticulo() {

    const searchParams = useSearchParams();
    const id = searchParams.get("id");



    const [formData, setFormData] = useState({
        nombre: undefined,
        descripcion: undefined,
        precio: undefined,
        cantidad_disponible: undefined,
    });

    const [initialUserData, setInitialUserData] = useState({
        id : "",
        nombre: "",
        descripcion: "",
        precio: "",
        cantidad_disponible: "",
    });

    useEffect(()=>{
        const fetchArticulos = async() =>{
            const res = await apiRestGet(`/articulos/${id}`)
            setInitialUserData(res.articulo)
            console.log(res.articulo)
        }
        fetchArticulos()
    }, [id])

    console.log(initialUserData)

    const handleChange = (e: any) => {
        const { name, value } = e.target;
            setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const confirmarActualizacion = await swal({
            title: "¿Estás seguro?",
            text: "Esta acción registra un nuevo articulo",
            icon: "warning",
            buttons: ["Cancelar", "Aceptar"],
            dangerMode: false,
        });

        if (confirmarActualizacion) {
            swal("Éxito", "La actualización se procesó de manera exitosa", "success");
            try {
                const response = await apiRestPut(`/actualizar-articulo/${initialUserData.id}`, formData);
                console.log(response);
        
                if (response.success) {
                    // Actualizar el estado del formulario con los nuevos datos
                    swal({
                    title: "¡Éxito!",
                    text: "Articulo actualizado correctamente.",
                    icon: "success",
                    }).then(() => {
                        window.location.href = "/inventario";
                    });
                } else {
                    swal({
                    title: "Error",
                    text: "Error al actualizar articulo. Verifica los campos e inténtalo de nuevo.",
                    icon: "error",
                    });
                    console.log("Error al actualizar articulo:", response.errors);
                }
            } catch (error) {
                console.error("Error al actualizar articulo:", error);
                // Muestra SweetAlert para indicar un error inesperado
                swal({
                    title: "Error",
                    text: "Error inesperado al intentar actualizar el articulo. Inténtalo de nuevo más tarde.",
                    icon: "error",
                });
            }
            } else {
                swal("Cancelado", "La actualizacion ha sido cancelada", "info");
            }

        console.log(formData);
};

return (
    <div className={ActualizarArticuloStyle.general}>
        <div className={ActualizarArticuloStyle.container1}>
            <h1 className={ActualizarArticuloStyle.title}>Actualizar articulo</h1>
            <Image
            src="/banner-nuevo-articulo.png"
            width={300}
            height={300}
            alt="banner-nuevo-articulo.png"
            draggable={false}
            />
        </div>
        <div className={ActualizarArticuloStyle.container2}>
            <form onSubmit={handleSubmit} className={ActualizarArticuloStyle.formulario}>
                <div className={ActualizarArticuloStyle.inputs}>
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                    type="text"
                    name="nombre"
                    value={formData.nombre ?? initialUserData.nombre}
                    onChange={handleChange}
                    />
                </div>
                <div className={ActualizarArticuloStyle.textarea}>
                    <label htmlFor="descripcion">Descripcion:</label>
                    <textarea
                    maxLength={100}
                    name="descripcion"
                    value={formData.descripcion ?? initialUserData.descripcion}
                    onChange={handleChange}
                    />
                </div>
                <div className={ActualizarArticuloStyle.inputs}>
                    <label htmlFor="precio">Precio:</label>
                    <input
                    type="number"
                    name="precio"
                    value={formData.precio ?? initialUserData.precio}
                    onChange={handleChange}
                    />
                </div>
                <div className={ActualizarArticuloStyle.inputs}>
                    <label htmlFor="cantidad_disponible">Cantidad disponible</label>
                    <input
                    type="number"
                    name="cantidad_disponible"
                    value={formData.cantidad_disponible ?? initialUserData.cantidad_disponible}
                    onChange={handleChange}
                    />
                </div>
                <div className={ActualizarArticuloStyle.buttons}>
                    <a className={ActualizarArticuloStyle.volver} href="/inventario">
                    Volver
                    </a>
                    <button type="submit" className={ActualizarArticuloStyle.registrarActualizacion}>
                    Actualizar articulo
                    </button>
                </div>
            </form>
        </div>
    </div>
    );
}
