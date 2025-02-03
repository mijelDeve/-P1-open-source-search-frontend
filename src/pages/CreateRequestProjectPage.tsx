import { z } from "zod"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { useToast } from "../hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { Language } from "../interfaces/languageInterfaces"
import { Level } from "../interfaces/levelInterfaces"
import languageService from "../services/languageService"
import levelService from "../services/levelServices"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form"
import requestService from "../services/requestService"
import { RequestData } from "../interfaces/requestInterfaces"
import { useNavigate } from "react-router-dom"



const formCreateRequestSchema = z.object({
  title: z.string().min(5, {
    message: "El título debe tener al menos 5 caracteres.",
  }),
  description: z.string().min(6, {
    message: "La descripción debe tener al menos 6 caracteres.",
  }),
  link: z.string().url({
    message: "El enlace debe ser una URL válida.",
  }),
  languageId: z.string().min(1, { message: "Selecciona un lenguaje" }), // Hacer obligatorio
  levelId: z.string().min(1, { message: "Selecciona un nivel" }), // Hacer obligatorio
})



const CreateRequestProjectPage = () => {
  const { toast } = useToast()
  const navigate = useNavigate();

  const [lenguages, setLenguages] = useState<Language[]>([])
  const [levels, setLevels] = useState<Level[]>([])

  const form = useForm<z.infer<typeof formCreateRequestSchema>>({
    resolver: zodResolver(formCreateRequestSchema),
    defaultValues: {
    },
  })

  const fetchCreateRequest = async (values: RequestData) => {
    const requestData = {
      title: values.title,
      description: values.description,
      link: values.link,
      languageId: values.languageId,
      levelId: values.levelId,
    }

    try {
      await requestService.createRequest(requestData);
      toast({
        title: 'Petición creada',
        description: 'La petición se creó correctamente',
      })
      navigate('/');
    } catch (error) {
      toast({
        variant: "destructive",
        title: 'Error',
        description: 'Ocurrió un error al crear la petición',
      })
    }
  }


  const fetchLenguages = async () => {
    try {
      const lenguages = await languageService.getAllLanguages();
      console.log(lenguages)
      setLenguages(lenguages.data)
    } catch (error) {
      toast({
        variant: "destructive",
        title: 'Error',
        description: 'Ocurrió un error al obtener los lenguajes',
      })
      console.log(error)
    }
  }

  const fetchLevels = async () => {
    try {
      const levels = await levelService.getAllLevels();
      setLevels(levels.data)
    } catch (error) {
      toast({
        variant: "destructive",
        title: 'Error',
        description: 'Ocurrió un error al obtener los lenguajes',
      })
      console.log(error)
    }
  }

  const onSubmit = (values: z.infer<typeof formCreateRequestSchema>) => {
    fetchCreateRequest(values);
  };

  useEffect(() => {
    fetchLenguages()
    fetchLevels()
  }, [])

  console.log(lenguages)

  return (
    <div className="container mx-auto p-6 lg:p-0">
      <h1 className="text-white mt-28 text-2xl font-bold">Crear petición</h1>
      <p className="text-white mt-8">Haz cambios en tu cuenta aquí. Haz clic en guardar cuando hayas terminado.</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Título */}
          <div className="my-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Título</FormLabel>
                  <FormControl>
                    <Input className="bg-white text-black" placeholder="Título" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Descripción */}
          <div className="my-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Descripción</FormLabel>
                  <FormControl>
                    <Input className="bg-white text-black" placeholder="Descripción" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Enlace */}
          <div className="my-4">
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Link</FormLabel>
                  <FormControl>
                    <Input className="bg-white text-black" placeholder="Link" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Lenguaje */}
          <div className="my-4 text-black">
            <FormField
              control={form.control}
              name="languageId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Lenguaje de programación</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value || ''}>
                    <FormControl className="bg-white text-black">
                      <SelectTrigger className="flex justify-start">
                        <SelectValue placeholder="Selecciona un lenguaje" />
                        <div className="mt-2 text-black ">
                          {
                            lenguages.find((lang) => lang.id == field.value)?.name
                          }
                        </div>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      {lenguages.map((item) => (
                        <SelectItem className="text-black" key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {/* Mostrar el valor de field.value temporalmente para depuración */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Nivel */}
          <div className="my-4 text-black">
            <FormField
              control={form.control}
              name="levelId"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-white">Nivel de programación</FormLabel>
                  <FormControl className="bg-white text-black">
                    <Select onValueChange={(value) => field.onChange(value)} value={field.value}>
                      <SelectTrigger className="flex justify-start bg-white">
                        <SelectValue placeholder="Selecciona un nivel" className="text-black" />
                        <div className="mt-2 text-black ">
                          {
                            levels.find((lang) => lang.id == field.value)?.name
                          }
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {levels.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="my-4 w-full flex justify-center items-center">
            <Button className="bg-oshgreen">Crear petición</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default CreateRequestProjectPage