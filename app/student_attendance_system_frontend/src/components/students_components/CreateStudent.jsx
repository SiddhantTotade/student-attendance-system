import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { useState } from 'react';
import SuccessAlert from '../base_components/Alert';
import axios from 'axios';

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

export default function CreateStudentModal(props) {

    const [msgRes] = useState({
        message: "",
        response: false
    })

    const [studentData, setStudentData] = useState({
        student_name: "",
        student_id: ""
    })

    function handleSubmit(e) {

        e.preventDefault();
        const url = 'http://127.0.0.1:8000/api/students/'
        axios.post(url, {
            'user': 1,
            'student_name': studentData.student_name,
            'student_id': studentData.student_id
        }).then(msgRes.response = true).then(res => msgRes.message = res).catch(err => console.log(err)).finally(props.onClose)
    }

    console.log(msgRes.message.data);
    console.log(msgRes.response);

    function handleStudentData(e) {
        const newData = { ...studentData }
        newData[e.target.id] = e.target.value
        setStudentData(newData)
    }

    return (
        <div>
            <Modal
                {...props}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" sx={{ marginBottom: '15px', display: 'flex', justifyContent: 'center' }} variant="h6" component="h2">Create Student</Typography>
                    <div className='grid gap-5'>
                        <TextField
                            id="student_name"
                            label="Student Name"
                            variant="standard"
                            value={studentData.student_name}
                            onChange={(e) => handleStudentData(e)}
                        />
                        <TextField
                            id="student_id"
                            label="Student ID"
                            variant="standard"
                            value={studentData.id}
                            onChange={(e) => handleStudentData(e)}
                        />
                    </div>
                    <div className='gap-3 flex justify-end'>
                        <Button sx={button} onClick={handleSubmit} >Save Student</Button>
                        <Button sx={button} onClick={props.onClose} >Close</Button>
                    </div>
                </Box>
            </Modal>
            <div className=''>
                <SuccessAlert open={msgRes.response} message={msgRes.message.data} />
            </div>
        </div >
    );
}