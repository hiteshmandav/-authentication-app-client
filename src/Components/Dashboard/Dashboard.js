import { Button } from '@mui/material'
import React, { useState } from 'react'
import { Redirect } from 'react-router';

export default function Dashboard ({setIsLoggedIn}) {
        const [toLogin, setToLogin] = useState(false);

    // const history = useHistory();

    const logoutUser = () => {
        // history.push(`/Login`)
        setIsLoggedIn(false);
        setToLogin(true);
    }

    if(toLogin) {
        return <Redirect to='/'/>
    }




        return (
            <>
                <h1>Dashboard</h1>
                 <Button onClick={() => logoutUser()} variant="contained" color="primary">logOut</Button>
            </>
        )
}
