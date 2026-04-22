import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {Link, useNavigate} from "react-router-dom";

function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })

            const { success, data, token, message } = await res.json();
            if (!success) {
                return setError(message);
            }
            login(data, token);
            navigate("/");
            setError("");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="min-h-screen flex justify-center items-center">
                <div className="max-w-md w-full">
                    <div className="text-center mb-10">
                        <h2 className="text-[28px] font-black">store<span className="text-accent">lo</span></h2>
                        <p className="text-muted text-[14px]">Welcome back! Sign in to continue.</p>
                    </div>
                    <div className="bg-card border border-border rounded-2xl p-8 flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-xs text-muted font-mono tracking-widest">EMAIL ADDRESS</label>
                            <input id="email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleForm} className="bg-surface border border-border rounded-lg px-4 py-3 w-full text-sm focus:border-accent focus:outline-none transition-colors duration-200" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password" className="text-xs text-muted font-mono tracking-widest">PASSWORD</label>
                            <input id="password" name="password" type="password" placeholder="••••••••" value={form.password} onChange={handleForm} className="bg-surface border border-border rounded-lg px-4 py-3 w-full text-sm focus:border-accent focus:outline-none transition-colors duration-200" />
                        </div>

                        <button onClick={handleSubmit} className="bg-accent font-bold w-full rounded-xl py-3 hover:bg-accent-hover cursor-pointer my-2">{loading ? "Signing in..." : "Sign in →"}</button>

                        <div className="text-muted text-[13px] text-center">Don't have an account? <Link to={"/register"} className="text-accent cursor-pointer">Register</Link></div>

                        {error && <p className="text-danger text-xs text-center">{error}</p>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;