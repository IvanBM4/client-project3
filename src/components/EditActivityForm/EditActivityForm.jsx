import { Col, Row, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

const EditActivityForm = ({ id }) => {
    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        console.log("Datos del formulario:", activityData)
        const activityData = Object.fromEntries(formData.entries());

    }
    return (
        <div className="editActivityForm">
            <Form>
                <Row className='mb-3'>
                    <Form.Group as={Col} xs={6} controlId='formActivityName'>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control placeholder="Añada el nuevo nombre" />
                    </Form.Group>
                    <Form.Group as={Col} xs={6} controlId='formActivityDescription'>
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control placeholder="Añada la nueva descripción" />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} xs={6} controlId='formActivityImage'>
                        <Form.Label>Imagen</Form.Label>
                        <Form.Control type="text" placeholder="URL de la imagen" />
                    </Form.Group>
                    <Form.Group as={Col} xs={6} controlId='formActivityCity'>
                        <Form.Label>Ciudad</Form.Label>
                        <Form.Control placeholder="Añada la nueva ciudad" type='text' />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} xs={6} controlId='formActivityStreet'>
                        <Form.Label>Calle</Form.Label>
                        <Form.Control placeholder="Añada la nueva calle" type='text' />
                    </Form.Group>
                    <Form.Group as={Col} xs={6} controlId='formActivityZipcode'>
                        <Form.Label>Código postal</Form.Label>
                        <Form.Control placeholder="Añada el nuevo código postal" type='number' />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} xs={6} controlId='formActivityLongitude'>
                        <Form.Label>Longitud</Form.Label>
                        <Form.Control placeholder="Añada la nueva longitud" type='number' />
                    </Form.Group>
                    <Form.Group as={Col} xs={6} controlId='formActivityLatitude'>
                        <Form.Label>Latitud</Form.Label>
                        <Form.Control placeholder="Añada la nueva latitud" type='number' />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} xs={4} controlId='formActivityTarget'>
                        <Form.Label>Orientado a</Form.Label>
                        <Form.Select aria-label="Seleccione una opción">
                            <option>Selecciona a quién está orientado el plan:</option>
                            <option value="1">Familiar</option>
                            <option value="2">Con amigos</option>
                            <option value="3">Con tu pareja</option>
                            <option value="4">Con tus hijos</option>
                            <option value="5">Tu solo</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} xs={4} controlId='formActivityDate'>
                        <Form.Label>Fecha</Form.Label>
                        <Form.Control type="date" />
                    </Form.Group>
                    <Form.Group as={Col} xs={4} controlId='formActivityPrice'>
                        <Form.Label>Precio</Form.Label>
                        <Form.Control placeholder="Añada el nuevo precio" type='number' />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} xs={4} controlId='formActivityDuration'>
                        <Form.Label>Duración</Form.Label>
                        <Form.Control placeholder="Añada la duración" type='number' />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} xs={6} controlId='formActivityTarget'>
                        <Form.Label>Orientado a</Form.Label>
                        <Form.Select aria-label="Seleccione una opción">
                            <option>Selecciona a quién está orientado el plan:</option>
                            <option value="1">Para discapacitados</option>
                            <option value="2">Para niños 7-10 años</option>
                            <option value="3">Para ancianos</option>
                            <option value="4">Para embarazadas</option>
                            <option value="5">Para bebés</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} xs={6} controlId='formActivityTarget'>
                        <Form.Label>Categorias</Form.Label>
                        <Form.Select aria-label="Seleccione una opción">
                            <option>Selecciona a quién está orientado el plan:</option>
                            <option value="1">Para discapacitados</option>
                            <option value="2">Para niños 7-10 años</option>
                            <option value="3">Para ancianos</option>
                            <option value="4">Para embarazadas</option>
                            <option value="5">Para bebés</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
                <Button variant="dark" type="submit">
                    Actualizar Evento
                </Button>
            </Form>
        </div>
    );
};

export default EditActivityForm;