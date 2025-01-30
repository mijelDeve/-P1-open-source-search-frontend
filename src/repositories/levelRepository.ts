import axiosInstance from "../utils/axiosInstance";

const levelRepository = {
  getAllLevels: async () => {
    try {
      const response = await axiosInstance.get('/level');
      return response;
    } catch (error) {
      console.error('Error al obtener los niveles', error);
      throw error;
    }
  }, 
};

export default levelRepository
