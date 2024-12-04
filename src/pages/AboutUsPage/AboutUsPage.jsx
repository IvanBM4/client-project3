import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import './AboutUsPage.css';


const AboutUsPage = () => {

    return (

        <Container className="mt-5">
            <header className="about-us-header text-center mb-4">
                <h1>Sobre Nosotros</h1>
                <p>Conoce más sobre nuestra misión y compromisos.</p>
            </header>
            <section className="about-us-content">
                <Row className="mb-4">
                    <Col md={6}>
                        <h2>Nuestra Misión</h2>
                        <p>
                            Nuestra misión es brindar planes y actividades a tus días aburridos.
                        </p>
                    </Col>
                    <Col md={6}>
                        <h2>Nuestra vision</h2>
                        <p>
                            Somos lo que se le llama líderes en la industria de conectar con gente.
                        </p>
                    </Col>
                </Row>

                <h2>Valores</h2>
                <ul>
                    <li>Integridad</li>
                    <li>Innovación</li>
                    <li>Compromiso con el cliente</li>
                    <li>Sostenibilidad</li>
                    <li>Sinceridad</li>
                    <li>Planes innovadores</li>
                </ul>
            </section>
        </Container>

    )

}

export default AboutUsPage;