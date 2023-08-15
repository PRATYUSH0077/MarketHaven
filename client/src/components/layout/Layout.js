import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from "react-helmet";
import { ToastContainer } from 'react-toastify';
// import { ToastContainer, toast } from 'react-toast'
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children, title, description, keyword, author }) => {
    return (
        <div>
            <Helmet>
                <meta charSet="UTF-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keyword} />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>

            <Header />

            <main style={{ minHeight: '74vh' }}>
                {children}
                <Toaster />

            </main>

            <Footer />
        </div>
    )
}

Layout.defaultProps = {
    title: 'MarketHaven',
    description: 'An Ecommerce Website',
    keyword: 'Shop watch Ecommerce',
    author: 'Pratyush Sinha'
}
export default Layout
