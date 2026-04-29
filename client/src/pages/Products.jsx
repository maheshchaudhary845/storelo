import { useEffect, useState } from "react";
import ProductCard from "../components/common/ProductCard";

function Products() {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [sortBy, setSortBy] = useState("popular");
    const [maxPrice, setMaxPrice] = useState(10000);

    useEffect(() => {
        async function fetchProducts() {
            try {
                setLoading(true);
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
                const { success, data } = await res.json();
                if (success) {
                    setProducts(data);
                }
            } catch (err) {
                console.error(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, [])

    const categories = ["All", ...new Set(products.map(product => product.category))];
    const filtered = products
        .filter(product => selectedCategory === "All" || product.category === selectedCategory)
        .filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .filter(product => product.price <= maxPrice)
        .sort((a, b) => {
            if (sortBy === "price-low") return a.price - b.price;
            if (sortBy === "price-high") return b.price - a.price;
            if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
            return 0;
        })

    return (
        <>
            <div className="flex gap-6">
                <div className="shrink-0 w-55">
                    <div className="bg-card border border-border rounded-xl p-5">
                        <div className="text-sm font-bold mb-4">Filters</div>
                        <div className="mb-5">
                            <h4 className="text-[11px] font-mono text-muted mb-2.5 tracking-wider">CATEGORY</h4>
                            {categories.map(category => (
                                <div key={category} onClick={() => setSelectedCategory(category)} className={`py-1.75 text-[13px] ${selectedCategory === category ? "text-accent" : "text-muted"} cursor-pointer border-b border-border transition-colors duration-200`}>{category}</div>
                            ))}
                        </div>
                        <div>
                            <div className="text-[11px] font-mono text-muted mb-2.5 tracking-wider">PRICE RANGE</div>
                            <input type="range"
                                min={0}
                                max={10000}
                                step={500}
                                value={maxPrice}
                                onChange={(e)=> setMaxPrice(Number(e.target.value))}
                                className="w-full accent-accent" />
                            <div className="flex justify-between items-center text-[11px] text-muted">
                                <span>₹0</span>
                                <span>₹{maxPrice.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[13px] text-muted">Showing {filtered.length} products</span>
                        <select className="py-1.5 px-3 text-[13px] bg-card rounded-lg border border-border text-muted" name="sort" id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="popular">Sort: Popular</option>
                            <option value="newest">Sort: Newest First</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                        </select>
                    </div>
                    <div className="mb-5">
                        <input type="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search products..." className="bg-surface w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:border-accent focus:outline-none transition-colors duration-200 placeholder:text-muted" />
                    </div>
                    {loading ? <p className="text-center text-muted">Loading...</p> :
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
                            {filtered.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    }
                    {!loading && filtered.length === 0 && <p className="text-muted text-center text-sm">No products found.</p>}
                </div>
            </div>
        </>
    )
}

export default Products;