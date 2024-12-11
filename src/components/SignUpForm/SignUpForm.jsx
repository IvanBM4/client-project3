import { useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import authServices from "../../services/auth.services"
import { useNavigate } from "react-router-dom"
import uploadServices from "../../services/upload.services"
import './SignUpForm.css'

const SignUpForm = () => {

    const navigate = useNavigate()

    const [signupData, setSignupData] = useState({
        email: '',
        username: '',
        password: '',
        avatar: ''
    })

    const [loadingImage, setLoadingImage] = useState(false)

    const handleInputChange = e => {
        const { name, value } = e.target
        setSignupData({ ...signupData, [name]: value })
    }

    const handleSubmitForm = e => {
        e.preventDefault()

        authServices
            .signupUser(signupData)
            .then(() => navigate('/iniciar-sesion'))
            .catch(err => console.log(err))
    }

    const handleInputFile = e => {

        setLoadingImage(true)

        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(({ data }) => {
                setSignupData({ ...signupData, avatar: data.cloudinary_url })
                setLoadingImage(false)

            })
            .catch(err => console.log(err))

    }

    return (

        <div className="SignUpForm">
            <Container>
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

                    <Form.Group className="mb-3" controlId="formAvatar">
                        <Form.Label>Imagen de usuario</Form.Label>
                        <Form.Control
                            required
                            type="file"
                            onChange={handleInputFile}>

                        </Form.Control>
                    </Form.Group>

                    <Button variant='dark mb-3' type="submit" disabled={loadingImage}>
                        {loadingImage ? 'Cargando imagen...' : 'Registrarse'}
                    </Button>
                </Form>
            </Container>
        </div>

    )
}

export default SignUpForm