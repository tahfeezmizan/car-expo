import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UseAuth from "./UseAuth";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

const UseAxiosSecure = () => {
    const { singOutUser } = UseAuth();
    const navigate = useNavigate()

    useEffect(() => {
        axiosSecure.interceptors.response.use(
            res => res,
            error => {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    singOutUser();
                    navigate('/login');
                }
                return Promise.reject(error);
            }
        );
    }, []);

    return axiosSecure;
};

export default UseAxiosSecure;
