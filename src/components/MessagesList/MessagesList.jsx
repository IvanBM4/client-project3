import { useEffect, useState } from "react"
import messageServices from "../../services/message.services"
import Loader from "../../components/Loader/Loader"
import MessageCard from "../MessageCard/MessageCard"


const MessagesList = ({ _id }) => {

    const [messagesData, setMessagesData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchReceivedMessages()
    }, [])

    const fetchReceivedMessages = () => {
        messageServices
            .fetchReceivedMessages(_id)
            .then(({ data }) => {
                setMessagesData(data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }
    return (
        isLoading ? <Loader /> :
            <div className="MessagesList">
                <h2>Mensajes recibidos ({messagesData.length})</h2>
                {messagesData.map(elm => {
                    return (
                        <MessageCard {...elm} />
                    )
                })}

            </div>
    )
}

export default MessagesList