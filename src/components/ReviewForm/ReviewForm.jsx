import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const ReviewForm = () => {

    return (

        <div className="reviewform">

            <Container>
                <Form className="mb-5">

                    <Form.Group className="mb-3" controlId="formReviewText">
                        <Form.Label>Comentario</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Escribe tu reseña aquí" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formRating">
                        <Form.Label>Calificación</Form.Label>
                        <Form.Select aria-label="Seleccione una calificación">
                            <option>Selecciona tu calificación</option>
                            <option value="1">1- muy mala</option>
                            <option value="2">2</option>
                            <option value="3">3-mala</option>
                            <option value="4">4</option>

                            <option value="5">5- regular</option>
                            <option value="6">6</option>
                            <option value="7">7-buena</option>

                            <option value="8">8</option>
                            <option value="9">9</option>

                            <option value="10">10 excelente</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formAnonymous">
                        <Form.Check type="checkbox" label="Dejar reseña de manera anónima" />
                    </Form.Group>

                    <Button className='reviewbutton' variant="dark" type="submit">
                        Enviar Reseña
                    </Button>
                </Form>
            </Container>

        </div>

    )

}

export default ReviewForm;
