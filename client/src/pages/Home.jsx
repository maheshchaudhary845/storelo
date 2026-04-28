import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/common/ProductCard";

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        async function fetchProducts(){
            try{
                setLoading(true);
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
                const {success, data} = await res.json();
                if(success){
                    setProducts(data);
                }
            } catch(err){
                console.error(err.message);
            } finally{
                setLoading(false);
            }
        }

        fetchProducts();
    }, [])

    return (
        <>
            <section className="hero relative py-15 px-12 mb-10 border border-border rounded-3xl overflow-hidden">
                <h1 className="text-5xl font-black mb-4">Sound That<br /><span className="text-accent">Hits Different</span></h1>
                <p className="max-w-105 text-[15px] text-muted mb-8">Premium audio gear built for the ones who refuse to compromise on quality.</p>
                <button onClick={()=> navigate('/products')} className="bg-accent hover:bg-transparent hover:border-accent border border-border transition-all duration-200 rounded-lg py-3.5 px-8 text-[15px] font-bold cursor-pointer">Shop Now →</button>
                <div className="absolute -top-15 -right-15 w-75 h-75 bg-[radial-gradient(circle,rgba(108,99,255,0.3)_0%,transparent_70%)] rounded-full"></div>
            </section>

            <section className="feature">
                <h3 className="text-muted font-mono tracking-widest text-[11px] mb-4">FEATURED PRODUCTS</h3>
                <div className="grid grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
                    {loading ? <p>Loading...</p> : products.map(product=> (
                        <ProductCard key={product._id} product={product} />
                    ))}

                </div>
            </section>
        </>
    )
}

export default Home;