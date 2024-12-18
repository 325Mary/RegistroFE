import axios from 'axios';
import ApiUrl  from '../../../envBackend'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const API_URL = ApiUrl.apiUrl;

export const getUsuarios = () => {
    const token = localStorage.getItem('token');
    
    const headers = {
        Authorization: `Bearer ${token}`, 
      };
  return axios.get(`${API_URL}/ListarUsers`,  { headers })
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching Usuarios:', error);
      throw error;
    });
};

export const createUsuario = (usuarioData) => {
  return axios.post(`${API_URL}/register`, usuarioData)
    .then(response => response.data)
    .catch(error => {
      console.error('Error creating Usuario:', error);
      throw error;    
    });
};

export const iniciarSesion = async (email, password) => { 
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      const { token } = response.data;
      localStorage.setItem('authToken', token);
      localStorage.setItem('token', token);
      window.dispatchEvent(new Event('storage')); 
      return response.data;
    } catch (error) {
      console.error('Credenciales inválidas:', error);
      throw error;
    }
  };
  


export const editarUsuario = (idUsuario, usuarioData) => {
    const token = localStorage.getItem('token');
    
    const headers = {
        Authorization: `Bearer ${token}`, 
      };
    
  return axios.put(`${API_URL}/update/${idUsuario}`, usuarioData, {headers})
    .then(response => response.data)
    .catch(error => {
      console.error('Error editing Usuario:', error);
      throw error;
    });
};

export const eliminarUsuario = (idUsuario) => {
    const token = localStorage.getItem('token');
    
    const headers = {
        Authorization: `Bearer ${token}`, 
      };
  return axios.delete(`${API_URL}/delete/${idUsuario}`, {headers})
    .then(response => response.data)
    .catch(error => {
      console.error('Error deleting Usuario:', error);
      throw error;
    });
};


export const useCerrarSesion = () => {
    const navigate = useNavigate();
  
    const cerrarSesion = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No hay token almacenado en el localStorage');
        Swal.fire('Error', 'No se encontró un token válido', 'error');
        return;
      }
  
      try {
        const headers = {
          Authorization: `Bearer ${token}`, 
        };
  
        await axios.post(`${API_URL}/Logout`, {}, { headers });
  
        localStorage.removeItem('token');
        Swal.fire('Sesión cerrada', 'Has cerrado sesión exitosamente', 'success');
        navigate('/');
      } catch (error) {
        console.error('Error al cerrar sesión:', error.response?.data || error);
        Swal.fire('Error', 'No se pudo cerrar la sesión', 'error');
      }
    };
  
    return { cerrarSesion };
  };
  