import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí podrías agregar la lógica para autenticar al usuario
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-oshblack">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        
        <h2 className="text-2xl font-semibold text-center mb-6">Iniciar sesión</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo de Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <Input
              id="email"
              type="email"
              placeholder="Ingrese su correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Campo de Contraseña */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <Input
              id="password"
              type="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Botón de Enviar */}
          <Button
            type="submit"
            className="w-full bg-oshgreen text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 py-2 rounded-lg"
          >
            Iniciar sesión
          </Button>
        </form>

        {/* Enlace para recuperar la contraseña */}
        <div className="mt-4 flex justify-between items-center">
          <a href="#" className="text-sm text-blue-600 hover:text-blue-800">¿Olvidaste tu contraseña?</a>
          <a href="/registro" className="text-sm text-blue-600 hover:text-blue-800">Registrate</a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;