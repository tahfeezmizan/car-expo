import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import UseAuth from '../../Hook/UseAuth';
import { useForm } from 'react-hook-form';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import loginImg from '../../assets/images/login/login.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    const { singIn } = UseAuth();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const location = useLocation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const { email, password } = data;

        // console.log(data);

        singIn(email, password)
            .then(result => {
                const loggedInUser = result.user;
                const user = { email };
                toast.success('Congrs! Login Sucessfull');
                // navigate(location?.state ? location.state : '/');

                axios.post('https://y-mauve-eight.vercel.app/jwt', user, { withCredentials: true })
                    .then(res => {
                        // console.log(res.data);
                        if (res.data.success) {
                            navigate(location?.state ? location.state : '/');
                        }
                    })
            })
            .catch(error => {
                const errorText = error.message;
                const errorMessage = errorText.slice(22, 40);
                toast.error(`${errorMessage}`)
            });
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div >
            <div className="w-full md:w-8/12 mx-auto rounded-3xl py-20">
                <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="flex-1">
                        <img src={loginImg} alt="" />
                    </div>
                    <div className="flex-1">
                        <div className="card shrink-0 w-full rounded-none max-w-lg p-10 shadow-2xl bg-base-100">
                            <h1 className="text-5xl text-center font-bold pt-4">Login now!</h1>
                            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter Your Email"
                                        className="input input-bordered"

                                        {...register("email", { required: true })}
                                    />
                                    {errors.email && <span className="text-xs text-red-500">Email is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <div className="relative input input-bordered flex items-center">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="Enter Your Password"
                                            className="w-4/5"
                                            {...register("password", { required: true })}
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="absolute inset-y-0 right-4 flex items-center"
                                        >
                                            {showPassword ? <FaRegEyeSlash className="h-6 w-6 text-gray-500" /> : <FaRegEye className="h-6 w-6 text-gray-500" />}
                                        </button>
                                    </div>
                                    {errors.password && <span className="text-xs text-red-500">Password is required</span>}
                                </div>
                                <div className="form-control pt-5">
                                    <button className="btn w-full bg-[#d01818] hover:bg-[#0d1637] text-white text-xl font-bold">Login</button>

                                </div>
                            </form>
                            {/* <div className="text-center">
                                
                                <div className="divider">Or Sign Up with</div>
                                <div className=''>
                                    <button
                                        onClick={() => googleLogin()
                                            .then(result => {
                                                toast.success('Congrs! Google Login Sucessfull');
                                                navigate(location?.state ? location.state : '/');
                                            })
                                            .catch((error) => {
                                                const errorText = error.message;
                                                console.log(errorText)
                                                const errorMessage = errorText.slice(22, 40);
                                                toast.error(errorMessage)
                                            })
                                        }
                                        className='btn mr-3 text-2xl bg-transparent outline-none hover:bg-transparent '><FcGoogle />

                                    </button>

                                    <button
                                        onClick={() => githubLogin()
                                            .then(result => {
                                                toast.success('Congrs! Github Login Sucessfull');
                                                navigate(location?.state ? location.state : '/');
                                            })
                                            .catch((error) => {
                                                const errorText = error.message;
                                                console.log(errorText)
                                                const errorMessage = errorText.slice(22, 62);
                                                toast.error(errorMessage)
                                            })
                                        }
                                        className='btn ml-3 text-2xl bg-transparent outline-none hover:bg-transparent '><FaGithub />
                                    </button>

                                    <button
                                        onClick={() => twitterLogin()
                                            .then(result => {
                                                toast.success('Congrs! Twitter Login Sucessfull');
                                                navigate(location?.state ? location.state : '/');
                                            })
                                            .catch((error) => {
                                                const errorText = error.message;
                                                console.log(errorText)
                                                const errorMessage = errorText.slice(22, 62);
                                                toast.error(errorMessage)
                                            })
                                        }
                                        className='btn ml-3 text-xl bg-transparent outline-none hover:bg-transparent '><FaXTwitter />
                                    </button>
                                </div>
                            </div> */}
                            <h3 className="text-center pt-3">Need an account? <Link to="/register" className="text-blue-600 hover:text-[#d01818] font-bold">Create Account</Link></h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;