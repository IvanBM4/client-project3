import React from "react";
import "./NotFound.css";

const NotFound = () => {
    return (
        <div className="not-found-container">
            <h1 className="error-code">404</h1>
            <h2 className="error-message">Página no encontrada</h2>
            <p className="error-description">Lo sentimos, la página que estás buscando no existe o ha sido movida.</p>
            <a href="/" className="home-link">Volver a la página principal</a>
        </div>
    );
};

export default NotFound;