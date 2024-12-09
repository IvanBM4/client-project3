import { useState } from "react"
import ActivitiesList from "../../components/ActivitiesList/ActivitiesList"
import activitiesServices from "../../services/activities.services"
import { useEffect } from "react"
import { Container } from "react-bootstrap"
import './ActivitiesPage.css'
import ReactGoogleMap from "../../components/ReactGoogleMap/ReactGoogleMap"
import Loader from "../../components/Loader/Loader"

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
        isLoading ? <Loader /> :
            <Container>
                <div className="ActivitiesPage">
                    <h1>Encuentra el plan que mejor se adate a ti</h1>
                    <h2>Lista de planes y hay ahora {activities.length} planes</h2>
                    <ReactGoogleMap />
                    <ActivitiesList activities={activities} fetchActivities={fetchActivities} />
                </div>
            </Container>

    )

}

export default ActivitiesPage