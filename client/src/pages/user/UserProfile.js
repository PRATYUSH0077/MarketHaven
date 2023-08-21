import React from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import { useAuth } from '../../context/auth'

const UserProfile = () => {
    const [auth] = useAuth();
    return (
        <Layout title={'Profile'}>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-3'>
                        <UserMenu />
                    </div>
                    <div className='col-9'>
                        <div className='card text-center'>
                            <h1>name : {auth?.user?.name} </h1>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UserProfile
