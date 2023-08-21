import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FaShopify } from 'react-icons/fa'
import { useAuth } from '../../context/auth'
import { toast } from 'react-hot-toast'

const Header = () => {
    const [auth, setAuth] = useAuth();
    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: ''
        })
        localStorage.removeItem("auth")
        toast.success('Logged Out Successfully')
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand" > <FaShopify />{' '} MarketHaven</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link" >Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/category" className="nav-link" >Category</NavLink>
                            </li>
                            {
                                !auth.user ?
                                    (
                                        <>
                                            <li className="nav-item">
                                                <NavLink to="/register" className="nav-link" >Register</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink to="/login" className="nav-link" >Login</NavLink>
                                            </li>
                                        </>
                                    ) :
                                    (
                                        <div className="nav-item dropdown">
                                            <button className="nav-link dropdown-toggle nav-item" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                {auth?.user?.name}
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li className="nav-item">
                                                    <NavLink
                                                        onClick={() => { handleLogout() }}
                                                        to="/login"
                                                        className="nav-link" >
                                                        Logout</NavLink>
                                                </li>
                                                <li className="nav-item">
                                                    <NavLink
                                                        to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"
                                                            }`}
                                                        className="nav-link" >
                                                        Dashboard</NavLink>
                                                </li>
                                            </ul>
                                        </div>



                                    )
                            }
                            <li className="nav-item">
                                <NavLink to="/cart" className="nav-link" >Cart(0)</NavLink>
                            </li>

                        </ul>

                    </div>
                </div>
            </nav>

        </>
    )
}

export default Header
