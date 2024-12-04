import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";

const PrivateRoute = () => {
    const { loggedUser, isFetchingUser } = useContext(AuthContext);
    if (isFetchingUser) {


        return <h1>esperando al usuario</h1>
    }
    if (!loggedUser) {
        return <Navigate to="/inicio-sesion" />
    }



    return <Outlet />
}
export default PrivateRoute