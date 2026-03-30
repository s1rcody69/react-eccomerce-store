import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"

const STEPS = ["Shipping", "Payment", "Review"]

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [placed, setPlaced] = useState(false)
  const [loading, setLoading] = useState(false)

  const [shipping, setShipping] = useState({ fullName: "", email: user?.email || "", address: "", city: "", zip: "", country: "" })
  const [payment, setPayment] = useState({ cardName: "", cardNumber: "", expiry: "", cvv: "" })
  const [sErr, setSErr] = useState({})
  const [pErr, setPErr] = useState({})

  const shippingCost = cartTotal > 50 ? 0 : 4.99
  const tax = cartTotal * 0.08
  const grandTotal = cartTotal + shippingCost + tax

  const validateShipping = () => {
    const e = {}
    if (!shipping.fullName.trim()) e.fullName = "Required"
    if (!shipping.email.trim()) e.email = "Required"
    else if (!/\S+@\S+\.\S+/.test(shipping.email)) e.email = "Invalid email"
    if (!shipping.address.trim()) e.address = "Required"
    if (!shipping.city.trim()) e.city = "Required"
    if (!shipping.zip.trim()) e.zip = "Required"
    if (!shipping.country.trim()) e.country = "Required"
    return e
  }

  const validatePayment = () => {
    const e = {}
    if (!payment.cardName.trim()) e.cardName = "Required"
    if (!payment.cardNumber.trim()) e.cardNumber = "Required"
    else if (payment.cardNumber.replace(/\s/g, "").length < 16) e.cardNumber = "Enter 16 digits"
    if (!payment.expiry.trim()) e.expiry = "Required"
    if (!payment.cvv.trim()) e.cvv = "Required"
    else if (payment.cvv.length < 3) e.cvv = "3 digits"
    return e
  }

  const handleNext = () => {
    if (step === 0) { const e = validateShipping(); if (Object.keys(e).length) { setSErr(e); return } }
    if (step === 1) { const e = validatePayment(); if (Object.keys(e).length) { setPErr(e); return } }
    setStep((s) => s + 1)
  }

  const handlePlace = () => {
    setLoading(true)
    setTimeout(() => { clearCart(); setPlaced(true); setLoading(false) }, 1200)
  }

  const inputCls = (err) =>
    `w-full bg-white/5 border rounded-lg px-4 py-2.5 text-sm text-[#f0e6c8] placeholder-[#f0e6c8]/25 focus:outline-none transition-colors ${
      err ? "border-red-500/40" : "border-white/10 focus:border-[#2ecc71]/50"
    }`

  // Success screen
  if (placed) {
    return (
      <div className="min-h-[88vh] flex items-center justify-center px-6">
        <div className="border border-white/10 rounded-2xl p-12 max-w-sm w-full text-center bg-white/[0.02]">
          <div className="w-14 h-14 rounded-full border border-[#2ecc71]/40 bg-[#2ecc71]/10 flex items-center justify-center mx-auto mb-5">
            <span className="text-[#2ecc71] text-xl">✓</span>
          </div>
          <h1 className="text-xl font-semibold text-[#f0e6c8] mb-2">Order Placed!</h1>
          <p className="text-[#f0e6c8]/50 text-sm mb-1">Thanks, {user?.name}.</p>
          <p className="text-[#f0e6c8]/40 text-sm mb-8">Confirmation sent to {shipping.email}.</p>
          <div className="border border-white/10 rounded-lg p-4 text-sm mb-6 text-left">
            <div className="flex justify-between mb-1">
              <span className="text-[#f0e6c8]/40">Total paid</span>
              <span className="text-[#2ecc71] font-semibold">${grandTotal.toFixed(2)}</span>
            </div>
          </div>
          <Link to="/products" className="block w-full py-3 rounded-lg bg-[#2ecc71] text-[#0d1f0f] text-sm font-semibold hover:bg-[#2ecc71]/90 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8">
        <Link to="/cart" className="text-sm text-[#f0e6c8]/40 hover:text-[#f0e6c8] transition-colors mb-4 inline-block">
          ← Back to Cart
        </Link>
        <h1 className="text-2xl font-semibold text-[#f0e6c8]">Checkout</h1>
      </div>

      {/* Steps */}
      <div className="flex items-center gap-2 mb-10 max-w-xs">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1 last:flex-none">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium shrink-0 transition-colors ${
              i < step ? "bg-[#2ecc71] text-[#0d1f0f]" :
              i === step ? "border border-[#2ecc71] text-[#2ecc71]" :
              "border border-white/15 text-[#f0e6c8]/30"
            }`}>
              {i < step ? "✓" : i + 1}
            </div>
            <span className={`text-xs hidden sm:inline ${i === step ? "text-[#f0e6c8]" : "text-[#f0e6c8]/30"}`}>{s}</span>
            {i < STEPS.length - 1 && <div className={`flex-1 h-px ${i < step ? "bg-[#2ecc71]/40" : "bg-white/10"}`} />}
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Form */}
        <div className="flex-1">
          {/* Step 0: Shipping */}
          {step === 0 && (
            <div className="border border-white/10 rounded-xl p-6 bg-white/[0.02]">
              <h2 className="text-[#f0e6c8] font-semibold mb-5">Shipping</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { key: "fullName", label: "Full Name", placeholder: "John Doe", col: 2 },
                  { key: "email", label: "Email", placeholder: "you@example.com", col: 2 },
                  { key: "address", label: "Address", placeholder: "123 Main St", col: 2 },
                  { key: "city", label: "City", placeholder: "Nairobi", col: 1 },
                  { key: "zip", label: "ZIP", placeholder: "00100", col: 1 },
                  { key: "country", label: "Country", placeholder: "Kenya", col: 2 },
                ].map(({ key, label, placeholder, col }) => (
                  <div key={key} className={col === 2 ? "md:col-span-2" : ""}>
                    <label className="block text-xs text-[#f0e6c8]/40 mb-1.5">{label}</label>
                    <input
                      type="text"
                      placeholder={placeholder}
                      value={shipping[key]}
                      onChange={(e) => { setShipping(p => ({...p, [key]: e.target.value})); setSErr(p => ({...p, [key]: ""})) }}
                      className={inputCls(sErr[key])}
                    />
                    {sErr[key] && <p className="text-red-400 text-xs mt-1">{sErr[key]}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Payment */}
          {step === 1 && (
            <div className="border border-white/10 rounded-xl p-6 bg-white/[0.02]">
              <h2 className="text-[#f0e6c8] font-semibold mb-2">Payment</h2>
              <p className="text-[#f0e6c8]/30 text-xs mb-5">🔒 Demo only — no real payment processed</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs text-[#f0e6c8]/40 mb-1.5">Cardholder Name</label>
                  <input type="text" placeholder="John Doe" value={payment.cardName}
                    onChange={(e) => { setPayment(p => ({...p, cardName: e.target.value})); setPErr(p => ({...p, cardName: ""})) }}
                    className={inputCls(pErr.cardName)} />
                  {pErr.cardName && <p className="text-red-400 text-xs mt-1">{pErr.cardName}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs text-[#f0e6c8]/40 mb-1.5">Card Number</label>
                  <input type="text" placeholder="1234 5678 9012 3456" maxLength={19} value={payment.cardNumber}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim()
                      setPayment(p => ({...p, cardNumber: v})); setPErr(p => ({...p, cardNumber: ""}))
                    }}
                    className={inputCls(pErr.cardNumber)} />
                  {pErr.cardNumber && <p className="text-red-400 text-xs mt-1">{pErr.cardNumber}</p>}
                </div>
                <div>
                  <label className="block text-xs text-[#f0e6c8]/40 mb-1.5">Expiry</label>
                  <input type="text" placeholder="MM/YY" maxLength={5} value={payment.expiry}
                    onChange={(e) => {
                      let v = e.target.value.replace(/\D/g, "")
                      if (v.length >= 2) v = v.slice(0,2) + "/" + v.slice(2)
                      setPayment(p => ({...p, expiry: v})); setPErr(p => ({...p, expiry: ""}))
                    }}
                    className={inputCls(pErr.expiry)} />
                  {pErr.expiry && <p className="text-red-400 text-xs mt-1">{pErr.expiry}</p>}
                </div>
                <div>
                  <label className="block text-xs text-[#f0e6c8]/40 mb-1.5">CVV</label>
                  <input type="text" placeholder="123" maxLength={3} value={payment.cvv}
                    onChange={(e) => { const v = e.target.value.replace(/\D/g, ""); setPayment(p => ({...p, cvv: v})); setPErr(p => ({...p, cvv: ""})) }}
                    className={inputCls(pErr.cvv)} />
                  {pErr.cvv && <p className="text-red-400 text-xs mt-1">{pErr.cvv}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Review */}
          {step === 2 && (
            <div className="border border-white/10 rounded-xl p-6 bg-white/[0.02] flex flex-col gap-5">
              <h2 className="text-[#f0e6c8] font-semibold">Review Order</h2>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs text-[#f0e6c8]/30 uppercase tracking-widest">Shipping To</p>
                  <button onClick={() => setStep(0)} className="text-xs text-[#2ecc71] hover:underline">Edit</button>
                </div>
                <div className="border border-white/10 rounded-lg p-4 text-sm text-[#f0e6c8]/60">
                  <p className="text-[#f0e6c8] mb-1">{shipping.fullName}</p>
                  <p>{shipping.address}, {shipping.city} {shipping.zip}, {shipping.country}</p>
                  <p className="mt-1">{shipping.email}</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs text-[#f0e6c8]/30 uppercase tracking-widest">Payment</p>
                  <button onClick={() => setStep(1)} className="text-xs text-[#2ecc71] hover:underline">Edit</button>
                </div>
                <div className="border border-white/10 rounded-lg p-4 text-sm text-[#f0e6c8]/60">
                  {payment.cardName} — •••• {payment.cardNumber.slice(-4)}
                </div>
              </div>

              <div>
                <p className="text-xs text-[#f0e6c8]/30 uppercase tracking-widest mb-2">Items</p>
                <div className="flex flex-col gap-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 border border-white/10 rounded-lg p-3">
                      <img src={item.image} alt={item.title} className="w-10 h-10 object-contain bg-white/5 rounded p-1" />
                      <p className="flex-1 text-[#f0e6c8]/70 text-sm line-clamp-1">{item.title} ×{item.quantity}</p>
                      <p className="text-[#2ecc71] text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-5">
            {step > 0 ? (
              <button onClick={() => setStep((s) => s - 1)} className="px-5 py-2.5 rounded-lg border border-white/15 text-sm text-[#f0e6c8]/60 hover:text-[#f0e6c8] hover:border-white/30 transition-colors">
                ← Back
              </button>
            ) : <div />}

            {step < 2 ? (
              <button onClick={handleNext} className="px-6 py-2.5 rounded-lg bg-[#2ecc71] text-[#0d1f0f] text-sm font-semibold hover:bg-[#2ecc71]/90 transition-colors">
                Continue →
              </button>
            ) : (
              <button onClick={handlePlace} disabled={loading} className="px-6 py-2.5 rounded-lg bg-[#2ecc71] text-[#0d1f0f] text-sm font-semibold hover:bg-[#2ecc71]/90 transition-colors disabled:opacity-50 flex items-center gap-2">
                {loading ? (
                  <><div className="w-4 h-4 border-2 border-[#0d1f0f]/30 border-t-[#0d1f0f] rounded-full animate-spin" /> Placing...</>
                ) : `Place Order · $${grandTotal.toFixed(2)}`}
              </button>
            )}
          </div>
        </div>

        {/* Summary sidebar */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="border border-white/10 rounded-xl p-5 bg-white/[0.02] sticky top-24">
            <p className="text-[#f0e6c8] font-semibold mb-4 text-sm">Summary</p>
            <div className="flex flex-col gap-2 text-xs text-[#f0e6c8]/50 mb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between gap-2">
                  <span className="line-clamp-1 flex-1">{item.title} ×{item.quantity}</span>
                  <span className="shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 pt-3 flex flex-col gap-2 text-sm">
              <div className="flex justify-between text-xs">
                <span className="text-[#f0e6c8]/40">Subtotal</span>
                <span className="text-[#f0e6c8]/70">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#f0e6c8]/40">Shipping</span>
                <span className="text-[#2ecc71]">{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#f0e6c8]/40">Tax</span>
                <span className="text-[#f0e6c8]/70">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold pt-2 border-t border-white/10">
                <span className="text-[#f0e6c8]">Total</span>
                <span className="text-[#2ecc71]">${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}