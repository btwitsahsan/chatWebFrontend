import React, { useEffect, useState } from "react";
import "./users.css";
import UserList from "../../components/users/UserList";
import RequestList from "../../components/users/RequestList";
import FriendList from "../../components/users/FriendList";
import { useSelector } from "react-redux";
import {
  getAllUsers,
  getFriendRequests,
  getFriends,
  getSentRequests,
  requestAccept,
  requestCancel,
  requestReject,
  sendRequests,
  unFriend,
} from "../../networks/Apis";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);

  const LoggedInUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    const Users = async () => {
      if (!LoggedInUser?._id) return;
      const res = await getAllUsers();

      const userss = await res.data.filter((u) => u._id !== LoggedInUser?._id);
      setUsers(userss);
    };
    Users();
  }, [LoggedInUser]);

  useEffect(() => {
    const FriendRequests = async () => {
      if (!LoggedInUser?._id) return; // Prevent unnecessary API calls
      const res = await getFriendRequests(LoggedInUser?._id);
      setRequests(res.data);
    };

    FriendRequests();
  }, [LoggedInUser]);

  useEffect(() => {
    const SentRequest = async () => {
      if (!LoggedInUser?._id) return; // Prevent unnecessary API calls
      const res = await getSentRequests(LoggedInUser?._id);
      setSentRequests(res.data);
    };
    SentRequest();
  }, [LoggedInUser]);

  useEffect(() => {
    const Friends = async () => {
      if (!LoggedInUser?._id) return;
      const res = await getFriends(LoggedInUser?._id);
      setFriends(res.data);
    };
    Friends();
  }, [LoggedInUser]);

  const sendRequest = async (receiverId) => {
    const res = await sendRequests(LoggedInUser?._id, receiverId);
    console.log(LoggedInUser?._id, receiverId);
    // Logic to send a friend request
    setSentRequests([
      ...sentRequests,
      users.find((user) => user._id === receiverId),
    ]);
  };

  const acceptRequest = async (requestId) => {
    // Logic to accept a friend request
    const res = await requestAccept(requestId);
    const user = requests.find((req) => req._id === requestId);
    setFriends([...friends, user]);
    setRequests(requests.filter((req) => req._id !== requestId));
  };

  const rejectRequest = async (requestId) => {
    const res = await requestReject(requestId);
    // Logic to reject a friend request
    setRequests(requests.filter((req) => req._id !== requestId));
  };

  const unfriend = async (friendId) => {
    const res = await unFriend(LoggedInUser?._id, friendId);
    // Logic to reject a friend request
    // setRequests(requests.filter((req) => req._id !== requestId));
  };

  const cancelRequest = async (friendId) => {
    const res = await requestCancel(LoggedInUser?._id, friendId);
    // Logic to reject a friend request
    // setRequests(requests.filter((req) => req._id !== requestId));
  };

  return (
    <div className="mainUsersDiv">
      <div className="usersDiv">
        <h2>Users</h2>
        <UserList
          users={users}
          sendRequest={sendRequest}
          friends={friends}
          sentRequests={sentRequests}
          unfriend={unfriend}
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
