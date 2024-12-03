import { Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import './Footer.css'
const Footer = () => {
    return (
        <div className="footer">
            <footer className="footer bg-dark text-center py-4">
                <Container>
                    <p>Bienvenido a la plataforma definitiva para los amantes de la fiesta. Aquí puedes comprar entradas para los mejores eventos de Techno y Reguetón, y además, si eres organizador, publicar tus propias fiestas para que la comunidad las descubra y adquiera entradas. ¡Conéctate con la mejor música, las mejores fiestas, y lleva tu evento al siguiente nivel!</p>
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
                    </div>
                </Container>
            </footer>
        </div>
    )



}
export default Footer