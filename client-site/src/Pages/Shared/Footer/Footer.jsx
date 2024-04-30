
const Footer = () => {
    return (
        <footer className="footer py-28 bg-gray-200 text-base-content">
            <div className="w-full px-4 md:px-0 md:w-8/12 mx-auto">
                <div className="text-black grid grid-cols-2 xl:grid-cols-12 gap-28">
                    {/* Logo and Description */}
                    <div className="col-span-2 lg:col-span-4 xl:col-span-5 text-center xl:text-start">
                        <a href="#" className="text-3xl text-black font-extrabold cursor-pointer">Car Expo</a>
                        <p className="font-medium text-gray-800 w-full lg:w-3/5 lg:mx-auto xl:mx-0 leading-7 text-base my-7">
                            Gear up for victory with our a curated selection of top-notch equipment and apparel
                        </p>

                        {/* Contact Info */}
                        <div className="flex flex-col justify-center xl:justify-start items-center xl:items-start gap-4">
                            <div className="flex justify-center xl:justify-start items-center gap-2 text-gray-300 cursor-pointer">
                                <i className="fa-regular fa-envelope text-red-500 text-2xl"></i>
                                <p className="text-base text-gray-800">carsexpo@support.com</p>
                            </div>
                            <div className="flex justify-start items-center gap-2 text-gray-800 cursor-pointer">
                                <i className="fa-solid fa-phone text-red-500 text-2xl"></i>
                                <p className="text-base text-gray-800">(+62) 123-321-543</p>
                            </div>
                        </div>
                    </div>

                    {/* Services Links */}
                    <div className="col-span-1 xl:col-span-2 text-center xl:text-start">
                        <nav className="flex flex-col">
                            <header className="text-black text-lg font-bold mb-7">Services</header>
                            <a href="#" className="link text-base text-gray-600 font-medium leading-10 link-hover">Branding</a>
                            <a href="#" className="link text-base text-gray-600 font-medium leading-10 link-hover">Design</a>
                            <a href="#" className="link text-base text-gray-600 font-medium leading-10 link-hover">Marketing</a>
                            <a href="#" className="link text-base text-gray-600 font-medium leading-10 link-hover">Advertisement</a>
                        </nav>
                    </div>

                    {/* Company Links */}
                    <div className="col-span-1 xl:col-span-2 text-center xl:text-start">
                        <nav className="flex flex-col">
                            <header className="text-black text-lg font-bold mb-7">Company</header>
                            <a href="#" className="link text-base text-gray-600 font-medium leading-10 link-hover">About us</a>
                            <a href="#" className="link text-base text-gray-600 font-medium leading-10 link-hover">Contact</a>
                            <a href="#" className="link text-base text-gray-600 font-medium leading-10 link-hover">Jobs</a>
                            <a href="#" className="link text-base text-gray-600 font-medium leading-10 link-hover">Press kit</a>
                        </nav>
                    </div>

                    {/* Legal Links */}
                    <div className="col-span-2 xl:col-span-2 text-center xl:text-start">
                        <nav className="flex flex-col">
                            <header className="text-black text-lg font-bold mb-7">Legal</header>
                            <a href="#" className="link text-base text-gray-600 font-medium leading-10 link-hover">Terms of use</a>
                            <a href="#" className="link text-base text-gray-600 font-medium leading-10 link-hover">Privacy policy</a>
                            <a href="#" className="link text-base text-gray-600 font-medium leading-10 link-hover">Cookie policy</a>
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;