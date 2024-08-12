import { useEffect } from "react"
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

    // after the first render, we want to go and get the data, 
    // then render again with the data
    useEffect(() => {
        const asyncFunction = async () => {
            const response = await fetch("http://localhost:3000/products")
            const data = await response.json()
            setProducts(data)
        }
        asyncFunction()
    }, []) // run once after the first render (twice in dev mode) 

    const addToCart = async (productId: number) => {
        const newCartItem = {
            productId: productId,
            amount: 1
        }
        // make the change on the backend
        const response = await fetch("http://localhost:3000/cart", {
            method: "POST",
            body: JSON.stringify(newCartItem),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const newlyCreatedItem = await response.json() // this will have an id
        // make the change on the frontend
        setCartItems( [...cartItems, newlyCreatedItem] )
    }

    return (
        <div className="d-flex flex-wrap gap-3">
            {products.map(product => (
                <div className="card flex-grow-1" key={product.id}>
                    <div className="card-body">
                        <h3 className="card-title">{product.name}</h3>
                        <p className="card-text">{product.brand}</p>
                        <button
                            className="btn btn-success"
                            onClick={() => addToCart(product.id)}
                        >
                            ${product.price.toFixed(2)}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}