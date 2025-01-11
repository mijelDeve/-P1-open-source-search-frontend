import ProjectItem from "../components/Common/ProjectItem"
import { data } from "../data/projects_data"


const MyRequestProjectsPage = () => {
    return (
        <div className="container mx-auto p-6 lg:p-0">
            <h1 className="text-white mt-28 mb-10 text-2xl font-bold">Mis peticiones</h1>
            {
                data.map((item, index) => (
                    <div key={index}>
                        <ProjectItem avatarImage={item.avatarImage} title={item.title} tecnology={item.tecnology} author={item.author} date={item.date} description={item.description} label={item.label} />
                    </div>
                ))
            }
        </div>
    )
}

export default MyRequestProjectsPage