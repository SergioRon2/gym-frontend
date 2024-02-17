"use client";
import { apiRestDelete, apiRestGet } from "@/services/services";
import { useEffect, useState } from "react";
import StyleUsuarios from "styles/usuarios.module.css";
import swal from "sweetalert";
import classNames from "classnames";
import Link from "next/link";

export default function Miembros() {
  const [usuarios, setUsuarios] = useState([]);
  const [filtroTexto, setFiltroTexto] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("tipoPlan"); // Puedes cambiar el valor por defecto según tus necesidades

  useEffect(() => {
    const datosUsuarios = async () => {
      const res = await apiRestGet("plan-usuario");
      setUsuarios(res.tarjetas);
      console.log(res.tarjetas);
    };

    datosUsuarios();
  }, []);

  // ------------------------- ACTUALIZAR USUARIO --------------------------------

  const actualizarUsuario = async (userId: any) => {
    // Redirige a la página de actualización con la ID como parámetro
    window.location.href = `/actualizar?id=${userId}`;
  };

  // ------------------------- DETALLES DEL USUARIO --------------------------------

  const detallesUsuario = async (userId: any) => {
    try {
      const res = await apiRestGet(`detalle-usuario/${userId}`);
      console.log(res);
      swal({
        title: `Detalles del usuario`,
        text: `
          ID especial: ${res.id}
          Nombres: ${res.nombre}
          Apellidos: ${res.apellido}
          ID: ${res.id_usuario}
          Plan: ${res.tipo_plan}
          Tipo de identificacion: ${res.tipo_id}
          Fecha de inicio: ${res.fecha_inicio_gym}
          Dias restantes: ${res.dias_restantes}
          Fecha fin: ${res.fecha_fin}
          `,
        icon: "info",
    });
    
    } catch (error) {
      // Manejar errores en la solicitud API
      console.error("Error al obtener detalles del usuario:", error);
      swal(
        "Error",
        "Hubo un problema al obtener detalles del usuario!",
        "error"
      );
    }
  };

  // ------------------------- ELIMINAR USUARIO --------------------------------

  // Función para manejar la eliminación del usuario
  const eliminarUsuario = async (userId: number) => {
    // Mostrar una SweetAlert de confirmación
    const confirmDelete = await swal({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      buttons: ["Cancelar", "Sí, eliminar"],
      dangerMode: true,
    });

    // Verificar si el usuario confirmó la eliminación
    if (confirmDelete) {
      try {
        // Realizar la solicitud DELETE a la API
        const response = await apiRestDelete(`eliminar/${userId}`);
        console.log(response);

        // Verificar si la eliminación fue exitosa
        if (response.success) {
          // La eliminación fue exitosa, mostrar SweetAlert de éxito
          swal({
            title: "Éxito",
            text: response.mensaje,
            icon: "success",
          }).then(function () {
            window.location.href = "/usuarios";
          });
        } else {
          // La eliminación falló, mostrar SweetAlert de error
          swal("Error", response.mensaje, "error");
        }
      } catch (error: any) {
        // Manejar errores de la solicitud DELETE, si es necesario
        console.error("Error al eliminar el usuario:", error);

        // Mostrar SweetAlert de error con el mensaje adecuado
        swal("Error", error, "error");
      }
    }
  };

  const [hover, setHover] = useState(null);

  const filtrarUsuarios = () => {
    let usuariosFiltrados = usuarios;

    // Filtrar por texto
    if (filtroTexto.trim() !== "") {
      usuariosFiltrados = usuariosFiltrados.filter((user: any) =>
        `${user.nombre} ${user.apellido}`
          .toLowerCase()
          .includes(filtroTexto.toLowerCase())
      );
    }

    // Filtrar por categoría
    if (filtroCategoria !== "todos") {
      usuariosFiltrados = usuariosFiltrados.sort((a: any, b: any) => {
        // Ajusta según la categoría seleccionada (puedes agregar más categorías según sea necesario)
        if (filtroCategoria === "diasRestantes") {
          return a.dias_restantes - b.dias_restantes;
        } else if (filtroCategoria === "alfabeticamente") {
          return a.nombre.localeCompare(b.nombre);
        } else if (filtroCategoria === "tipoPlan") {
          return a.tipo_plan.localeCompare(b.tipo_plan);
        }

        return 0; // Si la categoría no coincide
      });
    }

    return usuariosFiltrados;
  };

  return (
    <>
      <div className={StyleUsuarios.container}>
        <div className={StyleUsuarios.opciones}>
          <div className={StyleUsuarios.filtrosContainer}>
            <input
              type="text"
              placeholder="Buscar por nombre"
              value={filtroTexto}
              onChange={(e) => setFiltroTexto(e.target.value)}
            />

            <select
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value)}
            >
              <option value="todos">Todos</option>
              <option value="diasRestantes">Días Restantes</option>
              <option value="alfabeticamente">Alfabéticamente</option>
              <option value="tipoPlan">Tipo de Plan</option>
            </select>
          </div>
          <div className={StyleUsuarios.nuevoUsuario}>
            <Link className={StyleUsuarios.link} href={"/nuevo"}>
              + Nuevo usuario
            </Link>
          </div>
        </div>
        <div className={StyleUsuarios.usuarios}>
          {usuarios.length > 0 ? (
            usuarios.map((user: any, index: any) => (
              <div
                className={classNames(
                  { [StyleUsuarios.cardRed]: user.dias_restantes_usuario <= 0 },
                  { [StyleUsuarios.card]: user.dias_restantes_usuario > 0 },
                  { [StyleUsuarios.hoveredCard]: hover === index }
                )}
                key={index}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(null)}
              >
                <h4>
                  Dias restantes <br />
                  <div className={StyleUsuarios.diasRestantes}>
                    {user.dias_restantes_usuario}
                  </div>
                </h4>
                <h2>
                  {user.nombre_usuario} {user.apellido_usuario}
                </h2>
                <h4>ID: {user.id_usuario_gym}</h4>
                <h4>Plan : {user.tipo_plan_gym}</h4>
                <div
                  className={StyleUsuarios.buttons}
                  style={{ display: hover === index ? "block" : "none" }}
                >
                  <button
                    onClick={() => {
                      detallesUsuario(user.id);
                    }}
                    className={StyleUsuarios.button}
                  >
                    Ver
                  </button>
                  <button
                    onClick={() => {
                      actualizarUsuario(user.id);
                    }}
                    className={StyleUsuarios.button}
                  >
                    Actualizar
                  </button>
                  <button
                    onClick={() => {
                      eliminarUsuario(user.id);
                    }}
                    className={StyleUsuarios.button}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h2>
              Para crear un usuario, haz clic en <b>Nuevo Usuario</b>
            </h2>
          )}
        </div>
      </div>
    </>
  );
}
