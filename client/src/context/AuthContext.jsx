import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({children}){
    const [user, setUser] = useState(()=>{
        const user = JSON.parse(localStorage.getItem("user"));
        if(user) return user;
        return null
    });
    const [token, setToken] = useState(()=>{
        const token = localStorage.getItem("token");
        if(token) return token;
        return null
    });

    const login = (user, token)=>{
        setUser(user);
        setToken(token);

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
    }

    const logout = ()=>{
        setUser(null);
        setToken(null);

        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }

    return(
        <AuthContext.Provider value={{user, token, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=> useContext(AuthContext);