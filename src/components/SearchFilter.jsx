import { useFilter } from "../context/FilterContext"

const CATEGORIES = ["all", "electronics", "jewelery", "men's clothing", "women's clothing"]
const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "rating", label: "Top Rated" },
  { value: "name", label: "Name A–Z" },
]

export default function SearchFilter() {
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, sortBy, setSortBy } = useFilter()

  return (
    <div className="flex flex-col gap-6">
      {/* Search */}
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#f0e6c8]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-8 py-2.5 text-sm text-[#f0e6c8] placeholder-[#f0e6c8]/25 focus:outline-none focus:border-[#2ecc71]/50 transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#f0e6c8]/30 hover:text-[#f0e6c8] text-xs"
          >
            ✕
          </button>
        )}
      </div>

      {/* Categories */}
      <div>
        <p className="text-xs text-[#f0e6c8]/30 uppercase tracking-widest mb-3">Category</p>
        <div className="flex flex-col gap-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-left px-3 py-2 rounded-lg text-sm capitalize transition-colors ${
                selectedCategory === cat
                  ? "bg-[#2ecc71]/10 text-[#2ecc71] border border-[#2ecc71]/20"
                  : "text-[#f0e6c8]/50 hover:text-[#f0e6c8] hover:bg-white/5"
              }`}
            >
              {cat === "all" ? "All Products" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <p className="text-xs text-[#f0e6c8]/30 uppercase tracking-widest mb-3">Sort By</p>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-[#f0e6c8] focus:outline-none focus:border-[#2ecc71]/50 transition-colors cursor-pointer"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[#0d1f0f]">
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}