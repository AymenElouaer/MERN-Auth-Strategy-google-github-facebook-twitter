import React from 'react'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
const GitSuccess = () => {
    return (
        <div style={{ width: '100%', textAlign: 'center' }}>
            <Stack sx={{ width: '30%', margin: 'auto' }} spacing={2}>
                <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    You have been successfully logged in with <strong> Github</strong> .
                </Alert>
            </Stack>
        </div>
    )
}

export default GitSuccess
