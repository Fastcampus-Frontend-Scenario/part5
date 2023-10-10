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
        name: '패스트캠퍼스',
        age: 20,
        address: '서울특별시 강남구 테헤란로 231 센터필드 6층',
    })
}