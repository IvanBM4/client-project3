import { Col, Row, Image, ListGroupItem, ListGroup } from "react-bootstrap"
import { Link } from "react-router-dom"
import '../FilterListResults/FilterListResults.css'

const FilterListResults = ({ name, cover, _id, setShowMenu = { setShowMenu } }) => {
    return (
        <div className="FilterListResults">
            <ListGroup.Item>
                <Link to={`planes/detalles/${_id}`} onClick={() => setShowMenu()}>
                    <Row>
                        <Col sm="3" className="d-none d-md-block">
                            <Image src={cover} rounded />
                        </Col>
                        <Col sm="9">
                            <p>{name}</p>
                        </Col>
                    </Row>
                </Link>
            </ListGroup.Item>
        </div>
    )
}

export default FilterListResults