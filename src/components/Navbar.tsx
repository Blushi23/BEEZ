import { FunctionComponent, useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { SiteTheme } from "../App";
import UpdateProfileModal from "./UpdateProfileModal";
import User from "../interfaces/User";

interface NavbarProps {
    userInfo: any;
    setUserInfo: Function;
    darkMode: boolean;
    setDarkMode: Function;
    user: User;
    setUser: Function;

}
const Navbar: FunctionComponent<NavbarProps> = ({ userInfo, setUserInfo, darkMode, setDarkMode, user, setUser }) => {
    let navigate = useNavigate();
    let theme = useContext(SiteTheme);
    let [openProfileModal, setOpenProfileModal] = useState<boolean>(false)

    let logout = () => {
        sessionStorage.removeItem("userInfo");
        setUserInfo({ email: false, role: false });
        navigate("/");
    }

    return (
        <>
            <nav className={`navbar navbar-expand-lg`} data-bs-theme={`${theme}`}
            >
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/"><img src="/images/logo-lightBee.png" alt="logo" width={120} /></NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/about">About</NavLink>
                            </li>
                            {userInfo.email && (
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/favorites">Favorite Cards</NavLink>
                                    </li>
                                    {(userInfo.role === "business" || userInfo.role === "admin") && (
                                        <>
                                            <li className="nav-item">
                                                <NavLink className="nav-link" to="my-cards">My Cards</NavLink>
                                            </li>
                                            {userInfo.role == "admin" &&
                                                <li className="nav-item">
                                                    <NavLink className="nav-link" to="/sandBox">Sandbox</NavLink>
                                                </li>
                                            }
                                        </>)}
                                </>)}

                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-warning" type="submit">Search</button>

                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="flexSwitchCheckDefault"
                                    onChange={() => {
                                        setDarkMode(!darkMode);
                                        localStorage.setItem("darkMode", JSON.stringify(!darkMode))
                                    }}
                                    style={{ display: "none" }}
                                />
                                <label className="form-check-label darkModeButton" htmlFor="flexSwitchCheckDefault"><i className="fa-solid fa-circle-half-stroke"></i></label>
                            </div>

                            {userInfo.email && (
                                <>
                                    <img src={user.imageUrl ? (`${user.imageUrl}`) : ("/images/avatar.png")} className="rounded-circle ms-2 profileImage" width="35" alt="user" onClick={() => setOpenProfileModal(true)}></img>
                                    <button className="btn" type="button" onClick={logout}>Logout</button>

                                </>
                            )}
                            {!userInfo.email && (
                                <>
                                    <button className="btn" onClick={() => navigate("/register")}>Register</button>
                                    <button className="btn" onClick={() => navigate("/login")}>Login</button>

                                </>)}
                        </form>
                    </div>
                </div>
            </nav >

            <UpdateProfileModal user={user} setUser={setUser} userInfo={userInfo} SetUserInfo={setUserInfo}
                show={openProfileModal}
                onHide={() => setOpenProfileModal(false)}
                userId={openProfileModal}
            />
        </>
    )
}

export default Navbar;