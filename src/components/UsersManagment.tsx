import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import User from "../interfaces/User";
import { deleteUser, getUsers } from "../services/usersService";
import { successMsg } from "../services/feedbackService";

interface UsersManagmentProps {

}

const UsersManagment: FunctionComponent<UsersManagmentProps> = () => {
    let navigate = useNavigate()
    let [users, setUsers] = useState<User[]>([])
    let [dataChanged, setDataChanged] = useState<boolean>(false);
    // let [userUpdated, setUserUpdated] = useState<boolean>(false)
    // let render = () => {
    //     setDataChanged(!dataChanged)
    // }
    useEffect(() => {
        getUsers()
            .then((res) => setUsers(res.data))
            .catch((err) => console.log(err));
    }, [dataChanged]);

    let handleToDelete = (id: number) => {
        if (window.confirm("Are you sure?")) {
            deleteUser(id)
                .then(() => {
                    successMsg("User deleted succuessfully");
                    setDataChanged(!dataChanged);
                })
                .catch(
                    (error) => console.log(error));
        }
    };

    return (
        <><div className="container">
            <h1>CRM System</h1>
            {users.length ? (
                <table className="table text-center">
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
                    <tbody>
                        {users.map((user: User) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.phone}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td><i className="fa-solid fa-user-pen text-warning" onClick={() => navigate(`/update-user/${user.id}`)}></i></td>
                                <td>
                                    <i className="fa-solid fa-user-xmark text-danger" onClick={() => handleToDelete(user.id as number)}></i></td>
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