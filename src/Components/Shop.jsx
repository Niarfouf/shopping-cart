import { useParams } from 'react-router-dom'

import { useState, useEffect } from 'react'
import Card from './Card'

export default function Shop({ addCartItems }) {
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
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    return (
        <>
            <div className="shop">
                <h2>{capitalizeFirstLetter(category)}</h2>
                <div className="item-cards">
                    {items.map((item) => {
                        return (
                            <Card
                                key={item.id}
                                item={item}
                                addItemInList={addCartItems}
                                action={'Add'}
                            ></Card>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
