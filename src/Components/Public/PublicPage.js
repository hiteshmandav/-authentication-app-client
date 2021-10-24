import React from 'react'

import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';

export default function PublicPage() {
    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    height: '90vh',
                    display: 'grid',
                    alignContent: 'center',
                    justifyItems: 'center',
                    backgroundColor: 'ghostwhite'
                }}
                >
                    <Typography variant="h4" component="div" 
                                sx={{ 
                                      maxWidth: '50vw',
                                      textAlign: 'center' 
                                    }}>
                        Welcome to Task Manager login to access your account.
                    </Typography>
                </Box>
        </>
    )
}
