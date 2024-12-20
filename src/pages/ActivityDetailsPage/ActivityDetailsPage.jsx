import { useEffect, useState, useContext } from "react"
import { Button, Col, Container, Modal, Row, Toast } from "react-bootstrap"
import { useNavigate, useParams } from 'react-router-dom'
import activitiesServices from "../../services/activities.services"
import { Trash, Pencil, Chat } from 'react-bootstrap-icons'
import { AuthContext } from '../../contexts/auth.context'
import './ActivityDetailsPage.css'
import Loader from "../../components/Loader/Loader"
import ReviewsList from "../../components/ReviewsList/ReviewsList"
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import { TIMEIMG, CALENDARIMG, EUROIMG } from "../../consts/image-paths"
import EditActivityForm from "../../components/EditActivityForm/EditActivityForm"
import SendMessageForm from "../../components/SendMessageForm/SendMessageForm"

const ActivityDetailsPage = () => {
    const { loggedUser } = useContext(AuthContext)
    const { id: _id } = useParams()
    const navigate = useNavigate()
    const [activity, setActivity] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showReviewModal, setShowReviewModal] = useState(false)
    const [showAssistantModal, setShowAssistantModal] = useState(false)
    const [showEditModal, setEditShowModal] = useState(false)
    const [showMessageModal, setShowMessageModal] = useState(false)
    const [showJoinToast, setShowJoinToast] = useState(false)
    const [showLeaveToast, setShowLeaveToast] = useState(false)
    const [showDeleteToast, setShowDeleteToast] = useState(false)
    const [showEditToast, setShowEditToast] = useState(false)
    const [showCommentToast, setShowCommentToast] = useState(false)
    const [showContactToast, setShowContactToast] = useState(false)

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

    const handleJoinActivity = () => {
        activitiesServices
            .joinActivity(_id)
            .then(() => {
                fetchOneActivity()
                setShowJoinToast(true)
            })
            .catch(err => console.log(err))
    }

    const handleCloseAssistantModal = () => {
        setShowAssistantModal(false)
    }

    const handleCloseMessageModal = () => {
        setShowMessageModal(false)
        setShowContactToast(true)
    }

    const deleteActivity = () => {
        activitiesServices
            .deleteActivity(_id)
            .then(() => {
                setShowDeleteToast(true)
                setTimeout(() => navigate('/planes'), 3000)
            })
            .catch(err => console.log(err))
    }

    const handleLeaveActivity = () => {
        activitiesServices
            .leaveActivity(_id)
            .then(() => {
                fetchOneActivity()
                setShowLeaveToast(true)
            })
            .catch(err => console.log('Error al dejar la actividad:', err))
    }

    const handleShowEditModal = (event) => {
        event.preventDefault()
        setEditShowModal(true)
    }

    const handleCloseEditModal = () => {
        setEditShowModal(false)
    }

    const handleEditActivity = () => {
        setShowEditToast(true)
        handleCloseEditModal()
        fetchOneActivity()
    }

    const handleAddComment = () => {
        setShowCommentToast(true)
        setShowReviewModal(false)
    }

    return (
        isLoading ? <Loader /> : <div className="ActivityDetailsPage">
            <Container>
                <div style={{
                    position: 'fixed',
                    top: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1050,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <Toast onClose={() => setShowJoinToast(false)} show={showJoinToast} delay={3000} autohide className="mb-2">
                        <Toast.Header>
                            <strong className="me-auto">Inscripción</strong>
                        </Toast.Header>
                        <Toast.Body>¡Te has inscrito con éxito!</Toast.Body>
                    </Toast>
                    <Toast onClose={() => setShowLeaveToast(false)} show={showLeaveToast} delay={3000} autohide className="mb-2">
                        <Toast.Header>
                            <strong className="me-auto">Actividad</strong>
                        </Toast.Header>
                        <Toast.Body>Has dejado de asistir a la actividad</Toast.Body>
                    </Toast>
                    <Toast onClose={() => setShowDeleteToast(false)} show={showDeleteToast} delay={3000} autohide className="mb-2">
                        <Toast.Header>
                            <strong className="me-auto">Eliminación</strong>
                        </Toast.Header>
                        <Toast.Body>Actividad eliminada con éxito</Toast.Body>
                    </Toast>
                    <Toast onClose={() => setShowEditToast(false)} show={showEditToast} delay={3000} autohide className="mb-2">
                        <Toast.Header>
                            <strong className="me-auto">Edición</strong>
                        </Toast.Header>
                        <Toast.Body>Actividad editada correctamente</Toast.Body>
                    </Toast>
                    <Toast onClose={() => setShowCommentToast(false)} show={showCommentToast} delay={3000} autohide className="mb-2">
                        <Toast.Header>
                            <strong className="me-auto">Comentarios</strong>
                        </Toast.Header>
                        <Toast.Body>Comentario añadido correctamente</Toast.Body>
                    </Toast>
                    <Toast onClose={() => setShowContactToast(false)} show={showContactToast} delay={3000} autohide className="mb-2">
                        <Toast.Header>
                            <strong className="me-auto">Contacto</strong>
                        </Toast.Header>
                        <Toast.Body>Mensaje enviado correctamente</Toast.Body>
                    </Toast>
                </div>

                <Row>
                    <Col xs={12} md={6}>
                        <img className="fixed-height-image" src={activity.cover} alt={activity.title} />
                        <h3>{activity.name}</h3>
                        <div className="text-container">
                            <Row>
                                <Col>
                                    <div className="avatar">
                                        <img className='avatarimg' src={activity.host.avatar} alt="avatar" />
                                        <span className="subtext">Creado por: {activity.host.username}</span>
                                        <Col xs={6} md={3} className="contact-button w-100 d-flex justify-content-center">
                                        </Col>
                                    </div>
                                </Col>
                                <Col>
                                </Col>
                            </Row>
                            <Container>
                                <Row>
                                    <Col xs={12} md={6} className="mb-2">
                                        {activity.assistants?.some(elm => elm._id === loggedUser?._id) ? (
                                            <Button variant='dark' className='assist-button w-100' onClick={handleLeaveActivity}>
                                                Dejar de asistir
                                            </Button>
                                        ) : (
                                            <Button variant='dark' className='assist-button w-100' onClick={handleJoinActivity}>
                                                Quiero asistir
                                            </Button>
                                        )}
                                    </Col>
                                    <Col xs={12} md={6} className="mb-2">
                                        <Button variant="dark" className="w-100" onClick={() => setShowReviewModal(true)}>
                                            Comentarios
                                        </Button>
                                    </Col>

                                    {activity.host && activity.host._id === loggedUser?._id && (
                                        <Col xs={12} md={6} className="mb-2">
                                            <Button variant="dark" className="delete-icon w-100" onClick={() => setShowDeleteModal(true)}>
                                                <Trash size={18} /> Eliminar
                                            </Button>
                                        </Col>
                                    )}
                                    {activity.host && activity.host._id === loggedUser?._id && (
                                        <Col xs={12} md={6}>
                                            <Button variant="dark" className="delete-icon w-100" onClick={handleShowEditModal}>
                                                <Pencil size={18} /> Editar
                                            </Button>
                                        </Col>
                                    )}
                                    <Button onClick={() => setShowMessageModal(true)} variant="dark" > Contacta con {activity.host.username} para obtener mas información!
                                        <Chat size={18} className="ms-2" />
                                    </Button>
                                </Row>

                                <Modal show={showEditModal} onHide={handleCloseEditModal} size="lg">
                                    <Modal.Header closeButton>
                                        <Modal.Title>Editar plan</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <EditActivityForm id={_id} closeModal={handleEditActivity} updateActivityDetails={fetchOneActivity} />
                                    </Modal.Body>
                                </Modal>

                                <Modal show={showMessageModal} onHide={handleCloseMessageModal} size="lg">
                                    <Modal.Header closeButton>
                                        <Modal.Title>Enviar mensaje plan</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <SendMessageForm _id={activity.host._id} closeModal={handleCloseMessageModal} />
                                    </Modal.Body>
                                </Modal>

                            </Container>
                        </div>
                    </Col>

                    <Col xs={12} md={6}>
                        <div className="container">
                            <Tabs defaultActiveKey="Información" id="justify-tab-example" className="mb-3" justify>
                                <Tab eventKey="Información" title="Información">
                                    <p>{activity.description}</p>
                                    <p>Dirección: {activity.address?.street}, {activity.address?.zipcode}, {activity.address?.city}</p>
                                    <div className="icons">
                                        <Row className="align-items-center">
                                            <Col xs="auto" className="icon-col">
                                                <img src={CALENDARIMG} alt="calendar icon" className="icon" />
                                            </Col>
                                            <Col>
                                                <p>{formatDate(activity.date)}</p>
                                            </Col>
                                        </Row>
                                        <Row className="align-items-center">
                                            <Col xs="auto" className="icon-col">
                                                <img src={TIMEIMG} alt="time icon" className="icon" />
                                            </Col>
                                            <Col>
                                                <p>{formatDuration(activity.duration)}</p>
                                            </Col>
                                        </Row>
                                        <Row className="align-items-center">
                                            <Col xs="auto" className="icon-col">
                                                <img src={EUROIMG} alt="euro icon" className="icon" />
                                            </Col>
                                            <Col>
                                                <p>{activity.price} €</p>
                                            </Col>
                                        </Row>
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
                <ReviewsList showReviewModal={showReviewModal} closeReviewModal={() => setShowReviewModal(false)} onAddComment={handleAddComment} />
            </Container>
        </div>
    )
}

export default ActivityDetailsPage