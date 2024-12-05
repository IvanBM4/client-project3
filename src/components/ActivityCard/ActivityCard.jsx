import { useState } from 'react';
import { ButtonGroup, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import EditActivityForm from '../EditActivityForm/EditActivityForm';
import './ActivityCard.css'

const ActivityCard = ({ name, description, cover, host, _id, deleteActivity, fetchActivities }) => {

    const [showModal, setShowModal] = useState(false)
    const [showEditModal, setEditShowModal] = useState(false)

    const handleDelete = () => {
        deleteActivity(_id)
        setShowModal(false)
    }

    const handleCancelButton = () => {
        setShowModal(false)
    }

    const handleShowModal = () => {
        setShowModal(true)
    }

    const handleShowEditModal = () => {
        setEditShowModal(true)
    }

    const handleCloseEditModal = () => {
        setEditShowModal(false)
    }
    return (
        <div className='ActivityCard'>
            <Card>
                <Card.Img variant="top" src={cover} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>{description}</Card.Text>

                    <ButtonGroup>
                        <Button variant='dark' size='sm'>Descubre más sobre este plan</Button>

                        <Button variant='danger' size='sm' onClick={handleShowModal}>Eliminar este plan</Button>

                        <Button variant='dark' size='sm' onClick={handleShowEditModal}>Editar este plan</Button>

                    </ButtonGroup>

                </Card.Body>
            </Card>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>¡Cuidado!</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Está seguro de que desea eliminar esta actividad?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDelete}>
                        Sí
                    </Button>
                    <Button variant="dark" onClick={handleCancelButton}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showEditModal} onHide={handleCloseEditModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Editar Actividad</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditActivityForm id={_id} closeModal={handleCloseEditModal} fetchActivities={fetchActivities} />
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ActivityCard;

