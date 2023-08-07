import axios from "../Config/axios"
import { ADMIN_BASE_URL } from "../utils/urls"


//Dashboard
export const getDashboardDetails = async () => {
    const res = await axios.get(`${ ADMIN_BASE_URL }/dashboard/details`)
    return res.data;
}


export const getRevenueDetails = async (page,limit) => {
    try {
      const response = await axios.get(`${ADMIN_BASE_URL}/transaction?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };