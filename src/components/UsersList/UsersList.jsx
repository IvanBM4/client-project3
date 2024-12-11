import { Col, Container, Dropdown, DropdownMenu, Row } from "react-bootstrap"
import UserCard from "../UserCard/UserCard"


const UsersList = ({ usersData }) => {


    return (
        <div className="UsersList">
            <Container>
                <Row>
                    {usersData.map(elm => {
                        return (
                            <Col className='mb-3' lg={6} key={elm}>
                                <UserCard key={elm} {...elm} />
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </div>

    )
}

export default UsersList