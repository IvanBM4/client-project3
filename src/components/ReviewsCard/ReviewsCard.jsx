
import './ReviewsCard.css'
import { Button, Card, Modal } from "react-bootstrap"
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/auth.context'
import StarRatingComponent from '../StarRatingComponent/StarRatingComponent'
import EditReviewForm from '../EditReviewForm/EditReviewForm'
import reviewsServices from '../../services/reviews.services'
import { Pencil, X } from 'react-bootstrap-icons'

const ReviewsCard = ({ _id, author, rating, description, fetchReviewsByActivity }) => {

    const { loggedUser } = useContext(AuthContext)

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setEditShowModal] = useState(false)

    const handleShowDeleteModal = () => {
        setShowDeleteModal(true)
    }

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false)
    }

    const handleShowEditModal = () => {
        setEditShowModal(true)
    }

    const handleCloseEditModal = () => {
        setEditShowModal(false)
    }

    const deleteReview = () => {
        reviewsServices
            .deleteReview(_id)
            .then(() => fetchReviewsByActivity())
            .catch(err => console.log(err))
    }

    return (

        <div className='ReviewsCard mb-3'>

            <Card>
                <Card.Body>
                    <Card.Img src={author?.avatar} />
                    <div className="username-rating-row">
                        <Card.Title>{author?.username}</Card.Title>
                        <div className="rating">
                            <StarRatingComponent rating={rating} />
                        </div>
                    </div>
                    <Card.Text>{description}</Card.Text>
                    <div className="d-grid">
                        {
                            author?._id === loggedUser?._id &&
                            <div className="review-buttons">
                                <Pencil
                                    onClick={handleShowEditModal}
                                    style={{ cursor: 'pointer', color: 'white', background: 'rgba(0, 0, 0, 0.5)', borderRadius: '50%', padding: '6px' }}
                                    size={30}
                                />
                                <X
                                    onClick={handleShowDeleteModal}
                                    style={{ cursor: 'pointer', color: 'white', background: 'rgba(0, 0, 0, 0.5)', borderRadius: '50%', padding: '5px' }}
                                    size={30}
                                />
                            </div>
                        }
                    </div>
                </Card.Body>
            </Card>
            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>¡Cuidado!</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Estás seguro de que deseas eliminar esta review?</Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={() => { handleCloseDeleteModal(), deleteReview() }}>
                        Sí
                    </Button>
                    <Button variant="dark" >
                        No
                    </Button>
                </Modal.Footer>
            </Modal>


            <Modal show={showEditModal} onHide={handleCloseEditModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Editar review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditReviewForm id={_id} closeModal={handleCloseEditModal} fetchReviewsByActivity={fetchReviewsByActivity} />
                </Modal.Body>
            </Modal>

        </div>



    )

}

export default ReviewsCard