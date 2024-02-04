import React, { useEffect } from 'react'
import "./MainComponent.style.css";
import Sidebar from '../Sidebar/Sidebar';
import Container from '../Container/Container';
import componentsHelper from '../../helpers/componentsHelper';


function MainComponent() {
  const [item, setItem] = React.useState("Dashboard");
  return (
    <div className='main'>
      <Sidebar onItemClick={setItem} />
      <Container selectedItem={item} />
    </div>
  )
}

export default MainComponent