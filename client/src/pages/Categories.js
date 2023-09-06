import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import useCateogary from '../hooks/useCateogary'
import { Link } from 'react-router-dom';

const Categories = () => {
    const categories = useCateogary();


    return (
        <Layout title={'All Categories'}>
            <h1> All Category</h1>
            <div className='container'>
                <div className='row'>
                    {
                        categories?.map((c) => (
                            <div className='col-6 mt-5 mb-3 gx-3 gy-3' key={c._id}>
                                <Link to={`/cateogary/${c.slug}`} className='btn btn-primary'>{c.name}</Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Layout>
    )
}

export default Categories;
