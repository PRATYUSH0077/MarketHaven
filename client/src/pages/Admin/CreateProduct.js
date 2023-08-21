import React from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'

const CreateProduct = () => {
    return (
        <Layout title={'Create-Product'}>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-9'>
                        <div className='card text-center'>
                            <h1> Create Product</h1>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateProduct
