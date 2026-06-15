import { Link, useLocation } from "react-router-dom";

function AdminSidebar() {
    const location = useLocation();

    const links = [
        { id: 1, name: "Dashboard", path: "/admin" },
        { id: 2, name: "Products", path: "/admin/products" },
        { id: 3, name: "Orders", path: "/admin/orders" }
    ]

    console.log(location);
    return (
        <>
            <div className="side-panel flex-1 p-4 bg-card rounded-2xl border border-border h-fit">
                <Link to={'/admin'} className="logo font-extrabold cursor-pointer mb-5">store<span className="text-accent">lo</span> <span className="text-[10px] font-mono text-accent">ADMIN</span></Link>
                <div className="flex flex-col gap-1 text-sm">
                    {links.map(link => (
                        <Link key={link.id} to={link.path} className={`p-3 ${location.pathname === link.path ? "text-accent bg-accent-soft" : "text-muted"} rounded-xl cursor-pointer`}>{link.name}</Link>
                    ))}
                    <div className="p-3 text-muted rounded-xl cursor-pointer">Users</div>
                    <div className="p-3 text-muted rounded-xl cursor-pointer">Settings</div>
                </div>
            </div>
        </>
    )
}

export default AdminSidebar;