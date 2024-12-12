import { useContext } from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import GlobalActivitiesFilter from '../GlobalActivitiesFilter/GlobalActivitiesFilter'


const Navigation = () => {
    const { loggedUser, logoutUser } = useContext(AuthContext)

    return (
        <div className="Navigation">
            <Navbar expand="lg" className="bg-body-tertiary" style={{ width: '100%', padding: '20px' }}>
                <Container fluid>

                    <Navbar.Brand as={Link} to={'/'}>
                        PTG
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="navbarScroll" />

                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="ms-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                            <Nav.Link as={Link} to='/planes'>Planes</Nav.Link>
                            <Nav.Link as={Link} to='/sobre-nosotros'>Sobre Nosotros</Nav.Link>
                            {loggedUser?.role === 'ADMIN' && <Nav.Link as={Link} to={'/admin'}>Administración</Nav.Link>}
                            {loggedUser && <Nav.Link as={Link} to={`/perfil/${loggedUser._id}`}>Perfil</Nav.Link>}
                            {loggedUser && <Nav.Link as={Link} onClick={logoutUser} to='/iniciar-sesion'>Cerrar sesión</Nav.Link>}
                            {!loggedUser && <Nav.Link as={Link} to='/iniciar-sesion'>Iniciar Sesión</Nav.Link>}
                            {!loggedUser && <Nav.Link as={Link} to='/registro'>Registrarse</Nav.Link>}
                        </Nav>

                        <Form md="2" className='d-flex flex-row align-i tems-center'>
                            <GlobalActivitiesFilter />
                        </Form>

                    </Navbar.Collapse>

                </Container>
            </Navbar>
        </div >
    )
}

export default Navigation
