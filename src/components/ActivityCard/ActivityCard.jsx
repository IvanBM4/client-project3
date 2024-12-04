import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ActivityCard = ({ name, description, cover, _id }) => {

    return (
        <div className='ActivityCard'>
            <Card >
                <Card.Img variant="top" src={cover} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                    <Button variant='dark'>Descubre más sobre este plan</Button>
                </Card.Body>
            </Card>
        </div>
    );
}

export default ActivityCard;
