import { Alert, Button, Typography } from '@mui/material';
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import endpoints from '../../config/endpoints';
import { useParams } from "react-router-dom";

export default function VerifyAccount() {

    
    const [toDashboard, setToDashboard] = useState(false);
    const [error, setError] = useState({isError: false, message: ''});
    const [loggedIn, setloggedIn] = useState(false);
    const [verifiedSuccessfully, setverifiedSuccessfully] = useState({verified: false, message: ''});
    const { verifyId } = useParams();

    const verifyAccount = async () =>{
        console.log(verifyId)
        const response = await fetch(`${endpoints.NODE_SERVER}${endpoints.VERIFY_ACCOUNT}${verifyId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        if(data.success){
            const authToken = localStorage.getItem('authToken');
            if(!authToken){
                setloggedIn(true);
                return setverifiedSuccessfully({verified: true , message: 'Your Account is verified Login to access dashboard.'});
            } 
            setverifiedSuccessfully({verified: true , message: 'Your Account is verified redirecting to  dashboard...'});
            setTimeout(function(){ setToDashboard(true) }, 1000);
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

                <div>
                        <Button 
                            className = "button"
                            onClick={() => verifyAccount()} 
                            variant="contained" color="primary">
                            Click here to verify your account
                        </Button>
                    </div>
                    {error.isError && <Alert severity="error">{error.message}</Alert>}
                    {verifiedSuccessfully.verified && <Alert severity="success">{verifiedSuccessfully.message}</Alert>}

                    {loggedIn && <Link to="/">
                            <Button
                                className = "button"
                                variant="text" color="primary">
                                Login here
                            </Button>
                        </Link>
                    }  
            </Box>
        </>
    )
}
