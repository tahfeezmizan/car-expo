import { Navigate } from "react-router-dom";
import UseAuth from "../../Hook/UseAuth";


const PrivateRoutes = ({ children }) => {
    const { user, loading } = UseAuth();

    if (loading) {
        return <progress className="progress progress-error w-56"></progress>
    }

    if (user?.email) {
        return children
    }
    return <Navigate to='/login' replace></Navigate>;
};

export default PrivateRoutes;