import React from "react";
import './AboutUsPage.css'


const AboutUsPage = () => {
    return (
        <div className="about-us-container">
            <header className="about-us-header">
                <h1>Sobre Nosotros</h1>
                <p>Conoce más sobre nuestra misión y compromisos.</p>
            </header>
            <section className="about-us-content">
                <h2>Nuestra Misión</h2>
                <p>
                    Nuestra misión es brindar planes y actividades a tus dias aburridos.
                </p>

                <h2>Nuestra Visión</h2>
                <p>
                    somos lo que se le llama lideres en la insudtria del conectar con gente .
                </p>

                <h2>Valores</h2>
                <ul>
                    <li>Integridad</li>
                    <li>Innovacion</li>
                    <li>Compromiso con el cliente</li>
                    <li>Sostenibilidad</li>
                    <li>Sinceridad</li>
                    <li>planes innovadores</li>
                </ul>
            </section>
        </div>
    );
};

export default AboutUsPage;