import { useContext } from "react";
import { AuthContext } from "../Provider/FirebaseProvider";

const UseAuth = () => {
    const contextData = useContext(AuthContext);
    return contextData
};

export default UseAuth;