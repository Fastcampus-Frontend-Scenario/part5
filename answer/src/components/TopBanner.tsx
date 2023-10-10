import axios from "axios"
import { useRouter } from "next/router"
import { BannerResponse } from "types/types"
import { useEffect, useState } from "react"

export const TopBanner = () => {
    const [banner, setBanner] = useState<BannerResponse | null>(null)
    const router = useRouter()

    const fetchBanner = async () => {
        const response = await axios.get<BannerResponse>('/api/ad-banner')
        const bannerData = response.data
        setBanner(bannerData)
    }
    useEffect(() => {
        void fetchBanner()
    }, [])
    const handleClick = () => {
        if (banner?.data?.url)
            router.push(banner?.data?.url)
    }
    if (!Boolean(banner) || banner?.result !== 'OK') return null

    return (
        // eslint-disable-next-line @next/next/no-img-element
        <div data-testid='top-banner-container'>
            <img src={banner.data?.imageSrc} onClick={handleClick} alt='ad-banner' data-testid='top-banner' />
        </div>
    )
}