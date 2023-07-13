import Cookies from "js-cookie"
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { EMPLOYER_ROLE } from "../utils/roles"

function EmployerAuth() {
    const employerToken = Cookies.get("accessToken")
    const user = useSelector((state) => state.loggedUser.userInfo)
    const location = useLocation();
    return (
        employerToken && user.role === EMPLOYER_ROLE ? <Outlet /> : <Navigate to="/" state={ { from: location } } replace />
    )
}

export default EmployerAuth;