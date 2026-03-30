import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem("fl_user")
    if (stored) setUser(JSON.parse(stored))
    setLoading(false)
  }, [])

  const login = (email, password) => {
    // Simulate auth — accept any non-empty credentials
    if (!email || !password) return false
    const userData = { email, name: email.split("@")[0], avatar: email[0].toUpperCase() }
    setUser(userData)
    localStorage.setItem("fl_user", JSON.stringify(userData))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("fl_user")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}