import axios from "axios";
import UseAuth from "./UseAuth";
import { useNavigate } from "react-router-dom";
import { apiURL } from "../constant";
import { useEffect } from "react";

const axiosSecure = axios.create({
    baseURL: import.meta.env.apiURL,
    withCredentials: true
})

const UseAxiosSecure = () => {
    const { singOutUser } = UseAuth();
    const navigate = useNavigate()

    useEffect(() => {
        axiosSecure.interceptors.response.use(res => {
            return res;
        },
            (error) => {
                if (error.response.status === 401 || error.response.status === 403) {
                    singOutUser()
                    navigate('/login');
                }
            }
        )

    }, [])

    return axiosSecure
};

export default UseAxiosSecure;