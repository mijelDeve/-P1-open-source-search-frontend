import { RequestData, RequestGetData } from "../interfaces/requestInterfaces";
import requestRepository from "../repositories/requestRepository";

const requestService = {
  createRequest: async (createRequestData: RequestData) => {
    try {
      const createRequestResponse = await requestRepository.createRequest(createRequestData);
      return createRequestResponse.data;
    } catch (error) {
      console.error('Error al crear la petición en el servicio', error);
      throw error;
    }
  },
  getAllRequests: async (requestGetData: RequestGetData) => {
    try {
      const requestGetDataResponse = await requestRepository.getAllRequests(requestGetData);
      return requestGetDataResponse.data;
    } catch (error) {
      console.error('Error al crear la petición en el servicio', error);
      throw error;
    }
  },
  getAllRequestsByUser: async() => {
    try {
      const requestGetDataByuserResponse = await requestRepository.getAllRequestsByUser();
      return requestGetDataByuserResponse.data;
    } catch (error) {
      console.error('Error al obtener las peticiones por usuario en el servicio', error);
      throw error;
    }
  }
};

export default requestService;
