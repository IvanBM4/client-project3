/* eslint-disable react/prop-types */
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { Pencil, X } from 'react-bootstrap-icons'; // Bootstrap icons package
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import EditActivityForm from '../EditActivityForm/EditActivityForm';
import './ActivityCard.css'
import { AuthContext } from '../../contexts/auth.context'
import activitiesServices from "../../services/activities.services"

const ActivityCard = ({ name, description, cover, host, _id, fetchActivities }) => {
    const { loggedUser } = useContext(AuthContext)
    const navigate = useNavigate(); // React Router's hook for navigation

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

    const handleShowModal = (event) => {
        event.stopPropagation(event);
        setShowModal(true)
    }

    const handleShowEditModal = (event) => {
        event.stopPropagation();
        setEditShowModal(true)
    }

    const handleCloseEditModal = () => {
        setEditShowModal(false)
    }

    return (
        <div className='ActivityCard'>
            <Card onClick={() => navigate(`/planes/detalles/${_id}`)}>
                    {
                    host && host === loggedUser?._id && (
                        <div className='card-actions'>
                            <Pencil 
                                onClick={handleShowEditModal} 
                                style={{ cursor: 'pointer', color: 'white', background: 'rgba(0, 0, 0, 0.5)', borderRadius: '50%', padding: '5px' }}
                                size={30}
                            />
                            <X 
                                onClick={handleShowModal} 
                                style={{ cursor: 'pointer', color: 'white', background: 'rgba(0, 0, 0, 0.5)', borderRadius: '50%', padding: '5px' }}
                                size={30}
                            />
                        </div>
                    )
                }
                <Card.Img variant="top" src={cover} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text className='line-clamp'>{description}</Card.Text>
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

