import { useState } from "react"
import ActivitiesList from "../../components/ActivitiesList/ActivitiesList"
import activitiesServices from "../../services/activities.services"
import { useEffect } from "react"

const ActivitiesPage = () => {

    const [activities, setActivities] = useState([])
    const [isLoading, setIsLoading] = useState(true)

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

    return (
        isLoading ? <h1>Cargando</h1> :
            <div className="ActivitiesPage">
                <h1>Encuentra tu plan</h1>
                <ActivitiesList activities={activities} />
            </div>
    )

}

export default ActivitiesPage