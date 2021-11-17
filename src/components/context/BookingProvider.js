import React, { createContext, useState, useEffect, useContext } from "react";
import _ from "lodash";
const BookingContext = createContext();
export const useBooking = () => useContext(BookingContext);

export function BookingProvider({ children }) {
  const [cart, setcart] = useState(_.cloneDeep(JSON.parse(localStorage.getItem('cart'))) || []);

  const addItem = (id) => {
    if (cart.filter((item) => item.id === id).length === 0){
      let temp = _.cloneDeep(cart);
      temp.push({ id, number: 1 });
      setcart(temp)
    }
    else {
      let temp = _.cloneDeep(cart);
      temp.forEach((item, index) => {
        if (item.id === id) {
          temp[index] = {
            id,
            number: item.number + 1,
          };
        }
      });
      setcart(temp);
    }
  };
  const deleteItem = (id) => {
    const temp = _.cloneDeep(cart).filter((item) => item.id !== id);
    setcart(temp);
  };
  const deleteAllItem = () => {
    setcart([]);
    localStorage.removeItem('cart')
  };
  const updateNumber = (id, num) => {
    const temp = _.cloneDeep(cart);
    temp.forEach((item, index) => {
      if (item.id === id) {
        temp[index] = {
          id,
          number: num
        };
      }
    });
    setcart(temp);
  };

  const value = {
    cart,
    addItem,
    deleteItem,
    updateNumber,
    deleteAllItem,
  };
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}
