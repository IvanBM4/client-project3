import { Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

const EditActivityForm = () => {

    return (
        <div className="editActivityForm">
            <Form>
                <Row className='mb-3'>
                    <Form.Group as={Col} xs={8} controlId='formActivityName' className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control placeholder="Añada el nuevo nombre" disabled />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control placeholder="Añada la nueva descripción" disabled />
                    </Form.Group>
                </Row>
                <Form.Group as={Col} xs={8} controlId='formActivityName' className="mb-3">
                    <Form.Label>Imagen</Form.Label>
                    <Form.Control type="text" id="inputimage" aria-describedby="passwordHelpBlock" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formRating">
                    <Form.Label>Categoría</Form.Label>
                    <Form.Select aria-label="Seleccione una categoría">
                        <option>Selecciona tu calificación</option>
                        <option value="1">primera categoria</option>
                        <option value="2">segunda categoria</option>
                        <option value="3">tercera categoria</option>
                        <option value="4">cuatra categoria</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Ciudad</Form.Label>
                    <Form.Control placeholder="Añada la nueva ciudad" type='text' />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Calle</Form.Label>
                    <Form.Control placeholder="Añada la nueva calle" type='text' />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Código postal</Form.Label>
                    <Form.Control placeholder="Añada el nuevo código postal" type='number' />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Longitud</Form.Label>
                    <Form.Control placeholder="Añada la nueva longitud" type='number' />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Latitud</Form.Label>
                    <Form.Control placeholder="Añada la nueva latitud" type='number' />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formRating">
                    <Form.Label>Orientado a</Form.Label>
                    <Form.Select aria-label="Seleccione una categoría">
                        <option>Selecciona a que está orientado tu plan</option>
                        <option value="1">Familiar</option>
                        <option value="2">Con amigos</option>
                        <option value="3">Con tu pareja</option>
                        <option value="4">Con tus hijos</option>
                        <option value="4">Tu solo</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control placeholder="Añada el nuevo precio" type='number' />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Check type="checkbox" label="Can't check this" disabled />
                </Form.Group>
            </Form>
        </div>
    )
}
export default EditActivityForm