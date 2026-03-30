import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"

export default function Cart() {
  const { cartItems, removeFromCart, increaseQty, decreaseQty, cartTotal, clearCart } = useCart()
  const { user } = useAuth()

  const shippingCost = cartTotal > 50 ? 0 : 4.99
  const tax = cartTotal * 0.08
  const grandTotal = cartTotal + shippingCost + tax

  if (cartItems.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-24 text-center">
        <p className="text-4xl mb-4">🛒</p>
        <h2 className="text-xl font-semibold text-[#f0e6c8] mb-2">Your cart is empty</h2>
        <p className="text-[#f0e6c8]/40 text-sm mb-8">Add some products to get started</p>
        <Link
          to="/products"
          className="inline-block px-6 py-2.5 rounded-lg bg-[#2ecc71] text-[#0d1f0f] font-medium text-sm hover:bg-[#2ecc71]/90 transition-colors"
        >
          Shop Now
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-[#f0e6c8]">Cart</h1>
        <button onClick={clearCart} className="text-xs text-[#f0e6c8]/30 hover:text-[#f0e6c8]/60 transition-colors">
          Clear all
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Items */}
        <div className="flex-1 flex flex-col gap-3">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4 items-center border border-white/10 rounded-xl p-4 bg-white/[0.02]">
              <Link to={`/products/${item.id}`} className="w-16 h-16 bg-white/5 rounded-lg flex items-center justify-center shrink-0">
                <img src={item.image} alt={item.title} className="w-full h-full object-contain p-1" />
              </Link>

              <div className="flex-1 min-w-0">
                <Link to={`/products/${item.id}`} className="text-[#f0e6c8] text-sm line-clamp-2 hover:text-[#2ecc71] transition-colors">
                  {item.title}
                </Link>
                <p className="text-[#2ecc71] text-sm font-medium mt-1">${item.price?.toFixed(2)}</p>
              </div>

              <div className="flex flex-col items-end gap-2 shrink-0">
                <button onClick={() => removeFromCart(item.id)} className="text-[#f0e6c8]/20 hover:text-[#f0e6c8]/50 text-xs transition-colors">
                  Remove
                </button>
                <div className="flex items-center border border-white/15 rounded-lg overflow-hidden">
                  <button onClick={() => decreaseQty(item.id)} className="px-2.5 py-1 text-sm text-[#f0e6c8]/50 hover:text-[#f0e6c8] hover:bg-white/5 transition-colors">−</button>
                  <span className="px-3 py-1 text-sm text-[#f0e6c8] border-x border-white/15 min-w-[2rem] text-center">{item.quantity}</span>
                  <button onClick={() => increaseQty(item.id)} className="px-2.5 py-1 text-sm text-[#f0e6c8]/50 hover:text-[#f0e6c8] hover:bg-white/5 transition-colors">+</button>
                </div>
                <span className="text-xs text-[#f0e6c8]/40">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="w-full lg:w-72 shrink-0">
          <div className="border border-white/10 rounded-xl p-6 bg-white/[0.02] sticky top-24">
            <h2 className="text-[#f0e6c8] font-semibold mb-5">Order Summary</h2>

            <div className="flex flex-col gap-2.5 text-sm mb-5">
              <div className="flex justify-between">
                <span className="text-[#f0e6c8]/50">Subtotal</span>
                <span className="text-[#f0e6c8]">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#f0e6c8]/50">Shipping</span>
                <span className="text-[#2ecc71]">{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#f0e6c8]/50">Tax (8%)</span>
                <span className="text-[#f0e6c8]">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold pt-2.5 border-t border-white/10">
                <span className="text-[#f0e6c8]">Total</span>
                <span className="text-[#2ecc71]">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {user ? (
              <Link
                to="/checkout"
                className="block w-full py-3 rounded-lg bg-[#2ecc71] text-[#0d1f0f] text-center text-sm font-semibold hover:bg-[#2ecc71]/90 transition-colors"
              >
                Checkout
              </Link>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  to="/login"
                  state={{ from: { pathname: "/checkout" } }}
                  className="block w-full py-3 rounded-lg bg-[#2ecc71] text-[#0d1f0f] text-center text-sm font-semibold hover:bg-[#2ecc71]/90 transition-colors"
                >
                  Sign In to Checkout
                </Link>
                <p className="text-center text-[#f0e6c8]/30 text-xs">Sign in required to checkout</p>
              </div>
            )}

            <Link
              to="/products"
              className="block w-full py-2.5 text-center text-[#f0e6c8]/40 text-sm hover:text-[#f0e6c8] transition-colors mt-2"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}