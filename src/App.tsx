import { useState } from "react";
import CartList from "./components/CartList";
import ProductList from "./components/ProductList";
import type { CartItem, Product } from "./types";

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [products, setProducts] = useState<Product[]>([])

  return (
    <div className="container mt-3">
      <h2 className="display-5 mb-4">Cart</h2>
      <CartList
        cartItems={cartItems}
        setCartItems={setCartItems}
        products={products}
      />
      <h2 className="display-5 mb-4">Craving Something Sweet?</h2>
      <ProductList
        cartItems={cartItems}
        setCartItems={setCartItems}
        products={products}
        setProducts={setProducts}
      />
    </div>
  )
}