import Cookies from "js-cookie"
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { ADMIN_ROLE } from "../utils/roles"

function AdminAuth() {
    const user = useSelector((state) => state.loggedUser.userInfo)
    const adminToken = Cookies.get("accessToken")
    const location = useLocation();
    return (
        adminToken && user.role === ADMIN_ROLE ? <Outlet /> : <Navigate to="/" state={ { from: location } } replace />
    )
}

export default AdminAuth;