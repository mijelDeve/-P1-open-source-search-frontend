import levelRepository from "../repositories/levelRepository";

const levelService = {
  getAllLevels: async () => {
    try {
      const allLevelsData = await levelRepository.getAllLevels();
      return allLevelsData.data;
    } catch (error) {
      console.error('Error al obtener los niveles en el servicio', error);
      throw error;
    }
  },
};

export default levelService;
