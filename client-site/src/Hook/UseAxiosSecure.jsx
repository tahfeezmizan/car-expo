import axios from "axios";
import UseAuth from "./UseAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: 'https://y-mauve-eight.vercel.app',
    withCredentials: true
})

const UseAxiosSecure = () => {
    const { singOutUser } = UseAuth();
    const navigate = useNavigate()

    axiosSecure.interceptors.response.use(res => {
        return res;
    }, error => {
        console.log("error track in the interceptors", error.response);
        if (error.response.status === 401 || error.response.status === 403) {
            // console.log('LogOut Users');
            singOutUser()
                .then(() => {
                    navigate('/login')
                })
                .catch(error => alert(error));
        }
    })

    return axiosSecure
};

export default UseAxiosSecure;