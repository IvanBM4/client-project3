import React from "react"
import { Container, Row, Col, Card, Button } from "react-bootstrap"
import './AboutUsPage.css'

const AboutUsPage = () => {
    return (
        <Container className="mt-5">
            <header className="about-us-header text-center mb-4">
                <h1>Sobre Nosotros</h1>
                <p>Conoce más sobre nuestra misión, visión y valores.</p>
            </header>
            <section className="about-us-content">
                <Row className="mb-4">
                    <Col md={6}>
                        <h2>Nuestra Misión</h2>
                        <p>
                            Nuestra misión es brindar planes y actividades que transformen tus días aburridos en experiencias memorables. Nos esforzamos por ofrecerte las mejores opciones para disfrutar de tu tiempo libre, conectando personas y creando momentos únicos.
                        </p>
                    </Col>
                    <Col md={6}>
                        <h2>Nuestra Visión</h2>
                        <p>
                            Aspiramos a ser líderes en la industria de la recreación y el entretenimiento, facilitando conexiones significativas entre personas. Creemos en un mundo donde cada individuo pueda encontrar su lugar y disfrutar de actividades que resalten su personalidad y gustos.
                        </p>
                    </Col>
                </Row>

                <h2>Valores</h2>
                <ul className="values-list">
                    <li>Integridad: Actuamos con honestidad y transparencia en todas nuestras acciones.</li>
                    <li>Innovación: Buscamos constantemente nuevas formas de sorprender y deleitar a nuestros usuarios.</li>
                    <li>Compromiso con el Cliente: Tu satisfacción es nuestra prioridad; escuchamos tus necesidades.</li>
                    <li>Sostenibilidad: Promovemos prácticas que respeten el medio ambiente.</li>
                    <li>Sinceridad: Fomentamos una comunicación abierta y honesta.</li>
                    <li>Planes Innovadores: Creamos experiencias únicas que se adaptan a tus intereses.</li>
                </ul>

                <Row className="mt-5">
                    <Col md={12}>
                        <h2>Nuestro Equipo</h2>
                        <p>
                            Contamos con un equipo apasionado y comprometido que trabaja arduamente para ofrecerte lo mejor. Cada miembro aporta su experiencia y creatividad para asegurarse de que cada actividad sea especial.
                        </p>
                    </Col>
                </Row>


                <Row className="mt-4">
                    {[
                        { name: "Ivan Blanco", role: "compañeros de equipo", imgSrc: "https://media.glamour.mx/photos/61908ea42d97bd4c522ab6f5/master/w_1600%2Cc_limit/195141.jpg" },
                        { name: "Marta Quiroga", role: "compañeros de equipo", imgSrc: "https://britishgatos.es/wp-content/uploads/2024/05/Gatitos-Disponibles-Gatos-British.jpeg" },
                        { name: "Mercedes Sebastian", role: "compañeros de equipo", imgSrc: "https://cdn.onemars.net/sites/perfect-fit_es_NkyIN_JAs8/image/cat_m8_sleep_1_d_1616598082250.png" },
                    ].map((member, index) => (
                        <Col md={4} key={index} className="mb-4">
                            <Card className="text-center">
                                <Card.Img variant="top" src={member.imgSrc} />
                                <Card.Body>
                                    <Card.Title>{member.name}</Card.Title>
                                    <Card.Text>{member.role}</Card.Text>

                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

            </section>
        </Container>
    )
}

export default AboutUsPage