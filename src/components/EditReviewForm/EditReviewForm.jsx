import { useEffect, useState } from "react"
import reviewsServices from "../../services/reviews.services"
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const EditReviewForm = ({ id, closeModal, fetchReviewsByActivity }) => {

    const [reviewData, setReviewsData] = useState({
        description: '',
        rating: 0
    })

    useEffect(() => {
        fetchOneReview()
    }, [])

    const fetchOneReview = () => {
        reviewsServices
            .fetchOneReview(id)
            .then(({ data }) => {
                setReviewsData(data)
            })
            .catch(err => console.log(err))
    }

    const handleInputChange = e => {
        const { value, name } = e.target
        setReviewsData({ ...reviewData, [name]: value })
    }

    const reqPayload = {
        ...reviewData
    }

    const submitEditReviewForm = e => {
        e.preventDefault()

        reviewsServices
            .editReview(reqPayload, id)
            .then(() => {
                fetchReviewsByActivity()
                closeModal()
            })
            .catch(err => console.log(err))

    }

    return (
        <div className="EditReviewForm">
            <Container>
                <Form onSubmit={submitEditReviewForm} className="mb-5">

                    <Form.Group className="mb-3" controlId="formReviewText">
                        <Form.Label>Comentario</Form.Label>
                        <Form.Control
                            type='text'
                            name='description'
                            value={reviewData.description}
                            rows={3}
                            placeholder="Escribe tu reseña aquí"
                            onChange={handleInputChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formRating">

                        <Form.Label>Calificación</Form.Label>
                        <Form.Select aria-label="Seleccione una calificación"
                            onChange={handleInputChange}
                            name='rating'
                            value={reviewData.rating}
                        >
                            {Array.from({ length: 10 }, (_, idx) => {
                                return (<option key={idx + 1} value={idx + 1}>{idx + 1}</option>)
                            })}
                        </Form.Select>
                    </Form.Group>

                    <Button className='reviewbutton' variant="dark" type="submit">
                        Editar reseña
                    </Button>
                </Form>
            </Container>
        </div>
    )
}

export default EditReviewForm