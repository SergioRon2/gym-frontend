import HomeStyle from 'styles/home.module.css'


export default function Home() {
  return (
    <>
      <div className={HomeStyle.container}>
        <h1 className={HomeStyle.title}>Bienvenido a GymSoftware!</h1>
        <h4 className={HomeStyle.encabezado}>En la barra de navegacion puedes encontrar las diferentes opciones que tiene nuestra plataforma</h4>
      </div>
    </>
  )
}
