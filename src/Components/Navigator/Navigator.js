import React, {useState} from 'react';

// import { Redirect } from 'react-router';

// Material imports
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';
import { Menu, MenuItem } from '@mui/material';

export default function Navigator({isLoggedIn, setIsLoggedIn, props}) {
    const [anchorEl, setAnchorEl] = useState(null);
    // const [toWelcome, setToWelcome] = useState(false);
    // const [toSignUp, setToSignUp] = useState(false);
    // const [toLogin, setToLogin] = useState(false);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logoutUser = () => {
        // isLoggedIn = false;
        setIsLoggedIn(false)
        // setToWelcome(true)
        props.history.push('/')
        // return <Redirect to='/'/>
    }

    // const redirectToSignUp = () => {
    //     setToSignUp(true);
    // }

    // const redirectToLogin = () => {
    //     setToLogin(true);
    // }

    // if(toWelcome) return <Redirect to='/login'/>

    // if(toSignUp) return <Redirect to='/sign-up'/>

    // if(toLogin) return <Redirect to='/login'/>

    
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                    {/* <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Task Manager
                    </Typography>
                    
                    {!isLoggedIn && <Link to='/sign-up' color="inherit">
                        <Button color="white">Signup</Button>
                    </Link>}

                    {!isLoggedIn && <Link to='/login' color="inherit">
                        <Button color="white">Login</Button>
                    </Link>}

                    {isLoggedIn && 
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                <MenuItem onClick={() => logoutUser()}>Logout</MenuItem>
                            </Menu>
                        </div>}
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}
