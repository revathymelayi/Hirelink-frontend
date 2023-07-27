import axios from "../Config/axios"
import { USER_BASE_URL } from "../utils/urls"
import { toast } from "react-toastify";

export const searchEmployer = async (search) => {
    const res = await axios.post(`${ USER_BASE_URL }/employer/search`, { search })
    return res.data;
}

export const searchJob= async (search) => {
    const res = await axios.post(`${ USER_BASE_URL }/job/search`, { search })
    return res.data;
}
