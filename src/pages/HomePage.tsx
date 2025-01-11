import ProjectItem from "../components/Common/ProjectItem";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../components/ui/select";
import { data } from "../data/projects_data";

export default function HomePage() {
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
                <SelectLabel>Javascript</SelectLabel>
                <SelectItem value="apple">React</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="my-4">
          <Label className="text-white">Etiquetas</Label>
          <Select>
            <SelectTrigger className="w-full bg-white mt-4">
              <SelectValue placeholder="Labels" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Javascript</SelectLabel>
                <SelectItem value="apple">React</SelectItem>
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
        data.map((item, index) => (
          <div key={index}>
            <ProjectItem avatarImage={item.avatarImage} title={item.title} tecnology={item.tecnology} author={item.author} date={item.date} description={item.description} label={item.label}  />
          </div>
        ))
      }

    </div>

  )
}