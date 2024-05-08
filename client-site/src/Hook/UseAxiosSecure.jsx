import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
})

const UseAxiosSecure = () => {

    axiosSecure.interceptors.response.use(res => {
        return res;
    }, error => {
        console.log("error track in the interceptors", error.response);
    })

    return axiosSecure
};

export default UseAxiosSecure;