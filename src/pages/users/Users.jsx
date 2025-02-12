import React, { useEffect, useState } from "react";
import "./users.css";
import UserList from "../../components/users/UserList";
import RequestList from "../../components/users/RequestList";
import FriendList from "../../components/users/FriendList";
import axios from "axios";
import { useSelector } from "react-redux";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);

  const LoggedInUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    const getAllUsers = async () => {
      if (!LoggedInUser?._id) return;
      try {
        const res = await axios.post(
          "http://localhost:4000/api/users/getAllUser"
        );

        const userss = await res.data.filter(
          (u) => u._id !== LoggedInUser?._id
        );
        setUsers(userss);
      } catch (error) {
        console.error("Error fetching friend requests:", error);
      }
    };
    getAllUsers();
  }, [LoggedInUser]);

  useEffect(() => {
    const getFriendRequests = async () => {
      if (!LoggedInUser?._id) return; // Prevent unnecessary API calls

      try {
        const res = await axios.get(
          `http://localhost:4000/api/friends/requests/${LoggedInUser._id}`
        );
        // console.log(res.data);
        setRequests(res.data);
      } catch (error) {
        console.error("Error fetching friend requests:", error);
      }
    };

    getFriendRequests();
  }, [LoggedInUser]);

  useEffect(() => {
    const getSentRequests = async () => {
      if (!LoggedInUser?._id) return; // Prevent unnecessary API calls

      try {
        const res = await axios.get(
          `http://localhost:4000/api/friends/sentRequests/${LoggedInUser._id}`
        );
        // console.log(res.data);
        setSentRequests(res.data);
      } catch (error) {
        console.error("Error fetching sent requests:", error);
      }
    };

    getSentRequests();
  }, [LoggedInUser]);

  useEffect(() => {
    const getFriends = async () => {
      if (!LoggedInUser?._id) return;

      try {
        const res = await axios.get(
          `http://localhost:4000/api/friends/friends/${LoggedInUser._id}`
        );
        setFriends(res.data);
      } catch (error) {
        console.error("Error fetching friend requests:", error);
      }
    };

    getFriends();
  }, [LoggedInUser]);












  const sendRequest = async (userId) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/friends/sendRequest",
        {
          senderId: LoggedInUser?._id,
          receiverId: userId,
        }
      );

      // Logic to send a friend request
      setSentRequests([
        ...sentRequests,
        users.find((user) => user._id === userId),
      ]);
    } catch (error) {
      if (error && error.response && error.response.data) {
        alert(error.response.data);
      }
    }
  };

  const acceptRequest = async (requestId) => {
    // Logic to accept a friend request
    const res = await axios.post(
      "http://localhost:4000/api/friends/acceptRequest",
      {
        requestId,
      }
    );
    const user = requests.find((req) => req._id === requestId);
    setFriends([...friends, user]);
    setRequests(requests.filter((req) => req._id !== requestId));
  };












  
  const rejectRequest = async (requestId) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/friends/rejectRequest",
        {
          requestId,
        }
      );
      // Logic to reject a friend request
      setRequests(requests.filter((req) => req._id !== requestId));
      alert(res.data.message);
    } catch (error) {
      if (error && error.response && error.response.data) {
        alert(error.response.data);
      }
    }
  };











  const unfriend = async (friendId)=>{
try {
  const res = await axios.delete(`http://localhost:4000/api/friends/unfriends/${LoggedInUser._id}/${friendId}`);
  // Logic to reject a friend request
  // setRequests(requests.filter((req) => req._id !== requestId));
  alert(res.data.message);
} catch (error) {
  if (error && error.response && error.response.data) {
    alert(error.response.data);
  }
}
  }
  // console.log(requests)






  const cancelRequest = async (friendId)=>{
 
try {
  const res = await axios.delete(`http://localhost:4000/api/friends/cancelRequest/${LoggedInUser._id}/${friendId}`);
  // Logic to reject a friend request
  // setRequests(requests.filter((req) => req._id !== requestId));
  alert(res.data.message);
} catch (error) {
  if (error && error.response && error.response.data) {
    alert(error.response.data);
  }
}
  }
  // console.log(requests)

  return (
    <div className="mainUsersDiv">
      <div className="usersDiv">
        <h2>Users</h2>
        <UserList
          users={users}
          sendRequest={sendRequest}
          friends={friends}
          sentRequests={sentRequests}
          unfriend = {unfriend}
          cancelRequest={cancelRequest}
        />
      </div>
      <div className="requestsDiv">
        <h2>Friend Requests</h2>
        <RequestList
          requests={requests}
          acceptRequest={acceptRequest}
          rejectRequest={rejectRequest}
        />
      </div>
      <div className="friendsDiv">
        <h2>Friends</h2>
        <FriendList friends={friends} />
      </div>
    </div>
  );
};

export default Users;
