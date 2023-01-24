import React from 'react'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
const Success = () => {
    return (
        <div style={{ width: '100%', textAlign: 'center' }}>
            <Stack sx={{ width: '30%', margin: 'auto', alignItems: 'start' }} spacing={2}>
                <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    You have been successfully logged in with <strong> Google</strong> .
                </Alert>
            </Stack>
        </div>
    )
}


export default Success;
