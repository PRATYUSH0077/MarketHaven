import React from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'

const Dashboard = () => {
    return (
        <Layout title={'Dashboard'}>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-3'>
                        <UserMenu />
                    </div>
                    <div className='col-9'>
                        <div className='card text-center'>
                            <h1> User Dashboard</h1>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard
