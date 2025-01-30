import languageRepository from "../repositories/languageRepository";

const languageService = {
  getAllLanguages: async () => {
    try {
      const allLanguagesData = await languageRepository.getAllLanguages();
      return allLanguagesData.data;
    } catch (error) {
      console.error('Error al obtener los lenguajes en el servicio', error);
      throw error;
    }
  },
};

export default languageService;
