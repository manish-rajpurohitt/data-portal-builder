// Sidebar.js
import React from 'react';
import componentsHelper from '../../helpers/componentsHelper';
import { SiXdadevelopers } from "react-icons/si";
import { AiFillMediumSquare } from "react-icons/ai";
import { MdSpaceDashboard } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { MdPermDataSetting } from "react-icons/md";
import { SiWebcomponentsdotorg } from "react-icons/si";
import { TbReportSearch } from "react-icons/tb";


const sidebarElementIcons = [{
    name: "Dashboard",
    icon: <MdSpaceDashboard />
}, {
    name: "Attributes",
    icon: <AiFillEdit />
}, {
    name: "Models",
    icon: <AiFillMediumSquare />
}, {
    name: "Datasets",
    icon: <MdPermDataSetting />
}, {
    name: "Components",
    icon: <SiWebcomponentsdotorg />
}, {
    name: "Reports",
    icon: <TbReportSearch />
}, {
    name: "Developers",
    icon: <SiXdadevelopers />
}];



const Sidebar = ({ onItemClick }) => {
    const handleItemClick = (item) => {
        // Pass the selected item to the parent component
        console.log(item)
        onItemClick(item);
    };

    const getIcon = (name) => {
        for (let item of sidebarElementIcons) {
            if (item.name === name) {
                return item.icon;
            }
        }
    }

    const getListItems = () => {
        let items = [];
        let count = 1;
        for (let component of componentsHelper.sidebarElements) {
            // items.push(<div className='sidebar-item' key={`item${count}`} onClick={() => handleItemClick(component.toString())}>{component}</div>);
            items.push(<div className='sidebar-item' key={`item${count}`} onClick={() => handleItemClick(component.toString())}>
                {getIcon(component)}
                <span className="hover-text">{component}</span>
            </div>);
            count++;
        }
        return items;
    }



    return (
        <div className="sidebar">
            {/* Add your sidebar content here */}
            <div className='sidebar-items'>
                {getListItems()}
            </div>
        </div>
    );
};

export default Sidebar;
