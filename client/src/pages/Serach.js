import React from 'react'
import Layout from '../components/layout/Layout'
import { useSearch } from '../context/Search'
const Serach = () => {
    const [values, setValue] = useSearch();
    return (
        <Layout title={'Search Results'}>
            <div className='container'>
                <div className='text-center'>
                    {
                        (values?.result?.length < 1) ?
                            (
                                <h1 style={{ margin: '1rem' }}>No Products Found</h1>
                            ) :
                            (
                                <>
                                    <h1>Search Results</h1>
                                    <h6>Found {values?.result?.length} products</h6>
                                </>
                            )
                    }
                    <div className='d-flex flex-row flex-wrap' style={{ justifyContent: 'space-around' }}>
                        {
                            values?.result?.map((p) => (
                                <div className="card m-3 p-2" style={{ width: '15em' }}>
                                    <img src={`${process.env.REACT_APP_API}/api/v1/product/photo/${p._id}`} className="card-img-top" alt="Product Photo" style={{ height: '50%' }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description.substring(0, 30)}...</p>
                                        <p className="card-text">{p.price}</p>
                                    </div>
                                    <div className='d-flex' style={{ height: '10vh' }}>
                                        <button className='btn btn-dark m-1 p-1'>More Details</button>
                                        <button className='btn btn-primary m-1 p-1'>Add To Cart</button>
                                    </div>

                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Serach
