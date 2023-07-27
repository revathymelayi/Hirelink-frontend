import Cookies from "js-cookie"
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { ADMIN_ROLE, EMPLOYER_ROLE, USER_ROLE } from "../utils/roles"

function    ProtectedAuth() {
    const user = useSelector((state) => state.loggedUser.userInfo)
    const accessToken = Cookies.get("accessToken")
    const location = useLocation();

    if (!accessToken) {
        return <Outlet />
    } else {
        console.log(accessToken)
        if (user.role === USER_ROLE) {
            return <Navigate to="/user/dashboard" state={ { from: location } } replace />
        } else if (user.role === EMPLOYER_ROLE) {
            return <Navigate to="/employer/dashboard" state={ { from: location } } replace />
        } else if (user.role === ADMIN_ROLE) {
            return <Navigate to="/admin/dashboard" state={ { from: location } } replace />
        }
    }

}

export default  ProtectedAuth;