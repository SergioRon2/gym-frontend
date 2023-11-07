import AsistenciasStyle from 'styles/asistencia.module.css'

export default function Asistencias(){
    return <>
    <div className={AsistenciasStyle.container}>
        <div className={AsistenciasStyle.formulario}>
            <h1 className={AsistenciasStyle.title}>Asistencia</h1>
            <form action="">
                <div className={AsistenciasStyle.datos}>
                    <label className="mr-2 text-light">ID del Usuario:</label>
                    <input type="text" id="idUsuario" name="id_usuario" className="form-control" placeholder="Ingrese ID" />
                </div>
                <div className={AsistenciasStyle.datos}>
                    <label className="mr-2 text-light">Selecciona una fecha:</label>
                    <input type="date" id="fechaSelector" name="fecha" className="form-control" />
                </div>
                <a className={AsistenciasStyle.registrarAsistencia} href="">Registrar asistencia</a>
            </form>
        </div>
    </div>
</>
}