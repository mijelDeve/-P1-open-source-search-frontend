import React, { useState } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

const UserPage: React.FC = () => {  
  // Estado para los datos del usuario
  const [userData, setUserData] = useState({
    fullName: 'Juan Pérez',
    email: 'juan.perez@email.com',
    phoneNumber: '123-456-7890',
  });

  // Estado para indicar si los campos están en modo edición
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Lógica para guardar los cambios del perfil (puedes hacer una llamada a la API aquí)
    console.log('Datos guardados:', userData);
    setIsEditing(false); // Salir del modo de edición
  };

  const handleCancel = () => {
    // Volver a los datos originales
    setIsEditing(false);
    setUserData({
      fullName: 'Juan Pérez',
      email: 'juan.perez@email.com',
      phoneNumber: '123-456-7890',
    });
  };

  const handleViewRequests = () => {
    window.location.href = '/mis-peticiones';
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Perfil de Usuario</h2>
        
        <div className="space-y-4">
          {/* Nombre Completo */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              value={userData.fullName}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 block w-full px-4 py-2 border rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <Input
              id="email"
              name="email"
              type="email"
              value={userData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 block w-full px-4 py-2 border rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Número de Teléfono */}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Número de Teléfono</label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              value={userData.phoneNumber}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 block w-full px-4 py-2 border rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-6 space-x-4 text-center">
          {isEditing ? (
            <>
              <Button onClick={handleSave} className="w-32 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Guardar
              </Button>
              <Button onClick={handleCancel} className="w-32 bg-gray-400 text-white hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500">
                Cancelar
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="w-full bg-yellow-500 text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500">
              Editar
            </Button>
          )}
        </div>

        <div className="mt-6 text-center">
          <Button
            onClick={handleViewRequests}
            className="w-full bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 py-2 rounded-lg"
          >
            Ver mis peticiones
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
