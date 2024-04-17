import React, { useState } from 'react';
import Temp from "../../Temp"
import "./Popup.css"
import Popup from '../Shared/Popup';

function Dashboard() {
    const [isOpen, setIsOpen] = useState(false); // State to manage popup visibility

    // Function to toggle popup visibility
    const togglePopup = () => {
      console.log(isOpen)
      setIsOpen(!isOpen);
    };
  
    return (
      <div className="popup-container">
        <button onClick={togglePopup}>Open Popup</button>
        {isOpen && (
          <Popup setPopup={togglePopup}  />
        )}
      </div>
    );
}

export default Dashboard