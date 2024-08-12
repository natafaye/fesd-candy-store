import { useEffect } from "react"
import { CartItem, Product } from "../types"
import CartItemRow from "./CartItemRow"

type Props = {
    cartItems: CartItem[]
    setCartItems: (newValue: CartItem[]) => void
    products: Product[]
}

export default function CartList({ cartItems, setCartItems, products }: Props) {
    useEffect(() => {
        const asyncFunction = async () => {
            const response = await fetch("http://localhost:3000/cart")
            const data = await response.json()
            setCartItems(data)
        }
        asyncFunction()
    }, [])

    return (
        <table className="table table-striped">
            <tbody>
                {cartItems.map(item => (
                    <CartItemRow
                        key={item.id}
                        item={item}
                        products={products}
                    />
                ))}
            </tbody>
        </table>
    )
}