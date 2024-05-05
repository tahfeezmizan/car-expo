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

    const singOutUser = () => {
        setUser(null)
        return signOut(auth);
    }


    useEffect(() => {
        const unseviscribe = onAuthStateChanged(auth, currentUser => {
            console.log('current user', currentUser);
            if (currentUser) {
                setUser(currentUser);
                setIsLoading(false)
            }
            // setIsLoading(false)
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
        singOutUser
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default FirebaseProvider;