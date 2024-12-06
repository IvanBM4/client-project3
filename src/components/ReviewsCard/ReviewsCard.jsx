
import { Link } from 'react-router-dom'
import './ReviewsCard.css'
import { Button, Card, ButtonGroup, Modal } from "react-bootstrap"
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/auth.context'
import StarRatingComponent from '../StarRatingComponent/StarRatingComponent'
import EditReviewForm from '../EditReviewForm/EditReviewForm'

const ReviewsCard = ({ _id, author, rating, description, fetchReviewsByActivity }) => {

    const { loggedUser } = useContext(AuthContext)

    const [showModal, setShowModal] = useState(false)
    const [showEditModal, setEditShowModal] = useState(false)

    const handleCancelButton = () => {
        setShowModal(false)
    }

    const handleShowModal = () => {
        setShowModal(true)
    }

    const handleShowEditModal = () => {
        setEditShowModal(true)
    }

    const handleCloseEditModal = () => {
        setEditShowModal(false)
    }

    return (

        <div className='ReviewsCard mb-3'>

            <Card>
                <Card.Body>
                    <Card.Img src={author?.avatar} />
                    <Card.Title>{author?.username}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                    <StarRatingComponent rating={rating} />
                    <div className="d-grid">
                        {
                            author?._id === loggedUser?._id &&
                            <div className="review-buttons">
                                <ButtonGroup aria-label="Basic example">
                                    <Button
                                        variant='dark'
                                        size='sm'
                                        onClick={handleShowEditModal}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant='dark'
                                        size='sm'
                                    >
                                        Eliminar
                                    </Button>
                                </ButtonGroup>
                            </div>
                        }
                    </div>
                </Card.Body>
            </Card>

            <Modal show={showEditModal} onHide={handleCloseEditModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Editar review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditReviewForm id={_id} closeModal={handleCloseEditModal} />
                </Modal.Body>
            </Modal>

        </div>



    )

}

export default ReviewsCard