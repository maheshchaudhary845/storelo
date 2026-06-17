import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductDetail() {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const { slug } = useParams();

    const {cartItems, addToCart} = useCart();
    
    useEffect(() => {
        async function fetchProduct() {
            try {
                setLoading(true);
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${slug}`);
                const { success, data } = await res.json();
                if (success) {
                    setProduct(data);
                }
            } catch (err) {
                console.error(err.message);
            } finally{
                setLoading(false);
            }
        }
        fetchProduct();
    }, [slug])

    if(loading) return <p className="text-center text-muted">Loading...</p>

    const cartItem = cartItems.find(item => item.product._id === product._id);

    return (
        <>
            <div className="flex gap-10">
                <div className="flex-1 h-105 bg-[linear-gradient(135deg,rgb(26,26,46),rgb(37,37,53))]  rounded-2xl border border-border overflow-hidden">
                    {product?.images?.length ?
                        <img src={product.images[0]} alt="product image" className="object-cover w-full h-full" />
                        :
                        <span className="text-8xl flex justify-center items-center h-full">🎧</span>
                    }
                </div>
                <div className="flex-1">
                    <div className="uppercase font-mono tracking-widest text-[11px] text-accent mb-2">{product.category}</div>
                    <h2 className="text-3xl font-black mb-3">{product.name}</h2>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-warning text-xl">★</span>
                        <span className="text-muted text-xs font-mono font-medium">{`${product.ratings} (${product.numReviews} reviews)`} </span>
                    </div>
                    <div className="text-3xl text-accent font-black mb-2">₹{product.price.toLocaleString()}</div>
                    <p className="text-muted text-sm mb-6 leading-[1.7]">{product.description}</p>
                    <div className="flex gap-3 mb-4">
                        <div className="flex items-center gap-0 bg-surface border border-border rounded-xl overflow-hidden">
                            <button onClick={()=> quantity > 1 && setQuantity(prev => prev - 1)} className="bg-transparent py-3 px-4 text-lg cursor-pointer">-</button>
                            <span className="px-3 font-bold">{quantity}</span>
                            <button onClick={()=> setQuantity(prev => prev + 1)} className="bg-transparent py-3 px-4 text-lg cursor-pointer">+</button>
                        </div>
                        <button onClick={()=> addToCart(product, quantity)} className="bg-accent flex-1 rounded-xl cursor-pointer text-[15px] font-bold py-3 px-6 hover:bg-accent-hover">Add to Cart</button>
                    </div>
                    <button onClick={()=> navigate('/checkout')} className="w-full bg-surface border border-border cursor-pointer hover:bg-accent transition-colors duration-200 py-3 px-6 rounded-xl font-bold">Buy Now</button>
                    <div className="mt-5 flex gap-2">
                        <span className="bg-accent-soft text-accent text-[11px] py-1 px-2.5 font-semibold rounded-md">Free Delivery</span>
                        <span className="bg-accent-soft text-accent text-[11px] py-1 px-2.5 font-semibold rounded-md">1 Year Warranty</span>
                        <span className="bg-accent-soft text-accent text-[11px] py-1 px-2.5 font-semibold rounded-md">Easy Returns</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetail;