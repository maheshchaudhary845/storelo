import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
    const {addToCart} = useCart();
    const navigate = useNavigate();

    return (
        <>
            <div onClick={()=> navigate(`/products/${product.slug}`)} className="bg-card border border-border rounded-2xl overflow-hidden cursor-pointer hover:border-accent transition-all duration-200">
                <div className="img-cont bg-surface h-48">
                    <img src={product.images[0]} className="object-cover w-full h-full" alt="product thumbnail" />
                </div>
                <div className="bottom-half p-4">
                    <p className="text-muted font-mono text-[11px] uppercase tracking-widest mb-1">{product.category}</p>
                    <h3 className="text-[15px] font-bold line-clamp-2 mb-2">{product.name}</h3>
                    <div className="flex justify-between items-center">
                        <span className="text-accent text-lg font-extrabold">₹{product.price}</span>
                        <button onClick={(e)=> {
                            e.stopPropagation();
                            addToCart(product, 1);
                        }} className="bg-accent-soft hover:bg-accent text-accent hover:text-white text-xs font-semibold rounded-lg px-3 py-2 transition-all duration-200 cursor-pointer">Add to Cart</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductCard;