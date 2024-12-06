import { useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import reviewsServices from '../../services/reviews.services';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth.context'

const CreateReviewForm = () => {

    const { loggedUser } = useContext(AuthContext)

    const { id: _id } = useParams()

    const [reviewData, setReviewsData] = useState({
        rating: 0,
        description: '',
    })

    const handleInputChange = e => {
        const { value, name } = e.target
        setReviewsData({ ...reviewData, [name]: value })
    }

    const handleSubmitForm = e => {
        e.preventDefault()

        const reqPayLoad = {
            activity: _id,
            author: loggedUser,
            ...reviewData
        }

        reviewsServices
            .saveReview(reqPayLoad)
            .then(alert('posteada'))
            .catch(err => console.log(err))
    }

    return (

        <div className="CreateReviewForm">

            <Container>
                <Form onSubmit={handleSubmitForm} className="mb-5">

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
                        Enviar Reseña
                    </Button>
                </Form>
            </Container>

        </div>

    )

}

export default CreateReviewForm;
