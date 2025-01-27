import { UserData } from "../interfaces/userInterfaces";
import userRepository from "../repositories/userRepository";

const userService = {
  createUser: async (userData: UserData) => {
    try {
      const newUserData = await userRepository.createUser(userData);
      return newUserData;
    } catch (error) {
      console.error('Error al crear el usuario en el servicio', error);
      throw error;
    }
  },
};

export default userService;
