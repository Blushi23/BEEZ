import { FunctionComponent, useContext } from "react";
import { Link } from "react-router-dom";
import { SiteTheme } from "../App";

interface FooterProps {
    userInfo: any;

}

const Footer: FunctionComponent<FooterProps> = ({ userInfo }) => {
    let theme = useContext(SiteTheme);

    return (
        <>
            <div className="container">
                <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top" data-bs-theme={`${theme}`}>
                    <p className="col-md-4 mb-0 text-muted"> &copy; 2023 Michal Duvidzon <img src="images/bee.png" alt="BEEZ logo" width={50} /></p>

                    <ul className="nav col-md-4 justify-content-end">
                        <li className="nav-item"><Link to="/" className="nav-link px-2 text-muted">Home</Link></li>
                        <li className="nav-item"><Link to="/about" className="nav-link px-2 text-muted">About</Link></li>
                        {userInfo.email && (
                            <>
                                <li className="nav-item"><Link to="/favorites" className="nav-link px-2 text-muted">Favorites</Link></li>
                                {(userInfo.role === "business" || userInfo.role === "admin") && (
                                    <>
                                        <li className="nav-item"><Link to="/my-cards" className="nav-link px-2 text-muted">My cards</Link></li>
                                        {userInfo.role === "admin" &&
                                            <li className="nav-item"><Link to="#" className="nav-link px-2 text-muted">Sandbox</Link></li>
                                        }
                                    </>
                                )}
                            </>
                        )}
                    </ul>
                </footer >
            </div >
        </>
    )
}

export default Footer;