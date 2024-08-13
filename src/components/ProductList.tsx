import { useEffect, useState } from "react"
import type { CartItem, Product } from "../types"

type Props = {
    cartItems: CartItem[]
    setCartItems: (newValue: CartItem[]) => void
    products: Product[]
    setProducts: (newValue: Product[]) => void
}

export default function ProductList({
    setCartItems, cartItems, products, setProducts
}: Props) {
    const [isLoading, setIsLoading] = useState(false)
    const [isAddingToCart, setIsAddingToCart] = useState(false)
    const [error, setError] = useState<null | string>(null)

    // after the first render, we want to go and get the data, 
    // then render again with the data
    useEffect(() => {
        const asyncFunction = async () => {
            setIsLoading(true)
            try {
                const response = await fetch("http://localhost:3000/products")
                if (!response.ok) {
                    setError("Oops! There was an error: " + response.statusText)
                } else {
                    const data = await response.json()
                    setProducts(data)
                    setError(null)
                }
            } catch (error: any) {
                setError("Oops! There was an error: " + error.message)
            }
            setIsLoading(false)
        }
        asyncFunction()
    }, []) // run once after the first render (twice in dev mode) 

    const addToCart = async (productId: number) => {
        const newCartItem = {
            productId: productId,
            amount: 1
        }
        // make the change on the backend
        setIsAddingToCart(true)
        try {
            const response = await fetch("http://localhost:3000/cart", {
                method: "POST",
                body: JSON.stringify(newCartItem),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (!response.ok) {
                setError(response.statusText)
            } else {
                const newlyCreatedItem = await response.json() // this will have an id
                // make the change on the frontend
                setCartItems([...cartItems, newlyCreatedItem])
            }
        } catch (error: any) {
            setError(error.message)
        }
        setIsAddingToCart(false)
    }

    return (
        <div className="d-flex flex-wrap gap-3">
            {isLoading && <p className="text-body-tertiary">Loading...</p>}
            {error && <p className="text-danger">{error}</p>}
            {products.map(product => (
                <div className="card flex-grow-1" key={product.id}>
                    <div className="card-body">
                        <h3 className="card-title">{product.name}</h3>
                        <p className="card-text">{product.brand}</p>
                        <button
                            className="btn btn-success"
                            disabled={isAddingToCart}
                            onClick={() => addToCart(product.id)}
                        >
                            {isAddingToCart ? "Adding..." :
                                "$" + product.price.toFixed(2)}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}