import { Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage/HomePage"
import ActivitiesPage from "../pages/ActivitiesPage/ActivitiesPage"
import AboutUsPage from "../pages/AboutUsPage/AboutUsPage"
import ActivityDetailsPage from "../pages/ActivityDetailsPage/ActivityDetailsPage"
import LoginPage from "../pages/LoginPage/LoginPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage"




const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/planes" element={<ActivitiesPage />} />
            <Route path="/sobre-nosotros" element={<AboutUsPage />} />
            <Route path="/planes/detalles/:id" element={<ActivityDetailsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/Sign-up" element={<SignUpPage />} />

        </Routes>
    )
}

export default AppRoutes