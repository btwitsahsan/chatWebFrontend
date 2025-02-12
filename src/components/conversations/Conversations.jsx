import React, { useEffect, useState } from "react";
import "./conversations.css";
import axios from "axios";

const Conversations = ({ conversations, currentUser }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversations.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios.post(
          "http://localhost:4000/api/users/getUserById?userId=" + friendId
        );

        if (res.data && typeof res.data === "object") {
          setUser(res.data); // Ensure res.data is the user object
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (friendId) getUser();
  }, [currentUser, conversations]);

  return (
    <div className="conversation">
      {user ? (
        <>
          <img
            className="conversationImage"
            src={user.photo}
            alt={user.name}
          />
          <span className="conversationName">{user.name || "Unknown"}</span>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Conversations;
