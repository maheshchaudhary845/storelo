import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function OrderDetail() {
    const {token} = useAuth();
    const {id} = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function fetchOrder(){
            setLoading(true);
            try{
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/${id}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const {success, data} = await res.json();
                if(success){
                    setOrder(data);
                }
            } catch(err){
                console.error(err.message);
            } finally{
                setLoading(false);
            }
        }
        fetchOrder();
    }, [])
    
    const orderStatus = {
        processing: "bg-accent-soft text-accent",
        shipped: "bg-warning/15 text-warning",
        delivered: "bg-success/15 text-success",
        cancelled: "bg-danger/15 text-danger"
    }
    
    console.log(order)

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
                <div className="left bg-card p-4 rounded-2xl border border-border">
                    <div className="text-sm font-bold mb-2">Order Items</div>
                    <div className="flex gap-4 flex-col">
                        {}
                    </div>
                </div>
                <div className="right"></div>
            </div>
        </>
    )
}

export default OrderDetail;