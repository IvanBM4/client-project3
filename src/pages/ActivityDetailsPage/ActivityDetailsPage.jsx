import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import activitiesServices from "../../services/activities.services";
import { useParams } from "react-router-dom";
import './ActivityDetailsPage.css'
import Card from 'react-bootstrap/Card';


const ActivityDetailsPage = () => {
    const { id: _id } = useParams()
    const [activity, setActivities] = useState({});
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchOneActivity()
    }, [_id])

    const fetchOneActivity = () => {
        activitiesServices
            .fetchOneActivity(_id)
            .then(({ data }) => {
                setActivities(data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }
    return (
        <div className="ActivityDetailsPage">
            <Container>
                <div className="header">
                    <div className="image-container">
                        <img src={activity.cover} alt={activity.title} />

                        <div className="buttons-container">
                            <Button variant="dark">Categorías</Button>
                            <Button variant="dark">Accesibilidad</Button>
                            <Button variant="dark">Precio</Button>
                            <Button variant="dark">Orientado a</Button>
                        </div>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title>Popino</Card.Title>
                                <Card.Text>
                                    El mejor plan para estar en familia un domingo!
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="text-container">
                        <h1>{activity.name}</h1>
                        <p>{activity.description}</p>
                    </div>
                </div>
            </Container>
        </div>


    );
};

export default ActivityDetailsPage;
