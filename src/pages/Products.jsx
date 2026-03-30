import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import axios from "axios"
import ProductCard from "../components/ProductCard"
import SearchFilter from "../components/SearchFilter"
import { useFilter } from "../context/FilterContext"

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchParams] = useSearchParams()
  const { searchQuery, selectedCategory, setSelectedCategory, sortBy } = useFilter()

  useEffect(() => {
    const cat = searchParams.get("category")
    if (cat) setSelectedCategory(cat)
  }, [searchParams])

  useEffect(() => {
    setLoading(true)
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setProducts(res.data))
      .catch(() => setError("Failed to load products. Please try again."))
      .finally(() => setLoading(false))
  }, [])

  const filtered = products
    .filter((p) => {
      const matchSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchCat = selectedCategory === "all" || p.category === selectedCategory
      return matchSearch && matchCat
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price
      if (sortBy === "price-desc") return b.price - a.price
      if (sortBy === "rating") return (b.rating?.rate || 0) - (a.rating?.rate || 0)
      if (sortBy === "name") return a.title.localeCompare(b.title)
      return 0
    })

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#f0e6c8] mb-1">All Products</h1>
        <p className="text-sm text-[#f0e6c8]/40">
          {loading ? "Loading..." : `${filtered.length} product${filtered.length !== 1 ? "s" : ""}`}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar */}
        <aside className="w-full lg:w-52 shrink-0">
          <div className="sticky top-24">
            <SearchFilter />
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-1">
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => (
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
            <div className="border border-white/10 rounded-xl p-12 text-center">
              <p className="text-[#f0e6c8]/50 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-5 py-2 rounded-lg bg-[#2ecc71] text-[#0d1f0f] text-sm font-medium"
              >
                Retry
              </button>
            </div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <div className="border border-white/10 rounded-xl p-12 text-center">
              <p className="text-[#f0e6c8]/50 mb-1">No products found</p>
              <p className="text-[#f0e6c8]/30 text-sm">Try adjusting your filters</p>
            </div>
          )}

          {!loading && !error && filtered.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}