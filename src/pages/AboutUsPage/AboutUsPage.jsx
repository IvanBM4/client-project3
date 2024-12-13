import React from "react"
import { Container, Row, Col, Card, Button } from "react-bootstrap"
import './AboutUsPage.css'
import { IVAN, MARTA, MERCEDES } from "../../consts/image-paths"

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
                            Nuestra misión es brindar planes y actividades que transformen
                            tus días aburridos en experiencias memorables. Nos esforzamos
                            por ofrecerte las mejores opciones para disfrutar de tu tiempo libre,
                            conectando personas y creando momentos únicos.
                        </p>
                    </Col>
                    <Col md={6}>
                        <h2>Nuestra Visión</h2>
                        <p>
                            Aspiramos a ser líderes en la industria de la recreación
                            y el entretenimiento, facilitando conexiones significativas
                            entre personas. Creemos en un mundo donde cada individuo pueda
                            encontrar su lugar y disfrutar de actividades que resalten su
                            personalidad y gustos.
                        </p>
                    </Col>
                </Row>

                <h2>Valores</h2>
                <ul className="values-list">
                    <li><strong>Integridad:</strong> Actuamos con honestidad y transparencia en todas nuestras acciones.
                        En todo lo que hacemos, nos comprometemos a ser sinceros y claros, manteniendo siempre
                        la integridad en nuestras decisiones y comportamientos. Sabemos que la confianza es la base
                        de cualquier relación, por lo que buscamos ser un reflejo de valores sólidos y principios éticos.</li>
                    <li><strong>Innovación:</strong> Buscamos constantemente nuevas formas de sorprender y deleitar a nuestros usuarios. La innovación es el motor que impulsa nuestro crecimiento, y nos dedicamos a probar nuevas soluciones para ofrecer algo único. Ya sea a través de un diseño más atractivo, una funcionalidad avanzada o una propuesta inesperada, nos aseguramos de que cada interacción sea memorable.</li>
                    <li><strong>Compromiso con el cliente:</strong> Tu satisfacción es nuestra prioridad; escuchamos tus necesidades. Desde el primer contacto hasta el último, estamos enfocados en ofrecerte el mejor servicio posible. Nos importa profundamente lo que piensas y trabajamos arduamente para comprender tus deseos y expectativas. Cada sugerencia, cada comentario, y cada preocupación son tomados en cuenta para mejorar nuestro producto y nuestros servicios.</li>
                    <li><strong>Sostenibilidad:</strong> Promovemos prácticas que respeten el medio ambiente. Nos comprometemos a reducir nuestro impacto ambiental a través de decisiones conscientes en cada etapa de nuestros procesos. Desde el uso eficiente de recursos hasta la implementación de prácticas más ecológicas, trabajamos para asegurar que nuestras acciones contribuyan a un entorno más saludable para las futuras generaciones.</li>
                    <li><strong>Sinceridad:</strong> Fomentamos una comunicación abierta y honesta. Creemos que una comunicación clara y transparente genera confianza y construye relaciones duraderas. Nos comprometemos a ser directos y honestos, sin rodeos ni pretextos. Esta actitud se refleja tanto en nuestra atención al cliente como en nuestras interacciones cotidianas, porque sabemos que la verdad siempre es el camino más efectivo para resolver cualquier situación.</li>
                    <li><strong>Planes Innovadores:</strong> Creamos experiencias únicas que se adaptan a tus intereses. Nuestro objetivo no es solo ofrecerte productos o servicios, sino crear experiencias que resuenen contigo. Nos esforzamos por diseñar planes que no solo se ajusten a tus expectativas, sino que también te sorprendan. Cada plan está cuidadosamente diseñado para adaptarse a tus gustos y necesidades, creando una experiencia a medida que te permita disfrutar de lo mejor.</li>
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

                    <Col md={4} className="mb-4">
                        <Card className="text-center">
                            <Card.Img variant="top" src={IVAN} />
                            <Card.Body>
                                <Card.Title>Iván Blanco</Card.Title>
                                <Card.Text>Miembro del equipo</Card.Text>

                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={4} className="mb-4">
                        <Card className="text-center">
                            <Card.Img variant="top" src={MARTA} />
                            <Card.Body>
                                <Card.Title>Marta Quiroga</Card.Title>
                                <Card.Text>Miembro del equipo</Card.Text>

                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={4} className="mb-4">
                        <Card className="text-center">
                            <Card.Img variant="top" src={MERCEDES} />
                            <Card.Body>
                                <Card.Title>Mercedes Sebastián</Card.Title>
                                <Card.Text>Miembro del equipo</Card.Text>

                            </Card.Body>
                        </Card>
                    </Col>

                </Row>

            </section>
        </Container>
    )
}

export default AboutUsPage