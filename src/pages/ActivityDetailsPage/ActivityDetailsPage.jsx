import React, { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap"
import activitiesServices from "../../services/activities.services"
import { useParams } from "react-router-dom"
import './ActivityDetailsPage.css'
import Card from 'react-bootstrap/Card'
import Loader from "../../components/Loader/Loader"
import ReviewForm from "../../components/ReviewForm/ReviewForm"

const ActivityDetailsPage = () => {

    const { id: _id } = useParams()

    const [activity, setActivities] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [showReviewModal, setShowReviewModal] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false);

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

    if (isLoading) {
        return <p>Cargando...</p>
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

    const handleShowReviewModal = () => {
        setShowReviewModal(true)
    }

    const handleCloseReviewModal = () => {
        setShowReviewModal(false)
    }

    const handleCancelReviewButton = () => {
        setShowReviewModal(false)
    }


    return (
        isLoading ? <Loader /> :
            <div className="ActivityDetailsPage">
                <Container>
                    <Row>
                        <Col>
                            <div className="image-container">
                                <img src={activity.cover} alt={activity.title} />
                                <div className="buttons-container">
                                    <Button variant="dark">Categorías</Button>
                                    <Button variant="dark">Accesibilidad</Button>
                                    <Button variant="dark">Orientado a</Button>
                                    <Button variant="dark" onClick={handleShowReviewModal}>!Comparta su experiencia!</Button>
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
                                        <ReviewForm id={_id} closeModal={handleCloseReviewModal} />
                                    </Modal.Body>
                                </Modal>

                                <Card style={{ width: '100%', marginTop: '20px' }}>
                                    <Card.Img variant="top" src="holder.js/100px180" />
                                    <Card.Body>
                                        <Card.Title>Popino</Card.Title>
                                        <Card.Text>
                                            Comentario review de prueba
                                        </Card.Text>
                                        <Button variant="primary">editar</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Col>
                        <Col>
                            <div className="text-container">
                                <h1>{activity.name}</h1>
                                <div className="module">
                                    <p className="line-clamp">
                                        {activity.description}
                                    </p>
                                </div>
                                <p>{activity.address?.city}</p>
                                <p>{activity.address?.street}</p>
                                <p>{activity.address?.zipcode}</p>
                                {activity.target.map(elm => {
                                    return (<p>{elm}</p>)
                                })}
                                <p>{formatDate(activity.date)}</p>
                                <p>{formatDuration(activity.duration)}</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div >
    )
}

export default ActivityDetailsPage
