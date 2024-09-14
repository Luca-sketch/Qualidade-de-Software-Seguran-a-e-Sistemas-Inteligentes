import React from 'react';

const Notification = ({ message, type }) => {
  const notificationStyles = {
    padding: '15px',
    borderRadius: '5px',
    color: 'white',
    backgroundColor: type === 'success' ? '#4CAF50' : '#F44336',
    textAlign: 'center',
    marginTop: '20px'
  };

  return <div style={notificationStyles}>{message}</div>;
};

export default Notification;
