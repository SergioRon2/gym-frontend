import NuevoStyle from 'styles/nuevo.module.css'

export default function miembroNuevo(){
    return <>
        <div className={NuevoStyle.container}>
            <h1 className={NuevoStyle.title}>Registrar Nuevo Miembro</h1>
            <form action="" className={NuevoStyle.formulario}>
                <div className={NuevoStyle.inputs}>
                    <label htmlFor="">Nombre(s):</label>
                    <input type="text" />
                </div>
                <div className={NuevoStyle.inputs}>
                    <label htmlFor="">Apellido(s)</label>
                    <input type="text" />
                </div>
                <div className={NuevoStyle.select}>
                    <label htmlFor="">Identificacion:</label>
                    <select name="" id="">
                        <option value="">Tarjeta de identidad</option>
                        <option value="">Cedula de ciudadania</option>
                        <option value="">Cedula de extranjeria</option>
                        <option value="">Pasaporte</option>
                        <option value="">Permiso especial de Permanencia</option>
                    </select>
                </div>
                <div className={NuevoStyle.inputs}>
                    <label htmlFor="">Numero de ID:</label>
                    <input type="number" />
                </div>
                <div className={NuevoStyle.select}>
                    <label htmlFor="">Plan:</label>
                    <select name="" id="">
                        <option value="">Mensual - $100</option>
                        <option value="">Semanal - $10</option>
                        <option value="">Anual - $1000</option>
                        <option value="">Diario - $1</option>
                        <option value="">15 dias - $75</option>
                        <option value="">21 dias - $90</option>
                    </select>
                </div>
                <div className={NuevoStyle.inputs}>
                    <label htmlFor="">Fecha de inicio</label>
                    <input type="date" />
                </div>            
                <a className={NuevoStyle.registrarNuevo} href="">Registrar nuevo miembro</a>
            </form>
        </div>
    </>
}