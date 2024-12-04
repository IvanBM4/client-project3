import { useContext } from "react";
import { AuthContext } from "../../contexts/auth.context";


const ProfilePage = () => {

    const { loggedUser } = useContext(AuthContext)

    return (

        <div className="ProfilePage">
            <h1>hellow ellow ,{loggedUser}</h1>
        </div>
    )
}
export default ProfilePage