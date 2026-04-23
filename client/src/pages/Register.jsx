import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [confirmPassword, setConfirmPassword] = useState("");
    const [matchPassword, setMatchPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.name.length < 2) return setError("Name must be at least 2 characters");
        if (!form.email) return setError("Email is required");
        if (form.password.length < 8) return setError("Password must be at least 8 characters");
        if (!matchPassword) return setError("Passwords do not match");
        try {
            setLoading(true);

            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })

            const { success, message } = await res.json();
            if (!success) {
                return setError(message);
            }
            navigate("/login");
            setError("");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const handlePassword = (e) => {
        const currPass = form.password;
        const confPass = e.target.value;

        setConfirmPassword(confPass);

        if (confPass.length >= 8) {
            if (currPass === confPass) {
                setMatchPassword(true);
            } else {
                setMatchPassword(false);
            }
        }
    }

    return (
        <>
            <div className="min-h-screen flex justify-center items-center">
                <div className="max-w-md w-full">
                    <div className="text-center mb-10">
                        <h2 className="text-[28px] font-black">store<span className="text-accent">lo</span></h2>
                        <p className="text-muted text-[14px]">Create your account to get started.</p>
                    </div>
                    <div className="bg-card border border-border rounded-2xl p-8 flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-xs text-muted font-mono tracking-widest">FULL NAME</label>
                            <input id="name" name="name" type="text" placeholder="your name" value={form.name} onChange={handleForm} className="bg-surface border border-border rounded-lg px-4 py-3 w-full text-sm focus:border-accent focus:outline-none transition-colors duration-200" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-xs text-muted font-mono tracking-widest">EMAIL ADDRESS</label>
                            <input id="email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleForm} className="bg-surface border border-border rounded-lg px-4 py-3 w-full text-sm focus:border-accent focus:outline-none transition-colors duration-200" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password" className="text-xs text-muted font-mono tracking-widest">PASSWORD</label>
                            <input id="password" name="password" type="password" placeholder="••••••••" value={form.password} onChange={handleForm} minLength={8} className="bg-surface border border-border rounded-lg px-4 py-3 w-full text-sm focus:border-accent focus:outline-none transition-colors duration-200" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="confirmpassword" className="text-xs text-muted font-mono tracking-widest">CONFIRM PASSWORD</label>
                            <input id="confirmpassword" name="confirmpassword" type="password" placeholder="••••••••" value={confirmPassword} onChange={handlePassword} minLength={8} className={`bg-surface border ${confirmPassword.length >= 8 ? matchPassword ? "border-border focus:border-accent" : "border-danger focus:border-danger" : "border-border focus:border-accent"} rounded-lg px-4 py-3 w-full text-sm focus:outline-none transition-colors duration-200`} />
                        </div>

                        <button onClick={handleSubmit} className="bg-accent font-bold w-full rounded-xl py-3 hover:bg-accent-hover cursor-pointer my-2">{loading ? "Creating account..." : "Create account →"}</button>

                        <div className="text-muted text-[13px] text-center">Already have an account? <Link to={"/login"} className="text-accent cursor-pointer">Login</Link></div>

                        {error && <p className="text-danger text-xs text-center">{error}</p>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;