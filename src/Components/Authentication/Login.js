import { Alert, Button, Chip, Divider, FormControl, IconButton, Input, InputAdornment, InputLabel, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { Box } from '@mui/system';
import endpoints from '../../config/endpoints';
import './Authentication.css';

export default function Login() {

    const [toDashboard, setToDashboard] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState({isError: false, message: ''});


    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handlePasswordUpdate = () => (e) => {
        setPassword(e.target.value);
    }
    const handleEmailUpdate = () => (e) => {
        setEmail(e.target.value);
    }

    const verifyUserLogin = async () => {
        setError({isError: false , message: ''});
        const response = await fetch(`${endpoints.NODE_SERVER}${endpoints.LOGIN}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password,
                email
            })
        });
        const data = await response.json();
        if(data.success){
            localStorage.setItem('authToken', data.token);
            setToDashboard(true);
        } else {
            console.log(data.message)
            setError({isError: true , message: data.error});
        }
    };



    if(toDashboard) {
        return <Redirect to='/'/>
    }



        return (
            <>
            <Box className="container"
                >
                <Box
                    component="login-form"
                    noValidate
                    autoComplete="off"
                    >
                    <Typography variant="h4" component="div" className="header"
                                >
                            Login 
                    </Typography>
                    <div>
                    <FormControl className = "inputField" variant="standard">
                        <InputLabel htmlFor="email">
                        Email
                        </InputLabel>
                        <Input
                        id="email"
                        onChange={handleEmailUpdate()}
                        startAdornment={
                            <InputAdornment position="start">
                                <AlternateEmailIcon />
                            </InputAdornment>
                        }
                        />
                    </FormControl>
                    </div>
                    <div>
                    <FormControl className = "inputField" variant="standard">
                        <InputLabel htmlFor="user-password">Password</InputLabel>
                            <Input
                                id="user-password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={handlePasswordUpdate()}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                startAdornment={
                                    <InputAdornment position="start">
                                        <VpnKeyIcon />
                                    </InputAdornment>
                                }
                        />
                    </FormControl>
                    </div>
                    <div>

                        <Button 
                            className = "button"
                            onClick={() => verifyUserLogin()} 
                            variant="contained" color="primary">
                            Login
                        </Button>
                        {error.isError && <Alert severity="error">{error.message}</Alert>}
                        <Typography variant="overline" component="div" 
                                    className="header">
                                Forgot Password? <Link to="/forgot-password">Reset Password</Link> 
                        </Typography>

                    </div>
                    <Divider className= "divider"><Chip label="OR" /></Divider>
                    <div>
                        <Typography variant="h6" component="div" 
                                className="header">
                            Don't have a account 
                       </Typography>
                        <Link to="/sign-up">
                            <Button
                                className = "button"
                                variant="text" color="primary">
                                sign-up here
                            </Button>
                        </Link>
                    </div>
                </Box>
            
            
            </Box>
            </>
        )
}
