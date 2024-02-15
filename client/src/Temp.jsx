import React, { useState } from 'react';

function Temp() {
  const [isOpen, setIsOpen] = useState(false); // State to manage popup visibility

  // Function to toggle popup visibility
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="popup-container">
      <button onClick={togglePopup}>Open Popup</button>
      {isOpen && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={togglePopup}>&times;</span>
            <p>This is the popup content.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Temp;