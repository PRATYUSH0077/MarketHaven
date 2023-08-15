import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Spinner = () => {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue)
        }, 1000)
        count === 0 && navigate('/login', {
            state: location.pathname
        });
        return () => clearInterval(interval);
    }, [count])




    return (
        <>
            <div class="d-flex flex-column justify-content-center align-items-center"
                style={{ height: '100vh' }}>
                <h1 className='text-center'> Sign In access your dashboard</h1>
                <h3>Redirecting to Login Page in {count} seconds</h3>
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </>
    )
}


export default Spinner
