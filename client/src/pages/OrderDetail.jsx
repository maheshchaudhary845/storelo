import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function OrderDetail() {
    const { token } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState({});
    const [timelineId, setTimelineId] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchOrder() {
            setLoading(true);
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/${id}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const { success, data } = await res.json();
                if (success) {
                    setOrder(data);
                }
            } catch (err) {
                console.error(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchOrder();
    }, [id])

    useEffect(() => {
        orderTimeline.map(status => {
            if (order.orderStatus === status.status.toLowerCase()) {
                setTimelineId(status.id)
            }
        })
    }, [order])

    const orderStatus = {
        processing: "bg-accent-soft text-accent",
        shipped: "bg-warning/15 text-warning",
        delivered: "bg-success/15 text-success",
        cancelled: "bg-danger/15 text-danger"
    }

    const orderTimeline = [
        {
            status: "Processing",
            id: 1
        },
        {
            status: "Shipped",
            id: 2
        },
        {
            status: "Delivered",
            id: 3
        }
    ]

    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    if (loading) return <p className="text-center text-muted">Loading...</p>

    return (
        <>
            <div onClick={() => navigate('/orders')} className="text-muted text-sm cursor-pointer mb-5">← My Orders</div>

            <div className="flex justify-between items-center mb-1">
                <h2 className="text-2xl font-black">Order Details</h2>
                <div className={`${orderStatus[order.orderStatus]} h-fit py-1 px-3 rounded-full text-xs`}>
                    <span>{order.orderStatus}</span>
                </div>
            </div>
            <p className="text-muted text-xs mb-4">
                #ORD-{order._id?.slice(0, 8)} • {new Date(order?.createdAt)?.toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                })}
            </p>

            <div className="flex gap-3">
                <div className="left flex-2">
                    <div className="bg-card p-4 rounded-2xl border border-border">
                        <div className="text-sm font-bold mb-2">Order Items</div>
                        <div className="flex flex-col">
                            {order?.orderItems?.map(item => (
                                <div key={item._id} className={`p-3 flex items-center gap-4 ${order.orderItems[order.orderItems?.length - 1] === item ? "" : "border-border border-b"}`} >
                                    <div className="h-14 w-14 bg-surface rounded-xl border border-border overflow-hidden">
                                        {item.image === "no-image"
                                            ?
                                            <span className="text-2xl flex justify-center items-center h-full">🎧</span>
                                            :
                                            <img src={item.image} alt="product image" className="w-full h-full object-cover" />
                                        }
                                    </div>
                                    <div className="flex-1 flex flex-col">
                                        <h4 className="text-sm font-semibold truncate max-w-sm w-full">{item.name}</h4>
                                        <p className="text-muted text-xs">Qty: {item.quantity}</p>
                                    </div>
                                    <div className="text-accent text-sm font-black">₹{item.price.toLocaleString()}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-card p-4 rounded-2xl border border-border mt-4">
                        <div className="text-sm font-bold mb-2">Order Timeline</div>
                        <div className="flex flex-col gap-1">
                            <div className="flex gap-4">
                                <div className="flex flex-col gap-1 items-center">
                                    <div className="circle w-6 h-6 rounded-full bg-accent"></div>
                                    <div className="pipe w-1 h-10 bg-[#282835]"></div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="text-sm font-semibold">Order Placed</div>
                                    <p className="text-muted text-xs">{new Date(order.createdAt).toLocaleString("en-IN", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })
                                        .replace("am", "AM")
                                        .replace("pm", "PM")
                                    }</p>
                                </div>
                            </div>

                            {order.orderStatus !== "cancelled" ? orderTimeline.map((status, i) => (
                                <div key={status.id} className="flex gap-4">
                                    <div className="flex flex-col gap-1 items-center">
                                        <div className={`circle w-6 h-6 rounded-full ${status.id <= timelineId ? "bg-accent" : "bg-[#282835]"}`}></div>
                                        {orderTimeline.length - 1 !== i ? <div className="pipe w-1 h-10 bg-[#282835]"></div> : ""}
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <div className="text-sm font-semibold">{status.status}</div>
                                        <p className="text-muted text-xs">{status.id <= timelineId ? new Date(order.createdAt).toLocaleString("en-IN", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })
                                            .replace("am", "AM")
                                            .replace("pm", "PM")
                                            : "Pending"}</p>
                                    </div>
                                </div>
                            ))
                                :
                                <div className="flex gap-4">
                                    <div className="circle w-6 h-6 rounded-full bg-danger"></div>
                                    <p className="text-danger text-sm">This order was cancelled.</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="right flex-1">
                    <div className="bg-card p-4 rounded-2xl border border-border">
                        <div className="text-sm font-bold mb-2">Price Summary</div>
                        <div className="flex justify-between text-[13px] mb-1">
                            <span className="text-muted">Subtotal</span>
                            <span className="">₹{order.totalPrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-[13px] mb-1">
                            <span className="text-muted">Shipping</span>
                            <span className="text-success">Free</span>
                        </div>
                        <div className="flex justify-between text-[13px] border-border border-b pb-2">
                            <span className="text-muted">Payment</span>
                            <span className="text-muted text-xs font-mono">Razorpay</span>
                        </div>
                        <div className="flex justify-between mt-3 font-black">
                            <span className="">Total</span>
                            <span className="text-accent">₹{order.totalPrice.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="bg-card p-4 rounded-2xl border border-border mt-4">
                        <div className="text-sm font-bold mb-2">Shipping Address</div>
                        <div className="text-[13px] font-light">{order.shippingAddress?.address}</div>
                        <div className="text-[13px] font-light text-muted">
                            <span>{order.shippingAddress?.city}</span>
                            {", "}
                            <span>{order.shippingAddress?.state}</span>
                            {", "}
                            <span>{order.shippingAddress?.pincode}</span>
                        </div>
                    </div>

                    <div className="bg-card p-4 rounded-2xl border border-border mt-4">
                        <div className="text-sm font-bold mb-2">Payment Info</div>
                        <div className="flex justify-between text-[13px] mb-1">
                            <span className="text-muted">Status</span>
                            <span className="text-success">{capitalize(order.paymentStatus)}</span>
                        </div>
                        <div className="flex justify-between text-[13px]">
                            <span className="text-muted">Payment ID</span>
                            <span className="text-muted text-xs font-mono">{order.paymentId}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderDetail;