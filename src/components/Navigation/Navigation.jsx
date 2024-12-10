import { useContext } from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'

const Navigation = () => {
    const { loggedUser, logoutUser } = useContext(AuthContext)
    return (
        <div className="Navigation">
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand as={Link} to={'/'}>Logo o nombre</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll"></Navbar.Collapse>
                    <Nav
                        className="ms-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link as={Link} to='/planes' >Planes</Nav.Link>
                        {loggedUser && <Nav.Link as={Link} to={`/perfil/${loggedUser._id}`}>Perfil</Nav.Link>}
                        {loggedUser && <Nav.Link as={Link} onClick={logoutUser} to='/iniciar-sesion'>Cerrar sesión</Nav.Link>}
                        {!loggedUser && <Nav.Link as={Link} to='/iniciar-sesion'>Iniciar Sesión</Nav.Link>}
                        {!loggedUser && <Nav.Link as={Link} to='/registro'>Registrarse</Nav.Link>}
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}
export default Navigation






