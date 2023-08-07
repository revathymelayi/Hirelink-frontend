import axios from "../Config/axios"
import { EMPLOYER_BASE_URL } from "../utils/urls"
import { toast } from "react-toastify";

//dashboard
export const fetchDashboardDetails = async (employerId) => {
    const res = await axios.get(`${EMPLOYER_BASE_URL }/dashboard/details?employerId=${ employerId }`)
    return res.data;
}

export const searchApplicants= async (search) => {
    const res = await axios.post(`${ EMPLOYER_BASE_URL }/applicants/search`, { search })
    return res.data;
}