import { UserData, UserDataLogin } from "../interfaces/userInterfaces";
import userRepository from "../repositories/userRepository";
import { TOKEN } from "../utils/const";

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
  loginUser: async (userData: UserDataLogin) => {
    try {
      const user = await userRepository.loginUser(userData);
      localStorage.setItem(TOKEN, user.data.access_token);
      console.log(user)
      return user.data;
    } catch (error) {
      console.error('Error al loguear el usuario en el servicio', error);
      throw error;
    }
  }
};

export default userService;
