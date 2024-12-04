import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import authServices from "../../services/auth.services"
import { useNavigate } from "react-router-dom"

const SignUpForm = () => {

    const navigate = useNavigate()

    const [signupData, setSignupData] = useState({
        email: '',
        username: '',
        password: ''
    })

    const handleInputChange = e => {
        const { name, value } = e.target
        setSignupData({ ...signupData, [name]: value })
    }

    const handleSubmitForm = e => {
        e.preventDefault()

        authServices
            .signupUser(signupData)
            .then(() => navigate('/login'))
            .catch(err => console.log(err))
    }

    return (

        <div className="SignUpForm">

            <Form onSubmit={handleSubmitForm}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        onChange={handleInputChange}
                        value={signupData.username}
                        name="username" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        onChange={handleInputChange}
                        value={signupData.email}
                        name="email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        onChange={handleInputChange}
                        value={signupData.password}
                        name='password' />
                </Form.Group>

                <Button variant='dark' type="submit">Registrarse</Button>
            </Form>

        </div>

    )
}

export default SignUpForm