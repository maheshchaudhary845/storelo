import AdminSidebar from "../../components/admin/AdminSidebar";

function AdminDashboard() {

    return (
        <>
            <div className="flex gap-5">
                <AdminSidebar />
                <div className="dashboard flex-4">
                    <h1 className="text-2xl font-black mb-5">Dashboard</h1>
                    <div className="flex gap-3 mb-5">
                        <div className="bg-card p-4 rounded-2xl w-full border border-border">
                            <h3 className="text-[10px] tracking-widest text-muted mb-4">TOTAL REVENUE</h3>
                            <h4 className="text-2xl font-black mb-2">₹1,34,900</h4>
                            <p className="text-success text-xs">+12% this month</p>
                        </div>
                        <div className="bg-card p-4 rounded-2xl w-full border border-border">
                            <h3 className="text-[10px] tracking-widest text-muted mb-4">TOTAL ORDERS</h3>
                            <h4 className="text-2xl font-black mb-2">375</h4>
                            <p className="text-accent text-xs">+8% this month</p>
                        </div>
                        <div className="bg-card p-4 rounded-2xl w-full border border-border">
                            <h3 className="text-[10px] tracking-widest text-muted mb-4">PRODUCTS</h3>
                            <h4 className="text-2xl font-black mb-2">34</h4>
                            <p className="text-warning text-xs">+2 this month</p>
                        </div>
                        <div className="bg-card p-4 rounded-2xl w-full border border-border">
                            <h3 className="text-[10px] tracking-widest text-muted mb-4">CUSTOMERS</h3>
                            <h4 className="text-2xl font-black mb-2">875</h4>
                            <p className="text-success text-xs">+15% this month</p>
                        </div>
                    </div>

                    <div className="bg-card p-4 border border-border rounded-2xl">
                        <div className="flex justify-between items-center cursor-pointer mb-4">
                            <h3 className="font-semibold">Recent Orders</h3>
                            <div className="text-accent text-xs">View All →</div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-3 border-b border-border py-3">
                                <p className="text-muted text-[10px]">#ORD-3487</p>
                                <div className="name text-[13px] font-semibold tracking-tighter flex-[0.5]">Mahesh Chaudhary</div>
                                <div className="product text-muted text-[13px] tracking-tighter flex-1">boAt Rockerz 450</div>
                                <p className="price text-accent text-sm font-semibold">₹1,299</p>
                                <p className="status text-success bg-success/10 px-2 py-1 rounded-full text-xs">delivered</p>
                            </div>
                            <div className="flex items-center gap-3 border-b border-border py-3">
                                <p className="text-muted text-[10px]">#ORD-3487</p>
                                <div className="name text-[13px] font-semibold tracking-tighter flex-[0.5]">Mahesh Chaudhary</div>
                                <div className="product text-muted text-[13px] tracking-tighter flex-1">boAt Rockerz 450</div>
                                <p className="price text-accent text-sm font-semibold">₹1,299</p>
                                <p className="status text-success bg-success/10 px-2 py-1 rounded-full text-xs">delivered</p>
                            </div>
                            <div className="flex items-center gap-3 border-b border-border py-3">
                                <p className="text-muted text-[10px]">#ORD-3487</p>
                                <div className="name text-[13px] font-semibold tracking-tighter flex-[0.5]">Mahesh Chaudhary</div>
                                <div className="product text-muted text-[13px] tracking-tighter flex-1">boAt Rockerz 450</div>
                                <p className="price text-accent text-sm font-semibold">₹1,299</p>
                                <p className="status text-success bg-success/10 px-2 py-1 rounded-full text-xs">delivered</p>
                            </div>
                            <div className="flex items-center gap-3 border-b border-border py-3">
                                <p className="text-muted text-[10px]">#ORD-3487</p>
                                <div className="name text-[13px] font-semibold tracking-tighter flex-[0.5]">Mahesh Chaudhary</div>
                                <div className="product text-muted text-[13px] tracking-tighter flex-1">boAt Rockerz 450</div>
                                <p className="price text-accent text-sm font-semibold">₹1,299</p>
                                <p className="status text-success bg-success/10 px-2 py-1 rounded-full text-xs">delivered</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminDashboard;