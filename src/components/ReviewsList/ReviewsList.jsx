import { useParams } from 'react-router-dom'
import ReviewsCard from '../ReviewsCard/ReviewsCard.jsx'
import { useEffect, useState } from 'react'
import reviewsServices from '../../services/reviews.services.jsx'
import Loader from '../Loader/Loader.jsx'
import { Row, Col } from 'react-bootstrap'

const ReviewsList = () => {

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
                            <Col lg={reviewsData.length > 1 ? 6 : 12} key={elm._id}>
                                <ReviewsCard {...elm} key={elm._id} fetchReviewsByActivity={fetchReviewsByActivity} />
                            </Col>
                        )
                    })}
                </Row>
            </div>
    )

}

export default ReviewsList





