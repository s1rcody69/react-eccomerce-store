import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-1 mb-3">
            <span className="text-[#2ecc71] font-bold">Forest</span>
            <span className="text-[#f0e6c8] font-light">Luxe</span>
          </div>
          <p className="text-[#f0e6c8]/40 text-sm leading-relaxed">
            Premium products curated for the discerning shopper.
          </p>
        </div>

        <div>
          <p className="text-[#f0e6c8]/30 text-xs uppercase tracking-widest mb-4">Shop</p>
          <div className="flex flex-col gap-2">
            {[
              { to: "/products", label: "All Products" },
              { to: "/products?category=electronics", label: "Electronics" },
              { to: "/products?category=jewelery", label: "Jewellery" },
              { to: "/cart", label: "Cart" },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="text-sm text-[#f0e6c8]/50 hover:text-[#2ecc71] transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[#f0e6c8]/30 text-xs uppercase tracking-widest mb-4">Account</p>
          <div className="flex flex-col gap-2">
            {[
              { to: "/login", label: "Sign In" },
              { to: "/checkout", label: "Checkout" },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="text-sm text-[#f0e6c8]/50 hover:text-[#2ecc71] transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 px-6 py-4 text-center text-[#f0e6c8]/20 text-xs">
        © {new Date().getFullYear()} ForestLuxe. 
      </div>
    </footer>
  )
}