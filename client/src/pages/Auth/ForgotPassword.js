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
    "secretKey": '',
}


const ForgotPassword = () => {
    const [form, setForm] = useState(initalState);
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, {
                'email': form.email,
                'secretKey': form.secretKey,
                'password': form.password,
            })
            console.log(response)
            if (response.data.success) {
                toast.success(response.data.message);
                // setAuth({
                //     ...auth,

                //     user: response.data.user,
                //     token: response.data.token
                // })
                // localStorage.setItem('auth', JSON.stringify(response.data));
                navigate('/login');

            } else {
                toast.error('got an error', response.data.message);
            }
        } catch (err) {
            console.log('error in forgot password: ', err);
            toast.error('Something Went Wrong, Please try again');
        }
    }

    return (
        <Layout title={'Login'}>
            <div className='register'>
                <form className='register-form' onSubmit={handleSubmit}>
                    <h4>RESET PASSWORD</h4>

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
                            type="text"
                            value={form.secretKey}
                            onChange={(e) => setForm((prevform) => ({ ...prevform, secretKey: e.target.value }))}
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder='Enter Your Secret Key'
                            required />
                    </div>

                    <div className="mb-3">
                        <input
                            type="password"
                            value={form.password}
                            onChange={(e) => setForm((prevform) => ({ ...prevform, password: e.target.value }))}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder='Enter New Password'
                            required />
                    </div>

                    <button type="submit" className="btn btn-primary">Reset</button>


                </form>

            </div>


        </Layout>
    )
}

export default ForgotPassword
