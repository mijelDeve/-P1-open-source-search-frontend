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
      // title: "",
      // description: "",
      // link: "",
      // languageId: "",
      // levelId: "",
    },
  })

  const fetchCreateRequest = async (values: RequestData) => {
    const requestData = {
      title: values.title,
      description: values.description,
      link: values.link,
      languageId: values.languageId,
      levelId: values.levelId,
      userId: String(9),
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
    console.log(values)
    fetchCreateRequest(values);
  };

  useEffect(() => {
    fetchLenguages()
    fetchLevels()
  }, [])

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
          <div className="my-4">
            <FormField
              control={form.control}
              name="languageId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Lenguaje de programación</FormLabel>
                  <FormControl className="text-black">
                    <Select value={field.value} onValueChange={(value) => field.onChange(value)}>
                      <SelectTrigger className="w-full bg-white mt-2 text-black">
                        <SelectValue className="text-black" placeholder="Selecciona un lenguaje" />
                      </SelectTrigger>
                      <SelectContent className="text-black">
                        <SelectGroup>
                          {lenguages.map((item) => (
                            <SelectItem className="text-black" key={item.id} value={item.id}>
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

          {/* Nivel */}
          <div className="my-4 text-black">
            <FormField
              control={form.control}
              name="levelId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Nivel de programación</FormLabel>
                  <FormControl>
                    <Select onValueChange={(value) => field.onChange(value)} value={field.value}>
                      <SelectTrigger className="w-full bg-white mt-2 text-black">
                        <SelectValue placeholder="Selecciona un nivel"  className="text-black" />
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