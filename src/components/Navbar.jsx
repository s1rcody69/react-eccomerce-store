import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"

export default function Navbar() {
  const { cartCount } = useCart()
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const links = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Shop" },
    { to: "/cart", label: "Cart" },
  ]

  const handleLogout = () => {
    logout()
    navigate("/")
    setMenuOpen(false)
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0d1f0f] border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-[#2ecc71] font-bold text-xl tracking-tight">Forest</span>
          <span className="text-[#f0e6c8] font-light text-xl tracking-tight">Luxe</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm transition-colors ${
                isActive(link.to)
                  ? "text-[#2ecc71]"
                  : "text-[#f0e6c8]/60 hover:text-[#f0e6c8]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-5">
          {/* Cart */}
          <Link to="/cart" className="relative text-[#f0e6c8]/70 hover:text-[#f0e6c8] transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#2ecc71] text-[#0d1f0f] text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth */}
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-[#f0e6c8]/50">{user.name}</span>
              <button
                onClick={handleLogout}
                className="text-sm text-[#f0e6c8]/40 hover:text-[#2ecc71] transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-1.5 rounded-md border border-[#2ecc71] text-[#2ecc71] text-sm hover:bg-[#2ecc71] hover:text-[#0d1f0f] transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-[#f0e6c8]/70 p-1"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0d1f0f] border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`text-sm py-1 ${isActive(link.to) ? "text-[#2ecc71]" : "text-[#f0e6c8]/60"}`}
            >
              {link.label}
              {link.to === "/cart" && cartCount > 0 && (
                <span className="ml-2 bg-[#2ecc71] text-[#0d1f0f] text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          ))}
          {user ? (
            <button onClick={handleLogout} className="text-left text-sm text-[#f0e6c8]/40 py-1">
              Logout ({user.name})
            </button>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)} className="text-sm text-[#2ecc71] py-1">
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}