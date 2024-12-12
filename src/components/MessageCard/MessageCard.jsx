import { Button, Card, Col, Modal, Row } from "react-bootstrap"
import '../MessageCard/MessageCard.css'
import { useState } from "react"
import SendMessageForm from "../SendMessageForm/SendMessageForm"
import { Send } from "react-bootstrap-icons"

const MessageCard = ({ sender, content }) => {

    const [showMessageModal, setShowMessageModal] = useState(false)

    return (
        <div className="MessageCard">

            <Card className="mb-3">
                <Card.Body>
                    <Row>
                        <Col>
                            <Card.Img className="mb-2" src={sender?.avatar} />

                            <Card.Title>{sender?.username}</Card.Title>
                        </Col>
                        <Col style={{ disply: 'flex', justifyContent: 'left' }}>
                            <Button variant="dark" onClick={() => setShowMessageModal(true)}>
                                <Send />
                            </Button>
                        </Col>
                    </Row>
                    <hr />
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