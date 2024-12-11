import { useEffect, useState } from "react"
import authServices from "../../services/auth.services"
import UsersList from "../../components/UsersList/UsersList"
import Loader from "../../components/Loader/Loader"
import ActivitiesCalendar from "../../components/ActivitiesCalendar/ActivitiesCalendar"
import { Col, Container, Nav, NavItem, NavLink, Row, Tab, TabContainer, TabContent, TabPane } from "react-bootstrap"
import activitiesServices from "../../services/activities.services"


const AdminPage = () => {

    const [usersData, setUsersData] = useState([])
    const [activitiesData, setActivitiesData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchUsers()
        fetchActivities()
    }, [])

    const fetchUsers = () => {
        authServices
            .fetchUsers()
            .then(({ data }) => {
                setUsersData(data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    const fetchActivities = () => {
        activitiesServices
            .fetchActivities()
            .then(({ data }) => {
                setActivitiesData(data)
            })
            .catch(err => console.log(err))
    }

    return (
        isLoading ? <Loader /> :
            <div className="AdminPage">
                <Container>
                    <h1>Panel de control para administradores</h1>
                    <TabContainer
                        defaultActiveKey='users'>
                        <Row>
                            <Col md='4'>
                                <Nav variant="pills" className="flex-column">
                                    <NavItem>
                                        <NavLink eventKey='users'>
                                            Usuarios ({usersData.length})
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink eventKey='calendar'>
                                            Calendario actividades ({activitiesData.length})
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            </Col>
                            <Col md='8'>
                                <TabContent>
                                    <TabPane eventKey='users'>

                                        <UsersList usersData={usersData} />
                                    </TabPane>
                                    <TabPane eventKey='calendar'>
                                        <ActivitiesCalendar />
                                    </TabPane>
                                </TabContent></Col>
                        </Row>
                    </TabContainer>
                </Container>


            </div>
    )
}

export default AdminPage