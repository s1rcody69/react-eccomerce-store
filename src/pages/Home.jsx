import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import ProductCard from "../components/ProductCard"

const CATEGORIES = [
  { name: "Electronics", icon: "💻", slug: "electronics" },
  { name: "Jewellery", icon: "💎", slug: "jewelery" },
  { name: "Men's Fashion", icon: "👔", slug: "men's clothing" },
  { name: "Women's Fashion", icon: "👗", slug: "women's clothing" },
]

export default function Home() {
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products?limit=4")
      .then((res) => setFeatured(res.data))
      .catch(() => setError("Failed to load products."))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-24">
        <div className="max-w-2xl">
          <p className="text-[#2ecc71] text-sm font-medium mb-4 tracking-wide">New Season Collection</p>
          <h1 className="text-5xl md:text-6xl font-bold text-[#f0e6c8] leading-tight mb-6">
            Premium<br />Products
          </h1>
          <p className="text-[#f0e6c8]/50 text-lg leading-relaxed mb-10 max-w-md">
            Curated collections of exceptional quality. From electronics to fashion.
          </p>
          <div className="flex gap-3">
            <Link
              to="/products"
              className="px-6 py-3 rounded-lg bg-[#2ecc71] text-[#0d1f0f] font-semibold text-sm hover:bg-[#2ecc71]/90 transition-colors"
            >
              Shop Now
            </Link>
            <Link
              to="/products"
              className="px-6 py-3 rounded-lg border border-white/15 text-[#f0e6c8]/70 text-sm hover:border-white/30 hover:text-[#f0e6c8] transition-colors"
            >
              Browse All
            </Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-white/8" />

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-[#f0e6c8]/40 text-xs uppercase tracking-widest mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${encodeURIComponent(cat.slug)}`}
              className="flex flex-col items-center gap-3 p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:border-[#2ecc71]/30 hover:bg-white/[0.04] transition-colors"
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="text-[#f0e6c8]/70 text-sm text-center">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-white/8" />

      {/* Featured */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[#f0e6c8] text-xl font-semibold">Featured Products</h2>
          <Link to="/products" className="text-sm text-[#2ecc71] hover:underline">View all →</Link>
        </div>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-xl overflow-hidden border border-white/10">
                <div className="skeleton h-48" />
                <div className="p-4 flex flex-col gap-3">
                  <div className="skeleton h-3 w-1/3" />
                  <div className="skeleton h-4 w-full" />
                  <div className="skeleton h-4 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="border border-white/10 rounded-xl p-10 text-center text-[#f0e6c8]/40">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}