import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Select } from 'antd';
import { black } from 'colors';
import '../../styles/adminDashboard.css'
import { Button } from 'antd/es/radio';
import { useNavigate, useParams } from 'react-router-dom';
import Products from './Products';
import { useToast } from 'react-toastify';
const { Option } = Select;



const UpdateProduct = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [cateogaries, setCateogaries] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState('');
    const [cateogary, setcateogary] = useState('');
    const [id, setID] = useState('');


    // GET SINGLE PRODUCT
    const getSingleProduct = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`);
            if (response.data.success) {
                setID(response.data.products._id)
                setName(response.data.products.name);
                setcateogary(response.data.products.cateogary)
                setDescription(response.data.products.description)
                setPrice(response.data.products.price)
                setQuantity(response.data.products.quantity)
                setPhoto(response.data.products.photo)
                setShipping(response.data.products.shipping)
                console.log('response from update product singleproduct func: ', response);
            } else {
                console.log('Success is false in update product');
            }
        }
        catch (err) {
            console.log('Error in updateProduct.js: ', err);
        }
    }

    useEffect(() => {
        getSingleProduct();
        console.log(cateogary);
    }, [])


    // GET ALL CATEOGARY
    const getAllCateogary = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/cateogary/getAllCateogary`)
            if (response.data.success) {
                setCateogaries(response.data.cateogary);
                // console.log(response.data.cateogary);
            }
        }
        catch (err) {
            console.log('Error in getAllCateogary Client: ', err);
            toast.error('Error in getting All Cateogary');
        }
    }

    useEffect(() => {
        getAllCateogary();
        // console.log('from use effect', cateogaries);

    }, [])


    // UPDATE PRODUCT  HANDLER
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            productData.append("photo", photo);
            productData.append("cateogary", cateogary._id);
            photo && productData.append("photo", photo);
            const response = await axios.put(`${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`, productData);
            if (response?.data?.success) {
                toast.success('Product Updated Succesfully');
                navigate('/dashboard/admin/products');
            } else {
                toast.error(response?.data?.message);
            }

        }
        catch (err) {
            console.log('Error in handleUpdate of product: ', err);
            toast.error('Something went wrong');
        }
    }

    // HANDLEDELETE fUNCTION
    const handleDelete = async () => {
        try {
            const answer = window.prompt('Are you sure you want to delete the product?')
            console.log('prompt value: ', answer.toLowerCase());
            if (answer.toLowerCase() !== "yes") return;
            const data = await axios.delete(`${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`)
            toast.success('Product Deleted Succesfully');
            navigate('/dashboard/admin/products');
        }
        catch (err) {
            console.log('Error in Handledelte of updateproduct: ', err)
            toast.error('Something went Wrong');
        }
    }




    return (
        <Layout title={'Update-Product'}>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-9'>
                        <div
                            className='card text-center'
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <h1> Update Product</h1>
                            <div
                                className=''
                                style={{
                                    width: '75%',
                                    margin: '5%'
                                }}
                            >
                                {/* FOR SELECTING THE CATEOGARY */}
                                <Select
                                    bordered={false}
                                    placeholder='Select A Cateogary'
                                    size='large'
                                    showSearch
                                    className='form-select'
                                    value={cateogary.name}
                                    onChange={(value) => {
                                        setcateogary(value);
                                    }}
                                >
                                    {
                                        cateogaries?.map((c) => (
                                            <Option key={c._id} value={c._id}>
                                                {c.name}
                                            </Option>
                                        ))
                                    }
                                </Select>
                                {/* CATEOGARY SELECTION END */}
                                {/* Various Other Field Input */}
                                <div className=''>
                                    <input type='text'
                                        value={name}
                                        placeholder='Enter Product Name'
                                        className='form-control CreateP_form'
                                        onChange={(e) => setName(e.target.value)}
                                        bordered={false}
                                    />
                                    <textarea type='text'
                                        value={description}
                                        placeholder='Write a description'
                                        className='form-control CreateP_form'
                                        onChange={(e) => setDescription(e.target.value)}
                                        bordered={false}
                                    />
                                    <input type='number'
                                        value={price}
                                        placeholder='Enter Price'
                                        className='form-control CreateP_form'
                                        onChange={(e) => setPrice(e.target.value)}
                                        bordered={false}
                                    />
                                    <input type='number'
                                        value={quantity}
                                        placeholder='Enter Product Quantity'
                                        className='form-control CreateP_form'
                                        onChange={(e) => setQuantity(e.target.value)}
                                        bordered={false}
                                    />
                                    <Select
                                        bordered={false}
                                        placeholder="Select Shipping "
                                        size="small"
                                        showSearch
                                        className="form-select CreateP_form"
                                        onChange={(value) => {
                                            setShipping(value);
                                        }}
                                        value={shipping ? 'Yes' : 'No'}
                                    >
                                        <Option value="0">No</Option>
                                        <Option value="1">Yes</Option>
                                    </Select>
                                </div>


                                {/* FOR PHOTO UPLOAD */}
                                <div>
                                    <label className='btn btn-outline-secondary m-3' style={{
                                        backgroundColor: 'rgb(48, 67, 79)',
                                        width: '50%'
                                    }}>
                                        {photo ? photo.name : "Upload Photo"}
                                        <input
                                            type='file'
                                            name='photo'
                                            accept='image/*'
                                            onChange={(e) => setPhoto(e.target.files[0])}
                                            hidden
                                        />
                                    </label>
                                </div>
                                {/* PHOTO UPLOAD ENDS */}
                                {/*Photo preview  */}
                                <div>
                                    {
                                        photo ?
                                            (
                                                <div className='text-center'>
                                                    <img
                                                        className='img img-responsive'
                                                        src={URL.createObjectURL(photo)}
                                                        alt='product-photo'
                                                        height='50%'
                                                        style={{
                                                            width: '50%',
                                                            borderRadius: '5px',
                                                            border: '1px solid black'
                                                        }}
                                                    />
                                                </div>
                                            ) :
                                            (
                                                <div className='text-center'>
                                                    <img
                                                        className='img img-responsive'
                                                        src={`${process.env.REACT_APP_API}/api/v1/product/photo/${id}`}
                                                        alt='product-photo'
                                                        height='50%'
                                                        style={{
                                                            width: '50%',
                                                            borderRadius: '5px',
                                                            border: '1px solid black'
                                                        }}
                                                    />
                                                </div>
                                            )
                                    }
                                </div>
                                <button onClick={handleUpdate} class="button-72" role="button" >Update Product</button>
                                <button onClick={handleDelete} class="button-72" role="button" >Delete Product</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UpdateProduct
