import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"

interface ProjectItemProps {
    avatarImage: string;
    title: string;
    tecnology: string;
    author: string;
    date: string;
    description: string;
    label: string;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ avatarImage, title, tecnology, author, date, description, label }) => {
    return (
        <>

            <div className="flex flex-col lg:flex-row py-8">
                <div className="flex justify-center lg:justify-start">
                    <Avatar className="w-36 h-36 my-8 lg:my-0">
                        <AvatarImage src={avatarImage} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
                <div className="ms-0 lg:ms-8">
                    <div className="flex flex-row items-start lg:items-center space-x-2">
                        <h3 className="text-white text-xl font-bold">{title}</h3>
                        <Badge className="bg-[#6470EC]">{tecnology}</Badge>
                    </div>
                    <h4 className="text-white text-lg my-2">{author}</h4>
                    <p className="text-white my-2">{date}</p>
                    <p className="text-white my-2">{description}</p>
                    <Badge className="bg-[#D2B248] my-2">{label}</Badge>
                </div>
            </div>
            <div className="border-b border-white w-full"></div>
        </>

    )
}

export default ProjectItem