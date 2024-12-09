import React, { useEffect, useState } from 'react';
import { Carousel, Row, Col } from 'react-bootstrap';
import activitiesServices from '../../services/activities.services';
import * as IMAGE_PATH from '../../consts/image-paths'
import ActivityCard from '../../components/ActivityCard/ActivityCard';
import { useParams } from 'react-router-dom';

const HomePage = () => {

    const { id: _id } = useParams()

    const [activity, setActivities] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchActivities()
    }, [])

    const fetchActivities = () => {
        activitiesServices

            .fetchActivities()
            .then(({ data }) => {
                setActivities(data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    const firstThreeActivities = activity.slice(0, 3)

    return (
        <div className="HomePage">

            <h1 className="text-center mb-4">Título Principal</h1>

            <Row className="text-center justify-content-center align-items-center mb-4">
                <Col xs={12} sm={4} md={3} className="mb-3">
                    <img
                        src={IMAGE_PATH.ICON1}
                        alt="Icono 1"
                        className="img-fluid"
                        style={{ maxWidth: '80px' }}
                    />
                    <p>Genera buenos recuerdos</p>
                </Col>
                <Col xs={12} sm={4} md={3} className="mb-3">
                    <img
                        src={IMAGE_PATH.ICON3}
                        alt="Icono 3"
                        className="img-fluid"
                        style={{ maxWidth: '80px' }}
                    />
                    <p>Conecta con la naturaleza</p>
                </Col>
                <Col xs={12} sm={4} md={3} className="mb-3">
                    <img
                        src={IMAGE_PATH.ICON4}
                        alt="Icono 4"
                        className="img-fluid"
                        style={{ maxWidth: '80px' }}
                    />
                    <p>Disfruta de una buena comida</p>
                </Col>
            </Row>

            <Carousel>
                {activity.map((activity) => {
                    return (
                        <Carousel.Item key={activity._id}>
                            <img
                                className="d-block w-100"
                                src={activity.cover}
                                alt={activity.name}
                            />
                        </Carousel.Item>
                    );
                })}
            </Carousel>
            <Row className="text-center align-items-center mt-4 mb-4">
                {firstThreeActivities.map(elm => (
                    <Col xs={12} md={4} key={elm._id}>
                        <ActivityCard
                            cover={elm.cover}
                            name={elm.name}
                            _id={elm._id}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default HomePage;
