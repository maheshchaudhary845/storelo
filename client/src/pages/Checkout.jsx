import { useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function Checkout() {
    const [paymentMode, setPaymentMode] = useState("");
    const [form, setForm] = useState({ address: "", city: "", state: "", pincode: "" });
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const { cartItems, totalPrice, clearCart } = useCart();
    const { token } = useAuth();

    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handlePayment = async () => {
        if (!form.address.trim() || !form.city.trim() || !form.state.trim() || !form.pincode.trim()) return setError("Complete address fields");
        if (!paymentMode.trim()) return setError("Payment mode must be selected!");

        if (paymentMode === "online") {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/payment/create-order`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ totalPrice })
                })
                const { success, data, message } = await res.json();

                if (success) {
                    const options = {
                        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                        amount: totalPrice * 100,
                        currency: "INR",
                        order_id: data.id,
                        handler: async (response) => {
                            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;

                            const verifyRes = await fetch(`${import.meta.env.VITE_API_URL}/api/payment/verify`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": `Bearer ${token}`
                                },
                                body: JSON.stringify({
                                    razorpay_order_id,
                                    razorpay_payment_id,
                                    razorpay_signature,
                                    shippingAddress: form,
                                    cartItems
                                })
                            })
                            const { success: verifySuccess, data: orderData, message: verifyMessage } = await verifyRes.json();

                            if (verifySuccess) {
                                setError("");
                                navigate('/orders');
                                clearCart();
                            }
                        }
                    }

                    const rzp = new window.Razorpay(options);
                    rzp.open();

                    setError("");
                }
            }
            catch (err) {
                setError(err.message);
                console.error(err.message);
            }
        }
    }

    return (
        <>
            <div className="flex gap-6">
                <div className="flex-[1.5]">
                    <div className="bg-card p-5 rounded-xl border border-border mb-4">
                        <h4 className="text-sm mb-4">Shipping address</h4>
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="address" className="text-[11px] text-muted">FULL ADDRESS</label>
                                <input value={form.address} onChange={handleForm} name="address" type="text" id="address" className="border border-border py-2 px-3 rounded-lg text-sm" placeholder="123 Main Street, Near Bus Stand" />
                            </div>
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex-1 flex flex-col gap-1">
                                    <label htmlFor="city" className="text-[11px] text-muted">CITY</label>
                                    <input value={form.city} onChange={handleForm} name="city" type="text" id="city" className="border border-border py-2 px-3 rounded-lg text-sm" placeholder="City Name" />
                                </div>
                                <div className="flex-1 flex flex-col gap-1">
                                    <label htmlFor="state" className="text-[11px] text-muted">STATE</label>
                                    <input value={form.state} onChange={handleForm} name="state" type="text" id="state" className="border border-border py-2 px-3 rounded-lg text-sm" placeholder="State Name" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="pincode" className="text-[11px] text-muted">PINCODE</label>
                                <input value={form.pincode} onChange={handleForm} name="pincode" type="text" id="pincode" className="border border-border py-2 px-3 rounded-lg text-sm w-1/2" placeholder="Pincode" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-card p-5 rounded-xl border border-border">
                        <h4 className="text-sm mb-4">Payment method</h4>
                        <div>
                            <label htmlFor="online" className="flex items-center p-3 gap-2 border border-border rounded-lg cursor-pointer mb-2">
                                <input type="radio" value="online" onChange={(e) => setPaymentMode(e.target.value)} name="pay-method" id="online" checked={paymentMode === "online"} />
                                <div>
                                    <div className={`${paymentMode === "online" ? "text-accent" : "text-text"} text-sm`}>Razorpay</div>
                                    <p className="text-muted text-xs">UPI, Cards, Net Banking, Wallets</p>
                                </div>
                            </label>
                            <label htmlFor="cod" className="flex items-center p-3 gap-2 border border-border rounded-lg cursor-pointer">
                                <input type="radio" value="cod" onChange={(e) => setPaymentMode(e.target.value)} name="pay-method" id="cod" checked={paymentMode === "cod"} />
                                <div>
                                    <div className={`${paymentMode === "cod" ? "text-accent" : "text-text"} text-sm`}>Cash on Delivery</div>
                                    <p className="text-muted text-xs">Pay when your order arrives</p>
                                </div>
                            </label>
                        </div>
                    </div>

                </div>

                <div className="flex-1">
                    <div className="bg-card p-5 rounded-xl border border-border">
                        <h4 className="text-sm mb-4">Order summary</h4>
                        <div className="flex flex-col gap-2">
                            {cartItems.map(item => (
                                <div key={item.product._id} className="flex gap-3 items-center">
                                    <div className="img-cont w-12 h-12 rounded-lg overflow-hidden">
                                        {item.product.images.length ?
                                            <img src={item.product.images[0]} className="w-full h-full object-cover" alt="product image" />
                                            :
                                            <span className="text-4xl flex justify-center items-center h-full">🎧</span>
                                        }
                                    </div>
                                    <div className="flex-1 flex flex-col">
                                        <h5 className="text-sm truncate" title={item.product.name}>{item.product.name}</h5>
                                        <span className="text-muted text-xs font-medium">Qty: {item.quantity}</span>
                                    </div>
                                    <div className="text-sm">₹{(item.product.price * item.quantity).toLocaleString()}</div>
                                </div>
                            ))}
                        </div>
                        <div className="h-px w-full bg-muted my-2"></div>
                        <div className="w-1/2 ml-auto">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-sm text-muted">Subtotal</span>
                                <span className="text-sm">₹{totalPrice.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-sm text-muted">Shipping</span>
                                <span className="text-sm text-success">Free</span>
                            </div>
                            <div className="flex justify-between items-center mb-2 text-[15px] border-t border-border">
                                <span>Total</span>
                                <span className="text-accent font-semibold mt-1">₹{totalPrice.toLocaleString()}</span>
                            </div>
                            <button onClick={handlePayment} className="w-full bg-accent py-2 px-3 rounded-lg cursor-pointer text-[15px]">Pay now <span className="font-semibold">₹{totalPrice.toLocaleString()}</span></button>
                            {error && <p className="text-danger text-[11px] text-center font-mono">{error}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout;