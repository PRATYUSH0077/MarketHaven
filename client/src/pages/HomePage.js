import React from 'react'
import Layout from '../components/layout/Layout'
import { useAuth } from '../context/auth'

function Home() {
    const [auth, setAuth] = useAuth();
    return (
        <Layout title={'Bumper Offers'}>
            <h1>Home Page</h1>
            <pre>{JSON.stringify(auth, null, 1)}</pre>
        </Layout>
    )
}

export default Home
