import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import User from "../interfaces/User";
import { deleteUser, getUsers } from "../services/usersService";
import { successMsg } from "../services/feedbackService";
import { SiteTheme } from "../App";

interface UsersManagmentProps {
    handleUpdateUser: Function;
    users: User[];
    setUsers: Function;
}

const UsersManagment: FunctionComponent<UsersManagmentProps> = ({ handleUpdateUser, users, setUsers, }) => {
    let navigate = useNavigate()
    let [dataChanged, setDataChanged] = useState<boolean>(false);
    let theme = useContext(SiteTheme);

    useEffect(() => {
        getUsers()
            .then((res) => setUsers(res.data))
            .catch((err) => console.log(err));
    }, [dataChanged, setUsers]);

    let handleToDelete = async (id: string) => {
        if (window.confirm("Are you sure?")) {
            try {
                await deleteUser(id);
                successMsg("User deleted successfully");
                setDataChanged(!dataChanged);

            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <>
            <div className="container">
                <h1>CRM System</h1>
                {users.length ? (
                    <table className="table text-center" data-bs-theme={`${theme}`} >
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody >
                            {users.map((user: User) => (
                                <tr key={user.email}>
                                    <td>{user._id}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td><i className="fa-solid fa-user-pen text-warning" onClick={() => navigate(`/update-user/${user._id}`)}></i></td>
                                    <td>
                                        <i className="fa-solid fa-user-xmark text-danger" onClick={() => handleToDelete(user._id as string)}></i>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (<p className="text-light">No users yet</p>)}
            </div >
        </>
    )
}

export default UsersManagment;