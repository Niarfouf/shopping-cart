import Card from './Card'
export default function Cart({
    cartItems,

    deleteCartItems,
}) {
    return (
        <>
            <div className="shop">
                <h2>Cart</h2>
                <div className="item-cards">
                    {Object.entries(cartItems).map((item) => {
                        return (
                            <Card
                                key={item[0]}
                                item={item[1].item}
                                addItemInList={deleteCartItems}
                                quantity={item[1].quantity}
                                action={'Update'}
                            ></Card>
                        )
                    })}
                </div>
            </div>
            <div className="total-cart">
                <p className="total-price">
                    Total price ={' '}
                    {Object.entries(cartItems).reduce(
                        (acc, current) =>
                            acc +
                            Math.round(
                                current[1].quantity *
                                    current[1].item.price *
                                    100
                            ) /
                                100,
                        0
                    )}{' '}
                    €
                </p>
                <button className="confirm-cart">Confirm</button>
            </div>
        </>
    )
}
