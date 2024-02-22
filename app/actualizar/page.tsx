"use client";
import { apiRestPut, apiRestGet } from "@/services/services";
import { useState, useEffect } from "react";
import NuevoStyle from "styles/actualizar.module.css";
import Image from "next/image";
import swal from "sweetalert";
import { useSearchParams } from "next/navigation";

export default function ActualizarMiembro() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [formData, setFormData] = useState({
    nombre_usuario: undefined,
    apellido_usuario: undefined,
    tipo_id_usuario: undefined,
    id_usuario_gym: undefined,
    tipo_plan_gym: undefined,
    fecha_inicio_usuario: undefined,
  });

  const [initialUserData, setInitialUserData] = useState({
    id: "",
    nombre_usuario: "",
    apellido_usuario: "",
    tipo_id_usuario: "",
    id_usuario_gym: "",
    tipo_plan_gym: "",
    fecha_inicio_usuario: "",
})


  // obtener planes

  const [planes, setPlanes] = useState([]);

  useEffect(() => {
    const datosPlanes = async () => {
      const resPlanes = await apiRestGet("planes");
      setPlanes(resPlanes.planes_gym);
      console.log(resPlanes.planes_gym);
    };
    datosPlanes();
  }, []);

  // obtener tipoId

  const [tiposId, setTiposId] = useState([]);

  useEffect(() => {
    const datosTipoId = async () => {
      const resTipoId = await apiRestGet("tipos-id");
      setTiposId(resTipoId.tipos_id);
      console.log(resTipoId.tipos_id);
    };
    datosTipoId();
  }, []);

  // obtener datos

  useEffect(() => {
    const fetchUsuario = async () => {
      const response = await apiRestGet(`/plan-usuario/${id}`);
      console.log(response.tarjeta);
      setInitialUserData(response.tarjeta);
    };

    fetchUsuario();
  }, [id]);

  console.log(formData);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    console.log(`Changing ${name} to ${value}`);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const confirmarActualizacion = await swal({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      buttons: ["Cancelar", "Aceptar"],
      dangerMode: false,
    });

    if (confirmarActualizacion) {
      swal("Éxito", "La actualización se procesó de manera exitosa", "success");
      try {
        const response = await apiRestPut(`/editar/${initialUserData.id}`, formData);
        console.log(response);

        if (response.success) {
          // Actualizar el estado del formulario con los nuevos datos
          swal({
            title: "¡Éxito!",
            text: "Usuario actualizado correctamente.",
            icon: "success",
          }).then(() => {
            window.location.href = "/usuarios";
          });
        } else {
          swal({
            title: "Error",
            text: "Error al actualizar miembro. Verifica los campos e inténtalo de nuevo.",
            icon: "error",
          });
          console.log("Error al actualizar miembro:", response.errors);
        }
      } catch (error) {
        console.error("Error al actualizar miembro:", error);
        // Muestra SweetAlert para indicar un error inesperado
        swal({
          title: "Error",
          text: "Error inesperado al intentar actualizar el miembro. Inténtalo de nuevo más tarde.",
          icon: "error",
        });
      }
    } else {
      swal("Cancelado", "La actualizacion ha sido cancelada", "info");
    }
  };

  return (
    <>
      <div className={NuevoStyle.general}>
        <div className={NuevoStyle.container1}>
          <h1 className={NuevoStyle.title}>Actualizar Miembro</h1>
          <Image
            draggable={false}
            src="/banner-nuevo-usuario.png"
            width={300}
            height={300}
            alt="banner-nuevo-usuario.png"
          />
        </div>
        <div className={NuevoStyle.container2}>
          <form onSubmit={handleSubmit} className={NuevoStyle.formulario}>
            <div className={NuevoStyle.inputs}>
              <label htmlFor="nombre_usuario">Nombre(s):</label>
              <input
                type="text"
                name="nombre_usuario"
                value={formData.nombre_usuario ?? initialUserData.nombre_usuario}
                onChange={handleChange}
              />
            </div>
            <div className={NuevoStyle.inputs}>
              <label htmlFor="apellido_usuario">Apellido(s):</label>
              <input
                type="text"
                name="apellido_usuario"
                value={formData.apellido_usuario ?? initialUserData.apellido_usuario}
                onChange={handleChange}
              />
            </div>
            <div className={NuevoStyle.select}>
              <label htmlFor="tipo_id_usuario">Tipo de identificacion:</label>
              <select
                name="tipo_id_usuario"
                value={formData.tipo_id_usuario ?? initialUserData.tipo_id_usuario}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione el tipo de Identificacion</option>
                {tiposId.map((tipo:any) => (
                  <option key={tipo} value={tipo.tipo_id}>
                    {`${tipo.tipo_id}`}
                  </option>
                ))}
              </select>
            </div>

            <div className={NuevoStyle.inputs}>
              <label htmlFor="id_usuario_gym">Numero de ID:</label>
              <input
                type="number"
                name="id_usuario_gym"
                value={formData.id_usuario_gym ?? initialUserData.id_usuario_gym}
                onChange={handleChange}
              />
            </div>
            <div className={NuevoStyle.select}>
              <label htmlFor="tipo_plan_gym">Plan:</label>
              <select name="tipo_plan_gym" value={formData.tipo_plan_gym ?? initialUserData.tipo_plan_gym} onChange={handleChange} required>
              <option value="">Seleccione un plan</option>
              {planes.map((plan: any) => (
                <option key={plan} value={plan.tipo_plan}>
                  {`${plan.tipo_plan} - $${plan.precio}`}
                </option>
              ))}
              </select>
            </div>
            <div className={NuevoStyle.inputs}>
              <label htmlFor="fecha_inicio_usuario">Fecha de inicio</label>
              <input
                type="date"
                name="fecha_inicio_usuario"
                value={formData.fecha_inicio_usuario ?? initialUserData.fecha_inicio_usuario}
                onChange={handleChange}
              />
            </div>
            <div className={NuevoStyle.buttons}>
              <a className={NuevoStyle.volver} href="/usuarios">
                Volver
              </a>
              <button type="submit" className={NuevoStyle.registrarNuevo}>
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
