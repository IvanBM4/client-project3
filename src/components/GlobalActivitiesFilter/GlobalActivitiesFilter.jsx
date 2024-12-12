import { useEffect, useState } from "react"
import { ListGroup, Form, Row, Col, Button, Offcanvas } from "react-bootstrap"
import './GlobalActivitiesFilter.css'
import { useLocation } from "react-router-dom"
import activitiesServices from "../../services/activities.services"
import FilterListResults from "../FilterListResults/FilterListResults"
import { Search } from "react-bootstrap-icons"

const GlobalActivitiesFilter = () => {

    const [filterValue, setFilterValue] = useState("")
    const [filterResults, setFilterResults] = useState([])
    const location = useLocation()

    const [showMenu, setShowMenu] = useState(false)

    const handleFilterChange = e => {
        const { value } = e.target
        setFilterValue(value)
        filterActivities(value)
    }

    useEffect(() => {
        setFilterValue('')
        setFilterResults([])
    }, [location.pathname])

    const filterActivities = (query) => {
        if (query.length > 0) {
            activitiesServices
                .filterActivities({ name: query })
                .then(({ data }) => {
                    setFilterResults(data)
                })
                .catch(err => console.log(err))
        }
        else {
            setFilterResults([])
        }
    }

    return (
        <div className="GlobalActivitiesFilter">
            <Form.Group controlId="formFilter">
                <Row direction="horizontal" gap={3} className="align-items-center">

                    <Col sm="1" align="right" className="d-none d-md-block">
                        <Form.Label><Search /> </Form.Label>
                    </Col>

                    <Col sm="1" align="right" className="d-md-none">
                        <Button variant="custom-transparent" onClick={() => setShowMenu(true)}>
                            <Search />
                        </Button>
                    </Col >
                    <Col className="d-none d-md-block">
                        <Form.Control
                            type="text"
                            placeholder="Título de la actividad"
                            value={filterValue}
                            onChange={handleFilterChange}
                        />
                        <div className={`filter-dropdown ${filterResults.length > 0 ? 'show' : 'hide'}`}>
                            <ListGroup>
                                {filterResults.map(elm => (
                                    <FilterListResults {...elm} key={elm._id} setShowMenu={setShowMenu} />
                                ))}
                            </ListGroup>
                        </div>
                    </Col>
                </Row>
            </Form.Group>
            <Offcanvas show={showMenu} onHide={() => setShowMenu(false)} placement='end' className="py-3 px-2">
                <Offcanvas.Header closeButton />
                <Offcanvas.Body>
                    <Form.Control
                        type="text"
                        placeholder="Título de la actividad"
                        value={filterValue}
                        onChange={handleFilterChange}
                    />
                    <ListGroup>
                        {filterResults.map(elm => (
                            <FilterListResults {...elm} key={elm._id} setShowMenu={setShowMenu} />
                        ))}
                    </ListGroup>

                </Offcanvas.Body>
            </Offcanvas>
        </div >
    )
}

export default GlobalActivitiesFilter