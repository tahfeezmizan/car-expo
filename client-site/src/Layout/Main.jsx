import { Outlet, useNavigation } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const Main = () => {
    const navigation = useNavigation();
    return (
        <div>
            <Navbar></Navbar>
            {
                navigation.state === 'loading' ? <span className="loading loading-spinner text-error"></span>
                    : <Outlet></Outlet>
            }
            <Footer></Footer>
        </div>
    );
};

export default Main;