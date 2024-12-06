import { useEffect, useState } from "react"
import reviewsServices from "../../services/reviews.services"


const EditReviewForm = ({ id, closeModal }) => {

    const [reviewData, setReviewsData] = useState({
        description: '',
        rating: 0
    })

    // useEffect(() => {
    //     fetchOneReview()
    // })

    // const fetchOneReview = () => {
    //     reviewsServices
    //         .fetchOneReview()
    // }

    return (
        <div className="EditReviewForm">
            <h1>Formmm</h1>
        </div>
    )
}

export default EditReviewForm