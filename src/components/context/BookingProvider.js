import React, {createContext, useState, useEffect, useContext} from 'react'
import { firestore } from '../../firebase';
const BookingContext= createContext();
export const useBooking = () => useContext(BookingContext);

export function BookingProvider({children}) {
    const [cart, setcart]= useState({});
    const [listItem, setListItem]= useState();

    const addItem = (id) =>{
        // console.log(id);
        if(id in cart) {
            setcart({...cart, [id]: cart[id] + 1})
        }
        else setcart({...cart, [id]: 1});
    }
    const deleteItem = (id) => {
        if(id in cart){
            let cart2= {...cart};
            delete cart2[id];
            setcart(cart2);
        }
    }
    const deleteAllItem = () => {
        setcart({});
    }
    const updateNumber = (id, num) => {
        if(id in cart) {
            setcart({...cart, [id]: num})
        }
    }
    async function fetchData(){
        let data= (await firestore.collection("Menu").orderBy("type").get());
        return data.docs.map(doc => doc.data());
    }
    useEffect(() => {
        fetchData().then( res => setListItem(res));
    }, [])
    const value = {
        cart,
        listItem,
        addItem, 
        deleteItem,
        updateNumber,
        deleteAllItem
    }
    
    return (
        <BookingContext.Provider value={value}>
            {children}
        </BookingContext.Provider>
    )
}


