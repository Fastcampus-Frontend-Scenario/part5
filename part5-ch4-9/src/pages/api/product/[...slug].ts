import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    let { param } = req.query
    const id = Array.isArray(param) ? param[0] : param ?? ''

    // 이 데모 API 에서는  json을 바로 응답하도록 하겠습니다.
    res.status(200).json({
        id,
        name: '천원',
        price: 1000,
        desc: '천원지폐',
    })
}