import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth.context";
import authServices from "../../services/auth.services";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { Row, Col } from "react-bootstrap";
import './ProfilePage.css';

const ProfilePage = () => {
    const [userData, setUserData] = useState({});
    const { loggedUser } = useContext(AuthContext);
    const { id: _id } = useParams();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchOneActivity();
    }, []);

    const fetchOneActivity = () => {
        authServices
            .getOneUser(_id)
            .then(({ data }) => {
                setUserData(data);
                setIsLoading(false);
            })
            .catch(err => console.log(err));
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="ProfilePage">
            <Row className="align-items-center">
                <Col xs={12} md={8} className="text-center ml-4" >
                    <div className="container-logged">
                        <h3>Usuario Logueado:</h3>
                        <p>Nombre de usuario: {loggedUser.username}</p>
                        <p>Email: {loggedUser.email}</p>
                    </div>
                </Col>
                {/* Columna Izquierda: Avatar y Saludo */}
                <Col xs={12} md={4} className="text-start">
                    <div className="avatar-img">
                        <img src={userData.avatar} alt="Avatar" />
                    </div>
                    <h1>¡Hola {userData.username}!</h1>
                </Col>

                {/* Columna Derecha: Información */}
            </Row>
        </div>
    );
};

export default ProfilePage;
