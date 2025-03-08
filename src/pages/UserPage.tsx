import React, { useState } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { z } from 'zod'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form';
import { UserDataUpdate } from '../interfaces/userInterfaces';
import userService from '../services/userService';
import { useToast } from '../hooks/use-toast';

const formUpdateUserSchema = z.object({
  username: z.string().min(9, {
    message: "El nombre de usuario debe tener como mínimo 9 caracteres"
  }),
  email: z.string().email(),
  password: z.string().min(6, {
    message: 'La contraseña debe tener como mínimo 6 caracteres'
  })
})

const UserPage: React.FC = () => {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formUpdateUserSchema>>({
    resolver: zodResolver(formUpdateUserSchema),
    defaultValues: {}
  })

  const [isEditing, setIsEditing] = useState(false);

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleViewRequests = () => {
    window.location.href = '/mis-peticiones';
  };

  const fetchUpdateUserData = async (values: UserDataUpdate) => {
    const userData = {
      username: values.username,
      email: values.email,
      password: values.password
    }

    try {
      const userUpdateResponse = await userService.updateUser(userData);

      toast({
        title: 'Petición creada',
        description: userUpdateResponse.message
      })
      setIsEditing(false)
    } catch (error) {
      toast({
        variant: "destructive",
        title: 'Error',
        description: 'Ocurrió un error al crear la petición',
      })
    }
  }

  const onSubmit = (values: z.infer<typeof formUpdateUserSchema>) => {
    console.log("Submit")
    fetchUpdateUserData(values)
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Perfil de Usuario</h2>

        <div className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="my-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Username</FormLabel>
                      <FormControl>
                        <Input className="bg-white text-black" placeholder="Username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="my-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email</FormLabel>
                      <FormControl>
                        <Input className="bg-white text-black" placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="my-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Password</FormLabel>
                      <FormControl>
                        <Input className="bg-white text-black" placeholder="Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button className="w-full bg-yellow-500 text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500">
                Editar
              </Button>
            </form>
          </Form>
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
