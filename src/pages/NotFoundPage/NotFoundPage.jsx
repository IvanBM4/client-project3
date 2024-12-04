import React from "react"
import "./NotFoundPage.css"

const NotFoundPage = () => {

    return (

        <div className="NotFoundPage">
            <h1 className="error-code">404</h1>
            <h2 className="error-message">Página no encontrada</h2>
            <p className="error-description">Lo sentimos, la página que estás buscando no existe o ha sido movida.</p>
        </div>
    )

}

export default NotFoundPage