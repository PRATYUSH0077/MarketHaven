import React from 'react'
import Layout from './Layout'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
    return (
        <>
            <div className='text-center'>
                <div className="list-group">
                    <h3>Dashboard</h3>
                    <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action" aria-current="true">
                        Profile
                    </NavLink>
                    <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action">Orders</NavLink>


                </div>
            </div>



        </>
    )
}

export default UserMenu
