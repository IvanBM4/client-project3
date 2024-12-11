import { useEffect, useState, useContext } from "react"
import { Button, Col, Container, Modal, Row, Stack } from "react-bootstrap"
import { useNavigate, useParams } from 'react-router-dom'
import activitiesServices from "../../services/activities.services"
import { Trash } from 'react-bootstrap-icons'
import { AuthContext } from '../../contexts/auth.context'
import './ActivityDetailsPage.css'
import Loader from "../../components/Loader/Loader"
import ReviewsList from "../../components/ReviewsList/ReviewsList"
import CreateReviewForm from "../../components/CreateReviewForm/CreateReviewForm"
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import { TIMEIMG, CALENDARIMG, EUROIMG } from "../../consts/image-paths"

const ActivityDetailsPage = () => {
    const { loggedUser } = useContext(AuthContext)
    const { id: _id } = useParams()
    const navigate = useNavigate()
    const [activity, setActivity] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showReviewModal, setShowReviewModal] = useState(false)
    const [showAssistantModal, setShowAssistantModal] = useState(false)

    useEffect(() => {
        fetchOneActivity()
    }, [_id])

    const fetchOneActivity = () => {
        activitiesServices
            .fetchOneActivity(_id)
            .then(({ data }) => {
                setActivity(data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const day = date.getDate()
        const month = date.toLocaleString('default', { month: 'long' })
        const year = date.getFullYear()
        return `${day} de ${month} de ${year}`
    }

    const formatDuration = (minutes) => {
        const hours = Math.floor(minutes / 60)
        const remainingMinutes = minutes % 60
        if (hours > 0 && remainingMinutes > 0) {
            return `${hours} horas y ${remainingMinutes} minutos`
        } else if (hours > 0) {
            return `${hours} horas`
        } else if (remainingMinutes > 0) {
            return `${remainingMinutes} minutos`
        } else {
            return 'Sin duración'
        }
    }

    const handleCloseReviewModal = () => {
        setShowReviewModal(false)
    }

    const handleJoinActivity = () => {
        activitiesServices
            .joinActivity(_id)
            .then(() => {
                fetchOneActivity()
            })
            .catch(err => console.log(err))
    }

    const handleCloseAssistantModal = () => {
        setShowAssistantModal(false)
    }

    const deleteActivity = () => {
        activitiesServices
            .deleteActivity(_id)
            .then(() => navigate('/planes'))
            .catch(err => console.log(err))
    }

    const handleLeaveActivity = () => {
        activitiesServices
            .leaveActivity(_id)
            .then(() => {
                fetchOneActivity()
            })
            .catch(err => console.log('Error al dejar la actividad:', err))
    }

    return (
        isLoading ? <Loader /> :
            <div className="ActivityDetailsPage">
                <Container>
                    <Row>
                        <Col>
                            <div className='details-actions'>
                                <img className="fixed-height-image" src={activity.cover} alt={activity.title} />
                            </div>
                            <hr />
                            <div className="text-container">
                                <h3>{activity.name}</h3>
                                <Stack direction="horizontal" gap={2}>
                                    {activity.assistants?.some(elm => elm._id === loggedUser?._id) ? (
                                        <Button variant='dark' className='assist-button' onClick={handleLeaveActivity}>
                                            Dejar de asistir
                                        </Button>
                                    ) : (
                                        <Button variant='dark' className='assist-button' onClick={handleJoinActivity}>
                                            Quiero asistir
                                        </Button>
                                    )}
                                    <Button variant="dark" onClick={() => setShowReviewModal(true)}>Añadir reseña</Button>
                                    {activity.host && activity.host._id === loggedUser?._id && (
                                        <Button variant="dark" className="delete-icon" onClick={() => setShowDeleteModal(true)}>
                                            <Trash size={18} />
                                        </Button>
                                    )}
                                </Stack>
                            </div>
                        </Col>
                        <Col>
                            <div className="container">
                                <Tabs defaultActiveKey="Información" id="justify-tab-example" className="mb-3" justify>
                                    <Tab eventKey="Información" title="Información">
                                        <p>{activity.description}</p>
                                        <span className="subtext">Creado por: {activity.host.username}</span>
                                        <p>Dirección: {activity.address?.street}, {activity.address?.zipcode}, {activity.address?.city}</p>
                                        <div className="icons">
                                            <div className="calendar">
                                                <img src={CALENDARIMG} alt="calendar icon" className="icon" />
                                                <p>{formatDate(activity.date)}</p>
                                            </div>
                                            <div className="time">
                                                <img src={TIMEIMG} alt="time icon" className="icon" />
                                                <p>{formatDuration(activity.duration)}</p>
                                            </div>
                                            <br />
                                            <div className="euro">
                                                <p>{activity.price}</p>
                                                <img src={EUROIMG} alt="euro icon" className="icon" />
                                            </div>
                                            <br />
                                        </div>
                                    </Tab>
                                    <Tab eventKey="Categorías" title="Categorías">
                                        {activity.categories.map((categories, index) => (
                                            <p key={index}>{categories}</p>
                                        ))}
                                    </Tab>
                                    <Tab eventKey="Accesibilidad" title="Accesibilidad">
                                        {activity.accesibility.map((accesibility, index) => (
                                            <p key={index}>{accesibility}</p>
                                        ))}
                                    </Tab>
                                    <Tab eventKey="Dirigido a" title="Dirigido a">
                                        {activity.target.map((target, index) => (
                                            <p key={index}>{target}</p>
                                        ))}
                                    </Tab>
                                    <Tab eventKey="Asistentes" title="Asistentes">
                                        <div className="assistants-list">
                                            <Row>
                                                {activity.assistants.map(elm => (
                                                    <Col xs={12} md={4} key={elm._id} className="mb-4">
                                                        <div key={elm._id} className="assistant-item">
                                                            <img src={elm.avatar} alt={elm.username} className="assistant-avatar" />
                                                            <span>{elm.username}</span>
                                                        </div>
                                                    </Col>
                                                ))}
                                            </Row>
                                        </div>
                                    </Tab>
                                </Tabs>
                            </div>
                        </Col>


                        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>¡Cuidado!</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>¿Está seguro de que desea eliminar esta actividad?</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={deleteActivity}>Sí</Button>
                                <Button variant="dark" onClick={() => setShowDeleteModal(false)}>No</Button>
                            </Modal.Footer>
                        </Modal>


                        <Modal show={showAssistantModal} onHide={handleCloseAssistantModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>¿Quiere asistir a este plan?</Modal.Title>
                            </Modal.Header>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => { handleJoinActivity(); handleCloseAssistantModal(); navigate(0); }}>Sí</Button>
                                <Button variant="primary" onClick={handleCloseAssistantModal}>No</Button>
                            </Modal.Footer>
                        </Modal>

                    </Row>


                    <br />
                    <ReviewsList showReviewModal={showReviewModal} closeReviewModal={() => setShowReviewModal(false)} />
                </Container >
            </div >
    )
}

export default ActivityDetailsPage
