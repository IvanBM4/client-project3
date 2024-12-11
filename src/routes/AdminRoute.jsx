import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";
import Loader from "../components/Loader/Loader";

const AdminRoute = () => {
    const { loggedUser, isFetchingUser } = useContext(AuthContext)

    if (isFetchingUser) {
        return <Loader />
    }

    if (loggedUser?.role !== 'ADMIN') {
        return <Navigate to="/" />
    }

    return <Outlet />
}
export default AdminRoute