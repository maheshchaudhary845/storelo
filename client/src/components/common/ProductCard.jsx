import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
    const { addToCart, cartItems, updateQuantity, removeFromCart } = useCart();
    const navigate = useNavigate();

    const cartItem = cartItems.find(item => item.product._id === product._id);

    return (
        <div onClick={() => navigate(`/products/${product.slug}`)} className="bg-card border border-border rounded-2xl overflow-hidden cursor-pointer hover:border-accent transition-all duration-200">
            <div className="img-cont bg-surface h-48">
                {product.images.length ?
                    <img src={product.images[0]} className="object-cover w-full h-full" alt="product thumbnail" />
                    :
                    <div className="w-full h-full flex justify-center items-center">
                        <span className="text-7xl bg-muted/30 rounded-full p-2 w-30 h-30 flex justify-center items-center">🎧</span>
                    </div>
                }
            </div>
            <div className="bottom-half p-4">
                <p className="text-muted font-mono text-[11px] uppercase tracking-widest mb-1">{product.category}</p>
                <h3 className="text-[15px] font-bold line-clamp-2 mb-2">{product.name}</h3>
                <div className="flex justify-between items-center">
                    <span className="text-accent text-lg font-extrabold">₹{product.price}</span>
                    {cartItem
                        ?
                        <div className="flex justify-between items-center gap-2">
                            <button onClick={(e)=>{
                                e.stopPropagation();
                                cartItem.quantity === 1 ? removeFromCart(product._id) : updateQuantity(product._id, cartItem.quantity - 1);
                            }} className="bg-accent-soft py-1 px-3 cursor-pointer border border-border hover:border-accent hover:bg-transparent hover:text-text transition-all duration-200 rounded-lg text-accent h-8">-</button>
                            <span className="font-mono text-sm font-bold">{cartItem.quantity}</span>
                            <button onClick={(e)=>{
                                e.stopPropagation();
                                updateQuantity(product._id, cartItem.quantity + 1)
                            }} className="bg-accent-soft py-1 px-3 cursor-pointer border border-border hover:border-accent hover:bg-transparent hover:text-text transition-all duration-200 rounded-lg text-accent h-8">+</button>
                        </div>
                        :
                        <button onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product, 1);
                        }} className="bg-accent-soft hover:bg-accent text-accent hover:text-white text-xs font-semibold rounded-lg px-3 py-2 transition-all duration-200 cursor-pointer h-8">Add to Cart</button>}
                </div>
            </div>
        </div>
    )
}

export default ProductCard;