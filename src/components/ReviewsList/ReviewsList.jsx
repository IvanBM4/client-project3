import { useParams } from 'react-router-dom'
import ReviewsCard from '../ReviewsCard/ReviewsCard.jsx'
import { useEffect, useState } from 'react'
import reviewsServices from '../../services/reviews.services.jsx'
import Loader from '../Loader/Loader.jsx'
import { Row, Col, Modal } from 'react-bootstrap'
import CreateReviewForm from "../../components/CreateReviewForm/CreateReviewForm";

const ReviewsList = ({ showReviewModal, closeReviewModal }) => {

    const { id: _id } = useParams()

    const [reviewsData, setReviewsData] = useState([])
    const [isLoading, setIsLoading] = useState(true)


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

    return (
        isLoading ? <Loader /> :
            <div className="ReviewsList">
                <Row>
                    {reviewsData.map(elm => {
                        return (
                            <Col lg={4} key={elm._id}>
                                <ReviewsCard {...elm} key={elm._id} fetchReviewsByActivity={fetchReviewsByActivity} />
                            </Col>
                        )
                    })}
                </Row>

                <Modal show={showReviewModal} onHide={closeReviewModal} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Añade un comentario</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CreateReviewForm id={_id} closeModal={() => { closeReviewModal(); fetchReviewsByActivity(); }} />                    </Modal.Body>
                </Modal>
            </div>
    )

}

export default ReviewsList





