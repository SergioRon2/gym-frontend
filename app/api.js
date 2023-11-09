export async function getDataFromAPI() {
    try {
      const response = await fetch('http://127.0.0.1:8000/');
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error al obtener datos de la API:', error);
      return null;
    };
};
  