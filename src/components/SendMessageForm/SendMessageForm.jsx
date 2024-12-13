import { useContext, useState } from "react"
import { AuthContext } from "../../contexts/auth.context"
import messageServices from "../../services/message.services"
import { Button, Form } from "react-bootstrap"


const SendMessageForm = ({ closeModal, _id }) => {

    const { loggedUser } = useContext(AuthContext)

    const [messageData, setMessageData] = useState({
        content: ''
    })

    const handleInputChange = e => {
        const { value, name } = e.target
        setMessageData({ ...messageData, [name]: value })
    }

    console.log(_id)

    const handleSubmitForm = e => {

        e.preventDefault()

        const reqPayLoad = {

            sender: loggedUser,
            receiver: _id,
            ...messageData
        }

        messageServices
            .sendMessage(reqPayLoad)
            .then(closeModal())
            .catch(err => console.log(err))
    }

    return (
        <div className="SendMessageForm">
            <Form onSubmit={handleSubmitForm} className="mb-5">
                <Form.Group className="mb-3" controlId="formReviewText">
                    <Form.Label>Mensaje</Form.Label>
                    <Form.Control
                        type='text'
                        name='content'
                        value={messageData.content}
                        rows={3}
                        placeholder="Escribe tu mensaje"
                        onChange={handleInputChange} />
                </Form.Group>

                <Button variant="dark" type="submit" >Enviar mensaje</Button>
            </Form>
        </div>
    )
}

export default SendMessageForm