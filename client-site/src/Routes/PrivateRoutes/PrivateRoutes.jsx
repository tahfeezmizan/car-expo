import { Navigate, useLocation } from "react-router-dom";
import UseAuth from "../../Hook/UseAuth";

const PrivateRoutes = ({ children }) => {
    const { user, isLoading } = UseAuth();
    const location = useLocation();
    // console.log(location.pathname);

    if (isLoading) {
        return <progress className="progress progress-error w-56"></progress>
    }

    if (user?.email) {
        return children
    }
    return <Navigate state={location.pathname} to='/login' replace></Navigate>;
};

export default PrivateRoutes;