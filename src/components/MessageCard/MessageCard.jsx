import { Card } from "react-bootstrap"
import '../MessageCard/MessageCard.css'

const MessageCard = ({ sender, content }) => {

    return (
        <div className="MessageCard">

            <Card>
                <Card.Body>
                    <Card.Img src={sender?.avatar} />
                    <Card.Title>{sender?.username}</Card.Title>

                    <Card.Text>{content}</Card.Text>

                </Card.Body>
            </Card>
        </div>
    )
}

export default MessageCard