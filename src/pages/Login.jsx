import { useState } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Login() {
  const { login, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"

  const [form, setForm] = useState({ email: "", password: "" })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [failed, setFailed] = useState(false)

  if (user) navigate(from, { replace: true })

  const validate = () => {
    const errs = {}
    if (!form.email.trim()) errs.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email"
    if (!form.password.trim()) errs.password = "Password is required"
    else if (form.password.length < 4) errs.password = "Minimum 4 characters"
    return errs
  }

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))
    setErrors((p) => ({ ...p, [e.target.name]: "" }))
    setFailed(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setLoading(true)
    setTimeout(() => {
      const ok = login(form.email, form.password)
      if (ok) navigate(from, { replace: true })
      else { setFailed(true); setLoading(false) }
    }, 700)
  }

  const inputClass = (err) =>
    `w-full bg-white/5 border rounded-lg px-4 py-2.5 text-sm text-[#f0e6c8] placeholder-[#f0e6c8]/25 focus:outline-none transition-colors ${
      err ? "border-red-500/50" : "border-white/10 focus:border-[#2ecc71]/50"
    }`

  return (
    <div className="min-h-[88vh] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="flex items-center gap-1 mb-8">
            <span className="text-[#2ecc71] font-bold">Forest</span>
            <span className="text-[#f0e6c8] font-light">Luxe</span>
          </Link>
          <h1 className="text-2xl font-semibold text-[#f0e6c8] mb-1">Sign in</h1>
          <p className="text-[#f0e6c8]/40 text-sm">
            {location.state?.from ? "Sign in to continue to checkout" : "Welcome back"}
          </p>
        </div>

        {/* Hint */}
        <div className="border border-white/10 rounded-lg px-4 py-3 mb-6 text-xs text-[#f0e6c8]/40">
          Use any email + password (4+ chars) to sign in
        </div>

        {failed && (
          <div className="border border-red-500/30 rounded-lg px-4 py-3 mb-4 text-sm text-red-400 bg-red-500/5">
            Invalid credentials. Please try again.
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <div>
            <label className="block text-xs text-[#f0e6c8]/50 mb-1.5">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className={inputClass(errors.email)} />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-xs text-[#f0e6c8]/50 mb-1.5">Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="••••••••" className={inputClass(errors.password)} />
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-[#2ecc71] text-[#0d1f0f] font-semibold text-sm hover:bg-[#2ecc71]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-[#0d1f0f]/30 border-t-[#0d1f0f] rounded-full animate-spin" />
                Signing in...
              </>
            ) : "Sign In"}
          </button>
        </form>

        <p className="text-center text-[#f0e6c8]/30 text-sm mt-6">
          Don't have an account?{" "}
          <span className="text-[#2ecc71] cursor-pointer hover:underline">Sign up</span>
        </p>

        <div className="mt-6 pt-6 border-t border-white/8 text-center">
          <Link to="/products" className="text-[#f0e6c8]/30 text-sm hover:text-[#f0e6c8] transition-colors">
            ← Continue browsing
          </Link>
        </div>
      </div>
    </div>
  )
}