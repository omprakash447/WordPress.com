import { createContext, useContext, useEffect, useState } from "react";


interface Authlogin {
    isloggedin: boolean,
    login: () => void,
    logout: () => void
};



const CreateContext = createContext<Authlogin | undefined>(undefined);



export const CreateProvider = ({ children }: { children: any }) => {
    const [isloggedin , setisloggedin]=useState<boolean>(false);

    useEffect(()=>{
        const token=localStorage.getItem("token");
        if(!token){
            setisloggedin(false);
        }else{
            setisloggedin(true)
        }
    },[])


    

    const login = () => {
        setisloggedin(true);
        localStorage.setItem("loggedin-info","true");
    }

    const logout = () => {
        setisloggedin(false);
        localStorage.removeItem("token");
    }
    return (
            <CreateContext.Provider value={{isloggedin , login , logout}}>
                {children}
            </CreateContext.Provider>
    )
}



export const UseProvider = () => {
    const Context = useContext(CreateContext);
    if (!Context) {
        throw new Error("CreateProvider Missing...");
    }
    return Context;
}