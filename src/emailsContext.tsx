import { createContext } from 'react'
import { useState, useEffect, ReactNode } from 'react';
import { api } from './services/api';

interface EmailsProviderProps {
    children: ReactNode;
}

interface EmailInput {
    user:string,
    email:string,
    content: string,
    subject: string,
    type: string,

}

export const EmailsContext = createContext([]);


export function EmailsProvider( { children }: EmailsProviderProps)  {

    const email =  {
        user:"Geraldo",
        email:"geraldo@oi.com",
        content: "lindao",
        subject: "lindao assunto",
        type: "sent",
    
    }

    async function CreateEmail(){
        const dataEmail = email
    
       await api.post('emails', dataEmail);
    }


    const [list, setList] = useState([]);

    
    useEffect (() => {
         api.get('emails')
        .then(response => setList(response.data.emails))
    }, []);

 

    return (
        <EmailsContext.Provider value={list}>
        {children}
        </EmailsContext.Provider>
    )
}