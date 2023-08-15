import { useEffect, useState } from "react"
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Home from "../../pages/HomePage";
import Spinner from "../Spinner";



const PrivateRoute = () => {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/user-auth`
                // , {
                //     headers: {
                //         "Authorization": auth?.token
                //     }
                // }
            )
            if (response.data.ok) {
                setOk(true);
            } else {
                setOk(false);
            }
        }
        if (auth?.token) authCheck();
    }, [auth?.token])


    return ok ? <Outlet /> : <Spinner />


}

export default PrivateRoute