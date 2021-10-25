import { Button } from '@mui/material'
import React, { useState } from 'react'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

export default function Actions() {
        const [toLogin, setToLogin] = useState(false);

    // const history = useHistory();

    const logoutUser = () => {
        // history.push(`/Login`)
        localStorage.removeItem('authToken');
        setToLogin(true);
    }

    if(toLogin) {
        return <Redirect to='/'/>
    }




        return (
            <>
                <h1>Actions</h1>
                 <Button onClick={() => logoutUser()} variant="contained" color="primary">logOut</Button>
                 <Link to="/verify-email"><Button variant="contained" color="primary">Verify Account</Button></Link>
                 
                 <Link to="/dashboard"><Button variant="contained" color="primary">Dashboard</Button></Link>
                 
                 <Link to="/dashboard"><Button variant="contained" color="primary">Deactivate Account</Button></Link>
                 
                 <Link to="/vfesfrssg"><Button variant="contained" color="primary">Page Not Found</Button></Link>
            </>
        )
}
