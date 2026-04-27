import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Navbar() {
    const { user, logout } = useAuth();
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
                            <button onClick={() => navigate("/cart")} className="py-1.75 px-4 border rounded-lg border-border cursor-pointer bg-accent">Cart</button>
                        </>
                        :
                        user.role === "admin" ?
                            <>
                                <button onClick={() => navigate("/admin")} className="py-1.75 px-4 border rounded-lg border-border cursor-pointer bg-accent">Admin</button>
                                <button onClick={handleLogout} className="py-1.75 px-4 border rounded-lg border-border cursor-pointer text-danger">Logout</button>
                            </>
                            :
                            <>
                                <button onClick={() => navigate("/cart")} className="py-1.75 px-4 border rounded-lg border-border cursor-pointer bg-accent">Cart</button>
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