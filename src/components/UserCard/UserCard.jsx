import { Card, Image } from 'react-bootstrap'
import '../UserCard/UserCard.css'
import { useNavigate } from 'react-router-dom'


const UserCard = ({ username, avatar, email, _id }) => {

    const navigate = useNavigate()

    return (
        <div className="UserCard">

            <Card onClick={() => navigate(`/perfil/${_id}`)} style={{ width: '18rem' }}>
                <Card.Body className="text-center">
                    <Image
                        src={avatar}
                        roundedCircle
                        width={100}
                        height={100}
                        className="mb-3"
                    />
                    <Card.Title>{username}</Card.Title>
                    <Card.Text>{email}</Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default UserCard