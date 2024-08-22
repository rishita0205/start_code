import React, { useEffect } from 'react';

const Notification = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Close notification after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-5 right-5 bg-green-500 text-white py-2 px-4 rounded-md shadow-lg z-50">
      {message}
    </div>
  );
};

export default Notification;
