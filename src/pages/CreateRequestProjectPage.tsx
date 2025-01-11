import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../components/ui/select"
import { Textarea } from "../components/ui/textarea"


const CreateRequestProjectPage = () => {
    return (
        <div className="container mx-auto p-6 lg:p-0">
            <h1 className="text-white mt-28 text-2xl font-bold">Crear petición</h1>
            <p className="text-white mt-8">Make changes to your account here. Click save when you're done.</p>

            <div className="my-4">
                <Label className="text-white">Título</Label>
                <Input
                    id="fullName"
                    type="text"
                    placeholder="Ingrese el título de su proyecto"
                    className="bg-white mt-2"
                />
            </div>

            <div className="my-4">
                <Label className="text-white">Lenguaje</Label>
                <Select>
                    <SelectTrigger className="w-full bg-white mt-2">
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
                <Label className="text-white">Descripción</Label>
                <Textarea className="bg-white mt-2" placeholder="Ingrese su descipción" />
            </div>

            <div className="my-4">
                <Label className="text-white">Enlace</Label>
                <Input
                    id="fullName"
                    type="text"
                    placeholder="Ingrese el enlace de su proyecto de github"
                    className="bg-white mt-2"
                />
            </div>

            <div className="my-4 w-full flex justify-center items-center">
                <Button className="bg-oshgreen">Crear petición</Button>
            </div>
        </div>

    )
}

export default CreateRequestProjectPage