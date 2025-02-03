import { useState, useEffect } from "react"
import ProjectItem from "../components/Common/ProjectItem";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../components/ui/select";
import languageService from "../services/languageService";
import levelService from "../services/levelServices";
import { useToast } from "../hooks/use-toast";
import { Language } from "../interfaces/languageInterfaces";
import { Level } from "../interfaces/levelInterfaces";
import requestService from "../services/requestService";
import { RequestData } from "../interfaces/requestInterfaces";

export default function HomePage() {
  const { toast } = useToast()
  const [lenguages, setLenguages] = useState<Language[]>([])
  const [levels, setLevels] = useState<Level[]>([])
  const [requests, setRequests] = useState<RequestData[]>([])
  const [page] = useState<number>(1)
  const [limite] = useState<number>(10)
  console.log(requests)


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

  const fetchAllRequest = async () => { 
    try {
      const requests = await requestService.getAllRequests({
        page: String(page),
        limit: String(limite)
      });

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

  useEffect(() => {
    fetchLenguages()
    fetchLevels()
    fetchAllRequest()
  }, [])

  console.log(levels)

  return (
    <div className="container mx-auto p-6 lg:p-0">
      <div className="flex justify-between items-center pt-10 pb-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full">
          <h1 className="text-3xl font-bold text-white">Comunidad en español para encontrar proyectos Open Source y colaborar</h1>
          <Button className="bg-oshgreen my-6 lg:my-0" onClick={() => { window.location.href = "/crear-peticion"}}>Crear petición</Button>
        </div>
      </div>

      <div className="flex flex-col py-2 text-white">
        <p className="mb-1">Encuentra proyectos open source y apoya en ellos.</p>
        <p className="mb-1">Mejora tu perfil de Github con colaboraciones.</p>
        <p className="mb-1">Comienza a contribuir o crear una colaboración</p>
      </div>

      <div className="mt-6">
        <h2 className="text-white font-bold text-xl">Busca proyectos</h2>
        <div className="my-4">
          <Label className="text-white">Lenguaje</Label>
          <Select>
            <SelectTrigger className="w-full bg-white mt-4">
              <SelectValue placeholder="Selecciona un lenguaje" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Elige tu lenguaje de programación</SelectLabel>
                {
                  lenguages.map(item => (
                    <SelectItem key={item?.id} value={item?.id}>{item?.name}</SelectItem>
                  ))
                } 
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="my-4">
          <Label className="text-white">Etiquetas</Label>
          <Select>
            <SelectTrigger className="w-full bg-white mt-4">
              <SelectValue placeholder="Seleccione un nivel" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Elige tu nivel de programación</SelectLabel>
                {
                  levels.map(item => (
                    <SelectItem key={item?.id} value={item?.id}>{item?.name}</SelectItem>
                  ))
                }
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full flex justify-end">
          <Select>
            <SelectTrigger className="w-[200px] bg-white mt-4">
              <SelectValue placeholder="Antiguedad" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Antiguos</SelectLabel>
                <SelectItem value="apple">Recientes</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {
        requests.map((item, index) => (
          <div key={index}>
            <ProjectItem link={item.link} title={item.title} tecnology={item?.language?.name || ""} author={item.user?.username || ""} date={item.created_at || ""} description={item.description} label={item?.level?.name || ""}  />
          </div>
        ))
      }

    </div>

  )
}
