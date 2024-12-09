import { useContext, useState } from 'react';
import { ButtonGroup, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import EditActivityForm from '../EditActivityForm/EditActivityForm';
import './ActivityCard.css'
import { AuthContext } from '../../contexts/auth.context'
import { Link } from 'react-router-dom';
import activitiesServices from "../../services/activities.services"

const ActivityCard = ({ name, description, cover, host, _id, fetchActivities }) => {

    const { loggedUser } = useContext(AuthContext)

    const [showModal, setShowModal] = useState(false)
    const [showEditModal, setEditShowModal] = useState(false)

    const deleteActivity = () => {
        activitiesServices
            .deleteActivity(_id)
            .then(() => fetchActivities())
            .catch((err) => console.log(err))
    }

    const handleDelete = () => {
        deleteActivity()
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
            <Card className="rounded-card">
                <Card.Img variant="top" src={cover} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>{description}</Card.Text>

                    {host && host === loggedUser?._id ? <ButtonGroup>
                        <Button
                            variant='dark'
                            size='sm'
                            as={Link}
                            to={`/planes/detalles/${_id}`}>
                            Descubre más sobre este plan
                        </Button>

                        <Button
                            variant='danger'
                            size='sm'
                            onClick={handleShowModal}>
                            Eliminar este plan
                        </Button>

                        <Button
                            variant='dark'
                            size='sm'
                            onClick={handleShowEditModal}>
                            Editar este plan
                        </Button>

                    </ButtonGroup> :
                        <ButtonGroup>
                            <Button variant='dark' size='sm' as={Link} to={`/planes/detalles/${_id}`} >Descubre más sobre este plan</Button>

                        </ButtonGroup>}

                </Card.Body>
            </Card>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>¡Cuidado!</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Estás seguro de que deseas eliminar este plan?</Modal.Body>
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
                    <Modal.Title>Editar plan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditActivityForm id={_id} closeModal={handleCloseEditModal} fetchActivities={fetchActivities} />
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ActivityCard;

