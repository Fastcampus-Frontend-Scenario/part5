import styled from "@emotion/styled"
import { Box } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useState } from "react";
import { useRouter } from "next/router";
export const SearchBar: React.FC = () => {
    const [value, setValue] = useState('')
    const router = useRouter()
    const handleSubmit = () => {
        const url = `/search?q=${value}`
        router.push(url)
    }
    return (
        <Container>
            <SearchBox>
                <SearchOutlinedIcon />
                <form onSubmit={handleSubmit} style={{flex: 1,}}>
                    <Input
                        placeholder="Search"
                        type='text'
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </form> 
                {Boolean(value.length) && <CloseIcon onClick={() => setValue('')}/>}
            </SearchBox>
        </Container>
    )
}

const Container = styled.div({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    background: '#ffffff'
})

const SearchBox = styled(Box)({
    display: 'flex',
    gap: '16px',
    flex: 1,
    alignItems: 'center',
    background: '#F7FAFC',
    borderRadius: 6,
    border: '1px solid #DEE2E7',
    padding: 8,
})

const Input = styled('input')({
    fontSize: 16,
    border: '0px',
    background: '#ffffff00',
    outline: 'none',
    flex: 1,
})