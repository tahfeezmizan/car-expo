import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import axios from "axios";

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
            const userEmial = currentUser?.email || user?.email;
            const loggedUser = { email: userEmial }

            console.log('current user', currentUser);
            setIsLoading(false);
            setUser(currentUser);

            //if user exist then issue a token
            if (currentUser) {
                axios.post('http://localhost:5000/jwt', loggedUser, { withCredentials: true })
                    .then(res => {
                        console.log('token respons', res.data);
                    })
            }
            else {
                axios.post('http://localhost:5000/logout', loggedUser, { withCredentials: true })
                    .then(res => {
                        console.log('user logout data ', res.data);
                    })
            }
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