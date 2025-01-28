import React from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import userService from '../services/userService';
import { useToast } from '../hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Toaster } from '../components/ui/toaster';
import { z } from "zod"
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form"
import { UserData } from '../interfaces/userInterfaces';

const formRegisterSchema = z.object({
  username: z.string().min(5, {
    message: "El usuario debe tener al menos 5 caracteres.",
  }),
  email: z.string().email({
    message: "Correo no válido.",
  }),
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres.",
  }),
  confirmPassword: z.string(),
})

const RegisterPage: React.FC = () => {
  const { toast } = useToast()
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formRegisterSchema>>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })


  const fetchCreateUser = async (values: UserData) => {
    const userData = {
      username: values.username,
      email: values.email,
      password: values.password,
    }
    try {
      const data = await userService.createUser(userData);
      console.log(data)
      toast({
        title: 'Usuario creado',
        description: 'El usuario se creó correctamente',
      })
      navigate('/ingreso');
    } catch (error) {
      toast({
        variant: "destructive",
        title: 'Error',
        description: 'Ocurrió un error al crear el usuario',
      })
      console.log(error)
    }
  }

  const onSubmit = (values: z.infer<typeof formRegisterSchema>) => {
    fetchCreateUser(values);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-oshblack">
      <Toaster />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Registrarse</h2>


        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Campo de Nombre Completo */}
            <div>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de usuario</FormLabel>
                    <FormControl>
                      <Input placeholder="Usuario" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Campo de Email */}
            <div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo</FormLabel>
                    <FormControl>
                      <Input placeholder="Correo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input placeholder="Correo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Campo de Confirmación de Contraseña */}
            <div>
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar contraseña</FormLabel>
                    <FormControl>
                      <Input placeholder="Repite tu contraseña" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-oshgreen text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 py-2 rounded-lg"
            >
              Registrarse
            </Button>
          </form>
        </Form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">¿Ya tienes una cuenta? <a href="/ingreso" className="text-blue-600 hover:text-blue-800">Iniciar sesión</a></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
