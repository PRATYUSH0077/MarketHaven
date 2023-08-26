import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import '../../styles/adminDashboard.css'
import CateogaryForm from '../../components/Form/CateogaryForm';
import { Modal } from 'antd';

const CreateCateogary = () => {
    const [cateogaries, setCateogaries] = useState([]);
    const [name, setName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/cateogary/create-cateogary`, { name })
            if (response?.data?.success) {
                toast.success(`Successfully created '${response?.data?.cateogary?.name}' Categary`);
                getAllCateogary();
            } else {
                toast.error(response.data.message);
            }
        }
        catch (err) {
            console.log('error in creat cateogary from form: ', err);
            toast.error('Something went wrong');
        }
    }


    const getAllCateogary = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/cateogary/getAllCateogary`)
            if (response.data.success) {
                setCateogaries(response.data.cateogary);
            }
        }
        catch (err) {
            console.log('Error in getAllCateogary Client: ', err);
            toast.error('Error in getting All Cateogary');
        }
    }

    useEffect(() => {
        getAllCateogary();
    }, [])


    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                `${process.env.REACT_APP_API}/api/v1/cateogary/update-cateogary/${selected._id}`,
                { name: updatedName }
            );
            if (data?.success) {
                toast.success(`${updatedName} is updated`);
                setSelected(null);
                setUpdatedName("");
                setIsModalOpen(false);
                getAllCateogary();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log('error in handleupdate from CreateCateogary.js: ', error);
        }
    };
    const handleDelete = async (pId) => {
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/cateogary/deleteCateogary/${pId}`);
            if (data?.success) {
                toast.success(`cateogary is deleted`);
                getAllCateogary();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log('error in handledelete from CreateCateogary.js: ', error);
        }
    };
    return (
        <Layout title={'Create-Cateogary'}>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-9 no_border' >
                        <div className='card' style={{ border: 0, width: '85%' }}>
                            <h1 style={{
                                fontWeight: 'normal',
                                textAlign: 'center'

                            }}>
                                <u>Manage Cateogary</u>
                            </h1>


                            <div className='p-3' style={{ border: 0, width: '65%' }}>
                                <CateogaryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                            </div>


                            <div>
                                <table class="table">
                                    <thead>
                                        <tr style={{
                                            fontSize: 'x-large',
                                            fontWeight: 'normal'
                                        }}>
                                            <th scope="col">Name</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            cateogaries?.map((c) => (
                                                <tr>
                                                    <td key={c._id}>{c.name}</td>
                                                    <td>
                                                        <button
                                                            className='btn btn-primary m-3'
                                                            onClick={() => {
                                                                setIsModalOpen(true);
                                                                setUpdatedName(c.name);
                                                                setSelected(c);
                                                            }}
                                                        >Edit</button>
                                                        <button className='btn btn-danger m-3'
                                                            onClick={() => {
                                                                handleDelete(c._id)
                                                            }}>Delete</button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <Modal
                            title="Edit"
                            open={isModalOpen}
                            onCancel={() => setIsModalOpen(false)}
                            footer={null}
                        >
                            <CateogaryForm handleSubmit={handleUpdate} value={updatedName} setValue={setUpdatedName} />
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout>

    )
}

export default CreateCateogary
