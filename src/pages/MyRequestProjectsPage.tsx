import { useEffect, useState } from "react"
import ProjectItem from "../components/Common/ProjectItem"
import { useToast } from "../hooks/use-toast"
import requestService from "../services/requestService"
import { RequestData } from "../interfaces/requestInterfaces"


const MyRequestProjectsPage = () => {
  const { toast } = useToast()
  const [requests, setRequests] = useState<RequestData[]>([])

  const fetchAllRequestsByUser = async() => {
    try {
      const requestsData = await requestService.getAllRequestsByUser();
      console.log(requestsData.data)
      setRequests(requestsData?.data)
    } catch (error) {
      toast({
        variant: "destructive",
        title: 'Error',
        description: 'Ocurrió un error al obtener las peticiones del usuario',
      })
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAllRequestsByUser();
  }, [])

  return (
    <div className="container mx-auto p-6 lg:p-0">
      <h1 className="text-white mt-28 mb-10 text-2xl font-bold">Mis peticiones</h1>
      <div className="pb-8">
      {
          requests.map((item, index) => (
            <div key={index}>
              <ProjectItem link={item.link} title={item.title} tecnology={item?.language?.name || ""} author={item.user?.username || ""} date={item.created_at || ""} description={item.description} label={item?.level?.name || ""} />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MyRequestProjectsPage