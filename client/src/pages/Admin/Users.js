import React from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'

const Users = () => {
    return (
        <Layout title={'All Users'}>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-9'>
                        <div className='card text-center'>
                            <h1> User List</h1>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>

    )
}

export default Users
