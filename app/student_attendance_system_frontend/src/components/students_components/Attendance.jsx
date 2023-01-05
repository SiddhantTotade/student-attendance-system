import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

const button = {
    'background': '#0283ad',
    'color': 'white',
    'top': '15px',
    '&:hover': {
        background: "#036e91",
    }
}

export default function MarkAttendance(props) {

    return (
        <div>
            <Modal
                {...props}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" sx={{ marginBottom: '15px' }} variant="h6" component="h2">Create Student</Typography>
                    <div className='grid gap-5'>
                        <TextField
                            id="standard-multiline-flexible"
                            label="Student Name"
                            variant="standard"
                        />
                        <TextField
                            id="standard-multiline-flexible"
                            label="Date"
                            variant="standard"
                            type='date'
                        />
                        <TextField
                            id="standard-multiline-flexible"
                            label="In Time"
                            variant="standard"
                            type='time'
                        />
                        <TextField
                            id="standard-multiline-flexible"
                            label="Out Time"
                            variant="standard"
                            type='time'
                        />
                    </div>
                    <div className='gap-3 flex justify-end'>
                        <Button sx={button} onClick={props.onClose} >Mark Attendance</Button>
                        <Button sx={button} onClick={props.onClose} >Close</Button>
                    </div>
                </Box>
            </Modal>
        </div >
    );
}