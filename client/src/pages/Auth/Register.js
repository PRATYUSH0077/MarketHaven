import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import toast from 'react-hot-toast';
// import { ToastContainer, toast } from 'react-toast'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/AuthStyles.css'

const initalState = {
    "name": '',
    "email": '',
    "password": '',
    "phone": '',
    "secretKey": '',
    "address": ''
}


const Register = () => {
    const [form, setForm] = useState(initalState);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, {
                'name': form.name,
                'email': form.email,
                'password': form.password,
                'phone': form.phone,
                'secretKey': form.secretKey,
                'address': form.address
            })

            console.log(response)
            if (response.data.success) {
                toast.success(response.data.message, {
                    deplay: 10
                });
                navigate('/login');

            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            console.log('erro in registration: ', err);
            toast.error('Something Went Wrong, Please try again');
        }
    }

    return (
        <Layout title={'Register'}>
            <div className='register'>
                <form className='register-form' onSubmit={handleSubmit}>
                    <h4>REGISTER HERE</h4>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm((prevform) => ({ ...prevform, name: e.target.value }))}
                            className="form-control"
                            id="exampleInputName"
                            aria-describedby="emailHelp"
                            placeholder='Enter Your Name'
                            required />
                    </div>
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
                            value={form.phone}
                            onChange={(e) => setForm((prevform) => ({ ...prevform, phone: e.target.value }))}
                            className="form-control"
                            id="exampleInputPhone"
                            aria-describedby="emailHelp"
                            placeholder='Enter Your Phone No.'
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
                    <div className="mb-3">
                        <input
                            type="text"
                            value={form.secretKey}
                            onChange={(e) => setForm((prevform) => ({ ...prevform, secretKey: e.target.value }))}
                            className="form-control"
                            id="exampleInputsecretKey1"
                            placeholder='Enter A Secret_key for Your Account'
                            required />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={form.address}
                            onChange={(e) => setForm((prevform) => ({ ...prevform, address: e.target.value }))}
                            className="form-control"
                            id="exampleInputAddress"
                            aria-describedby="emailHelp"
                            placeholder='Enter Your Address'
                            required />
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>

            </div>


        </Layout>
    )
}

export default Register
