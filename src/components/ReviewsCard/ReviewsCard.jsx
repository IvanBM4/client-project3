
import { Link } from 'react-router-dom'
import './ReviewsCard.css'
import { Button, Card, ButtonGroup } from "react-bootstrap"
import { useContext } from 'react'


const ReviewsCard = ({ _id, title, content, author }) => {

    const { loggedUser } = useContext(AuthContext)

    return (
        <article className='ReviewsCard mb-3'>
            <Card>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>{content}</Card.Text>

                    <div className="d-grid">
                        {
                            author._id === loggedUser?._id ?
                                <>
                                    <ButtonGroup aria-label="Basic example">
                                        <Button variant='dark' size='sm' as={Link} to={`/review/${_id}`}>View Details</Button>
                                        <Button variant='warning' size='sm' as={Link} to={`/review/edit/${_id}`}>Edit</Button>
                                        <Button variant='danger' size='sm' onClick={() => alert('Delete functionality to be implemented')}>Delete</Button>
                                    </ButtonGroup>
                                </>
                                :
                                <>
                                    <Button variant='dark' size='sm' as={Link} to={`/review/${_id}`}>View Details</Button>
                                </>
                        }
                    </div>
                </Card.Body>
            </Card>
        </article>
    )
}

export default ReviewsCard