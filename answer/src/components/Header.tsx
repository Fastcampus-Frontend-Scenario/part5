import { Box, Drawer } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useState } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
export const Header: React.FC = () => {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const onMenuClick = () => {
        // TODO: show sidebar
    }
    return (
        <Container>
            <MenuIcon onClick={() => setOpen(true)} data-testid='menu-button' />
            <Box gap={'20px'} display={'flex'}>
                <ShoppingCartOutlinedIcon data-testid='cart-button' onClick={() => router.push('/cart')}/>
                <PersonOutlinedIcon data-testid='mypage-button' onClick={() => router.push('/mypage')} />
            </Box>
            <Drawer
                anchor={'left'}
                open={open}
                onClose={() => setOpen(false)}
                style={{
                    width: '600px'
                }}
                role='menubar'
            >
                {'drawer'}
            </Drawer>
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