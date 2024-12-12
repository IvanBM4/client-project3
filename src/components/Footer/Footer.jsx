import { Container, Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookF, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons"
import './Footer.css'


const Footer = () => {

    return (

        <div className="footer">

            <footer className="footer bg-dark text-center py-4">
                <Container>
                    <p>Bienvenido a una plataforma que te permite descubrir y unirte a planes deportivos en toda España. Encuentra actividades como senderismo, ciclismo o fútbol, y conéctate con personas que comparten tus intereses. A través de un mapa interactivo, podrás localizar eventos cercanos, apuntarte y conocer nuevos compañeros de equipo o entrenamiento. Ideal para todos los niveles, desde principiantes hasta expertos, la plataforma fomenta la actividad física y la socialización. Organiza tus propios eventos o participa en los existentes, todo desde una misma herramienta. ¡Mantente activo, explora nuevas actividades y amplía tu red deportiva en SportPlan Connect!</p>
                    <div className="social-buttons">
                        <Button
                            className="rounded-circle mx-2 p-3"
                            style={{ backgroundColor: '#000', borderColor: '#000' }}
                        >
                            <FontAwesomeIcon icon={faFacebookF} color="white" />
                        </Button>
                        <Button
                            className="rounded-circle mx-2 p-3"
                            style={{ backgroundColor: '#000', borderColor: '#000' }}

                        >
                            <FontAwesomeIcon icon={faInstagram} color="white" />
                        </Button>
                        <Button
                            className="rounded-circle mx-2 p-3"
                            style={{ backgroundColor: '#000', borderColor: '#000' }}
                        >
                            <FontAwesomeIcon icon={faTwitter} color="white" />
                        </Button>
                        <h4>Explora</h4>
                    </div>

                    <div className="footer-info">

                        <div class="col-xs-6 col-md-6 col-sm-6" >
                            <ul style={{ padding: '0', listStyleType: 'none' }}>
                                <li><a rel="#" href="/" style={{ color: 'white', textDecoration: 'none' }}>Mapa de España </a></li>
                                <li><a rel="#" href="/planes" style={{ color: 'white', textDecoration: 'none' }}>Explora por Fotos</a></li>
                                <li><a rel="#" href="/planes" style={{ color: 'white', textDecoration: 'none' }}>Encuentra el plan que mas se adate a ti</a></li>
                                <li><a rel="/sobre-nosotros" href="/sobre-nosotros" style={{ color: 'white', textDecoration: 'none' }}>Quienes somos </a></li>

                            </ul>
                        </div>
                    </div>
                </Container>
            </footer>

        </div>

    )

}
export default Footer