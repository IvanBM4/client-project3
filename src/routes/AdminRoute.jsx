import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";

const AdminRoute = () => {
    const { loggedUser, isFetchingUser } = useContext(AuthContext)

    if (isFetchingUser) {

        if (!loggedUser && loggedUser?.role === 'ADMIN') {
            return <Navigate to="/iniciar-sesion" />
        }
    }

    return <Outlet />
}
export default AdminRoute