import React, { useEffect, useState } from 'react'
import { Carousel, Row, Col, Container } from 'react-bootstrap'
import activitiesServices from '../../services/activities.services'
import ActivityCard from '../../components/ActivityCard/ActivityCard'
import './HomePage.css'
import BouncingLogo from '../../components/BouncingLogo/BouncingLogo'

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
                <BouncingLogo />
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

            <section className="activity-cards" style={{ marginBottom: '20px' }}>
                <Container fluid>
                    <Row className="justify-content-center">
                        {firstThreeActivities.map(elm => (
                            <Col xs={12} md={6} lg={4} key={elm._id} className="mb-4">
                                <ActivityCard
                                    cover={elm.cover}
                                    name={elm.name}
                                    _id={elm._id}
                                    className="activity-card"
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