import axios, { AxiosInstance } from 'axios';

axios.defaults.baseURL = 'https://ubiquitous-space-trout-xjxv95gvw6j3599-8000.app.github.dev/gymapp'


async function getRequestHeaders() {
  try {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      session: localStorage.getItem('access'),
    };

    return headers;
  } catch (error) {
    console.error('Error al obtener encabezados:', error);
    return {};
  }
}

export async function apiRestGet(path: string, body = {}): Promise<any> {
  try {
    const requestOptions: any = {}

    requestOptions.headers = await getRequestHeaders()
    requestOptions.params = body
    const response = await axios.get(path, requestOptions)
    return response.data
  } catch (e) {
    return e
  }
}

export async function apiRestDelete(path: string, body = {}): Promise<any> {
  try {
    const requestOptions: any = {}
    requestOptions.headers = await getRequestHeaders()

    requestOptions.params = body
    const response = await axios.delete(path, requestOptions)
    return response.data
  } catch (e) {
    return e
  }
}

export async function apiRestPost(path: string, body: any = {}): Promise<any> {
  try {
    const requestOptions: any = {}
    requestOptions.headers = await getRequestHeaders()
    requestOptions.data = body;

    const response = await axios.post(path, body, requestOptions)
    return response.data
  } catch (e) {
    return { error: e }
  }
}

export async function apiRestPatch(
  path: string,
  body: any = {},
  headers?: any
): Promise<any> {
  try {
    const requestOptions: any = {}
    requestOptions.headers = await getRequestHeaders()

    if (headers) {
      requestOptions.headers = {
        ...requestOptions.headers,
        ...headers,
      }
    }

    const response = await axios.patch(path, body, requestOptions)

    return response.data
  } catch (e) {
    return { error: e }
  }
}

export async function apiRestPut(path: string, body: any = {}): Promise<any> {
  try {
    const requestOptions: any = {}
    requestOptions.headers = await getRequestHeaders()

    const response = await axios.put(path, body, requestOptions)
    return response.data
  } catch (e) {
    return { error: e }
  }
}