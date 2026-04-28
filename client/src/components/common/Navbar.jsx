import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function Navbar() {
    const { user, logout } = useAuth();
    const { totalQuantity } = useCart();

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <nav className="py-3.5 px-6 mb-8 bg-surface border-b border-border rounded-xl">
            <div className="flex justify-between items-center">
                <div onClick={() => navigate("/")} className="logo text-xl font-extrabold cursor-pointer">store<span className="text-accent">lo</span></div>
                <ul className="flex gap-7 text-sm text-muted">
                    <li className="cursor-pointer hover:text-text transition-colors duration-200"><Link to={"/"}>Home</Link></li>
                    <li className="cursor-pointer hover:text-text transition-colors duration-200"><Link to={"/products"}>Products</Link></li>
                    <li className="cursor-pointer hover:text-text transition-colors duration-200"><Link to={"/about"}>About</Link></li>
                </ul>
                <div className="flex gap-3 text-[13px]">
                    {!user ?
                        <>
                            <button onClick={() => navigate("/login")} className="py-1.75 px-4 border rounded-lg border-border cursor-pointer">Login</button>
                            <button onClick={() => navigate("/register")} className="py-1.75 px-4 border rounded-lg border-border cursor-pointer">Register</button>
                            <button onClick={() => navigate("/cart")} className="py-1.75 px-4 border rounded-lg border-border cursor-pointer bg-accent relative"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#ffffff" fill="none" stroke="#F0F0FF" strokeWidth="1.5" strokeLinecap="round">
                                <path d="M8 16L16.7201 15.2733C19.4486 15.046 20.0611 14.45 20.3635 11.7289L21 6" />
                                <path d="M6 6H22" />
                                <circle cx="6" cy="20" r="2" />
                                <circle cx="17" cy="20" r="2" />
                                <path d="M8 20L15 20" />
                                <path d="M2 2H2.966C3.91068 2 4.73414 2.62459 4.96326 3.51493L7.93852 15.0765C8.08887 15.6608 7.9602 16.2797 7.58824 16.7616L6.63213 18" />
                            </svg>{totalQuantity ? <span className="absolute top-0 right-0 bg-orange-500 rounded-full min-h-4 min-w-4 text-[10px]">{totalQuantity ? totalQuantity : ''}</span> : ''}</button>
                        </>
                        :
                        user.role === "admin" ?
                            <>
                                <button onClick={() => navigate("/admin")} className="py-1.75 px-4 border rounded-lg border-border cursor-pointer bg-accent">Admin</button>
                                <button onClick={handleLogout} className="py-1.75 px-4 border rounded-lg border-border cursor-pointer text-danger">Logout</button>
                            </>
                            :
                            <>
                                <button onClick={() => navigate("/cart")} className="py-1.75 px-4 border rounded-lg border-border cursor-pointer bg-accent relative"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#ffffff" fill="none" stroke="#F0F0FF" strokeWidth="1.5" strokeLinecap="round">
                                    <path d="M8 16L16.7201 15.2733C19.4486 15.046 20.0611 14.45 20.3635 11.7289L21 6" />
                                    <path d="M6 6H22" />
                                    <circle cx="6" cy="20" r="2" />
                                    <circle cx="17" cy="20" r="2" />
                                    <path d="M8 20L15 20" />
                                    <path d="M2 2H2.966C3.91068 2 4.73414 2.62459 4.96326 3.51493L7.93852 15.0765C8.08887 15.6608 7.9602 16.2797 7.58824 16.7616L6.63213 18" />
                                </svg>{totalQuantity ? <span className="absolute top-0 right-0 bg-orange-500 rounded-full min-h-4 min-w-4 text-[10px]">{totalQuantity ? totalQuantity : ''}</span> : ''}</button>
                                <button onClick={() => navigate("/orders")} className="py-1.75 px-4 border rounded-lg border-border cursor-pointer">My Orders</button>
                                <button onClick={handleLogout} className="py-1.75 px-4 border rounded-lg border-border cursor-pointer text-danger">Logout</button>
                            </>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar;