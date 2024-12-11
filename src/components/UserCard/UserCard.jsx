import { Card, Image } from 'react-bootstrap'
import '../UserCard/UserCard.css'


const UserCard = ({ username, avatar, email }) => {


    return (
        <div className="UserCard">

            <Card style={{ width: '18rem' }}>
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