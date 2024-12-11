import React, { useEffect, useState } from 'react'
import { Carousel, Row, Col, Container } from 'react-bootstrap'
import activitiesServices from '../../services/activities.services'
import * as IMAGE_PATH from '../../consts/image-paths'
import ActivityCard from '../../components/ActivityCard/ActivityCard'
import './HomePage.css'

const HomePage = () => {
    const [activities, setActivities] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchActivities()
        const preventDefault = (e) => e.preventDefault()
        document.body.addEventListener('touchmove', preventDefault, { passive: false })

        return () => {
            document.body.removeEventListener('touchmove', preventDefault)
        }
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

    const firstThreeActivities = activities.slice(0, 3)

    return (
        <div className="fullscreen-container">
            <header className="header">
                <h1>PLANNING TO GO</h1>
                <div className="icon-container">
                    <div className="icon-item">
                        <img src={IMAGE_PATH.ICON1} alt="Icono 1" />
                        <p>Genera buenos recuerdos</p>
                    </div>
                    <div className="icon-item">
                        <img src={IMAGE_PATH.ICON3} alt="Icono 3" />
                        <p>Conecta con la naturaleza</p>
                    </div>
                    <div className="icon-item">
                        <img src={IMAGE_PATH.ICON4} alt="Icono 4" />
                        <p>Disfruta de una buena comida</p>
                    </div>
                </div>
            </header>

            <Carousel className="fullscreen-carousel">
                {activities.map((activity) => (
                    <Carousel.Item key={activity._id}>
                        <img
                            className="d-block w-100"
                            src={activity.cover}
                            alt={activity.name}
                        />
                    </Carousel.Item>
                ))}
            </Carousel>

            <section className="activity-cards">
                <Container fluid>
                    <Row className="justify-content-center">
                        {firstThreeActivities.map(elm => (
                            <Col xs={12} md={4} key={elm._id} className="mb-4">
                                <ActivityCard
                                    cover={elm.cover}
                                    name={elm.name}
                                    _id={elm._id}
                                />
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
        </div>
    )
}

export default HomePage