import { Alert, Button, Chip, Divider, Typography } from '@mui/material';
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import endpoints from '../../config/endpoints';

export default function VerifyEmail() {

    const [toDashboard, setToDashboard] = useState(false);
    const [error, setError] = useState({isError: false, message: ''});
    const [sentSuccessfully, setsentSuccessfully] = useState(false);

    
    const sendVerificationMail = async () =>{

        const authToken = localStorage.getItem('authToken');
        console.log(`authToken :: ${authToken}`)
        if(!authToken) return setError({isError: true , message: 'Authentication Error Login First.'});

        const response = await fetch(`${endpoints.NODE_SERVER}${endpoints.SEND_VERIFY_ACCOUNT_MAIL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        });
        const data = await response.json();
        if(data.success){
            setsentSuccessfully(true);
            setTimeout(function(){ setToDashboard(true) }, 3000);
            ;
        } else {
            setError({isError: true , message: data.error});
        }
    }

    if(toDashboard) {
        return <Redirect to='/'/>
    }
    return (
        <>
            <Box className="container">
                <Typography variant="h4" component="div" className="header">
                    Please Verify your Account
                </Typography>
                <Typography variant="h6" component="div" className="content">
                    To Access all features you need to verify your account.
                </Typography>
                <Typography variant="overline" component="div" className="note">
                    Note: To verify your account a verification mail will be sent on your registered email id. 
                </Typography>

                <div>
                        <Button 
                            className = "button"
                            onClick={() => sendVerificationMail()} 
                            variant="contained" color="primary">
                            send Verification Mail
                        </Button>
                    </div>
                    {error.isError && <Alert severity="error">{error.message}</Alert>}
                    {sentSuccessfully && <Alert severity="success">Mail sent to registered email id. Redirecting to Dashboard....</Alert>}

                    <Divider className= "divider"><Chip label="OR" /></Divider>
                    <div>
                        <Typography variant="h6" component="div" 
                                className="content">
                            You may choose to skip this step and login for now but you will have limted access till you verify your account.
                       </Typography>
                        <Link to="/">
                            <Button
                                className = "button"
                                variant="text" color="primary">
                                Skip and Login
                            </Button>
                        </Link>
                    </div>
            </Box>
        </>
    )
}
