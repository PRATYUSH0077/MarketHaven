import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import { useAuth } from '../context/auth'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/Prices';

function Home() {
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const [products, setProduct] = useState([])
    const [cateogaries, setCateogaries] = useState([])
    const [checked, setChecked] = useState([])
    const [radio, setRadio] = useState([])
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    // GET TOTAL PRODUCT COUNT
    const getTotal = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`);
            setTotal(data?.total);

        }
        catch (err) {
            console.log('Error in getTotal Fucntion: ', err);

        }
    }

    // GET ALL PRODUCT
    const getAllProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-per-page/${page}`)
            console.log(response);
            setLoading(false);
            if (response.data.success) {
                setProduct(response.data.products);
            }
        }
        catch (err) {
            setLoading(false);
            console.log('error in Home.js: ', err);
            toast.error('Cannot get Product List');
        }
    }
    useEffect(() => {
        getAllProducts();
        getTotal();
    }, [])


    // LOADMORE FUNCTIONALITY
    useEffect(() => {
        if (page === 1) return;
        loadmore();
    }, [page])
    const loadmore = async (req, res) => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-per-page/${page}`)
            setProduct([...products, ...data?.products])
            setLoading(false);
        }
        catch (err) {
            setLoading(false);
            console.log('error in loadmore function: ', err)
        }
    }
    // GET ALL CATEGARY
    const getAllCateogary = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/cateogary/getAllCateogary`)
            if (response.data.success) {
                setCateogaries(response.data.cateogary);
            }
        }
        catch (err) {
            console.log('Error in getAllCateogary Client: ', err);
        }
    }
    useEffect(() => {
        if (!checked.length || !radio.length) getAllCateogary();
    }, [])

    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id)
        }
        setChecked(all);
    }

    const filterProduct = async () => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filters`, {
                checked,
                radio
            })
            setProduct(data?.products);
        }
        catch (err) {
            console.log('Error in filterProduct function in Homepage.js: ', err)
        }
    }

    useEffect(() => {
        if (checked.length || radio.length) filterProduct();
    }, [checked, radio])





    return (
        <Layout title={'All Products-best offer'}>
            {/* <h1>Home Page</h1>
            <pre>{JSON.stringify(auth, null, 1)}</pre> */}
            <div className='row mt-2'>
                <div className='col-3 '>
                    <h4 className='text-center'>Filter By Categary</h4>
                    <div className='d-flex flex-column m-3'>
                        {
                            cateogaries?.map((c) => (
                                <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>{c.name}</Checkbox>
                            ))
                        }
                    </div>
                    <h4 className='text-center'>Filter By Price</h4>
                    <div className='d-flex flex-column m-3'>
                        <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                            {
                                Prices?.map((p) => (
                                    <div key={p._id}>

                                        <Radio value={p.array}> {p.name}</Radio>
                                    </div>
                                ))
                            }
                        </Radio.Group>
                    </div>
                    <div className='d-flex flex-column m-3'>
                        <button className='btn btn-danger' onClick={() => window.location.reload()}> Reset Filters</button>
                    </div>
                </div>



















                <div className='col-8 '>
                    <h1 className='text-center'>All Products </h1>
                    <div className='d-flex flex-row flex-wrap' style={{}}>
                        {
                            products?.map((p) => (
                                <div className="card m-3 p-2" style={{ width: '15em' }}>
                                    <img src={`${process.env.REACT_APP_API}/api/v1/product/photo/${p._id}`} className="card-img-top" alt="Product Photo" style={{ height: '50%' }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description.substring(0, 30)}...</p>
                                        <p className="card-text">{p.price}</p>
                                    </div>
                                    <div className='d-flex' style={{ height: '10vh' }}>
                                        <button
                                            className='btn btn-dark m-1 p-1'
                                            onClick={() => navigate(`/product/${p.slug}`)}
                                        >
                                            More Details
                                        </button>
                                        <button className='btn btn-primary m-1 p-1'>Add To Cart</button>
                                    </div>

                                </div>
                            ))
                        }
                    </div>
                    <div className='m-2 p-2'>
                        {
                            products && products.length < total && (
                                <button
                                    className='btn btn-warning'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setPage(page + 1);
                                    }}
                                >
                                    {
                                        loading ? "loading.." : "Load More"
                                    }
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default Home
