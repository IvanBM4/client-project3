import { Col, Row, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import '../../services/activities.services'
import activitiesServices from '../../services/activities.services';
import { useEffect, useState } from 'react';
import categoriesServices from "../../services/categories.services";
import targetsServices from "../../services/targets.services";
import accesibilitiesServices from "../../services/accesibilities.services";
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import uploadServices from '../../services/upload.services';

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
        street: '',
        longitude: 0,
        latitude: 0
    })

    const [addressValue, setAddressValue] = useState({})

    const [loadingImage, setLoadingImage] = useState(false)

    useEffect(() => {
        handleAutocomplete()
    }, [addressValue])

    const handleAutocomplete = () => {

        if (addressValue?.label) {
            geocodeByAddress(addressValue.label)
                .then((results) => {
                    const addressComponents = results[0].address_components
                    let city = ''
                    let zipcode = ''
                    let street = ''

                    addressComponents.forEach((component) => {
                        if (component.types.includes('locality')) {
                            city = component.long_name
                        }
                        if (component.types.includes('postal_code')) {
                            zipcode = component.long_name
                        }
                        if (component.types.includes('route')) {
                            street = component.long_name
                        }
                    })

                    return getLatLng(results[0]).then((coordinates) => ({
                        coordinates,
                        city,
                        zipcode,
                        street
                    }))

                })
                .then(({ coordinates, city, zipcode, street }) => {

                    setAddressData({
                        city,
                        zipcode: zipcode ? parseInt(zipcode, 10) : 0,
                        street,
                        label: addressValue.label,
                        latitude: coordinates.lat,
                        longitude: coordinates.lng
                    })
                })
        }
    }

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

    const handleInputFile = e => {

        setLoadingImage(true)

        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(({ data }) => {
                setActivityData({ ...activityData, cover: data.cloudinary_url })
                setLoadingImage(false)
            })
            .catch(err => console.log(err))

    }

    const handleActivityChange = e => {
        const { name, value, checked, type } = e.target
        const result = type === 'checkbox' ? checked : value
        setActivityData({ ...activityData, [name]: result })
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

    const deleteCategorySelect = (idx) => {
        const newCategories = [...activityData.categories]
        if (newCategories.length > 1) {
            newCategories.splice(idx, 1)
            setActivityData({ ...activityData, categories: newCategories })
        }
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

    const deleteTargetSelect = (idx) => {
        const newTarget = [...activityData.target]
        if (newTarget.length > 1) {
            newTarget.splice(idx, 1)
            setActivityData({ ...activityData, target: newTarget })
        }
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

    const deleteAccesibilitySelect = (idx) => {
        const newAccesibility = [...activityData.accesibility]
        if (newAccesibility.length > 1) {
            newAccesibility.splice(idx, 1)
            setActivityData({ ...activityData, accesibility: newAccesibility })
        }
    }

    const handleSubmit = e => {

        e.preventDefault()

        const updatedData = {
            ...activityData,
            address: {
                city: addressData.city,
                street: addressData.street,
                zipcode: addressData.zipcode,
                longitude: addressData.longitude,
                latitude: addressData.latitude
            }
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
                    street: address.street,
                    longitude: address.longitude,
                    latitude: address.latitude
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

                    <Form.Group controlId='formActivityName'>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            name="name"
                            value={activityData.name}
                            placeholder="Añada el nuevo nombre"
                            onChange={handleActivityChange}
                        />
                    </Form.Group>

                </Row>

                <Row className='mb-3'>

                    <Form.Group controlId='formActivityDescription'>
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={activityData.description}
                            onChange={handleActivityChange}
                            placeholder="Añada la nueva descripción"
                        />
                    </Form.Group>

                </Row>

                <Row>

                    <Form.Group
                        controlId='formActivityImage'>
                        <Form.Label>Imagen</Form.Label>
                        <Form.Control
                            onChange={handleInputFile}
                            type="file"
                            placeholder="URL de la imagen"
                        />
                    </Form.Group>

                </Row>

                <Row>

                    <Form.Group controlId="autocompleteAddress" className="mb-3 places-input">
                        <Form.Label>Añade la dirección</Form.Label>
                        <GooglePlacesAutocomplete
                            selectProps={{
                                addressValue,
                                onChange: setAddressValue
                            }}
                            apiKey="AIzaSyBZ2QgeOdlau8hshB4nIF47iw2lXyjViJs"
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

                    <Form.Group
                        as={Col}
                        xs={4}
                        controlId='formActivityCategories'>

                        <Form.Label>Categorías</Form.Label>

                        {activityData.categories.map((elm, idx) => {
                            return (
                                <Row key={idx}>
                                    <Col className='mb-2' >
                                        <Form.Select
                                            className="mb-2"
                                            id={`categoriesForm-${idx}`}
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

                                        </Form.Select>
                                    </Col>
                                    <Col className='mb-3'>
                                        <Button
                                            variant="dark"
                                            size="sm"
                                            onClick={() => deleteCategorySelect(idx)}
                                            disabled={activityData.categories.length <= 1}>
                                            Eliminar
                                        </Button>
                                    </Col>
                                </Row>
                            )
                        })}
                        <Button
                            variant='dark'
                            onClick={addNewCategory}>
                            Añadir nueva categoría
                        </Button>

                    </Form.Group>

                    <Form.Group
                        as={Col}
                        xs={4}
                        controlId='formActivityAccesibilities'>

                        <Form.Label>Accesibilidad</Form.Label>
                        {activityData.accesibility.map((elm, idx) => {
                            return (
                                <Row key={idx}>
                                    <Col className='mb-2'>
                                        <Form.Select
                                            className="mb-2"
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
                                        </Form.Select>
                                    </Col>

                                    <Col className='mb-3'>
                                        <Button
                                            variant="dark"
                                            size="sm"
                                            onClick={() => deleteAccesibilitySelect(idx)}
                                            disabled={activityData.accesibility.length <= 1}>
                                            Eliminar
                                        </Button>
                                    </Col>
                                </Row>)
                        })}
                        <Button
                            variant='dark'
                            onClick={addNewAccesibility}>
                            Añadir nueva accesibilidad
                        </Button>

                    </Form.Group>

                    <Form.Group
                        className="mb-2"
                        as={Col}
                        xs={4}
                        controlId='formActivityTarget'>

                        <Form.Label>Orientado a</Form.Label>

                        {activityData.target.map((elm, idx) => {
                            return (
                                <Row>
                                    <Col className='mb-2'>
                                        <Form.Select
                                            className="mb-2"
                                            key={idx}
                                            name="target"
                                            onChange={e => handleTargetChange(e, idx)}
                                            value={elm}
                                            aria-label="Seleccione una opción">
                                            {targetsSelection.map((elm, idx) => {
                                                return (
                                                    <option value={elm} key={idx}>{elm}</option>
                                                )
                                            })}
                                        </Form.Select>
                                    </Col>
                                    <Col className='mb-3'>
                                        <Button
                                            variant="dark"
                                            size="sm"
                                            onClick={() => deleteTargetSelect(idx)}
                                            disabled={activityData.target.length <= 1}>
                                            Eliminar
                                        </Button>
                                    </Col>
                                </Row>

                            )
                        })}

                        <Button
                            variant='dark'
                            onClick={addNewTarget}>
                            Añadir nuevo target
                        </Button>

                    </Form.Group>

                </Row>

                <Button className="mb-2" variant="dark" type="submit" disabled={loadingImage}>
                    {loadingImage ? 'Cargando imagen...' : 'Actualizar plan'}
                </Button>

            </Form>

        </div>
    )
}

export default EditActivityForm