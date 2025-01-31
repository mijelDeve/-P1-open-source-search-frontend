import { RequestData } from "../interfaces/requestInterfaces";
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
};

export default requestService;
