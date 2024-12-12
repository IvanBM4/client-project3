import { useContext, useState } from "react"
import { AuthContext } from "../../contexts/auth.context"
import messageServices from "../../services/message.services"


const SendMessageForm = ({ closeModal, _id }) => {

    const { loggedUser } = useContext(AuthContext)

    const [messageData, setMessageData] = useState({
        receiver: '',
        content: ''
    })

    const handleInputChange = e => {
        const { value, name } = e.target
        setMessageData({ ...messageData, [name]: value })
    }

    const reqPayLoad = {
        ...messageData,
        sender: loggedUser
    }

    const handleSubmitForm = e => {
        e.preventDefault()

        messageServices
            .sendMessage(reqPayLoad)
            .then(alert('enviado'))
            .catch(err => console.log(err))
    }

    return (
        <div className="SendMessageForm">
            <h1>Form enviar mensaje</h1>
        </div>
    )
}

export default SendMessageForm