import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

const RegisterPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí agregas la lógica para manejar el registro (validación, llamada a API, etc.)
    console.log('Nombre completo:', fullName);
    console.log('Correo electrónico:', email);
    console.log('Contraseña:', password);
    console.log('Confirmar contraseña:', confirmPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-oshblack">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Registrarse</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo de Nombre Completo */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
            <Input 
              id="fullName"
              type="text"
              placeholder="Ingrese su nombre completo"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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

          {/* Campo de Confirmación de Contraseña */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirme su contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <Button
            type="submit" 
            className="w-full bg-oshgreen text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 py-2 rounded-lg"
          >
            Registrarse
          </Button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">¿Ya tienes una cuenta? <a href="/ingreso" className="text-blue-600 hover:text-blue-800">Iniciar sesión</a></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
