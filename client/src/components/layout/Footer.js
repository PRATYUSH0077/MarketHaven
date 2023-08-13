import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='footer'>
            <h4 className='text-center'>
                All Right Reserved 	&copy; Pratyush_Sinha
            </h4>
            <p className='mt-3 text-center '>
                <Link to='/about'> About Us</Link> |
                <Link to='/contact'> Contact Us</Link> |
                <Link to='/policy'> Privacy Policy</Link>

            </p>
        </div>
    )
}

export default Footer

