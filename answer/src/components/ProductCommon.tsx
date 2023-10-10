/* eslint-disable @next/next/no-img-element */
import styled from "@emotion/styled"
import { Chip } from "@mui/material"
import { useRouter } from "next/router"
import { useMemo } from "react"
import { Product } from "types/types"

type PriceType = 'DISCOUNT' | 'PRICE'
type Props = {
    priceType: PriceType
    product: Product
}
export const ProductCommon: React.FC<Props> = ({ product, priceType }) => {
    const router = useRouter()
    const discounted = product.discount / product.price * 100
    const PriceComponent = useMemo(() => {
        switch(priceType) {
            case 'DISCOUNT': 
                return <Chip label={`${discounted}%`} color='error' />
            case 'PRICE': 
                return (
                    <PriceContainer>{`₩${product.price.toLocaleString()}`}</PriceContainer>
                )
        }
    }, [product, priceType, discounted])
    const handleClick = () => {
        router.push(`/product/${product.productId}`)
    }
    return (
        <Container onClick={handleClick}>
            <img src={product.imageSrc} alt={product.name} style={{ marginBottom: 4 }}/>
            <Title>{product.name}</Title>
            {PriceComponent}
        </Container>
    )
}

const Container = styled.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 140,
    minHeight: 180,
})

const Title = styled.div({
    fontSize: 13,
    color: '#1c1c1c',
    marginBottom: 8
})

const PriceContainer = styled.div({
    fontSize: 13,
    color: '#8B96A5'
})