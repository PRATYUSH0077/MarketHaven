import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import toast from 'react-hot-toast';
// import { toast } from 'react-toastify';
import axios from 'axios';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import '../../styles/AuthStyles.css'
import { useAuth } from '../../context/auth';

const initalState = {
    "email": '',
    "password": '',
}


const Login = () => {
    const [form, setForm] = useState(initalState);
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth//login`, {
                'email': form.email,
                'password': form.password,
            })
            console.log(response)
            if (response.data.success) {
                toast.success(response.data.message);
                setAuth({
                    ...auth,
                    user: response.data.user,
                    token: response.data.token
                })
                localStorage.setItem('auth', JSON.stringify(response.data));
                navigate(location.state || '/');

            } else {
                toast.error('got an error', response.data.message);
            }
        } catch (err) {
            console.log('erro in registration: ', err);
            toast.error('Something Went Wrong, Please try again');
        }
    }

    return (
        <Layout title={'Login'}>
            <div className='register'>
                <form className='register-form' onSubmit={handleSubmit}>
                    <h4>LOGIN HERE</h4>

                    <div className="mb-3">
                        <input
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm((prevform) => ({ ...prevform, email: e.target.value }))}
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder='Enter Your Email'
                            required />
                    </div>

                    <div className="mb-3">
                        <input
                            type="password"
                            value={form.password}
                            onChange={(e) => setForm((prevform) => ({ ...prevform, password: e.target.value }))}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder='Enter Your Password'
                            required />
                    </div>

                    <button type="submit" className="btn btn-primary">Login</button>
                </form>

            </div>


        </Layout>
    )
}

export default Login
