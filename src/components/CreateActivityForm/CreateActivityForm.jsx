import { useEffect, useState } from "react"
import { Container, Badge, Form, Stack } from "react-bootstrap"
import { Col, Row, Button } from 'react-bootstrap';
import activitiesServices from "../../services/activities.services";
import categoriesServices from "../../services/categories.services";
import targetsServices from "../../services/targets.services";
import accesibilitiesServices from "../../services/accesibilities.services";
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import uploadServices from "../../services/upload.services";

const CreateActivityForm = ({ handleClose, fetchActivities }) => {

    const [activityData, setActivityData] = useState({
        name: '',
        cover: '',
        description: '',
        price: 0,
        available: true,
        date: '',
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

    const [categoriesSelection, setCategoriesSelection] = useState([])
    const [targetsSelection, setTargetsSelection] = useState([])
    const [accesibilitiesSelection, setAccesibilitiesSelection] = useState([])

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
        handleAutocomplete()
    }, [addressValue])


    useEffect(() => {
        fetchAllowedCategories()
        fetchAllowedTargets()
        fetchAllowedAccesibilities()
    }, [])

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

    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleSelectCategory = (e) => {
        const { value } = e.target;
        setSelectedCategories([...selectedCategories, value]);
    }

    const handleRemoveCategory = (categoryToRemove) => {
        const categoriesWithoutRemovedOne = selectedCategories.filter(category => category !== categoryToRemove);

        setSelectedCategories(categoriesWithoutRemovedOne);
    } 

    const [selectedAccesibilities, setSelectedAccesibilities] = useState([]);

    const handleSelectAccesibility = (e) => {
        const { value } = e.target;
        setSelectedAccesibilities([...selectedAccesibilities, value]);
    }

    const handleRemoveAccesibility = (accesibilityToRemove) => {
        const accesibilitiesWithoutRemovedOne = selectedAccesibilities.filter(accesibility => accesibility !== accesibilityToRemove);

        setSelectedAccesibilities(accesibilitiesWithoutRemovedOne);
    } 

    const [selectedTargets, setSelectedTargets] = useState([]);

    const handleSelectTarget = (e) => {
        const { value } = e.target;
        setSelectedTargets([...selectedTargets, value]);
    }

    const handleRemoveTarget = (targetToRemove) => {
        const targetsWithoutRemovedOne = selectedTargets.filter(target => target !== targetToRemove);

        setSelectedTargets(targetsWithoutRemovedOne);
    } 

    const handleSubmit = e => {

        e.preventDefault()

        const reqPayLoadAddress = {
            ...addressData,
            location: { ...locationData }
        };

        const reqPayLoad = {
            ...activityData,
            target: selectedTargets,
            accesibility: selectedAccesibilities,
            categories: selectedCategories,
            address: reqPayLoadAddress
        };

        activitiesServices
            .saveActivity(reqPayLoad)
            .then(() => {
                fetchActivities()
                handleClose()
            })
            .catch(err => {
                console.log(err)
            })
        console.log("Datos enviados al backend:", reqPayLoad);

    }


    return (
        <div>
            <Container>
                <Form onSubmit={handleSubmit}>

                    <Row className='mb-3'>

                        <Form.Group

                            controlId='formActivityName'>
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
                        <Form.Group

                            controlId='formActivityDescription'>
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

                    <Row className='mb-3'>

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

                    <Row className='mb-3'>
                        <Form.Group
                            as={Col}
                            xs={4}
                            controlId='formActivityDuration'>
                            <Form.Label>Duración</Form.Label>
                            <Form.Control
                                name='duration'
                                placeholder="Añada la duración"
                                type='number'
                                value={activityData.duration}
                                onChange={handleActivityChange}
                            />
                        </Form.Group>

                        <Form.Group
                            as={Col}
                            xs={4}
                            controlId='formActivityDate'>
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                onChange={handleActivityChange}
                            />
                        </Form.Group>

                        <Form.Group as={Col} xs={4} controlId='formActivityPrice'>
                            <Form.Label>Precio</Form.Label>
                            <Form.Control placeholder="Añada el nuevo precio" type='number' />
                        </Form.Group>

                    </Row>

                    <Col className='mb-3'>
                        <Form.Select
                            className="mb-2"
                            id={`categoriesForm`}
                            name="categories"
                            aria-label="Seleccione una categoría"
                            value={''}
                            onChange={handleSelectCategory}
                        >
                            <option>Selecciona una categoría</option>
                            {categoriesSelection.filter(category => !selectedCategories.includes(category)).map((elm, idx) => {
                                return (
                                    <option value={elm} key={idx}>{elm}</option>
                                )
                            })}
                        </Form.Select>
                        <Stack direction="horizontal" gap={2} style={{ flexWrap: 'wrap' }}>
                            {
                                selectedCategories.map((category, idx) => (
                                    <Button variant="secondary" key={idx}>
                                        {category} <Badge bg="dark" onClick={() => handleRemoveCategory(category)}>X</Badge>
                                    </Button>
                                ))
                            }
                        </Stack>

                                <Form.Select
                                            className="mb-2"
                                                name="accesibility"
                                                aria-label="Seleccione tipos de accesibilidad"
                                                value={''}
                                                onChange={handleSelectAccesibility}
                                            >
                                                <option>Selecciona un tipo de accesibilidad</option>
                                                {accesibilitiesSelection.filter(acc => !selectedAccesibilities.includes(acc)).map((elm, idx) => {
                                                    return (
                                                        <option value={elm} key={idx}>{elm}</option>
                                                    )
                                                })}
                                            </Form.Select>

                                            {
                            selectedAccesibilities.map((accesibility, idx) => (
                                <Button variant="secondary" key={idx}>
                                    {accesibility} <Badge bg="dark" onClick={() => handleRemoveAccesibility(accesibility)}>X</Badge>
                                </Button>
                            ))
                        }

                                            <Form.Select
                                                className="mb-2"
                                                name="target"
                                                onChange={handleSelectTarget}
                                                value={''}
                                                aria-label="Seleccione una opción">
                                                <option>Selecciona un target</option>
                                                {targetsSelection.filter(target => !selectedTargets.includes(target)).map((elm, idx) => {
                                                    return (
                                                        <option value={elm} key={idx}>{elm}</option>
                                                    )
                                                })}
                                            </Form.Select>

                                            {
                            selectedTargets.map((target, idx) => (
                                <Button variant="secondary" key={idx}>
                                    {target} <Badge bg="dark" onClick={() => handleRemoveTarget(target)}>X</Badge>
                                </Button>
                            ))
                        }
                    

                    </Col>

                    <Button className="mb-2" variant="dark" type="submit" disabled={loadingImage}>
                        {loadingImage ? 'Cargando imagen...' : 'Crear plan'}
                    </Button>

                </Form>
            </Container>

        </div>
    )
}

export default CreateActivityForm