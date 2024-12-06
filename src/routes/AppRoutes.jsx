import { Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage/HomePage"
import ActivitiesPage from "../pages/ActivitiesPage/ActivitiesPage"
import AboutUsPage from "../pages/AboutUsPage/AboutUsPage"
import ActivityDetailsPage from "../pages/ActivityDetailsPage/ActivityDetailsPage"
import LoginPage from "../pages/LoginPage/LoginPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage"
import NotFound from "../pages/NotFoundPage/NotFoundPage"
import ReviewsCard from "../components/ReviewsCard/ReviewsCard"
import ReviewsList from "../components/ReviewsList/ReviewsList"
import PrivateRoute from "./PrivateRoute"
import NewActivityPage from "../pages/NewActivityPage/NewActivityPage"
import ProfilePage from "../pages/ProfilePage/ProfilePage"
import EditActivityPage from "../pages/EditActivityPage/EditActivityPage"




const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/planes" element={<ActivitiesPage />} />
            <Route path="/sobre-nosotros" element={<AboutUsPage />} />
            <Route path="/planes/detalles/:id" element={<ActivityDetailsPage />} />
            <Route path="/iniciar-sesion" element={<LoginPage />} />
            <Route path="/registro" element={<SignUpPage />} />
            <Route path="/reviews" element={<ReviewsCard />} />
            <Route path="/opiniones" element={<ReviewsList />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/perfil/:id" element={<ProfilePage />} />
            <Route element={<PrivateRoute />}>
                <Route path='/crear' element={<NewActivityPage />} />
                <Route path='/perfil' element={<ProfilePage />} />
                <Route path="/añade-un-plan" element={<NewActivityPage />} />
                <Route path='/editar-plan/:id' element={<EditActivityPage />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes