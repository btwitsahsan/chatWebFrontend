// import React, { useEffect, useState } from "react";
import React, { useEffect, useState } from "react";
import "./chatOnline.css";
import axios from "axios";

// const ChatOnline = () => {
const ChatOnline = ({onlineUsers,currentUserId, setCurrentChat}) => {

  
  const [friends,setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(()=>{
    if(!currentUserId) return;
    const getFriends = async()=>{
      const res = await axios.get(`http://localhost:4000/api/friends/friends/${currentUserId}`);
      // console.log(res.data);
      setFriends(res.data);
    }
    getFriends();
    // console.log(currentUser);
  }, [currentUserId]);

  // console.log(friends)
  useEffect(()=>{
    setOnlineFriends(friends.filter(f=>onlineUsers.includes(f._id)))
  },[friends, onlineUsers])

  const handleClick = async (user)=>{
    try {
      const res = await axios.get(`http://localhost:4000/api/conversations/find/${user._id}/${currentUserId}`);
      console.log(res.data)
      setCurrentChat(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="chatOnline">
    {
      onlineFriends.map(o=>(

        <div className="chatOnlineFriend" onClick={()=>handleClick(o)}>
      <div className="chatOnlineImageContainer">
        <img
        className="chatOnlineImage"
        src={o.photo}
        alt="user image"
        />
        <div className="chatOnlineBadge"></div>
      </div>
      <div className="chatOnlineName">{o.name}</div>
    </div>
      ))
    }
  </div>
  );
};

export default ChatOnline;
