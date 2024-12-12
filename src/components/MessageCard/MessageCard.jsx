import { Button, Card, Col, Modal, Row } from "react-bootstrap"
import '../MessageCard/MessageCard.css'
import { useState } from "react"
import SendMessageForm from "../SendMessageForm/SendMessageForm"

const MessageCard = ({ sender, content }) => {

    const [showMessageModal, setShowMessageModal] = useState(false)

    return (
        <div className="MessageCard">

            <Card className="mb-3">
                <Card.Body>
                    <Row>
                        <Col>
                            <Card.Img src={sender?.avatar} />
                            <Card.Title>{sender?.username}</Card.Title>
                        </Col>
                        <Col>
                            <Button variant="dark" onClick={() => setShowMessageModal(true)}>
                                Enviar mensaje
                            </Button>
                        </Col>
                    </Row>
                    <Card.Text>{content}</Card.Text>

                </Card.Body>
            </Card>

            <Modal show={showMessageModal} onHide={() => setShowMessageModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Responder</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SendMessageForm _id={sender._id} closeModal={() => setShowMessageModal(false)} />
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default MessageCard