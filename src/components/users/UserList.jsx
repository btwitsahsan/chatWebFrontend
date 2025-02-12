// UserList.js
import React, { useEffect, useState } from "react";

const UserList = ({
  users,
  sendRequest,
  friends,
  sentRequests,
  unfriend,
  cancelRequest,
}) => {
  const [sentRequestList, setSentRequestList] = useState(sentRequests);
  const [friendList, setFriendList] = useState(friends);

  useEffect(() => {
    setFriendList(friends);
    setSentRequestList(sentRequests);
  }, [friends]);


  const handleUnfriend = (userId)=>{
    unfriend(userId);
    setFriendList(friendList.filter(f => f._id !== userId))

  }
  const handleCancelRequest = (userId)=>{
    cancelRequest(userId);
    setSentRequestList(sentRequestList.filter(c=> c.receiverId !== userId))
  }
  const handleSendRequest = (userId)=>{
    sendRequest(userId);
    setSentRequestList( [...sentRequestList, { receiverId: userId }])
  }


  return (
    <div className="user-list">
      {users?.map((user) => {
        const isFriend = friendList?.some((f) => f?._id === user?._id);
        const isRequested = sentRequestList?.some(
          (r) => r.receiverId === user?._id
        );
        return (
          <div key={user._id} className="user-item">
            <img
              src={user.photo}
              alt={user.name}
              className="user-profile-pic"
            />
            <span className="user-name">{user.name}</span>
            {isFriend ? (
              <button
                className="send-request-button"
                onClick={() => {
                  handleUnfriend(user._id);
                }}
              >
                unFriends
              </button>
            ) : isRequested ? (
              <button
                className="send-request-button"
                onClick={() => {
                  handleCancelRequest(user._id);
                }}
              >
                Requested
              </button>
            ) : (
              <button
                onClick={() => handleSendRequest(user._id)}
                className="send-request-button"
              >
                Send Request
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default UserList;
