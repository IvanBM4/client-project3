import { useState } from "react"
import { Form } from "react-bootstrap"


const CreateActivityForm = () => {

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
        const result = type === 'checkbox' ? checked : true
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



    return (
        <div className="CreateActivityForm">
            <Form>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Nombre del plan</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        onChange={handleActivityChange}
                        value={activityData.name}
                        name="name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCover">
                    <Form.Label>Imagen del plan</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        onChange={handleActivityChange}
                        value={activityData.cover}
                        name="cover" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDescription">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        onChange={handleActivityChange}
                        value={activityData.description}
                        name="description" />
                </Form.Group>

                <Form.Group
                    className="mb-3"
                    controlId="formPrice">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        min={0}
                        placeholder="Euros"
                        value={activityData.price}
                        onChange={handleActivityChange}
                        name="price"
                    />
                </Form.Group>

                <Form.Group
                    className="mb-3"
                    controlId="formDuration">
                    <Form.Label>Duración</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        min={0}
                        placeholder="Minutos"
                        value={activityData.duration}
                        onChange={handleActivityChange}
                        name="duration"
                    />
                </Form.Group>

                <Form.Group
                    className="mb-3"
                    controlId="formDate">
                    <Form.Label>Duración</Form.Label>
                    <Form.Control
                        required
                        type="datetime-local"
                        min={0}
                        placeholder="Minutos"
                        value={activityData.duration}
                        onChange={handleActivityChange}
                        name="duration"
                    />
                </Form.Group>

            </Form>
        </div>
    )
}

export default CreateActivityForm