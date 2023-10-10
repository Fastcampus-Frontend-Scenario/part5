import { useState, useEffect } from "react"

type Props = {
    id: string
}

type User = {
    id: string
    name: string
    age: number
    address: string
}

const User: React.FC<Props> = ({ id }) => {
    const [user, setUser] = useState<User | null | undefined>(undefined)

    const fetchUserData = async (id: string) => {
        try {
            const response = await fetch(`/api/user/${id}`)
            setUser(await response.json())
        } catch (e) {
            setUser(null)
        }
    }

    useEffect(() => {
        fetchUserData(id)
    }, [id])

    if (user === undefined) {
        return "유저 정보를 받아오는 중입니다."
    }

    return (
        <>
            {user !== null && (
                <details>
                    <summary>{`이름 : ${user.name}`}</summary>
                    <p>{`나이 : ${user.age}`}</p>
                    <p>{`주소 : ${user.address}`}</p>
                </details>
            )}
            {user === null && (
                <h1>{'유저정보를 받아오는 데 실패하였습니다'}</h1>
            )}
        </>
    )
}

export default User