import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Card from './Card'

export default function Shop() {
    const { category } = useParams()
    const [items, setItems] = useState([])
    useEffect(() => {
        async function fetchItems() {
            try {
                const response = await fetch(
                    `https://fakestoreapi.com/products/category/${category}?limit=8`
                )
                const data = await response.json()
                setItems(data)
            } catch (e) {
                console.error(e)
            }
        }
        fetchItems()
    }, [category])

    return (
        <>
            <h1>test shop</h1>
            <div className="item-cards">
                {items.map((item) => {
                    return (
                        <Card
                            key={item.id}
                            title={item.title}
                            price={item.price}
                            description={item.description}
                            imageUrl={item.image}
                        ></Card>
                    )
                })}
            </div>
        </>
    )
}
