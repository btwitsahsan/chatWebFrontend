import React, { useEffect, useState } from "react";
import "./conversations.css";
import axios from "axios";
import { getUsers } from "../../networks/Apis";

const Conversations = ({ conversations, currentUser }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversations.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      const res = await getUsers(friendId);

      if (res.data && typeof res.data === "object") {
        setUser(res.data); // Ensure res.data is the user object
      }
    };

    if (friendId) getUser();
  }, [currentUser, conversations]);

  return (
    <div className="conversation">
      {user ? (
        <>
          <img className="conversationImage" src={user.photo} alt={user.name} />
          <span className="conversationName">{user.name || "Unknown"}</span>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Conversations;
