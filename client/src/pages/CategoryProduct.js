import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const CategoryProduct = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const navigate = useNavigate();
    const params = useParams();
    const getProductByCat = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`)
            setProducts(data?.products)
            setCategory(data?.category);
            console.log(data);
            // console.log('category name : ', category);
        }
        catch (err) {
            console.log('error in getProductByCat fn: ', err);
        }
    }
    useEffect(() => {
        getProductByCat();
    }, [])


    return (
        <Layout title={'Products'}>
            <div className='container mt-3 text-center'>
                <h4>Category name : {category?.name}</h4>
                <h5>{products?.length} result found</h5>
            </div>


            <div className='row ' >
                <div className=''>
                    <div className='d-flex flex-row flex-wrap' style={{ justifyContent: 'center' }}>
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
                    {/* <div className='m-2 p-2'>
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
                    </div> */}
                </div>
            </div>
        </Layout>
    )
}

export default CategoryProduct
