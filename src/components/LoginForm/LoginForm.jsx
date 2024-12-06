import { useContext, useState } from "react"
import authServices from '../../services/auth.services'
import { AuthContext } from "../../contexts/auth.context"
import { Button, Container, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const LoginForm = () => {

    const navigate = useNavigate()

    const { authenticateUser } = useContext(AuthContext)

    const [loginData, setloginData] = useState({
        email: '',
        password: ''
    })

    const handleInputChange = e => {
        const { name, value } = e.target
        setloginData({ ...loginData, [name]: value })
    }

    const handleSubmitForm = e => {
        e.preventDefault()

        authServices
            .loginUser(loginData)
            .then(({ data }) => {
                localStorage.setItem('authToken', data.authToken)
                authenticateUser()
                navigate('/')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="LoginForm">
            <Container>
                <Form onSubmit={handleSubmitForm}>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            onChange={handleInputChange}
                            value={loginData.email}
                            name="email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            onChange={handleInputChange}
                            value={loginData.password}
                            name='password' />
                    </Form.Group>

                    <Button variant="dark" type="submit">
                        Acceder
                    </Button>

                </Form>
            </Container>
        </div>
    )
}

export default LoginForm