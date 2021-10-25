import React, { useState } from 'react';
import { Box } from '@mui/system';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Alert, Button, FormControl, IconButton, Input, InputAdornment, InputLabel, Typography } from '@mui/material'
import { Link } from 'react-router-dom';
import endpoints from '../../config/endpoints';
import { useParams } from "react-router-dom";

export default function ResetNewPassword() {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState({isError: false, message: ''});
    const [updatedSuccessfully, setUpdatedSuccessfully] = useState(false);
    const { resetId } = useParams();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handlePasswordUpdate = () => (e) => {
        setPassword(e.target.value);
    }
    const handleConfirmPasswordUpdate = () => (e) => {
        setConfirmPassword(e.target.value);
    }

    const resetPassword = async () => {
        console.log(resetId)
        if(updatedSuccessfully) return setError({isError: true , message: 'Your password has already been reset using this link you can proceed to login.'})
        if( !password ) return setError({isError: true , message: 'Mandatory fields cannot be blank'});

        if(confirmPassword !== password ) return setError({isError: true , message: 'Confirm password should be same as password'});
        setError({isError: false , message: ''});


        const response = await fetch(`${endpoints.NODE_SERVER}${endpoints.RESET_PASSWORD}${resetId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password,
            })
        });
        const data = await response.json();
        if(data.success){
            setUpdatedSuccessfully(true);
        } else {
            setError({isError: true , message: data.error});
        }

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
                            Reset Password
                    </Typography>
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
                                        type='password'
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
                                onClick={() => resetPassword()} 
                                variant="contained" color="primary">
                                update password
                            </Button>
                        </div>
                    {error.isError && <Alert className = "alert-error" severity="error">{error.message}</Alert>}
                    <Typography variant="caption" display="block">
                        <span className="mandatory">*</span> are mandatory
                    </Typography>

                    {updatedSuccessfully && <div>
                        <Alert className = "alert-success" severity="success">Password was updated successfully you can now log in.</Alert>
                        <Link to="/login">
                            <Button
                                className = "button"
                                variant="text" color="primary">
                                login here
                            </Button>
                        </Link>
                        </div>}
                </Box>
            </Box>
        </>
    )
}
