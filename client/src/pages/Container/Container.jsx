import React from 'react'
import Attributes from '../Attributes/Attributes'
import Models from "../Models/Models"
import Datasets from '../Datasets/Datasets'
import Reports from '../Reports/Reports'
import Developers from '../Developers/Developers'
import Dashboard from '../Dashboard/Dashboard'
function Container({ selectedItem }) {
    return (
        <div className="main-content">
            <h1>{selectedItem.charAt(0).toUpperCase() + selectedItem.slice(1)}</h1>
            {selectedItem === 'Dashboard' && <Dashboard />}
            {selectedItem === 'Attributes' && <Attributes />}
            {selectedItem === 'Models' && <Models />}
            {selectedItem === 'Datasets' && <Datasets />}
            {selectedItem === 'Reports' && <Reports />}
            {selectedItem === 'Developers' && <Developers />}
        </div>
    )
}

export default Container