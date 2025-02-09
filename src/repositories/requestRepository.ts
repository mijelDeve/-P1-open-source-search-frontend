import { RequestData, RequestGetData } from "../interfaces/requestInterfaces";
import axiosInstance from "../utils/axiosInstance";

const requestRepository = {
  createRequest: async (createRequestData: RequestData) => {
    try {
      const response = await axiosInstance.post('/requests/register', createRequestData);
      return response;
    } catch (error) {
      console.error('Error al crear la petición', error);
      throw error;
    }
  },
  getAllRequests: async (requestGetData: RequestGetData) => {
    try {
      const response = await axiosInstance.get('/requests/get-all-request', {
        params: requestGetData
      });
      return response;
    } catch (error) {
      console.error('Error al obtener las peticiones', error);
      throw error;
    }
  },
  getAllRequestsByUser: async () => {
    try {
      const response = await axiosInstance.get('/requests/get-by-user');
      return response;
    } catch (error) {
      console.error('Error al obtener las peticiones creadas por el usuario', error);
      throw error;
    }
  }
};

export default requestRepository
