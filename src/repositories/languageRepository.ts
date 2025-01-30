import axiosInstance from "../utils/axiosInstance";

const languageRepository = {
  getAllLanguages: async () => {
    try {
      const response = await axiosInstance.get('/language');
      return response;
    } catch (error) {
      console.error('Error al obtener los lenguajes', error);
      throw error;
    }
  }, 
};

export default languageRepository;
