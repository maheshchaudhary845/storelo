import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function MyOrders() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    const { token } = useAuth();

    const orderStatus = {
        delivered: "bg-success/15 text-success",
        shipped: "bg-warning/15 text-warning",
        processing: "bg-blue-100 text-blue-800",
        cancelled: "bg-danger/15 text-danger"
    }

    useEffect(() => {
        async function fetchOrders() {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/my`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                const { success, data } = await res.json();
                if (success) {
                    setOrders(data);
                }
            } catch (err) {
                console.error(err.message);
            }
        }
        fetchOrders();
    }, [])

    console.log(orders)

    return (
        <>
            <h2 className="text-2xl font-black mb-1">My Orders</h2>
            {orders.length ? <p className="text-muted text-sm mb-3">{orders.length} {orders.length > 1 ? "orders" : "order"} placed</p> : ""}

            <div className="flex flex-col gap-3">
                {orders.length ? orders.map(order => (
                    <div key={order._id} onClick={()=> navigate(`/orders/${order._id}`)} className="p-4 bg-card rounded-2xl border border-border hover:border-accent cursor-pointer transition-colors duration-200">
                        <div className="flex justify-between mb-4">
                            <div className="left flex gap-2 items-center">
                                <div className="bg-accent-soft p-2 rounded-lg">
                                    <span className="text-2xl">📦</span>
                                </div>
                                <div className="text-xs">
                                    <p className="font-mono font-bold tracking-wider">#ORD-{order._id.slice(0, 8)}</p>
                                    <span className="text-muted">{new Date(order.createdAt).toLocaleString("en-IN", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric"
                                    })} • {order.orderItems.length}{" "}{order.orderItems.length > 1 ? "items" : "item"}</span>
                                </div>
                            </div>
                            <div className="right flex gap-4 items-center">
                                <span className="font-extrabold">₹{order.totalPrice.toLocaleString()}</span>
                                <div className={`h-fit py-1 px-3 rounded-full text-xs ${orderStatus[order.orderStatus]}`}>
                                    <span>{order.orderStatus}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            {order.orderItems.map(orderItem => (
                                <div key={orderItem._id} className="h-14 w-14 bg-surface rounded-xl border border-border overflow-hidden">
                                    {orderItem.image === "no-image"
                                        ?
                                        <span className="text-2xl flex justify-center items-center h-full">🎧</span>
                                        :
                                        <img src={orderItem.image} alt="product image" className="w-full h-full object-cover" />
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            :
            <p className="text-sm text-center text-muted">No orders placed</p>}
            </div>
        </>
    )
}

export default MyOrders;