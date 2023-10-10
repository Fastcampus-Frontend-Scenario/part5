type Props = {
    users: Array<string>
}

const DataLists: React.FC<Props> = ({ users })=> {
    return (
        <div>
            {users.map(user => (<p key={user} className='single_user'>{user}</p>))}
        </div>
    )
}

export default DataLists