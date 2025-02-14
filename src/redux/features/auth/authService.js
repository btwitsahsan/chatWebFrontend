import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/users/`;

// Register User
const register = async (userData) => {
    const response = await axios.post(`${API_URL}register`, userData);
    return response.data;
}
// Register User
const login = async (userData) => {
    const response = await axios.post(`${API_URL}login`, userData);
    return response.data;
}
// Register User
const logout = async () => {
    const response = await axios.post(`${API_URL}logout`);
    return response.data.message;
}
// checkLoginStatus
const checkLoginStatus = async () => {
    const response = await axios.post(`${API_URL}checkLoginStatus`);
    return response.data;
}
// checkLoginStatus
const getUser = async () => {
    const response = await axios.post(`${API_URL}getUser`);
    return response.data;
}
// checkLoginStatus
const updateUser = async (userData) => {
    console.log(userData)
    const response = await axios.patch(`${API_URL}updateUser`, userData);
    return response.data;
}
// checkLoginStatus
const updatePhoto = async (userData) => {
    const response = await axios.patch(`${API_URL}updatePhoto`, userData);
    return response.data;
}

const authService = {
    register,
    login,
    logout,
    checkLoginStatus,
    getUser,
    updateUser,
    updatePhoto
}

export default authService;
