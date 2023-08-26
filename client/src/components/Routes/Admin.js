import { useEffect, useState } from "react"
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Home from "../../pages/HomePage";
import Spinner from "../Spinner";



const AdminRoute = () => {
    // console.log('in admin routes');
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin-auth`
                // , {
                //     headers: {
                //         "Authorization": auth?.token
                //     }
                // }
            )
            // console.log('response ok status: ', response);
            if (response.data.ok) {
                setOk(true);
            } else {
                setOk(false);
            }
        }
        if (auth?.token) authCheck();
    }, [auth?.token])
    // console.log('ok status: ', ok);

    return ok ? <Outlet /> : <Spinner path="/" />


}

export default AdminRoute