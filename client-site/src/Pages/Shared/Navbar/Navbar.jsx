import { NavLink } from "react-router-dom";

const Navbar = () => {
    const links = <>
        <li><NavLink to='/'>Home</NavLink></li>
    </>

    return (
        <div className="navMenu py-2">
            <div className="w-full lg:w-5/6 xl:w-8/12 mx-auto navbar ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content gap-5 mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {links}
                        </ul>
                    </div>
                    <NavLink className="btn btn-ghost text-xl uppercase Sitelogo">
                        {/* <img src={sitelogo} className="w-28" alt="" /> */}
                        <h2 className="text-3xl">Car Expo</h2>
                    </NavLink>
                </div>
                <div data-aos="fade-down" data-aos-duration="1300" className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-5 felx">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end z-[1000]">

                    {/* <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component" />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-50 p-4 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <p className="text-lg text-center font-bold capitalize mb-3">
                                    {user?.displayName || 'Name Not Found'}
                                </p>
                                <NavLink to="/profile" className="profileLink text-xl mb-3 flex items-center hover:bg-blue-300"><span className=""><TbUserEdit /></span>Profile</NavLink>
                            </li>
                            <li>
                                <button className="logout text-xl mb-3 flex items-center"><span className=""><CiLogout /></span> LogOut</button>
                            </li>
                        </ul>
                    </div> */}

                    <div className="flex gap-4">
                        <NavLink
                            className="btn btn-outline bg-primaryColor font-semibold text-base" to="/login">Login</NavLink>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Navbar;