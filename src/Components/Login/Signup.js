import { Button, FormControl, IconButton, Input, InputAdornment, InputLabel } from '@mui/material'
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { Box } from '@mui/system';

export default function Signup() {

    const [toLogin, setToLogin] = useState(false)
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleUserNameUpdate = () => (e) => {
        setUserName(e.target.value);
    }
    const handlePasswordUpdate = () => (e) => {
        setPassword(e.target.value);
    }
    const handleEmailUpdate = () => (e) => {
        setEmail(e.target.value);
    }

    const signUpUser = async () => {
        const response = await fetch(`http://localhost:5000/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName,
                password,
                email
            })
        });
        const data = await response.json();
        if(data.success){
            setToLogin(true);
        } else {
            console.log(data.message)
        }
    };

    if(toLogin) {
        return <Redirect to='/login'/>
    }

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
                <Box
                    component="signup-form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                    noValidate
                    autoComplete="off"
                    >
                    <h1> Sign Up</h1>
                    <div>
                    <FormControl variant="standard">
                        <InputLabel htmlFor="user-name">
                        User Name
                        </InputLabel>
                        <Input
                        id="user-name"
                        onChange={handleUserNameUpdate()}
                        value={userName}
                        startAdornment={
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        }
                        />
                    </FormControl>
                    </div>
                    <div>
                    <FormControl variant="standard">
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
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
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
                        onClick={() => signUpUser()} 
                        variant="contained" color="primary">
                        SignUp
                    </Button>
                    </div>
                </Box>
            </Box>
        </>
    )
}
