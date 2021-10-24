import { Alert, Button, Chip, Divider, FormControl, IconButton, Input, InputAdornment, InputLabel, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { Box } from '@mui/system';
import endpoints from '../../config/endpoints';
import './Authentication.css';

export default function Signup() {

    const [toVerifyEmail, setToVerifyEmail] = useState(false);
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState({isError: false, message: ''});

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
    const handleConfirmPasswordUpdate = () => (e) => {
        setConfirmPassword(e.target.value);
    }
    const handleEmailUpdate = () => (e) => {
        setEmail(e.target.value);
    }

    const validateEmail = (mail) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(mail).toLowerCase());
    }

    const signUpUser = async () => {

        if( !userName || !email || !password ) {
            return setError({isError: true , message: 'Mandatory fields cannot be blank'});
        }

        if( !validateEmail(email) ) {
            return setError({isError: true , message: 'Please enter a valid mail'});
        }

        if(confirmPassword !== password ) {
            return setError({isError: true , message: 'Confirm password should be same as password'});
        }
        setError({isError: false , message: ''});
        const response = await fetch(`${endpoints.NODE_SERVER}${endpoints.REGISTER}`, {
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
            localStorage.setItem('authToken', data.token);
            setToVerifyEmail(true);
        } else {
            setError({isError: true , message: data.error});
        }
    };

    if(toVerifyEmail) {
        return <Redirect to='/verify-email'/>
    }

    return (
        <>
            <Box className="container">
                <Box
                    component="sign-form"
                    noValidate
                    autoComplete="off"
                    >
                    <Typography variant="h4" component="div" className="header"
                                >
                            Sign Up 
                    </Typography>
                    <div>
                    <div>
                        <FormControl className = "inputField" variant="standard">
                            <InputLabel htmlFor="user-name">
                            Full Name <span className="mandatory">*</span>
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
                        <FormControl className = "inputField" variant="standard">
                            <InputLabel htmlFor="email">
                            Email <span className="mandatory">*</span>
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
                            <InputLabel htmlFor="user-password">Password <span className="mandatory">*</span></InputLabel>
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
                        <Typography className="hint" variant="caption" display="block">
                            Password should be atleast 6 characters long
                        </Typography>
                    </div>
                    <div>
                        <FormControl className = "inputField" variant="standard">
                            <InputLabel htmlFor="confirm-password">Confirm Password <span className="mandatory">*</span></InputLabel>
                                <Input
                                    id="user-confirm-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordUpdate()}
                                    // endAdornment={
                                    // <InputAdornment position="end">
                                    //     <IconButton
                                    //     aria-label="toggle password visibility"
                                    //     onClick={handleClickShowPassword}
                                    //     onMouseDown={handleMouseDownPassword}
                                    //     >
                                    //     {showPassword ? <VisibilityOff /> : <Visibility />}
                                    //     </IconButton>
                                    // </InputAdornment>
                                    // }
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
                            onClick={() => signUpUser()} 
                            variant="contained" color="primary">
                            sign-up
                        </Button>
                    </div>
                    {error.isError && <Alert severity="error">{error.message}</Alert>}
                    <Typography variant="caption" display="block">
                        <span className="mandatory">*</span> are mandatory
                    </Typography>

                    <Divider className= "divider"><Chip label="OR" /></Divider>
                    <div>
                        <Typography variant="h6" component="div" 
                                className="header">
                            Already have an account
                       </Typography>
                        <Link to="/login">
                            <Button
                                className = "button"
                                variant="text" color="primary">
                                login here
                            </Button>
                        </Link>
                    </div>
                </Box>
            
            
            </Box>
        </>
    )
}
