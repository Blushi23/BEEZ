import { FunctionComponent, useContext, useEffect } from "react";
import { SiteTheme } from "../App";
import { getUserById } from "../services/usersService";
import { Modal } from "react-bootstrap";
import UserUpdate from "./UserUpdate";

interface UpdateProfileModalProps {
    show: boolean;
    onHide: Function;
    userId: any;
    userInfo: any;
    SetUserInfo: Function;
    user: any;
    setUser: Function;
    handleUpdateUser: Function
}

const UpdateProfileModal: FunctionComponent<UpdateProfileModalProps> = ({ show, onHide, userId, userInfo, SetUserInfo, user, setUser, handleUpdateUser }) => {
    let theme = useContext(SiteTheme);

    useEffect(() => {
        if (userId) {
            getUserById(user.id as number)
                .then((res) => setUser(res.data))
                .catch((err) => console.log(err))
        }
    }, []);

    return (
        <>
            {user && (<Modal show={show} onHide={() => onHide()}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className={`${theme}`}>
                <div className="modalContent">
                    <Modal.Header closeButton className="me-4">
                        <div className="col-md-3">
                            <img src={user.imageUrl} alt={user.imageAlt} width={120} />
                        </div>
                        <div className="col-md-9">
                            <h4 className=" display-6">Hello {user.firstName} {user.middleName} {user.lastName}</h4>
                        </div>
                    </Modal.Header>

                    <Modal.Body>
                        <UserUpdate userInfo={userInfo} onHide={onHide} handleUpdateUser={handleUpdateUser} />
                    </Modal.Body>
                </div >
            </Modal >
            )}
        </>
    )
}

export default UpdateProfileModal;