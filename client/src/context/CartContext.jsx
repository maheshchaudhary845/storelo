import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({children}){
    const [cartItems, setCartItems] = useState(()=>{
        return JSON.parse(localStorage.getItem("cartItems")) || [];
    })

    useEffect(()=>{
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems])

    const addToCart = (product, quantity)=>{
        setCartItems((prev)=>{
            const exist = prev.find(item => item.product._id === product._id);
            if(!exist) return [...prev, {product, quantity}]
            else return prev.map(item => {
                if(item.product._id === product._id){
                    return {...item, quantity}
                }
                return item;
            })
        })
    }

    const removeFromCart = (productId)=>{
        setCartItems(prev => {
            return prev.filter(item => item.product._id !== productId);
        })
    }

    const updateQuantity = (productId, quantity)=>{
        setCartItems(prev=> prev.map(item => {
            if(item.product._id === productId){
                return {...item, quantity};
            }
            return item;
        }))
    }

    const clearCart = ()=>{
        setCartItems([]);
    }

    const totalQuantity = cartItems.reduce((total, item) =>  total + item.quantity, 0);

    const totalPrice =  cartItems.reduce((total, item) =>  total + item.product.price * item.quantity, 0);

    return(
        <CartContext.Provider value={{cartItems, addToCart, removeFromCart, updateQuantity, clearCart, totalQuantity, totalPrice}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = ()=> useContext(CartContext);