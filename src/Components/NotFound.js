import React, { useState, useEffect } from 'react'
import { Link, Button, Chip, Divider, FormControl, Input, InputAdornment, InputLabel, Typography } from '@mui/material';
import { Box } from '@mui/system';
import '../App.css'

export default function NotFound() {
    
    const [loggedIn, setloggedIn] = useState(false);
    
    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if(authToken) setloggedIn(true);
    }, [])


    return (
        <>
            <Box className="container">
                <Typography variant="overline" component="div" 
                        className="header">
                    Whoops! Looks like you have arrived at a link that doesnot exist... 
                </Typography>
                {loggedIn && <Typography variant="overline" component="div" 
                        className="content">
                    You can go to <Link href="/">Action center</Link> 
                </Typography>}

                {!loggedIn && <Typography variant="overline" component="div" 
                        className="content">
                    Looks linke you are not logged in so please Login first <Link href="/login">Login</Link> 
                </Typography>}

                <img className="image" src="/assests/404.png" alt="even this is not found you did somthing really wrong"></img>
            </Box>
        </>
    )
}
