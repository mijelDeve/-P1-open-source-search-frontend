import { useState, useEffect } from "react"
import ProjectItem from "../components/Common/ProjectItem";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../components/ui/select";
import languageService from "../services/languageService";
import levelService from "../services/levelServices";
import { useToast } from "../hooks/use-toast";
import { Language } from "../interfaces/languageInterfaces";
import { Level } from "../interfaces/levelInterfaces";
import requestService from "../services/requestService";
import { RequestData } from "../interfaces/requestInterfaces";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form"

const formFiltersSchema = z.object({
  languageId: z.string().optional(),
  levelId: z.string().optional(),
})


export default function HomePage() {
  const { toast } = useToast()
  const [lenguages, setLenguages] = useState<Language[]>([])
  const [levels, setLevels] = useState<Level[]>([])
  const [requests, setRequests] = useState<RequestData[]>([])
  const [page] = useState<number>(1)
  const [limite] = useState<number>(10)


  const form = useForm<z.infer<typeof formFiltersSchema>>({
    resolver: zodResolver(formFiltersSchema),
    defaultValues: {
      languageId: "",
      levelId: "",
    },
  })


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

  const fetchAllRequest = async (values: z.infer<typeof formFiltersSchema>) => {
    console.log(values)

    const params = {
      page: String(page),
      limit: String(limite),
      languageId: values.languageId || "",
      levelId: values.levelId || ""
    }
    // console.log(currentLengauge)
    try {
      const requests = await requestService.getAllRequests(params);

      console.log(requests)
      setRequests(requests?.data?.data)
    } catch (error) {
      toast({
        variant: "destructive",
        title: 'Error',
        description: 'Ocurrió un error al obtener los lenguajes',
      })
      console.log(error)
    }
  }

  const onSubmit = (values: z.infer<typeof formFiltersSchema>) => {
    console.log(values)
    fetchAllRequest(values);
  };

  useEffect(() => {
    fetchLenguages()
    fetchLevels()
    fetchAllRequest({})
  }, [])

  console.log(levels)

  return (
    <div className="container mx-auto p-6 lg:p-0">
      <div className="flex justify-between items-center pt-10 pb-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full">
          <h1 className="text-3xl font-bold text-white">Comunidad en español para encontrar proyectos Open Source y colaborar</h1>
          <Button className="bg-oshgreen my-6 lg:my-0" onClick={() => { window.location.href = "/crear-peticion" }}>Crear petición</Button>
        </div>
      </div>

      <div className="flex flex-col py-2 text-white">
        <p className="mb-1">Encuentra proyectos open source y apoya en ellos.</p>
        <p className="mb-1">Mejora tu perfil de Github con colaboraciones.</p>
        <p className="mb-1">Comienza a contribuir o crear una colaboración</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="mt-6">
            <h2 className="text-white font-bold text-xl">Busca proyectos</h2>
            <div className="my-4">
              <FormField
                control={form.control}
                name="languageId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Lenguaje de programación</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value || ""}>
                        <SelectTrigger className="w-full bg-white mt-4">
                          <SelectValue placeholder="Seleccione un nivel" />
                          <div className="mt-2 text-black ">
                            {
                              lenguages.find((level) => level.id == field.value)?.name
                            }
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Elige tu lenguaje de programación</SelectLabel>
                            {/* <SelectItem ue="">Todos</SelectItem> */}
                            {
                              lenguages.map(item => (
                                <SelectItem key={item?.id} value={item?.id}>{item?.name}</SelectItem>
                              ))
                            }
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>

            <div className="my-4">
              {/* <Label className="text-white">Etiquetas</Label> */}


              <FormField
                control={form.control}
                name="levelId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Nivel de programación</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value || ""}>
                        <SelectTrigger className="w-full bg-white mt-4">
                          <SelectValue placeholder="Seleccione un nivel" />
                          <div className="mt-2 text-black ">
                            {
                              levels.find((level) => level.id == field.value)?.name
                            }
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Elige tu nivel de programación</SelectLabel>
                            {/* <SelectItem >Todos</SelectItem> */}
                            {
                              levels.map(item => (
                                <SelectItem key={item?.id} value={item?.id}>{item?.name}</SelectItem>
                              ))
                            }
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full flex justify-end">
              <Button type="submit" className="w-[150px] bg-oshgreen text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 py-2 rounded-lg">
                Buscar
              </Button>
            </div>
          </div>
        </form>
      </Form>

      <div className="pb-8">
        {
          requests.map((item, index) => (
            <div key={index}>
              <ProjectItem link={item.link} title={item.title} tecnology={item?.language?.name || ""} author={item.user?.username || ""} date={item.created_at || ""} description={item.description} label={item?.level?.name || ""} />
            </div>
          ))
        }
      </div>


      {
        requests.length == 0 && (
          <div className="text-white font-bold text-2xl">
            No hay proyectos para lo que buscas, intentalo más tarde
          </div>
        )
      }

    </div>

  )
}
