// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { TimeDealResponse } from 'types/types'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<TimeDealResponse>
) {
    const curr = new Date()
    curr.setHours(curr.getHours() + 1)
    res.status(200).json({
        result: 'OK',
        data: {
            items: [
                { productId: '1', name: '옷', price: 30000, discount: 3000, imageSrc: '/assets/cloth.png' },
                { productId: '2', name: '이어폰', price: 100000, discount: 25000, imageSrc: '/assets/earphone.png' },
                { productId: '3', name: '노트북', price: 1000000, discount: 250000, imageSrc: '/assets/notebook.png' }
            ],
            dealEnded: curr.toString()
        }
    })
}
