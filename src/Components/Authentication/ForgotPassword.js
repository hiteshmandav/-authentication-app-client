import { Alert, Button, Chip, Divider, FormControl, Input, InputAdornment, InputLabel, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import './Authentication.css';
import { Link } from 'react-router-dom';
import endpoints from '../../config/endpoints';

export default function ForgotPassword() {
    
    const [email, setEmail] = useState('');
    const [error, setError] = useState({isError: false, message: ''});
    const [sentSuccessfully, setsentSuccessfully] = useState(false);

    
    const handleEmailUpdate = () => (e) => {
        setEmail(e.target.value);
    }

    const validateEmail = (mail) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(mail).toLowerCase());
    }
    const sendRestPasswordMail = async () => {
        if(!email) {
            return setError({isError: true , message: 'Email cannot be blank'});
        }

        if( !validateEmail(email) ) {
            return setError({isError: true , message: 'Please enter a valid mail'});
        }

        setError({isError: false , message: ''});
        const response = await fetch(`${endpoints.NODE_SERVER}${endpoints.SEND_FORGOT_PASSWORD_MAIL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email
            })
        });
        const data = await response.json();
        if(data.success){
            setsentSuccessfully(true);
        } else {
            setError({isError: true , message: data.error});
        }

    }

    return (
        <>
            <Box className="container">
                <Typography variant="h4" component="div" className="header">
                    Forgot Password?
                </Typography>

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

                <div>
                        <Button 
                            className = "button"
                            onClick={() => sendRestPasswordMail()} 
                            variant="contained" color="primary">
                            send Reset Password Mail
                        </Button>
                    </div>
                    {error.isError && <Alert severity="error">{error.message}</Alert>}
                    {sentSuccessfully && <Alert severity="success">Password reset Mail sent to registered email id.</Alert>}

                    <Divider className= "divider"><Chip label="OR" /></Divider>
                    <div>
                        <Typography variant="overline" component="div" 
                                className="content">
                            If you remember your password 
                       </Typography>
                        <Link to="/">
                            <Button
                                className = "button"
                                variant="text" color="primary">
                                Then Login here
                            </Button>
                        </Link>
                    </div>
            </Box>
        </>
    )
}
