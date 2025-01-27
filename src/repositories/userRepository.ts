import { UserData } from "../interfaces/userInterfaces";
import axiosInstance from "../utils/axiosInstance";

const userRepository = {
  createUser: async (userData: UserData) => {
    try {
      const response = await axiosInstance.post('/user/register', userData);
      return response;
    } catch (error) {
      console.error('Error al crear el usuario', error);
      throw error;
    }
  },
};

export default userRepository;
