import { Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage/HomePage"
import ActivitiesPage from "../pages/ActivitiesPage/ActivitiesPage"
import AboutUsPage from "../pages/AboutUsPage/AboutUsPage"
import ActivityDetailsPage from "../pages/ActivityDetailsPage/ActivityDetailsPage"
import LoginPage from "../pages/LoginPage/LoginPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage"
import NotFound from "../pages/NotFound/NotFound"
import ReviewsCard from "../components/ReviewsCard/ReviewsCard"
import ReviewsList from "../components/ReviewsList/ReviewsList"




const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/planes" element={<ActivitiesPage />} />
            <Route path="/sobre-nosotros" element={<AboutUsPage />} />
            <Route path="/planes/detalles/:id" element={<ActivityDetailsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="/reviews" element={<ReviewsCard />} />
            <Route path="/reviewslist" element={<ReviewsList />} />


        </Routes>
    )
}

export default AppRoutes