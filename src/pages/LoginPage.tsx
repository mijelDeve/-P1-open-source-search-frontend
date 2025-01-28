import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Toaster } from "../components/ui/toaster";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../hooks/use-toast";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService";
import { UserDataLogin } from "../interfaces/userInterfaces";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form"


const formLoginSchema = z.object({
  username: z.string().min(5, {
    message: "El usuario debe tener al menos 5 caracteres.",
  }),
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres.",
  }),
})


const LoginPage = () => {
  const { toast } = useToast()
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formLoginSchema>>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })


  const fetchLoginUser = async (values: UserDataLogin) => {
    const userData = {
      username: values.username,
      password: values.password,
    }

    try {
      await userService.loginUser(userData);
      toast({
        title: 'Usuario creado',
        description: 'El usuario se creó correctamente',
      })
      navigate('/');
    } catch (error) {
      toast({
        variant: "destructive",
        title: 'Error',
        description: 'Ocurrió un error al crear el usuario',
      })
      console.log(error)
    }
  }

  const onSubmit = (values: z.infer<typeof formLoginSchema>) => {
    console.log(values)
    fetchLoginUser(values);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-oshblack">
      <Toaster />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">

        <h2 className="text-2xl font-semibold text-center mb-6">Iniciar sesión</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Campo de Email */}
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

            {/* Campo de Contraseña */}
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

            {/* Botón de Enviar */}
            <Button
              type="submit"
              className="w-full bg-oshgreen text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 py-2 rounded-lg"
            >
              Iniciar sesión
            </Button>
          </form>
        </Form>
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