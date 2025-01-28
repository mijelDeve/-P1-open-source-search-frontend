import { UserData, UserDataLogin } from "../interfaces/userInterfaces";
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
  loginUser: async (userData: UserDataLogin) => {
    try {
      const response = await axiosInstance.post('/auth/login', userData);
      return response;
    } catch (error) {
      console.error('Error al crear el usuario', error);
      throw error;
    }
  },
};

export default userRepository;
