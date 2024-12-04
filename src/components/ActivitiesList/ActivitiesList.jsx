import { Row, Col } from "react-bootstrap"
import ActivityCard from "../ActivityCard/ActivityCard"

const ActivitiesList = ({ activities }) => {


    return (
        <div className="ActivitiesList">
            <Row>
                {
                    activities.map(elm => {
                        return (
                            <Col xs={12} md={4} key={elm._id} className="mb-4">
                                <ActivityCard {...elm} />
                            </Col>
                        )
                    })
                }
            </Row>
        </div>
    )
}

export default ActivitiesList