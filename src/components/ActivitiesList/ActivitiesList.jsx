import { Row, Col } from "react-bootstrap"
import ActivityCard from "../ActivityCard/ActivityCard"
import '../../services/activities.services'
import activitiesServices from "../../services/activities.services"

const ActivitiesList = ({ activities, fetchActivities }) => {

    const deleteActivity = (_id) => {
        activitiesServices
            .deleteActivity(_id)
            .then(() => fetchActivities())
            .catch((err) => console.log(err))
    }

    return (


        <div className="ActivitiesList">
            <Row>
                {
                    activities.map(elm => {
                        return (
                            <Col xs={12} md={4} key={elm._id} className="mb-4">
                                <ActivityCard {...elm}
                                    deleteActivity={deleteActivity}
                                    fetchActivities={fetchActivities}
                                />

                            </Col>
                        )
                    })
                }
            </Row>
        </div>

    )
}

export default ActivitiesList