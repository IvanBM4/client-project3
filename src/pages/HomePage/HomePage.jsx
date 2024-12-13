import { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap'
import activitiesServices from '../../services/activities.services'
import './HomePage.css'
import { motion } from 'framer-motion';
import { Link } from 'react-bootstrap-icons';
import { Navigate, useNavigate } from 'react-router-dom';

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

const navigate = useNavigate()

    const fetchActivities = () => {
        activitiesServices
            .fetchActivities()
            .then(({ data }) => {
                setActivities(data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    const carouselEffect = {
        hidden: { opacity: 0.8, scale: 0.95 },
        visible: { opacity: 1, scale: 1 },
        transition: { duration: 1 },
    };

    return (
        <div className="fullscreen-container">

            <motion.div
                variants={carouselEffect}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
            >
                <Carousel>
                    <Carousel.Item>
                        <motion.img
                            className="d-block w-100"
                            src={"https://res.cloudinary.com/du50mrzcj/image/upload/v1734023456/l9cafubmvcvmcvs7vdgk.jpg"}
                            alt="FirstImg"
                            whileHover={{ scale: 1.02 }}
                        />
                        <Carousel.Caption className="d-flex justify-content-center align-items-center h-100">
                            <div className="carousel-overlay">
                                <motion.h3 onClick={()=> navigate('/planes')}whileHover={{ scale: 1.1 }}>Tomate un respiro</motion.h3>
                               <p>Pulsa para ver nuestros planes</p>
                            </div>
                        </Carousel.Caption>
                    </Carousel.Item>
                     <Carousel.Item>
                        <motion.img
                            className="d-block w-100"
                            src={"https://res.cloudinary.com/du50mrzcj/image/upload/v1734082588/ltvjcodneczjynulyiyf.jpg"}
                            alt="SecondImg"
                            whileHover={{ scale: 1.02 }}
                        />
                        <Carousel.Caption className="d-flex justify-content-center align-items-center h-100">
                            <div className="carousel-overlay">
                                <motion.h3 whileHover={{ scale: 1.1 }}>Disfruta de una buena comida</motion.h3>
                                  <p>Pulsa para ver nuestros planes</p>
                            </div>
                        </Carousel.Caption>
                    </Carousel.Item>
                  
                    <Carousel.Item>
                        <motion.img
                            className="d-block w-100"
                            src={"https://res.cloudinary.com/du50mrzcj/image/upload/v1734023068/bcyodngavhegtcphptpl.jpg"}
                            alt="ThirdImg"
                            whileHover={{ scale: 1.02 }}
                        />
                        <Carousel.Caption className="d-flex justify-content-center align-items-center h-100">
                            <div className="carousel-overlay">
                                <motion.h3 whileHover={{ scale: 1.1 }}>Conecta con la naturaleza</motion.h3>
                                  <p>Pulsa para ver nuestros planes</p>
                            </div>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <motion.img
                            className="d-block w-100"
                            src={"https://res.cloudinary.com/du50mrzcj/image/upload/v1734024196/xenc8dq1vykjr22gpfmy.jpg"}
                            alt="FourthIMG"
                            whileHover={{ scale: 1.02 }}
                        />
                        <Carousel.Caption className="d-flex justify-content-center align-items-center h-100">
                            <div className="carousel-overlay">
                                <motion.h3 onClick={()=> navigate('/planes')}whileHover={{ scale: 1.1 }}>Disfruta de los mejores momentos</motion.h3>
                                  <p>Pulsa para ver nuestros planes</p>
                            </div>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </motion.div>
        </div>
    )
}

export default HomePage