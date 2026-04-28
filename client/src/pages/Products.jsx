import { useEffect, useState } from "react";
import ProductCard from "../components/common/ProductCard";

function Products(){
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        async function fetchProducts(){
            try{
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
                const {success, data} = await res.json();
                if(success){
                    setProducts(data);
                }
            }catch(err){
                console.error(err.message);
            }
        }
        fetchProducts();
    }, [])
    return(
        <>
            <div className="flex gap-6">
                <div className="shrink-0 w-55">
                    <div className="bg-card border border-border rounded-xl p-5">
                        <div className="text-sm font-bold mb-4">Filters</div>
                        <div className="mb-5">
                            <h4 className="text-[11px] font-mono text-muted mb-2.5 tracking-wider">CATEGORY</h4>
                            <div className="py-1.75 text-[13px] text-accent cursor-pointer border-b border-border">All</div>
                            <div className="py-1.75 text-[13px] text-muted cursor-pointer border-b border-border">Headphones</div>
                            <div className="py-1.75 text-[13px] text-muted cursor-pointer border-b border-border">Earphones</div>
                            <div className="py-1.75 text-[13px] text-muted cursor-pointer border-b border-border">Neckbands</div>
                            <div className="py-1.75 text-[13px] text-muted cursor-pointer border-b border-border">Speakers</div>
                            <div className="py-1.75 text-[13px] text-muted cursor-pointer border-b border-border">Smartwatches</div>
                        </div>
                        <div>
                            <div className="text-[11px] font-mono text-muted mb-2.5 tracking-wider">PRICE RANGE</div>
                            <input type="range" className="w-full accent-accent" />
                            <div className="flex justify-between items-center text-[11px] text-muted">
                                <span>₹0</span>
                                <span>₹10,000</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-5">
                        <span className="text-[13px] text-muted">Showing 7 products</span>
                        <select className="py-1.5 px-3 text-[13px] bg-card rounded-lg border border-border text-muted" name="sort" id="sort">
                            <option value="">Sort: Popular</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
                        {products.map(product=>(
                            <ProductCard product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Products;