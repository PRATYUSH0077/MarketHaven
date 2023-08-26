import React from 'react'
import Layout from './Layout'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
    return (
        <>
            <div className='text-center'>
                <div className="list-group">
                    <h3>Admin Panel</h3>
                    <NavLink to="/dashboard/admin/create-cateogary" className="list-group-item list-group-item-action" aria-current="true">
                        Create Cateogary
                    </NavLink>
                    <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">Show All Products</NavLink>
                    <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">Create Product</NavLink>
                    <NavLink to="/dashboard/admin/user" className="list-group-item list-group-item-action">User</NavLink>
                    {/* <NavLink to="#" className="list-group-item list-group-item-action">A fourth link item</NavLink> */}

                </div>
            </div>



        </>
    )
}

export default AdminMenu
