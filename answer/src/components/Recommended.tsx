import styled from "@emotion/styled"
import { Title } from "./Title"
import axios from "axios"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { RecommendedResponse } from "types/types"
import { ProductCommon } from "./ProductCommon"

export const Recommended: React.FC = () => {
    const [recommended, setRecommended] = useState<RecommendedResponse | null>(null)
    const router = useRouter()

    const fetcRecommended = async () => {
        const response = await axios.get<RecommendedResponse>('/api/recommended')
        const data = response.data
        setRecommended(data)
    }
    useEffect(() => {
        void fetcRecommended()
    }, [])

    if (!Boolean(recommended) || recommended?.result !== 'OK') return null
    return (
        <Container data-testid='recommended'>
            <Title>추천 제품들</Title>
            <ProductsContainer data-testid='recommended-product-list'>
                {recommended?.data.productList.map((product)=> {
                    return (
                        <ProductItem key={product.productId}>
                            <ProductCommon priceType='PRICE' product={product}/>
                        </ProductItem>
                    )
                })}
            </ProductsContainer>
        </Container>
    )
}

const Container = styled.div({
    display: 'flex',
    flexDirection: 'column',
    padding: 6,
    flex: 1,
})

const ProductsContainer = styled.div({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
})

const ProductItem = styled.div({
    display: 'flex',
    borderRadius: 6,
    border: '1px solid #DEE2E7',
    margin: 4,
    background: '#ffffff'
})
