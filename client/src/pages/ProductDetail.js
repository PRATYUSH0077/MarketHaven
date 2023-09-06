import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout.js'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
const ProductDetail = () => {
    const [products, setProduct] = useState({});
    const params = useParams();
    const [relatedProduct, setRelated] = useState([]);
    const [loading, isloading] = useState(false);
    const navigate = useNavigate();


    // const getProduct = async () => {
    //     try {
    //         const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`)


    //         console.log(data);
    //         setProduct(data.product);
    //         console.log('products: ', products);

    //         // console.log('data: ', data);
    //         console.log('cateogary ', products.cateogary)

    //     }

    //     catch (err) {
    //         console.log('error in productdetail: ', err);
    //     }
    // }


    useEffect(() => {
        const getProduct = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`);
                setProduct(data.product);
                getSimilarProduct(data?.product._id, data.product.cateogary._id);
            } catch (err) {
                console.log('error in productdetail: ', err);
            }
        };
        getProduct();
    }, [params?.slug])


    // GET SIMILAR PRODUCT 
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/similar-product/${pid}/${cid}`)
            setRelated(data?.products)
        }
        catch (err) {
            console.log('Error in getsiimlarproduct :', err);
        }
    }



    return (

        products.cateogary &&
        (
            <Layout>
                <div className='row container mt-3'>
                    <div className='col-6'>
                        <img src={`${process.env.REACT_APP_API}/api/v1/product/photo/${products._id}`} className="card-img-top mt-5" alt="Product Photo" />
                    </div>
                    <div className='col-6'>
                        <h4 className='text-center'>Product Deatil</h4>
                        <h6>Name : {products.name}</h6>
                        <h6>Description : {products.description}</h6>
                        <h6>Price : {products.price}</h6>
                        <h6>Cateogary :  {products.cateogary.name}</h6>
                        <button className='btn btn-primary m-1 p-1'>Add To Cart</button>
                    </div>
                </div>
                <hr />
                <div className='row container mt-5'>
                    <h2>Similar Products</h2>
                    <div className='d-flex flex-row flex-wrap' style={{}}>
                        {
                            relatedProduct?.map((p) => (
                                <div className="card m-3 p-2" style={{ width: '15em' }}>
                                    <img src={`${process.env.REACT_APP_API}/api/v1/product/photo/${p._id}`} className="card-img-top" alt="Product Photo" style={{ height: '50%' }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description.substring(0, 30)}...</p>
                                        <p className="card-text">{p.price}</p>
                                    </div>
                                    <div className='d-flex' style={{ height: '5vh' }}>
                                        <button
                                            className='btn btn-dark m-1 p-1'
                                            onClick={() => {
                                                navigate(`../product/${p.slug}`)
                                            }
                                            }
                                        >
                                            More Details
                                        </button>
                                        <button className='btn btn-primary m-1 p-1'>Add To Cart</button>
                                    </div>

                                </div>
                            ))
                        }
                    </div>
                </div>
            </Layout >
        )

    )

}

export default ProductDetail
