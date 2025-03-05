import { useState, useEffect } from "react"
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db } from "./data/db"

function App() {

    const [data, setData] = useState(db)
    const [cart, setCart] = useState([])

    const max_items = 5
    const min_items = 1

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    function addToCart(item) {

        const itemExists = cart.findIndex(guitar => guitar.id === item.id)
        if (itemExists >= 0) { // Existe en el carrito
            if (cart[itemExists].quantity >= max_items) return
            const updateCart = [...cart] // Copia del carrito
            updateCart[itemExists].quantity ++ // Actualizamos la cantidad
            setCart(updateCart) // Actualizamos el carrito
        } else {
            item.quantity = 1 // Agregamos la cantidad
            setCart([...cart, item]) // Actualizamos el carrito
        }
    }

    function removeFromCart(id) { // Si pasamos algo por parametro, en el onclick debemos ponerlo como funcion
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }

    function increaseQuantity(id) {
        const updateCart = cart.map( item => {
            if (item.id === id && item.quantity < max_items) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        setCart(updateCart)
    }

    function decreaseQuantity(id) {
        const updateDecreaseCart = cart.map ( item => {
            if (item.id === id && item.quantity > min_items) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        setCart(updateDecreaseCart)
    }

    function cleanCart() {
        setCart([])
    }

    return (
        <>
            <Header
                // Prop y Valor
                cart={cart}
                removeFromCart={removeFromCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                cleanCart={cleanCart}
            />

            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">
                    {data.map((guitar) => (
                        // console.log(guitar),
                        <Guitar
                            key={guitar.id}
                            guitar={guitar}
                            setCart={setCart}
                            // cart={cart}
                            addToCart={addToCart}
                        />
                    ))}
                </div>
            </main>

            <footer className="bg-dark mt-5 py-5">
                <div className="container-xl">
                    <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados 2025 - Jonacode -</p>
                </div>
            </footer>
        </>
    )
}

export default App
