// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    res.status(200).json({
        result: 'OK',
        data: {
            categories: ['모든 카테고리', '전자제품', '의류', '악세사리', '기타']
        }
    }
)
}
