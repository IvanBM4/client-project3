import React, { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap"
import activitiesServices from "../../services/activities.services"
import { useParams } from "react-router-dom"
import './ActivityDetailsPage.css'
import Loader from "../../components/Loader/Loader"
import ReviewsList from "../../components/ReviewsList/ReviewsList";
import CreateReviewForm from "../../components/CreateReviewForm/CreateReviewForm";
import { EMPTYHEART, FULLHEART } from "../../consts/image-paths";

const ActivityDetailsPage = () => {

    const { id: _id } = useParams()

    const [activity, setActivities] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [showReviewModal, setShowReviewModal] = useState(false)
    const [liked, setLiked] = useState(false);


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

    const handleShowReviewModal = () => {
        setShowReviewModal(true)
    }

    const handleCloseReviewModal = () => {
        setShowReviewModal(false)
    }

    const handleCancelReviewButton = () => {
        setShowReviewModal(false)
    }

    const handleLike = () => {
        setLiked(!liked);
    }
    return (
        isLoading ? <Loader /> :
            <div className="ActivityDetailsPage">
                <Container>
                    <Row>
                        <Col>
                            <div className="image-container">
                                <img src={activity.cover} alt={activity.title} />
                                <img
                                    className="Hearts"
                                    onClick={handleLike}
                                    src={liked ? FULLHEART : EMPTYHEART}
                                    alt="heart"

                                />
                                <div className="container">
                                    <p>Categorías: </p>
                                    {activity.categories && activity.categories.map((categories, index) => (
                                        <p key={index}>{categories}</p>
                                    ))}
                                    <p>Accesibilidad:</p>
                                    {activity.accesibility && activity.accesibility.map((accesibility, index) => (
                                        <p key={index}>{accesibility}</p>
                                    ))}
                                    <p> {activity.target} </p>
                                    <p> {activity.accesibility} </p>
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
                                        <CreateReviewForm id={_id} closeModal={handleCloseReviewModal} />
                                    </Modal.Body>
                                </Modal>


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
                    <ReviewsList />
                    <CreateReviewForm />
                </Container>
            </div >
    )
}

export default ActivityDetailsPage
