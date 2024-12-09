import { Row, Col } from "react-bootstrap"
import ActivityCard from "../ActivityCard/ActivityCard"
import '../../services/activities.services'

const ActivitiesList = ({ activities, fetchActivities }) => {

    return (

        <div className="ActivitiesList">
            <Row>
                {
                    activities.map(elm => {
                        return (
                            <Col xs={12} md={4} key={elm._id} className="mb-4">
                                <ActivityCard {...elm}
                                    fetchActivities={fetchActivities}
                                    key={elm._id}
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