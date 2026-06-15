function About() {
    return (
        <>
            {/* Hero */}
            <section className="relative py-16 px-12 mb-12 border border-border rounded-3xl overflow-hidden bg-surface">
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-[radial-gradient(circle,rgba(108,99,255,0.25)_0%,transparent_70%)] rounded-full pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[radial-gradient(circle,rgba(108,99,255,0.1)_0%,transparent_70%)] rounded-full pointer-events-none" />
                <p className="font-mono text-[11px] text-accent tracking-widest uppercase mb-4">About Storelo</p>
                <h1 className="text-5xl font-black leading-tight mb-5">
                    Built for the ones who<br />
                    <span className="text-accent">refuse to compromise.</span>
                </h1>
                <p className="text-muted text-[15px] max-w-xl leading-relaxed">
                    Storelo is a direct-to-consumer electronics brand. No middlemen, no markups — just premium audio gear delivered straight to you.
                </p>
            </section>

            {/* Stats */}
            <section className="grid grid-cols-4 gap-4 mb-12">
                {[
                    { value: "50,000+", label: "Happy Customers" },
                    { value: "4.8★", label: "Average Rating" },
                    { value: "24+", label: "Products" },
                    { value: "1 Year", label: "Warranty on All" },
                ].map((stat) => (
                    <div key={stat.label} className="bg-card border border-border rounded-2xl p-6 text-center">
                        <div className="text-2xl font-black text-accent mb-1">{stat.value}</div>
                        <div className="text-muted text-xs font-mono uppercase tracking-widest">{stat.label}</div>
                    </div>
                ))}
            </section>

            {/* Our Story */}
            <section className="flex gap-10 mb-12 items-center">
                <div className="flex-1">
                    <p className="font-mono text-[11px] text-accent tracking-widest uppercase mb-3">Our Story</p>
                    <h2 className="text-3xl font-black mb-4 leading-tight">Why we started Storelo</h2>
                    <p className="text-muted text-sm leading-relaxed mb-4">
                        We were tired of paying extra for middlemen who added no value. Great audio gear was always out of reach for most people — buried under retailer markups and confusing choices.
                    </p>
                    <p className="text-muted text-sm leading-relaxed">
                        So we built Storelo — a single brand, a single promise: bring the best sound experience directly to you, at a fair price, with zero compromise on quality.
                    </p>
                </div>
                <div className="flex-1 h-64 bg-[linear-gradient(135deg,#1A1A2E,#252535)] rounded-2xl border border-border flex items-center justify-center">
                    <span className="text-8xl">🎧</span>
                </div>
            </section>

            {/* Values */}
            <section className="mb-12">
                <p className="font-mono text-[11px] text-accent tracking-widest uppercase mb-3">What We Stand For</p>
                <h2 className="text-3xl font-black mb-6">Our values</h2>
                <div className="grid grid-cols-3 gap-4">
                    {[
                        {
                            emoji: "🎯",
                            title: "Quality First",
                            desc: "Every product goes through rigorous testing before it reaches your hands. We don't cut corners — ever."
                        },
                        {
                            emoji: "💸",
                            title: "Fair Pricing",
                            desc: "Direct from us to you. No distributor markup, no retail overhead. You pay for the product, not the supply chain."
                        },
                        {
                            emoji: "🤝",
                            title: "Customer First",
                            desc: "1-year warranty, easy returns, and real support. We stand behind everything we sell."
                        },
                    ].map((val) => (
                        <div key={val.title} className="bg-card border border-border rounded-2xl p-6 hover:border-accent transition-colors duration-200">
                            <span className="text-3xl mb-4 block">{val.emoji}</span>
                            <h3 className="font-bold mb-2">{val.title}</h3>
                            <p className="text-muted text-sm leading-relaxed">{val.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-card border border-border rounded-3xl p-10 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(108,99,255,0.08)_0%,transparent_70%)] pointer-events-none" />
                <p className="font-mono text-[11px] text-accent tracking-widest uppercase mb-3">Ready to experience it?</p>
                <h2 className="text-3xl font-black mb-4">Sound that hits different.</h2>
                <p className="text-muted text-sm mb-6 max-w-md mx-auto">Browse our full collection of headphones, earbuds, speakers and smartwatches.</p>
                <a href="/products" className="inline-block bg-accent hover:bg-accent-hover transition-colors duration-200 text-white font-bold px-8 py-3 rounded-xl text-[15px]">
                    Shop Now →
                </a>
            </section>
        </>
    );
}

export default About;