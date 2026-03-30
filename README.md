#  ForestLuxe — React E-Commerce Store

A modern, minimal e-commerce store built with React, Vite, and Tailwind CSS. Features a clean dark theme with a Forest Luxe color palette.

---




---

##  Features

-  Browse and search products from a live API
- Filter by category and sort by price, rating, or name
-  Persistent cart with quantity controls (saved to localStorage)

---

##  Features

-  Browse and search products from a live API
- Filter by category and sort by price, rating, or name
-  Persistent cart with quantity controls (saved to localStorage)
-  Protected checkout — login required
-  Simulated auth with localStorage persistence
-  Product details with Overview, Reviews, and Specifications tabs
-  Fully responsive on mobile, tablet, and desktop
-  Fast dev experience with Vite

---

##  Tech Stack

| Tool | Purpose |
|---|---|
| [React 18](https://react.dev/) | UI library |
| [Vite](https://vitejs.dev/) | Build tool |
| [React Router v6](https://reactrouter.com/) | Client-side routing |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling |
| [Axios](https://axios-http.com/) | HTTP requests |
| [Context API](https://react.dev/reference/react/createContext) | Global state management |
| [FakeStore API](https://fakestoreapi.com/) | Product data |



---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/forest-luxe-store.git
cd forest-luxe-store

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---


--


---

##  API

Product data is fetched from [FakeStore API](https://fakestoreapi.com/).

```
GET https://fakestoreapi.com/products         — All products
GET https://fakestoreapi.com/products/:id     — Single product
GET https://fakestoreapi.com/products?limit=4 — Featured (4 items)
```

---


##  What I Learned

- **Component-based architecture** — breaking UI into small reusable pieces
- **React Router v6** — dynamic routes, nested routes, protected routes
- **Context API** — managing global state without prop drilling
- **Controlled components** — forms with React state and validation
- **useEffect + axios** — fetching data from an API with loading/error states
- **localStorage** — persisting cart and auth state across sessions
- **Responsive design** — mobile-first layouts with Tailwind CSS

---

