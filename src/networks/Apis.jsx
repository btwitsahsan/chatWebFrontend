import axios from "axios";
import { API_URL } from "../redux/features/auth/authService";


export const getAllUsers = async () => {
    try {
        const res  = await axios.post(`${API_URL}/users/getAllUser`);
        return res;
    } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
    }
}
export const getFriendRequests = async (userId) => {
    try {
        const res  = await axios.get(`${API_URL}/friends/requests/${userId}`);
        return res;
    } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
    }
}
export const getSentRequests = async (userId) => {
    try {
        const res  = await axios.get(`${API_URL}/friends/sentRequests/${userId}`);
        return res;
    } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
    }
}
export const getFriends = async (userId) => {
    try {
        const res  = await axios.get(`${API_URL}/friends/friends/${userId}`);
        return res;
    } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
    }
}
export const sendRequests = async (senderId , receiverId) => {
    try {
      console.log(senderId , receiverId);
        const res  = await axios.post(
            `${API_URL}/friends/sendRequest`,
            {
              senderId,
              receiverId
            }
          );
          console.log(res)
        return res;
    } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
    }
}
export const requestAccept = async (requestId) => {
    try {
        const res  = await axios.post(
            `${API_URL}/friends/acceptRequest`,
            {
              requestId,
            }
          );
        return res;
    } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
    }
}
export const requestReject = async (requestId) => {
    try {
        const res  = await axios.post(
            `${API_URL}/friends/rejectRequest`,
            {
              requestId,
            }
          );
        return res;
    } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
    }
}
export const unFriend = async (userId, friendId) => {
    try {
        const res  = await axios.delete(`${API_URL}/friends/unfriends/${userId}/${friendId}`)
        return res;
    } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
    }
}
export const requestCancel = async (userId, friendId) => {
    try {
        const res  = await axios.delete(`${API_URL}/friends/cancelRequest/${userId}/${friendId}`);
        return res;
    } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
    }
}



export const getConversations = async (userId) => {
    try {
        const res  = await axios.post(`${API_URL}/conversations/${userId}`);
        return res;
    } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
    }
}
export const getMessages = async (userId) => {
    try {
        const res  = await axios.post(`${API_URL}/messages/${userId}`);
        return res;
    } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
    }
}
export const postMessages = async (message) => {
    try {
        const res  = await axios.post(`${API_URL}/messages`, message);
        return res;
    } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
    }
}





