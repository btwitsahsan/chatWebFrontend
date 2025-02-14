import React, { useEffect, useState } from "react";
import "./chatOnline.css";
import axios from "axios";
import { conversatioFind, getFriends } from "../../networks/Apis";

const ChatOnline = ({ onlineUsers, currentUserId, setCurrentChat }) => {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    if (!currentUserId) return;
    const getFriend = async () => {
      const res = await getFriends(currentUserId);
      setFriends(res.data);
    };
    getFriend();
  }, [currentUserId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (friend) => {
    const res = await conversatioFind(currentUserId, friend._id);
    setCurrentChat(res.data);
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
          <div className="chatOnlineImageContainer">
            <img className="chatOnlineImage" src={o.photo} alt="user image" />
            <div className="chatOnlineBadge"></div>
          </div>
          <div className="chatOnlineName">{o.name}</div>
        </div>
      ))}
    </div>
  );
};

export default ChatOnline;
