import { Link } from "react-router-dom"
import { useState } from "react"
import { useCart } from "../context/CartContext"

export default function ProductCard({ product }) {
  const { addToCart, cartItems } = useCart()
  const [added, setAdded] = useState(false)

  const inCart = cartItems.some((i) => i.id === product.id)

  const handleAdd = (e) => {
    e.preventDefault()
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <Link
      to={`/products/${product.id}`}
      className="group flex flex-col bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden hover:border-[#2ecc71]/40 transition-colors"
    >
      {/* Image */}
      <div className="h-48 bg-white/5 flex items-center justify-center p-6">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <span className="text-xs text-[#2ecc71]/70 capitalize">{product.category}</span>
        <p className="text-[#f0e6c8] text-sm line-clamp-2 leading-relaxed">{product.title}</p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mt-auto pt-2">
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map((s) => (
              <svg key={s} className={`w-3 h-3 ${s <= Math.round(product.rating?.rate || 0) ? "text-[#f0e6c8]" : "text-white/15"}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-[#f0e6c8]/30">({product.rating?.count})</span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/8 mt-1">
          <span className="text-[#2ecc71] font-semibold">${product.price?.toFixed(2)}</span>
          <button
            onClick={handleAdd}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              added
                ? "bg-[#2ecc71]/15 text-[#2ecc71]"
                : inCart
                ? "border border-[#2ecc71]/30 text-[#2ecc71]/60 hover:text-[#2ecc71]"
                : "bg-[#2ecc71] text-[#0d1f0f] hover:bg-[#2ecc71]/90"
            }`}
          >
            {added ? "✓ Added" : inCart ? "In Cart" : "Add"}
          </button>
        </div>
      </div>
    </Link>
  )
}