import { ButtonGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'


const ActivityCard = ({ name, description, cover, _id, deleteActivity }) => {
    const handleDelete = () => {
        deleteActivity(_id)
    }
    return (

        <div className='ActivityCard'>
            <Card >
                <Card.Img variant="top" src={cover} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                    <ButtonGroup>
                        <Button variant='dark' size='sm'>Descubre más sobre este plan</Button>
                        <Button variant='danger' size='sm' onClick={handleDelete}>Eliminar este plan</Button>
                        <Button variant='dark' size='sm' onClick={handleDelete}>Editar este plan</Button>

                    </ButtonGroup>
                </Card.Body>
            </Card>
        </div>

    )
}

export default ActivityCard;
