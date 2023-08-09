import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

interface PageNotFoundProps {
}

const PageNotFound: FunctionComponent<PageNotFoundProps> = () => {
    let navigate = useNavigate();
    return (
        <>
            <h1 className="display-3 mt-5">404 - Page Not Found</h1>
            <h6 className="dnf-content">Buzz, buzz, buzz... Oops, looks like our bees are on a honey-seeking adventure and couldn't find the page you're buzzing around for! 🐝🍯 <br /> Don't worry, we'll sweeten things up and lead you back to the hive! <br /> Let's get you back to the nectar of our website – click your wings and fly back to our homepage! </h6>
            <button className="btn backBtn d-grid gap-2 col-2 mx-auto" onClick={() => navigate("/")}>
                Fly Back Home
            </button>
        </>
    )
}

export default PageNotFound;