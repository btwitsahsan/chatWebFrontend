import axios from "axios";
const API_URL = process.env.REACT_APP_BACKEND_URL;


export const getAllUsers = async () => {
    try {
        const res  = await axios.post(`${API_URL}/api/users/getAllUser`);
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
        const res  = await axios.get(`${API_URL}/api/friends/requests/${userId}`);
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
        const res  = await axios.get(`${API_URL}/api/friends/sentRequests/${userId}`);
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
        const res  = await axios.get(`${API_URL}/api/friends/friends/${userId}`);
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
        const res  = await axios.post(
            `${API_URL}/api/friends/sendRequest`,
            {
              senderId,
              receiverId
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
export const requestAccept = async (requestId) => {
    try {
        const res  = await axios.post(
            `${API_URL}/api/friends/acceptRequest`,
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
            `${API_URL}/api/friends/rejectRequest`,
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
        const res  = await axios.delete(`${API_URL}/api/friends/unfriends/${userId}/${friendId}`)
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
        const res  = await axios.delete(`${API_URL}/api/friends/cancelRequest/${userId}/${friendId}`);
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
        const res  = await axios.post(`${API_URL}/api/conversations/${userId}`);
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
        const res  = await axios.post(`${API_URL}/api/messages/${userId}`);
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
        const res  = await axios.post(`${API_URL}/api/messages`, message);
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


export const getUsers = async (friendId) => {
    try {
        const res  = await axios.post(
          `${API_URL}/api/users/getUserById?userId=` + friendId
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



export const conversatioFind = async (userId, friendId) => {
    try {
        const res  = await await axios.get(
          `${API_URL}/api/conversations/find/${friendId}/${userId}`
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





