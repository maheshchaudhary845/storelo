import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext.jsx";

const CartContext = createContext();

export function CartProvider({children}){
    const {user, token} = useAuth();

    const [cartItems, setCartItems] = useState(()=>{
        return JSON.parse(localStorage.getItem("cartItems")) || [];
    })

    
    const fetchCartFromDB = async()=>{
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cart`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        const {success, data} = await res.json();
        if(success) setCartItems(data);
    }

    const mergeCart = async(localCart)=>{
        for (const item of localCart) {
            await addToCart(item.product, item.quantity);
        }
        localStorage.removeItem("cartItems");
    }

    useEffect(()=>{
        if(user){
            const localCart = JSON.parse(localStorage.getItem("cartItems")) || [];
            if(localCart.length){
                mergeCart(localCart);
            } else{
                fetchCartFromDB();
            }
        }
    }, [user])

    useEffect(()=>{
        if(!user) localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems])

    const addToCart = async(product, quantity)=>{
        if(user){
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cart`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    productId: product._id,
                    quantity
                })
            })
            const {success, data} = await res.json();
            if(success){
                setCartItems(data);
            }

        } else{
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
    }

    const removeFromCart = async(productId)=>{
        if(user){
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/${productId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            const {success, data} = await res.json();
            if(success){
                setCartItems(data);
            }

        } else{
            setCartItems(prev => {
                return prev.filter(item => item.product._id !== productId);
            })
        }
    }

    const updateQuantity = async(productId, quantity)=>{
        if(user){
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/${productId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({quantity})
            })
            const {success, data} = await res.json();
            if(success){
                setCartItems(data);
            }

        } else{
            setCartItems(prev=> prev.map(item => {
                if(item.product._id === productId){
                    return {...item, quantity};
                }
                return item;
            }))
        }
    }

    const clearCart = async()=>{
        if(user){
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cart`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            const {success} = await res.json();
            if(success){
                setCartItems([]);
            }

        } else{
            setCartItems([]);
        }
    }

    const totalQuantity = cartItems.reduce((total, item) =>  total + item.quantity, 0);

    const totalPrice =  cartItems.reduce((total, item) =>  total + (item.product?.price || 0) * item.quantity, 0);

    return(
        <CartContext.Provider value={{cartItems, addToCart, removeFromCart, updateQuantity, clearCart, totalQuantity, totalPrice}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = ()=> useContext(CartContext);