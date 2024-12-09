import { useParams } from 'react-router-dom'
import ReviewsCard from '../ReviewsCard/ReviewsCard.jsx'
import { useEffect, useState } from 'react'
import reviewsServices from '../../services/reviews.services.jsx'
import Loader from '../Loader/Loader.jsx'
import { Row, Col, Button, Modal } from 'react-bootstrap'
import CreateReviewForm from "../../components/CreateReviewForm/CreateReviewForm";

const ReviewsList = () => {

    const { id: _id } = useParams()

    const [reviewsData, setReviewsData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [showReviewModal, setShowReviewModal] = useState(false)


    useEffect(() => {
        fetchReviewsByActivity()
    }, [])

    const fetchReviewsByActivity = () => {

        reviewsServices
            .fetchReviewsByActivity(_id)
            .then(({ data }) => {
                setReviewsData(data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    const handleShowReviewModal = () => {
        setShowReviewModal(true)
    }

    return (
        isLoading ? <Loader /> :
            <div className="ReviewsList">
                <Row>
                    {reviewsData.map(elm => {
                        return (
                            <Col lg={reviewsData.length > 1 ? 6 : 12} key={elm._id}>
                                <ReviewsCard {...elm} key={elm._id} fetchReviewsByActivity={fetchReviewsByActivity} />
                            </Col>
                        )
                    })}
                </Row>

                <Button variant="dark" onClick={handleShowReviewModal}>Añadir review</Button>

                <Modal show={showReviewModal} onHide={() => setShowReviewModal(false)} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Crear review</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CreateReviewForm id={_id} closeModal={() => { setShowReviewModal(false), fetchReviewsByActivity() }} />
                    </Modal.Body>
                </Modal>
            </div>
    )

}

export default ReviewsList





