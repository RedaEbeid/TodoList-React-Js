import {createContext, useState, useContext } from "react";
import MySnackBar from '../Components/MySnackBar' // MySnackBar

export let ToastContext = createContext({});

export function ToastProvider ({children}) {
    
    const [openToast, setOpenToast] = useState(false);  // for the Toast
    const [ToastMessage, setToastMessage] = useState();  // for the ToastMessage
    
    function showHideToast (message) {
        setOpenToast(true);
        setToastMessage(message);
        setTimeout(() => {setOpenToast(false)}, 2000);
    }

    return (
        <ToastContext.Provider value={{ showHideToast }}>
            {children}
            <MySnackBar openToast={openToast} ToastMessage={ToastMessage} />
        </ToastContext.Provider>
    )
}

export const useToast = () => { return useContext(ToastContext) };