import React, { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap"
import activitiesServices from "../../services/activities.services"
import { useParams } from "react-router-dom"
import './ActivityDetailsPage.css'
import Loader from "../../components/Loader/Loader"
import ReviewsList from "../../components/ReviewsList/ReviewsList";
import CreateReviewForm from "../../components/CreateReviewForm/CreateReviewForm";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { TIMEIMG, CALENDARIMG, EUROIMG } from "../../consts/image-paths";

const ActivityDetailsPage = () => {

    const { id: _id } = useParams()

    const [activity, setActivities] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [showReviewModal, setShowReviewModal] = useState(false)
    const [showAssistantModal, setShowAssistantModal] = useState(false)




    useEffect(() => {
        fetchOneActivity()
    }, [_id])

    const fetchOneActivity = () => {
        activitiesServices
            .fetchOneActivity(_id)
            .then(({ data }) => {
                setActivities(data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    const formatDate = (dateString) => {
        console.log("Fecha original:", dateString)
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

    const handleCancelReviewButton = () => {
        setShowReviewModal(false)
    }

    const handleJoinActivity = () => {
        activitiesServices
            .joinActivity(_id)
            .then(fetchOneActivity())
            .catch(err => console.log(err))
    }

    const handleShowAssistantModal = () => {
        setShowAssistantModal(true);
    };

    const handleCloseAssistantModal = () => {
        setShowAssistantModal(false);
    };

    return (
        isLoading ? <Loader /> :
            <div className="ActivityDetailsPage">
                <Container>
                    <Row>
                        <Col>
                            <div className="div-container">
                                <img src={activity.cover} alt={activity.title} />
                                <div className="container">
                                    <Tabs
                                        defaultActiveKey="Categorías:"
                                        id="justify-tab-example"
                                        className="mb-3"
                                        justify
                                    >
                                        <Tab eventKey="Categorías:" title="Categorías:">
                                            {activity.categories.map((categories, index) => (
                                                <p key={index}>{categories}</p>
                                            ))}
                                        </Tab>
                                        <Tab eventKey="Accesibilidad:" title="Accesibilidad:">
                                            {activity.accesibility.map((accesibility, index) => (
                                                <p key={index}>{accesibility}</p>
                                            ))}
                                        </Tab>
                                        <Tab eventKey="Orientado a: " title="Orientado a: ">
                                            {activity.target.map((target, index) => (
                                                <p key={index}>{target}</p>
                                            ))}
                                        </Tab>
                                        <Tab eventKey="Asistentes: " title="Asistentes: ">
                                            <div className="assistants-list">
                                                <Row>

                                                    {activity.assistants.map(elm => {
                                                        return (
                                                            <Col xs={12} md={4} key={elm._id} className="mb-4">
                                                                <div key={elm._id} className="assistant-item">
                                                                    <img src={elm.avatar} alt={elm.username} className="assistant-avatar" />
                                                                    <span>{elm.username}</span>
                                                                </div>
                                                            </Col>
                                                        );
                                                    })}
                                                </Row>
                                            </div>
                                        </Tab>
                                    </Tabs>

                                </div>


                                <Modal show={showModal} onHide={() => setShowReviewModal(false)}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>¡Cuidado!</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>¿Está seguro de que desea eliminar esta actividad?</Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" >
                                            Sí
                                        </Button>
                                        <Button variant="dark" onClick={handleCancelReviewButton}>
                                            No
                                        </Button>
                                    </Modal.Footer>
                                </Modal>


                                <Modal show={showReviewModal} onHide={handleCloseReviewModal} size="lg">
                                    <Modal.Header closeButton>
                                        <Modal.Title>Editar Actividad</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <CreateReviewForm id={_id} closeModal={handleCloseReviewModal} />
                                    </Modal.Body>
                                </Modal>


                            </div>
                        </Col>
                        <Col>
                            <div className="text-container">
                                <div className="header">
                                    <h1>{activity.name}</h1>
                                    <span className="subtext">Creado por: {activity.host.username}</span>
                                    <hr className="col-md-12" />
                                </div>
                                <div className="module">
                                    <p>{activity.description}</p>
                                </div>
                                <p>Ciudad: {activity.address?.city}</p>
                                <p>Calle: {activity.address?.street}</p>
                                <p>Código postal: {activity.address?.zipcode}</p>
                                <p>Orientado a:
                                    <ul>
                                        {activity.target.map((elm, idx) => {
                                            return <li key={idx}>{elm}</li>
                                        })}
                                    </ul>
                                </p>
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
                                    <Button variant="dark" className="assist-button" onClick={handleShowAssistantModal}>QUIERO ASISTIR</Button>
                                </div>
                            </div>
                        </Col>
                        <Modal show={showAssistantModal} onHide={handleCloseAssistantModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>¿Quiere asistir a este plan?</Modal.Title>
                            </Modal.Header>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => { handleJoinActivity(), handleCloseAssistantModal() }}>Sí</Button>
                                <Button variant="primary" onClick={handleCloseAssistantModal}>No</Button>
                            </Modal.Footer>
                        </Modal>
                    </Row>
                    <br />
                    <ReviewsList />
                </Container>
            </div >
    )
}

export default ActivityDetailsPage
