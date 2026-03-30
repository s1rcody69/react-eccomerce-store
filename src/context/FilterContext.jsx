import { createContext, useContext, useState } from "react"

const FilterContext = createContext()

export function FilterProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("default")
  const [priceRange, setPriceRange] = useState([0, 1000])

  return (
    <FilterContext.Provider
      value={{
        searchQuery, setSearchQuery,
        selectedCategory, setSelectedCategory,
        sortBy, setSortBy,
        priceRange, setPriceRange,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export function useFilter() {
  return useContext(FilterContext)
}