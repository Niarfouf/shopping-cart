import Card from './Card'
export default function Cart({
    cartItems,
    cartInfo,
    handleCart,
    deleteCartItems,
}) {
    return (
        <>
            <div className={cartInfo === 'yes' ? 'show cart' : 'cart'}>
                <button onClick={handleCart}>x</button>
                {Object.entries(cartItems).map((item) => {
                    return (
                        <Card
                            key={item[0]}
                            item={item[1].item}
                            addItemInList={deleteCartItems}
                            quantity={item[1].quantity}
                        ></Card>
                    )
                })}
                <div className="total-cart">
                    {Object.entries(cartItems).map((item) => {
                        return (
                            <div key={item[0]}>
                                {item[1].quantity} items x {item[1].item.price}{' '}
                                € = {item[1].quantity * item[1].item.price} €
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
