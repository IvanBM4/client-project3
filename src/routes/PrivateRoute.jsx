import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";

const PrivateRoute = () => {
    const { isLoggedIn } = useContext(AuthContext);

    if (!isLoggedIn) {
        return <Navigate to="/inicio-sesion" />
    }



    return <Outlet />
}
export default PrivateRoute