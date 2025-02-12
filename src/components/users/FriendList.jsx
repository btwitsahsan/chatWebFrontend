// FriendList.js
import React from 'react';

const FriendList = ({ friends }) => {
  return (
    <div className="friend-list">
      {friends.map(friend => (
        <div key={friend._id} className="friend-item">
          <img src={friend.photo} alt={friend.name} className="friend-profile-pic" />
          <span className="friend-name">{friend.name}</span>
          <button className="send-request-button">Let's Talk</button>
        </div>
      ))}
    </div>
  );
};

export default FriendList;
