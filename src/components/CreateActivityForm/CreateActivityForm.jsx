import { useState } from "react"
import { Container, Form } from "react-bootstrap"
import { Col, Row, Button } from 'react-bootstrap';
import activitiesServices from "../../services/activities.services";
import { useNavigate } from "react-router-dom";

const CreateActivityForm = () => {

    const navigate = useNavigate()

    const [activityData, setActivityData] = useState({
        name: '',
        cover: '',
        description: '',
        price: 0,
        available: true,
        date: '',
        categories: [''],
        target: [''],
        accesibility: [''],
        duration: 0,
    })

    const [addressData, setAddressData] = useState({
        city: '',
        zipcode: 0,
        street: ''
    })

    const [locationData, setLocationData] = useState({
        longitude: 0,
        latitude: 0
    })
    const handleActivityChange = e => {
        const { name, value, checked, type } = e.target
        const result = type === 'checkbox' ? checked : value
        setActivityData({ ...activityData, [name]: result })
    }

    const handleAddressChange = e => {
        const { name, value } = e.target
        setAddressData({ ...addressData, [name]: value })
    }

    const handleLocationsChange = e => {
        const { name, value } = e.target
        setLocationData({ ...locationData, [name]: value })
    }


    const handleCategoriesChange = (e, idx) => {
        const { value } = e.target
        const categoriesCopy = [...activityData.categories]
        categoriesCopy[idx] = value
        setActivityData({ ...activityData, categories: categoriesCopy })
    }

    const handleTarget = (e, idx) => {
        const { value } = e.target
        const targetCopy = [...activityData.target]
        targetCopy[idx] = value
        setActivityData({ ...activityData, target: targetCopy })
    }

    const handleAccesibility = (e, idx) => {
        const { value } = e.target
        const accesibilityCopy = [...activityData.accesibility]
        accesibilityCopy[idx] = value
        setActivityData({ ...activityData, accesibility: accesibilityCopy })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const reqPayLoadAddress = {
            ...addressData,
            location: { ...locationData }
        };

        const reqPayLoad = {
            ...activityData,
            address: reqPayLoadAddress
        };

        activitiesServices
            .saveActivity(reqPayLoad)
            .then(() => {
                alert('nooooooo');
            })
            .catch(err => {
                console.error("Error al guardar la actividad:", err);
            });
    }

    return (
        <div className="CreateActivityForm">
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Row className='mb-3'>
                        <Form.Group as={Col} xs={6} controlId='formActivityName'>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                name="name"
                                value={activityData.name}
                                placeholder="Añada el nuevo nombre"
                                onChange={handleActivityChange}
                            />
                        </Form.Group>
                        <Form.Group as={Col} xs={6} controlId='formActivityDescription'>
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                name="description"
                                value={activityData.description}
                                onChange={handleActivityChange}
                                placeholder="Añada la nueva descripción"
                            />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} xs={6} controlId='formActivityImage'>
                            <Form.Label>Imagen</Form.Label>
                            <Form.Control
                                name="cover"
                                value={activityData.cover}
                                onChange={handleActivityChange}
                                type="text"
                                placeholder="URL de la imagen"
                            />
                        </Form.Group>
                        <Form.Group as={Col} xs={6} controlId='formActivityCity'>
                            <Form.Label>Ciudad</Form.Label>
                            <Form.Control
                                name="city"
                                value={addressData.city}
                                onChange={handleAddressChange}
                                placeholder="Añada la nueva ciudad"
                                type='text'
                            />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} xs={6} controlId='formActivityStreet'>
                            <Form.Label>Calle</Form.Label>
                            <Form.Control
                                name='street'
                                value={addressData.street}
                                onChange={handleAddressChange}
                                placeholder="Añada la nueva calle"
                                type='text'
                            />
                        </Form.Group>
                        <Form.Group as={Col} xs={6} controlId='formActivityZipcode'>
                            <Form.Label>Código postal</Form.Label>
                            <Form.Control
                                name='zipcode'
                                value={addressData.zipcode}
                                onChange={handleAddressChange}
                                placeholder="Añada el nuevo código postal"
                                type='number'
                            />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} xs={6} controlId='formActivityLongitude'>
                            <Form.Label>Longitud</Form.Label>
                            <Form.Control
                                name='longitude'
                                value={locationData.longitude}
                                onChange={handleLocationsChange}
                                placeholder="Añada la nueva longitud"
                                type='number'
                            />
                        </Form.Group>
                        <Form.Group as={Col} xs={6} controlId='formActivityLatitude'>
                            <Form.Label>Latitud</Form.Label>
                            <Form.Control
                                name='latitude'
                                value={locationData.latitude} handleLocationsChange
                                onChange={handleLocationsChange}
                                placeholder="Añada la nueva latitud"
                                type='number'
                            />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} xs={4} controlId='formActivityTarget'>
                            <Form.Label>Orientado a</Form.Label>
                            <Form.Select
                                name="target"
                                value={activityData.target[0]}
                                onChange={e => handleTarget(e, 0)}
                                aria-label="Seleccione una opción">
                                <option>Selecciona a quién está orientado el plan:</option>
                                <option value='Familiar'>Familiar</option>
                                <option value='Con amigos'>Con amigos</option>
                                <option value='Con tu pareja'>Con tu pareja</option>
                                <option value='Con tus hijos'>Con tus hijos</option>
                                <option value='Tu solo'>Tu solo</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} xs={4} controlId='formActivityDate'>
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={activityData.date}
                                onChange={handleActivityChange}
                            />
                        </Form.Group>
                        <Form.Group as={Col} xs={4} controlId='formActivityPrice'>
                            <Form.Label>Precio</Form.Label>
                            <Form.Control placeholder="Añada el nuevo precio" type='number' />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} xs={6} controlId='formActivityCategories'>
                            <Form.Label>Categorías</Form.Label>
                            {activityData.categories.map((elm, idx) => (
                                <Form.Select
                                    key={idx}
                                    name="categories"
                                    value={elm}
                                    onChange={e => handleCategoriesChange(e, idx)}
                                    aria-label="Seleccione una categoría"
                                >
                                    <option>Selecciona una categoría:</option>
                                    <option value="Deportes">Deportes</option>
                                    <option value="Cultura">Cultura</option>
                                    <option value="Gastronomía">Gastronomía</option>
                                </Form.Select>
                            ))}
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} xs={4} controlId='formActivityDuration'>
                            <Form.Label>Duración</Form.Label>
                            <Form.Control
                                name='duration'
                                placeholder="Añada la duración"
                                type='number'
                                value={activityData.duration}
                                onChange={handleActivityChange}
                            />
                        </Form.Group>
                    </Row>
                    <Button variant="dark" type="submit" >
                        crear evento
                    </Button>
                </Form>
            </Container>
        </div>
    )
}

export default CreateActivityForm