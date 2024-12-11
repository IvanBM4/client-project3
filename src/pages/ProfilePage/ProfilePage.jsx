import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/auth.context"
import authServices from "../../services/auth.services"
import { useParams } from "react-router-dom"
import Loader from "../../components/Loader/Loader"
import { Row, Col, Container } from "react-bootstrap"
import './ProfilePage.css'
import ActivityCard from "../../components/ActivityCard/ActivityCard"

const ProfilePage = () => {
    const [userData, setUserData] = useState({})
    const { loggedUser } = useContext(AuthContext)
    const { id: _id } = useParams()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchOneActivity()
    }, [])

    const fetchOneActivity = () => {
        authServices
            .getOneUser(_id)
            .then(({ data }) => {
                setUserData(data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    return (
        isLoading ? <Loader /> :
            <div className="ProfilePage">
                <Container className='mt-3' >
                    <Row className="align-items-center">

                        <Col xs={12} md={4} className="text-start">
                            <div className="avatar-img">
                                <img src={userData.avatar} alt="Avatar" />
                            </div>
                            <h1>¡Hola {userData.username}!</h1>
                            <p>Email: {loggedUser.email}</p>

                        </Col>
                        <Col xs={12} md={8} className="text-center ml-4" >
                            <div className="container-logged">
                                <h2>Actividades a las que asistiré</h2>
                                <Row className="mt-3">
                                    {userData.likedActivities?.map(elm => {
                                        return (<Col xs={12} md={6} key={elm._id} className="mb-4 ">
                                            <ActivityCard
                                                key={elm._id}
                                                cover={elm.cover}
                                                name={elm.name}
                                                _id={elm._id} />
                                        </Col>
                                        )
                                    })}
                                </Row>
                            </div>

                        </Col>

                    </Row>
                </Container>
            </div>
    )
}

export default ProfilePage
