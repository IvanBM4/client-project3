import { useState } from "react"
import ActivitiesList from "../../components/ActivitiesList/ActivitiesList"
import activitiesServices from "../../services/activities.services"
import { useEffect } from "react"
import { Button, Container } from "react-bootstrap"
import './ActivitiesPage.css'
import Modal from 'react-bootstrap/Modal';
import CreateActivityForm from "../../components/CreateActivityForm/CreateActivityForm"

const ActivitiesPage = () => {

    const [activities, setActivities] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
        fetchActivities()
    }, [])

    const fetchActivities = () => {
        activitiesServices
            .fetchActivities()
            .then(({ data }) => {
                setActivities(data)
                setIsLoading(false)
                handleClose()
            })
            .catch(err => console.log(err))
    }

    return (
        isLoading ? <h1>Cargando</h1> :
            <Container>
                <div className="ActivitiesPage">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h1>Encuentra el plan que mejor se adapte a ti</h1>
                        <Button variant="dark" onClick={handleShow}>Añade tu propio plan!</Button>
                    </div>
                    <h2>Lista de planes y hay ahora {activities.length} planes</h2>
                    <ActivitiesList activities={activities} fetchActivities={fetchActivities} />

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Crea un Nuevo Plan</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <CreateActivityForm handleClose={handleClose} fetchActivities={fetchActivities} />
                        </Modal.Body>
                    </Modal>
                </div>
            </Container>

    )

}

export default ActivitiesPage