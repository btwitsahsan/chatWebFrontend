// RequestList.js
import React from 'react';

const RequestList = ({ requests, acceptRequest, rejectRequest }) => {
  return (
    <div className="request-list">
      {requests?.map(request => (
        <div key={request.senderId._id} className="request-item">
          <div className='pic-na-div'>
          <img src={request.senderId.photo} alt={request.senderId.name} className="request-profile-pic" />
          <span className="request-name">{request.senderId.name}</span>
          </div>
          <div className='acc-rej-btn'>
          <button onClick={() => acceptRequest(request._id)} className="accept-button">Accept</button>
          <button onClick={() => rejectRequest(request._id)} className="reject-button">Reject</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RequestList;
