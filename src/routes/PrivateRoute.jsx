import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";

const PrivateRoute = () => {
    const { loggedUser, isFetchingUser } = useContext(AuthContext);
    if (isFetchingUser) {

        if (!isLoggedIn) {
            return <Navigate to="/iniciar-sesion" />
        }
    }
    return <Outlet />
}
export default PrivateRoute