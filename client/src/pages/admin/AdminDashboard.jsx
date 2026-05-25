function AdminDashboard() {

    return (
        <>
            <div className="flex gap-4">
                <div className="side-panel flex-1 p-4 bg-card rounded-2xl border border-border">
                    <div onClick={() => navigate("/admin")} className="logo font-extrabold cursor-pointer mb-5">store<span className="text-accent">lo</span> <span className="text-[10px] font-mono text-accent">ADMIN</span></div>
                    <div className="flex flex-col gap-1 text-sm">
                        <div className="p-3 text-accent bg-accent-soft rounded-xl cursor-pointer">Dashboard</div>
                        <div className="p-3 text-muted rounded-xl cursor-pointer">Products</div>
                        <div className="p-3 text-muted rounded-xl cursor-pointer">Orders</div>
                        <div className="p-3 text-muted rounded-xl cursor-pointer">Users</div>
                        <div className="p-3 text-muted rounded-xl cursor-pointer">Settings</div>
                    </div>
                </div>
                <div className="dashboard flex-4"></div>
            </div>
        </>
    )
}

export default AdminDashboard;