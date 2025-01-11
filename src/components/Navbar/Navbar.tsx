import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

const Navbar: React.FC = () => {
    return (
        <nav className="bg-oshgrey text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-semibold flex items-center space-x-2">
                    <a href="/" className="text-oshblack font-bold">Github</a>
                    <Badge className="bg-oshgreen">Ayuda</Badge>
                </div>

                <div className="relative">
                    {/* TODO: Si es que no está logeado, mostrar el icono de github */}
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center space-x-2 cursor-pointer">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-48">
                            <DropdownMenuItem onClick={() => { window.location.href = "/mis-peticiones"}}>
                                Mi cuenta
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => alert('Cerrar sesión')}>
                                Cerrar sesión
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    )
}

export default Navbar