import { RequestData } from "../interfaces/requestInterfaces";
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
};

export default requestRepository
