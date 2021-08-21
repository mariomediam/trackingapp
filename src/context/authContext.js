import { useState, useEffect, createContext } from "react";

import {  auth, firebase } from "../config/Firebase";

import { useHistory } from 'react-router'

import Loading from "../components/Loading";

const proveedorGoogle = new firebase.auth.GoogleAuthProvider()

export const AuthContext = createContext()

export const AuthContextProvider = (props) => {
    const [userState, setUserState] = useState(null)
    const [authPending, setAuthPending] = useState(true)

    const history = useHistory()

    const signIn = async () => {
        const rpta = await auth.signInWithPopup(proveedorGoogle)
        const emailUser = rpta.additionalUserInfo.profile.email
        if (emailUser === "mariomedinam@gmail.com"){
            history.push("/BuscarPedido")
        } else {
            signOut()
        }
    }

    const signOut = () => auth.signOut()

    useEffect(() => {
        return auth.onAuthStateChanged((user) => {
            setUserState(user)
            setAuthPending(false)
        })
    },[])

    if (authPending) {
        return <Loading/>
    }
    
    return (
        <AuthContext.Provider
            value={{
                signIn,signOut,userState
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}


