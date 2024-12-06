import { Col, Row, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import '../../services/activities.services'
import activitiesServices from '../../services/activities.services';
import { useEffect, useState } from 'react';
import categoriesServices from "../../services/categories.services";
import targetsServices from "../../services/targets.services";
import accesibilitiesServices from "../../services/accesibilities.services";

const EditActivityForm = ({ id, closeModal, fetchActivities }) => {

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

    useEffect(() => {
        fetchOneActivity()
        fetchAllowedCategories()
        fetchAllowedTargets()
        fetchAllowedAccesibilities()
    }, [])

    const [categoriesSelection, setCategoriesSelection] = useState([])
    const [targetsSelection, setTargetsSelection] = useState([])
    const [accesibilitiesSelection, setAccesibilitiesSelection] = useState([])

    const fetchAllowedCategories = () => {

        categoriesServices
            .fetchAllowedCategories()
            .then(({ data }) => {
                setCategoriesSelection(data)
            })
    }

    const fetchAllowedTargets = () => {

        targetsServices
            .fetchAllowedTargets()
            .then(({ data }) => {
                setTargetsSelection(data)
            })
    }

    const fetchAllowedAccesibilities = () => {

        accesibilitiesServices
            .fetchAllowedAccesibilities()
            .then(({ data }) => {
                setAccesibilitiesSelection(data)
            })
    }

    const editActivity = (id, updatedData) => {

        activitiesServices
            .editActivity(id, updatedData)
            .then(() => {
                fetchActivities()
            })
            .catch((err) => {
                console.error(err)
                alert('error al actualizar la actividad')
            })
    }

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

    const addNewCategory = () => {
        const categoriesCopy = [...activityData.categories]
        categoriesCopy.push('')
        setActivityData({ ...activityData, categories: categoriesCopy })
    }

    const handleTargetChange = (e, idx) => {
        const { value } = e.target
        const targetCopy = [...activityData.target]
        targetCopy[idx] = value
        setActivityData({ ...activityData, target: targetCopy })

    }

    const addNewTarget = () => {
        const targetCopy = [...activityData.target]
        targetCopy.push('')
        setActivityData({ ...activityData, target: targetCopy })
    }

    const handleAccesibilityChange = (e, idx) => {
        const { value } = e.target
        const accesibilityCopy = [...activityData.accesibility]
        accesibilityCopy[idx] = value
        setActivityData({ ...activityData, accesibility: accesibilityCopy })
    }

    const addNewAccesibility = () => {
        const accesibilityCopy = [...activityData.accesibility]
        accesibilityCopy.push('')
        setActivityData({ ...activityData, accesibility: accesibilityCopy })
    }

    const handleSubmit = e => {

        e.preventDefault()

        const updatedData = {
            ...activityData,
            address: {
                city: addressData.city,
                street: addressData.street,
                zipcode: addressData.zipcode,
            },
            location: {
                longitude: locationData.longitude,
                latitude: locationData.latitude,
            },
        }

        editActivity(id, updatedData)
        fetchActivities()
        closeModal()

    }

    const fetchOneActivity = () => {
        activitiesServices
            .fetchOneActivity(id)
            .then(({ data }) => {
                const {
                    name,
                    cover,
                    description,
                    price,
                    available,
                    date,
                    categories,
                    target,
                    accesibility,
                    duration,
                    address
                } = data
                setActivityData({
                    name,
                    cover,
                    description,
                    price,
                    available,
                    date,
                    categories,
                    target,
                    accesibility,
                    duration,
                })
                setAddressData({
                    city: address.city,
                    zipcode: address.zipcode,
                    street: address.street
                })
                setLocationData({
                    longitude: address.location.longitude,
                    latitude: address.location.latitude
                })
            })
            .catch(err => {
                console.error(err)
            })

    }

    return (

        <div className="editActivityForm">

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

                    <Form.Group as={Col} xs={4} controlId='formActivityDuration'>
                        <Form.Label>Duración</Form.Label>
                        <Form.Control placeholder="Añada la duración" type='number' />
                    </Form.Group>

                    <Form.Group as={Col} xs={4} controlId='formActivityDate'>
                        <Form.Label>Fecha</Form.Label>
                        <Form.Control
                            type="date" />
                    </Form.Group>

                    <Form.Group as={Col} xs={4} controlId='formActivityPrice'>
                        <Form.Label>Precio</Form.Label>
                        <Form.Control placeholder="Añada el nuevo precio" type='number' />
                    </Form.Group>

                </Row>

                <Row>

                    <Form.Group as={Col} xs={6} controlId='formActivityCategories'>

                        <Form.Label>Categorías</Form.Label>

                        {activityData.categories.map((elm, idx) => {
                            return (<Form.Select
                                key={idx}
                                name="categories"
                                aria-label="Seleccione una categoría"
                                value={elm}
                                onChange={e => handleCategoriesChange(e, idx)}
                            >
                                <option>Selecciona una categoría</option>
                                {categoriesSelection.map((elm, idx) => {
                                    return (
                                        <option value={elm} key={idx}>{elm}</option>
                                    )
                                })}
                            </Form.Select>)
                        })}
                        <Button variant='dark' onClick={addNewCategory}>Añadir nueva categoría</Button>

                    </Form.Group>

                    <Form.Group as={Col} xs={6} controlId='formActivityAccesibilities'>

                        <Form.Label>Accesibilidad</Form.Label>
                        {activityData.accesibility.map((elm, idx) => {
                            return (<Form.Select
                                key={idx}
                                name="accesibility"
                                aria-label="Seleccione tipos de accesibilidad"
                                value={elm}
                                onChange={e => handleAccesibilityChange(e, idx)}
                            >
                                {accesibilitiesSelection.map((elm, idx) => {
                                    return (
                                        <option value={elm} key={idx}>{elm}</option>
                                    )
                                })}
                            </Form.Select>)
                        })}
                        <Button variant='dark' onClick={addNewAccesibility}>Añadir nueva accesibilidad</Button>

                    </Form.Group>

                </Row>

                <Row>

                    <Form.Group as={Col} xs={4} controlId='formActivityTarget'>

                        <Form.Label>Orientado a</Form.Label>

                        {activityData.target.map((elm, idx) => {
                            return (<Form.Select
                                key={idx}
                                name="target"
                                onChange={handleTargetChange}
                                value={elm}
                                aria-label="Seleccione una opción">
                                {targetsSelection.map((elm, idx) => {
                                    return (
                                        <option value={elm} key={idx}>{elm}</option>
                                    )
                                })}
                            </Form.Select>)
                        })}

                        <Button variant='dark' onClick={addNewTarget}>Añadir nuevo target</Button>

                    </Form.Group>

                </Row>

                <Button variant="dark" type="submit" >
                    Actualizar Evento
                </Button>

            </Form>

        </div>
    )
}

export default EditActivityForm