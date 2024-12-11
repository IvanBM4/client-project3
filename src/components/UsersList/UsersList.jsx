import { Dropdown, DropdownMenu } from "react-bootstrap"
import UserCard from "../UserCard/UserCard"


const UsersList = ({ usersData }) => {


    return (
        <div className="UsersList">
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Usuarios ({usersData.length})
                </Dropdown.Toggle>
                <DropdownMenu>
                    {usersData.map(elm => {
                        return (
                            <UserCard key={elm} {...elm} />
                        )
                    })}
                </DropdownMenu>
            </Dropdown >
        </div>

    )
}

export default UsersList