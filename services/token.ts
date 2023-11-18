import { apiRestPost } from "./services";


async function obtenerTokenCSRF() {
    try {
        const response = await apiRestPost('/obtener-csrf-token/');
        const data = await response.json();
        console.log(data.csrfToken);
    } catch (error) {
        console.error('Error al obtener el token CSRF:', error);
        return null;
    }
}

obtenerTokenCSRF()