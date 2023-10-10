import { useState, useEffect } from 'react'
import axios from 'axios'

type Props = {
    id: string
}

type Product = {
    id: string
    name: string
    price: number
    desc: string
}

const Product: React.FC<Props> = ({ id }) => {
    const [product, setProduct] = useState<Product | null | undefined>(undefined)

    const fetchProduct = async (id: string) => {
        try {
            const response = await axios.get(`/api/product/${id}`)
            setProduct(response.data)
        } catch (e) {
            console.error(e)
            setProduct(null)
        }
    }

    useEffect(() => {
        fetchProduct(id)
    }, [id])

    if (product === undefined) {
        return "제품 정보를 받아오는 중입니다."
    }

    return (
        <>
            {product !== null && (
                <details>
                    <summary>{`이름 : ${product.name}`}</summary>
                    <p>{`가격 : ${product.price}`}</p>
                    <p>{`설명 : ${product.desc}`}</p>
                </details>
            )}
            {product === null && (
                <h1>{'제품정보를 받아오는 데 실패하였습니다'}</h1>
            )}
        </>
    )
}

export default Product