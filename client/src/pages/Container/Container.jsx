import React from 'react'
import Models from "../Models/Models"
import Datasets from '../Datasets/Datasets'
import Reports from '../Reports/Reports'
import Developers from '../Developers/Developers'
import Dashboard from '../Dashboard/Dashboard'
import Attributes from '../Attributes/Attributes'
function Container({ selectedItem }) {
    return (
        <div className="main-content">
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