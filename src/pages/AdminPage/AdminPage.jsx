import { useEffect, useState } from "react"
import authServices from "../../services/auth.services"
import UsersList from "../../components/UsersList/UsersList"
import Loader from "../../components/Loader/Loader"


const AdminPage = () => {

    const [usersData, setUsersData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = () => {
        authServices
            .fetchUsers()
            .then(({ data }) => {
                setUsersData(data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    return (
        isLoading ? <Loader /> :
            <div className="AdminPage">
                <h1>Panel de control de Planning To Go</h1>
                <UsersList usersData={usersData} />
            </div>
    )
}

export default AdminPage