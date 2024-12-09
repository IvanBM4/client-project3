import { useEffect, useState } from "react"
import activitiesServices from "../../services/activities.services"
import Loader from "../Loader/Loader"
import { Marker } from "@react-google-maps/api"
import { Link, useNavigate } from "react-router-dom"


const ActivitiesMarker = () => {

    const [activities, setActivities] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        fetchActivities()
    }, [])

    const fetchActivities = () => {
        activitiesServices
            .fetchActivities()
            .then(({ data }) => {
                setActivities(data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    const handlePathDetails = id => {
        navigate(`/planes/detalles/${id}`)
    }

    return (
        isLoading ? <Loader /> :
            <>
                {
                    activities.map(elm => {
                        return (
                            <Marker onClick={() => handlePathDetails(elm._id)} key={elm._id} position={{ lng: elm.address.location.coords[1], lat: elm.address.location.coords[0] }} />
                        )
                    })
                }
            </>
    )
}

export default ActivitiesMarker