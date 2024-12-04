import { useState } from "react"
import ActivitiesList from "../../components/ActivitiesList/ActivitiesList"
import activitiesServices from "../../services/activities.services"
import { useEffect } from "react"
import { Container } from "react-bootstrap"
import './ActivitiesPage.css'

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
            <Container>
                <div className="ActivitiesPage">
                    <h1>Encuentra el plan que mejor se adate a ti</h1>
                    <h2>Lista de planes y hay ahora {activities.length} planes</h2>
                    <ActivitiesList activities={activities} fetchActivities={fetchActivities} />

                </div>
            </Container>

    )

}

export default ActivitiesPage