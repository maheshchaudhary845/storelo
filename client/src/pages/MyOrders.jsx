function MyOrders(){

    return(
        <>
            <h2 className="text-2xl font-black mb-1">My Orders</h2>
            <p className="text-muted text-sm mb-3">3 orders placed</p>

            <div className="flex flex-col gap-3">
                    <div className="p-4 bg-card rounded-2xl border border-border hover:border-accent cursor-pointer transition-colors duration-200">
                        <div className="flex justify-between mb-4">
                            <div className="left flex gap-2 items-center">
                                <div className="bg-accent-soft p-2 rounded-lg">
                                    <span className="text-2xl">📦</span>
                                </div>
                                <div className="text-xs font-mono">
                                    <p className="font-bold tracking-wider">#ORD-8uefy773f6</p>
                                    <span className="text-muted">{Date.now()} • 2 items</span>
                                </div>
                            </div>
                            <div className="right flex gap-4 items-center">
                                <span className="font-extrabold">₹1,356</span>
                                <div className="h-fit py-1 px-3 rounded-full bg-success/15 text-xs">
                                    <span className="text-success">delivered</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <div className="h-14 w-14 bg-surface rounded-xl border border-border">
                                <img src="" alt="product image" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
            </div>
        </>
    )
}

export default MyOrders;