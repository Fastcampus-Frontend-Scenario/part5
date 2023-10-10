// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { BannerResponse } from 'types/types'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<BannerResponse>
) {
    res.status(200).json({
        result: 'OK',
        data: {
            imageSrc: '/assets/banner.png',
		    url: '/electronic?order=favor'
        }
    })
}
