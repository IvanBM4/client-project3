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
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">searching something</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Form className="d-flex me-auto">
                        <Form.Control
                            type="search"
                            placeholder="Buscar"
                            className="me-2"
                            aria-label="Buscar"
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                        <Button variant="dark">Buscar</Button>
                        {suggestions.length > 0 && (
                            <ul className="sugerencias" style={{ position: 'absolute', zIndex: 1, backgroundColor: 'white', listStyleType: 'none', padding: '0', margin: '0' }}>
                                {suggestions.map((value, index) => (
                                    <li key={index} onClick={() => handleSuggestionClick(value)} style={{ cursor: 'pointer', padding: '8px' }}>
                                        {value}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </Form>
                    <Nav className="ms-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                        <Nav.Link as={Link} to='/planes' aria-label="Ver planes">Planes</Nav.Link>
                        {loggedUser && <Nav.Link as={Link} to='/añade-un-plan' aria-label="Crear un plan">Crea tu plan</Nav.Link>}
                        {loggedUser && <Nav.Link as={Link} to='/perfil' aria-label="Ver perfil">Perfil</Nav.Link>}
                        {!loggedUser && <Nav.Link as={Link} to='/iniciar-sesion' aria-label="Iniciar sesión">Iniciar Sesión</Nav.Link>}
                        {!loggedUser && <Nav.Link as={Link} to='/registro' aria-label="Registrarse">Regístrate</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation