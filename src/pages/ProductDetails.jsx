import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import axios from "axios"
import { useCart } from "../context/CartContext"

function Stars({ rate }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <svg key={s} className={`w-4 h-4 ${s <= Math.round(rate || 0) ? "text-[#f0e6c8]" : "text-white/15"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

const TABS = ["Overview", "Reviews", "Specifications"]

const MOCK_REVIEWS = [
  { name: "Alex M.", rating: 5, comment: "Exceeded all expectations. Great quality.", date: "Mar 2025" },
  { name: "Sarah K.", rating: 4, comment: "Really happy with this purchase.", date: "Feb 2025" },
  { name: "James L.", rating: 5, comment: "Exactly as described. Would buy again.", date: "Jan 2025" },
]

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart, cartItems } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [activeTab, setActiveTab] = useState("Overview")

  const inCart = cartItems.some((i) => i.id === product?.id)

  useEffect(() => {
    setLoading(true)
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => setError("Product not found."))
      .finally(() => setLoading(false))
  }, [id])

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="skeleton w-full md:w-80 h-80 rounded-xl" />
          <div className="flex-1 flex flex-col gap-4">
            <div className="skeleton h-4 w-24 rounded" />
            <div className="skeleton h-8 w-3/4 rounded" />
            <div className="skeleton h-4 w-full rounded" />
            <div className="skeleton h-4 w-2/3 rounded" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <p className="text-[#f0e6c8]/50 mb-4">{error}</p>
        <button onClick={() => navigate("/products")} className="px-5 py-2 rounded-lg bg-[#2ecc71] text-[#0d1f0f] text-sm font-medium">
          Back to Products
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[#f0e6c8]/30 mb-8">
        <Link to="/" className="hover:text-[#f0e6c8]">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-[#f0e6c8]">Products</Link>
        <span>/</span>
        <span className="text-[#f0e6c8]/60 truncate max-w-xs">{product.title}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Image */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="sticky top-24 bg-white/[0.03] border border-white/10 rounded-xl p-10 flex items-center justify-center h-80">
            <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain" />
          </div>
        </div>

        {/* Details */}
        <div className="flex-1">
          <span className="text-xs text-[#2ecc71]/70 capitalize">{product.category}</span>
          <h1 className="text-2xl font-semibold text-[#f0e6c8] mt-2 mb-4 leading-snug">
            {product.title}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-6">
            <Stars rate={product.rating?.rate} />
            <span className="text-sm text-[#2ecc71]">{product.rating?.rate}</span>
            <span className="text-sm text-[#f0e6c8]/30">({product.rating?.count} reviews)</span>
          </div>

          {/* Price */}
          <p className="text-3xl font-bold text-[#2ecc71] mb-8">${product.price?.toFixed(2)}</p>

          {/* Qty + Add */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center border border-white/15 rounded-lg overflow-hidden">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-3 py-2 text-[#f0e6c8]/60 hover:text-[#f0e6c8] hover:bg-white/5 transition-colors"
              >
                −
              </button>
              <span className="px-4 py-2 text-[#f0e6c8] text-sm border-x border-white/15">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="px-3 py-2 text-[#f0e6c8]/60 hover:text-[#f0e6c8] hover:bg-white/5 transition-colors"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAdd}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                added
                  ? "bg-[#2ecc71]/15 text-[#2ecc71] border border-[#2ecc71]/30"
                  : "bg-[#2ecc71] text-[#0d1f0f] hover:bg-[#2ecc71]/90"
              }`}
            >
              {added ? "✓ Added!" : inCart ? "Add More" : "Add to Cart"}
            </button>
            <Link
              to="/cart"
              className="px-5 py-2.5 rounded-lg border border-white/15 text-sm text-[#f0e6c8]/60 hover:text-[#f0e6c8] hover:border-white/30 transition-colors"
            >
              View Cart
            </Link>
          </div>

          {/* Perks */}
          <div className="flex gap-6 text-xs text-[#f0e6c8]/40 mb-8 flex-wrap">
            {["Free Shipping", "30-Day Returns", "Secure Payment"].map((f) => (
              <span key={f} className="flex items-center gap-1.5">
                <span className="text-[#2ecc71]">✓</span> {f}
              </span>
            ))}
          </div>

          {/* Tabs */}
          <div className="border-t border-white/10 pt-6">
            <div className="flex gap-1 mb-6">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    activeTab === tab
                      ? "bg-white/8 text-[#f0e6c8]"
                      : "text-[#f0e6c8]/40 hover:text-[#f0e6c8]"
                  }`}
                >
                  {tab === "Reviews" ? `Reviews (${product.rating?.count})` : tab}
                </button>
              ))}
            </div>

            {/* Overview */}
            {activeTab === "Overview" && (
              <p className="text-[#f0e6c8]/60 text-sm leading-relaxed">{product.description}</p>
            )}

            {/* Reviews */}
            {activeTab === "Reviews" && (
              <div className="flex flex-col gap-4">
                {MOCK_REVIEWS.map((r, i) => (
                  <div key={i} className="border border-white/10 rounded-xl p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-[#f0e6c8] text-sm font-medium">{r.name}</p>
                        <p className="text-[#f0e6c8]/30 text-xs">{r.date}</p>
                      </div>
                      <Stars rate={r.rating} />
                    </div>
                    <p className="text-[#f0e6c8]/60 text-sm">{r.comment}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Specifications */}
            {activeTab === "Specifications" && (
              <div className="border border-white/10 rounded-xl overflow-hidden">
                {[
                  ["Product ID", `#${product.id}`],
                  ["Category", product.category],
                  ["Rating", `${product.rating?.rate} / 5`],
                  ["Reviews", product.rating?.count],
                  ["Price", `$${product.price?.toFixed(2)}`],
                  ["Availability", "In Stock"],
                  ["Shipping", "Free over $50"],
                  ["Returns", "30 days"],
                ].map(([label, value], i) => (
                  <div key={i} className={`flex justify-between px-4 py-3 text-sm ${i % 2 === 0 ? "bg-white/[0.02]" : ""} border-b border-white/5 last:border-0`}>
                    <span className="text-[#f0e6c8]/40">{label}</span>
                    <span className="text-[#f0e6c8]/80 capitalize">{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}