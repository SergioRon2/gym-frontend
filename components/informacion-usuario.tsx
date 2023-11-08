import axios from 'axios';
import ApiUrl from './ApiConfig'; // Importa la URL de la API

function datosUsuario() {
  const obtenerDatosDeUsuario = async () => {
    try {
      const response = await axios.get(`${ApiUrl}usuarios/`);
      const datos = response.data;
      console.log(datos);
      // Haz algo con los datos obtenidos
    } catch (error) {
      console.error('Error al obtener datos de la API', error);
    }
  }
}

export default datosUsuario;
