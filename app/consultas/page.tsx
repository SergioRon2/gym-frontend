import ConsultaStyle from 'styles/consulta.module.css'

export default function Consultas(){
    return <>
        <div className={ConsultaStyle.container}>
            <div className={ConsultaStyle.formulario}>
                <h1 className={ConsultaStyle.title}>Lista de Asistencias</h1>
                <form action="">
                    <div className={ConsultaStyle.datos}>
                        <label className="mr-2 text-light">Selecciona una fecha:</label>
                        <input type="date" id="fechaSelector" name="fecha" className="form-control" />
                    </div>
                    <div className={ConsultaStyle.datos}>
                        <label className="mr-2 text-light">ID del Usuario:</label>
                        <input type="text" id="idUsuario" name="id_usuario" className="form-control" placeholder="Ingrese ID" />
                    </div>
                    <a className={ConsultaStyle.consultarAsistencia} href="">Consultar asistencia</a>
                </form>
            </div>
        </div>
    </>
}