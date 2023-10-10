import axios from "axios"
import { useRouter } from "next/router"
import { BannerResponse, TimeDealResponse } from "types/types"
import { useEffect, useMemo, useState } from "react"
import styled from "@emotion/styled"
import { ProductCommon } from "./ProductCommon"
import { Divider } from "@mui/material"
import { Title } from "./Title"

export const TimeDeal = () => {
    const [deal, setDeal] = useState<TimeDealResponse | null>(null)
    const router = useRouter()

    const fetcDeals = async () => {
        const response = await axios.get<TimeDealResponse>('/api/timedeal')
        const dealData = response.data
        setDeal(dealData)
    }
    useEffect(() => {
        void fetcDeals()
    }, [])

    if (!Boolean(deal) || deal?.result !== 'OK') return null
    const { items, dealEnded } = deal.data

    return (
        <Container data-testid='time-deal'>
            <TitleContainer>
                <Title>타임  딜</Title>
                <TimerComponent end={new Date(dealEnded)}/>
            </TitleContainer>
            <Divider style={{width: '100%'}} />
            <ProductsContainer data-testid='time-deal-product-container'>
                {items.map(item => {
                    return (<ProductCommon product={item} priceType='DISCOUNT' key={item.productId} />)
                })}
            </ProductsContainer>
        </Container>
    )
}

type TimerComponentProps = {
    end: Date
}
const TimerComponent: React.FC<TimerComponentProps> = ({ end }) => {
    const current = new Date()
    const [seconds, setSeconds] = useState<number>(Math.round((end.getTime() - current.getTime()) / 1000))
    const router = useRouter()

    useEffect(() => {
        const countdown = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                clearInterval(countdown)
            }
        }, 1000);
        return () => clearInterval(countdown);
    }, [seconds]);

    const remainSecounds = useMemo(() => Math.floor(seconds % 3600 % 60).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    }), [seconds])
    const remainMinute = useMemo(() => Math.floor((seconds % 3600) / 60).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    }), [seconds])
    const remainHour = useMemo(() => Math.floor(seconds / 3600).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    }), [seconds])

    return (
        <TimerComponentContinaer>
            <TimeBlock><div style={{ fontSize: 16 }} data-testid='remain-hour'>{remainHour}</div><div style={{fontSize: 11}}>{'시간'}</div></TimeBlock>
            <TimeBlock><div style={{ fontSize: 16 }} data-testid='remain-min'>{remainMinute}</div><div style={{ fontSize: 11 }}>{'분'}</div></TimeBlock>
            <TimeBlock><div style={{ fontSize: 16 }} data-testid='remain-sec'>{remainSecounds}</div><div style={{ fontSize: 11 }}>{'초'}</div></TimeBlock>
        </TimerComponentContinaer>
    )
}

const Container = styled.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    background: '#ffffff'
})

const TitleContainer = styled.div({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
})


const ProductsContainer = styled.div({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    overflowY: 'auto'
})

const TimerComponentContinaer = styled.div({
    display: 'flex',
    flexDirection: 'row',
})

const TimeBlock = styled.div({
    display: 'flex',
    flexDirection: 'column',
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    background: '#EFF2F4',
    color: '#8B96A5',
    margin: 2,
})