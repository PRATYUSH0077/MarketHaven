import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../styles/ProductStyles.css'
const Products = () => {
    const [products, setProduct] = useState([]);



    //get all product
    const getAllProducts = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`)
            console.log(response);
            if (response.data.success) {
                setProduct(response.data.products);

            }
        }
        catch (err) {
            console.log('error in products.js: ', err);
            toast.error('Cannot get Product List');
        }
    }

    useEffect(() => {
        getAllProducts();
    }, [])
    return (
        <Layout>
            <div className='row'>
                <div className='col-3'>
                    <AdminMenu />

                </div>
                <div className='col-9'>
                    <h1 className='text-center'>Product list here</h1>
                    <div className='d-flex flex-wrap'>
                        {
                            products?.map((p) => (
                                <Link
                                    to={`/dashboard/admin/update-product/${p.slug}`}
                                    className='product-card mt-3'
                                >
                                    <div className="card m-3 p-2" style={{ width: '15em', height: '100%' }}>
                                        <img src={`${process.env.REACT_APP_API}/api/v1/product/photo/${p._id}`} className="card-img-top" alt="Product Photo" />
                                        <div className="card-body">
                                            <h5 className="card-title">{p.name}</h5>
                                            <p className="card-text">{p.description.substring(0, 30)}</p>
                                            <p className="card-text">{p.price}</p>

                                        </div>
                                    </div>
                                </Link>

                            ))
                        }
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default Products
