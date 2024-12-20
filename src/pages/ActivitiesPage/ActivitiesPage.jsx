import { useContext, useState, useEffect } from "react"
import ActivitiesList from "../../components/ActivitiesList/ActivitiesList"
import activitiesServices from "../../services/activities.services"
import { Button, Col, Container, Form, Row, Modal, Toast } from "react-bootstrap"
import './ActivitiesPage.css'
import ReactGoogleMap from "../../components/ReactGoogleMap/ReactGoogleMap"
import Loader from "../../components/Loader/Loader"
import CreateActivityForm from "../../components/CreateActivityForm/CreateActivityForm"
import categoriesServices from "../../services/categories.services"
import targetsServices from "../../services/targets.services"
import accesibilitiesServices from "../../services/accesibilities.services"
import { AuthContext } from "../../contexts/auth.context"

const ActivitiesPage = () => {

    const { loggedUser } = useContext(AuthContext)

    const [activities, setActivities] = useState([])
    const [categoryFilter, setCategoryFilter] = useState('')
    const [targetFilter, setTargetFilter] = useState('')
    const [accesibilityFilter, setAccessibilityFilter] = useState('')
    const [existentCategories, setExistentCategories] = useState([])
    const [existentTargets, setExistentTargets] = useState([])
    const [existentAccesibilities, setExistentAccesibilities] = useState([])

    const [isLoading, setIsLoading] = useState(true)

    const [show, setShow] = useState(false)
    const [showCreateToast, setShowCreateToast] = useState(false)
    const [showResetToast, setShowResetToast] = useState(false)

    const handleClose = () => {
        setShow(false)
        setShowCreateToast(false)
    }
    const handleShow = () => setShow(true)

    useEffect(() => {
        fetchActivities()
        fetchExistentCategories()
        fetchExistentTargets()
        fetchExistentAccesibilities()
    }, [])

    useEffect(() => {
        fetchActivities()
    }, [categoryFilter, targetFilter, accesibilityFilter])

    const fetchActivities = () => {
        const filters = {
            categories: categoryFilter,
            target: targetFilter,
            accesibility: accesibilityFilter
        }
        activitiesServices
            .filterActivities(filters)
            .then(({ data }) => {
                setActivities(data)
                setIsLoading(false)
                handleClose()
            })
            .catch(err => console.log(err))
    }

    const resetFilters = () => {
        setCategoryFilter('')
        setTargetFilter('')
        setAccessibilityFilter('')
        fetchActivities()
        setShowResetToast(true)
    }

    const fetchExistentCategories = () => {
        categoriesServices
            .fetchExistentCategories()
            .then(({ data }) => {
                setExistentCategories(data)
            })
            .catch(err => console.log(err))
    }

    const fetchExistentTargets = () => {
        targetsServices
            .fetchExistentTargets()
            .then(({ data }) => {
                setExistentTargets(data)
            })
            .catch(err => console.log(err))
    }

    const fetchExistentAccesibilities = () => {
        accesibilitiesServices
            .fetchExistentAccesibilities()
            .then(({ data }) => {
                setExistentAccesibilities(data)
            })
            .catch(err => console.log(err))
    }

    return (
        isLoading ? <Loader /> :
            <Container>
                <div className="ActivitiesPage">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h1>Encuentra el plan que mejor se adapte a ti</h1>
                        {loggedUser && <Button variant="dark" onClick={handleShow}>
                            Añade tu propio plan!
                        </Button>}
                    </div>
                    <h2>Actualmente contamos con {activities.length} planes en las próximas semanas</h2>
                    <div className="maps">
                        <ReactGoogleMap />
                    </div>
                    <hr />
                    <div className="filtersList">
                        <Row className="mb-3">
                            <Col>
                                <Form.Select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
                                    <option value="">Todas las categorías</option>
                                    {existentCategories.map(elm => (
                                        <option key={elm} value={elm}>{elm}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col>
                                <Form.Select value={targetFilter} onChange={e => setTargetFilter(e.target.value)}>
                                    <option value="">Todas las orientaciones</option>
                                    {existentTargets.map(elm => (
                                        <option key={elm} value={elm}>{elm}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col>
                                <Form.Select value={accesibilityFilter} onChange={e => setAccessibilityFilter(e.target.value)}>
                                    <option value="">Todas las accesibilidades</option>
                                    {existentAccesibilities.map(elm => (
                                        <option key={elm} value={elm}>{elm}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Row>
                        <Button className='mb-3' variant='dark' onClick={resetFilters}>
                            Retirar Filtros
                        </Button>
                    </div>
                    <ActivitiesList activities={activities} fetchActivities={fetchActivities} />
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Crea un Nuevo Plan</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <CreateActivityForm handleClose={() => {
                                handleClose()
                                setShowCreateToast(true)
                            }} fetchActivities={fetchActivities} />
                        </Modal.Body>
                    </Modal>
                    <Toast onClose={() => setShowCreateToast(false)} show={showCreateToast} delay={3000} autohide
                        style={{
                            position: 'fixed',
                            top: '20px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            zIndex: 1050
                        }}
                    >
                        <Toast.Header>
                            <strong className="me-auto">Plan Creado</strong>
                            <small>Ahora</small>
                        </Toast.Header>
                        <Toast.Body>has creado un plan </Toast.Body>
                    </Toast>
                    <Toast onClose={() => setShowResetToast(false)} show={showResetToast} delay={3000} autohide
                        style={{
                            position: 'fixed',
                            top: '20px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            zIndex: 1050
                        }}
                    >
                        <Toast.Header>
                            <strong className="me-auto">Filtros Retirados</strong>
                            <small>Ahora</small>
                        </Toast.Header>
                        <Toast.Body>¡Los filtros han sido retirados,genial!</Toast.Body>
                    </Toast>
                </div>
            </Container>
    )
}

export default ActivitiesPage