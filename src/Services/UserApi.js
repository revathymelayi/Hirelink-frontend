import axios from "../Config/axios"
import { USER_BASE_URL } from "../utils/urls"
import { CHAT_BASE_URL } from "../utils/urls"
import { toast } from "react-toastify";

export const searchEmployer = async (search) => {
    const res = await axios.post(`${ USER_BASE_URL }/employer/search`, { search })
    return res.data;
}

export const searchJob= async (search) => {
    const res = await axios.post(`${ USER_BASE_URL }/job/search`, { search })
    return res.data;
}



//getting all chats of the user
export const getChats = async () => {
    const res = await axios.get(`${ CHAT_BASE_URL }`)
    return res.data;
}
//create a new chat
export const createNewChat = async (userId) => {
    const res = await axios.post(`${ CHAT_BASE_URL }?userId=${ userId }`)
    return res.data;
}
//get all chats
export const fetchAllChats = async (chatId) => {
    const res = await axios.get(`${ CHAT_BASE_URL }/allChats?chatId=${ chatId }`)
    return res.data;
}

//Send message
export const sendMessage = async ({ content, chatId }) => {
    const res = await axios.post(`${ CHAT_BASE_URL }/sendMessage`, { content, chatId })
    return res.data;
}

