import React, { createContext, useContext, useState } from 'react'
import { useEffect } from 'react';

const crypto=createContext()

export const CryptoContext = ({children}) => {

    const [currency, setcurency] = useState("INR");
    const [symbol, setsymbol] = useState("RU");

    useEffect(() => {
       if(currency==="INR") setsymbol("RU")
       else if(currency==="USD") setsymbol("$")
    }, [currency]);
    return (
       <crypto.Provider value={{currency,symbol,setcurency}}>
        {children}
       </crypto.Provider>
    )
}

export const CryptoState=()=>{
    return useContext(crypto)
}

