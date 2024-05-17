import { Box, Container } from '@mui/material'
import * as React from 'react'

type LayoutProps = {
    children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({children}) => {
  return (
    <Box>
        <Container
            maxWidth="lg"
            sx={{
                mt: 4, mb: 4,
            }}
        >
            {children}
        </Container>
    </Box>
  )
}
