import { Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage/HomePage"
import ActivitiesPage from "../pages/ActivitiesPage/ActivitiesPage"
import AboutUsPage from "../pages/AboutUsPage/AboutUsPage"


const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/planes" element={<ActivitiesPage />} />
            <Route path="/sobre-nosotros" element={<AboutUsPage />} />
        </Routes>
    )
}

export default AppRoutes