import { Link } from "react-router-dom";
import { getDecodedToken } from "../../../utils/auth";

function NotFound() {
    const decodeToken = getDecodedToken();
    let accountRole = "";

    if (decodeToken && decodeToken.Role && decodeToken.Role[0].authority) {
        accountRole = decodeToken.Role[0].authority;
    } else {
        console.error("Role not found in token");
    }

    let redirectUrl = "/";

    if (accountRole === "ADMIN" || accountRole === "TRAINERS") {
        redirectUrl = "/";
    } else if (accountRole === "TEACHER") {
        redirectUrl = "/dashboard-teacher";
    } else if (accountRole === "ADMISSIONS") {
        redirectUrl = "/dashboard-admissions";
    }

    return (
        <div className="maintenance-block">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card error-card">
                            <div className="card-body">
                                <div className="error-image-block">
                                    <img className="img-fluid" src="../assets/images/pages/img-error-404.svg" alt="" />
                                </div>
                                <div className="text-center">
                                    <h1 className="mt-5">
                                        <b>Page Not Found</b>
                                    </h1>
                                    <p className="mt-2 mb-4 text-muted">
                                        The page you are looking was moved, removed,
                                        <br /> renamed, or might never exist!
                                    </p>
                                    <Link to={redirectUrl} className="btn btn-primary mb-3">
                                        Go to home
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
