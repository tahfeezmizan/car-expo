import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";

export const AuthContext = createContext();

const FirebaseProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    const createUser = (email, password) => {
        setIsLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const singIn = (email, password) => {
        setIsLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const singOut = (auth) => {
        setUser(null)
        signOut(auth);
    }


    useEffect(() => {
        const unseviscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('current user', currentUser);
            setIsLoading(false)
        })
        return () => {
            return unseviscribe();
        }
    }, [])

    const authInfo = {
        user,
        isLoading,
        createUser,
        singIn,
        singOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default FirebaseProvider;