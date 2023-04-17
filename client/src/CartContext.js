import axios from "axios";
import { createContext, useState } from "react";

export const CartContext = createContext({
    items: [],
    getProductQuantity: () => {},
    addOneToCart: () => {},
    removeOneFromCart: () => {},
    deleteFromCart: () => {},
    getTotalCost: () => {}
});

export function CartProvider({children}) {

    const [cartProducts, setCartProducts] = useState([]);
    const [deletedId, setDeletedId] = useState("123")
    
    function getProductQuantity(id) {
        const quantity = cartProducts.find(product => product.id === id)?.quantity;
        
        if (quantity === undefined) {
            return 0;
        }

        return quantity;
    }

    function addOneToCart(id, newCart, posted) {
        const quantity = getProductQuantity(id);

        // if (quantity === 0) {
        if (posted) {

            axios.post("/cart", newCart)
            .then(res => console.log(res.data))
            .catch(err => console.error(err))

            setCartProducts(
                [
                    ...cartProducts,
                    {
                        id: id,
                        quantity: 1
                    }
                ]
            )
        } else { 
            console.log("false")

            const upCount = {
                quantity: quantity + 1 
            }
            
            axios.patch(`cart/${id}`, upCount)
            .then(res => console.log(res.data))
            .catch(err => console.error(err))

            setCartProducts(
                cartProducts.map(
                    product =>
                    product.id === id                               
                    ? { ...product, quantity: product.quantity + 1 } 
                    : product                                        
                )
            )
        }
        // console.log("cartProducts after add to cart")
        // console.log(cartProducts)
    }

    function removeOneFromCart(id) {
        const quantity = getProductQuantity(id);

        if(quantity === 1) {
            deleteFromCart(id);
            axios.delete(`cart/${id}`)
            setDeletedId(id)
        } else {
            const downCount = {
                quantity: quantity -1 
            }
            axios.patch(`cart/${id}`, downCount)
            // axios.put(`cart/6436f502b5948774c03dbc0c`, downCount)
            setCartProducts(
                cartProducts.map(
                    product =>
                    product.id === id                                
                    ? { ...product, quantity: product.quantity - 1 } 
                    : product                                       
                )
            )
        }
    }

    function deleteFromCart(id) {

        axios.delete(`cart/${id}`)

        setDeletedId(id)

        setCartProducts(
            cartProducts =>
            cartProducts.filter(currentProduct => {
                return currentProduct.id !== id;
            })  
        )
    }

    // function getTotalCost() {
    //     let totalCost = 0;
    //     cartProducts.map((cartItem) => {
    //         const productData = getProductData(cartItem.id);
    //         totalCost += (productData.price * cartItem.quantity);
    //     });
    //     return totalCost;
    // }

    const contextValue = {
        items: cartProducts,
        deletedId,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        // getTotalCost
    }

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;


// CODE DOWN HERE

// Context (cart, addToCart, removeCart)
// Provider -> gives your React app access to all the things in your context