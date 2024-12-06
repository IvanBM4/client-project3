import { useContext, useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'

const Navigation = () => {
    const { loggedUser } = useContext(AuthContext)
    const [inputValue, setInputValue] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [destinos, setDestinos] = useState([])

    useEffect(() => {
        const fetchDestinos = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_APP_API_URL)
                const data = await response.json()
                setDestinos(data)
            } catch (error) {
                console.error('Error al cargar destinos:', error)
            }
        }

        fetchDestinos()
    }, [])

    const autoComplete = (input) => {
        return destinos.filter((valor) => {
            const valorMinuscula = valor.toLowerCase()
            const inputMinuscula = input.toLowerCase()
            return valorMinuscula.includes(inputMinuscula)
        })
    }

    const handleInputChange = (event) => {
        const datosDelCampo = event.target.value
        setInputValue(datosDelCampo)

        if (datosDelCampo.length > 0) {
            const autocompleteValores = autoComplete(datosDelCampo)
            setSuggestions(autocompleteValores)
        } else {
            setSuggestions([])
        }
    }

    const handleSuggestionClick = (value) => {
        setInputValue(value)
        setSuggestions([])
    }

    return (

        <div className="Navigation">
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand >Navbar scroll</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Form className="d-flex me-auto">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="dark">Search</Button>
                        </Form>
                        <Nav
                            className="ms-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link as={Link} to='/planes' >Planes</Nav.Link>
                            {loggedUser && <Nav.Link as={Link} to='/añade-un-plan'>Crea tu plan</Nav.Link>}
                            {loggedUser && <Nav.Link as={Link} to={`/perfil/${loggedUser._id}`}>Perfil</Nav.Link>}
                            {!loggedUser && <Nav.Link as={Link} to='/iniciar-sesion'>Iniciar Sesión</Nav.Link>}
                            {!loggedUser && <Nav.Link as={Link} to='/registro'>Regístrate</Nav.Link>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default Navigation