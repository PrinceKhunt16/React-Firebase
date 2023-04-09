import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { auth, googleAuthProvider } from "../config/firebase";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = async () => {
        try {            
            await createUserWithEmailAndPassword(auth, email, password) 
            setEmail("")
            setPassword("")
            console.log('Sign In', auth?.currentUser)
        } catch (err) {
            console.log(err)
        }
    }

    const signInWithGoogle = async () => {
        try {            
            await signInWithPopup(auth, googleAuthProvider) 
            setEmail("")
            setPassword("")
            console.log('Sign In with Google', auth?.currentUser)
        } catch (err) {
            console.log(err)
        }
    }

    const logout = async () => {
        try { 
            await signOut(auth)
            console.log('Logout', auth?.currentUser)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <input
                value={email}
                placeholder="Email..."
                type="email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                value={password}
                placeholder="Password..."
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={signIn}>Sign In</button>
            <button onClick={signInWithGoogle}>Sign In with Google</button>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Auth;
