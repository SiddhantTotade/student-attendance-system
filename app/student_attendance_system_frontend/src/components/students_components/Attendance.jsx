import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import SuccessAlert from '../base_components/Alert';
import { TextField } from '@mui/material';
import { useState } from 'react';
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
    width: '35%'
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

    const [msgRes] = useState({ message: "" })
    const [openAlert, setOpenAlert] = useState(false)
    const [alertType, setAlertType] = useState("")

    const [date_hasValue, date_setHasValue] = React.useState(false)
    const [date_focus, date_setFocused] = React.useState(false)
    const date_onFocus = () => date_setFocused(true)
    const date_onBlur = () => date_setFocused(false)

    const [timein_hasValue, timein_setHasValue] = React.useState(false)
    const [timein_focus, timein_setFocused] = React.useState(false)
    const timein_onFocus = () => timein_setFocused(true)
    const timein_onBlur = () => timein_setFocused(false)

    const [timeout_hasValue, timeout_setHasValue] = React.useState(false)
    const [timeout_focus, timeout_setFocused] = React.useState(false)
    const timeout_onFocus = () => timeout_setFocused(true)
    const timeout_onBlur = () => timeout_setFocused(false)

    const [attendanceData, setAttendanceData] = useState({
        attendance_of_student: "",
        attendance_date: "",
        time_checkin: "",
        time_checkout: "",
        present_or_absent: false
    })

    function handleAttendanceData(e) {
        const newData = { ...attendanceData }
        newData[e.target.id] = e.target.value
        setAttendanceData(newData)
    }

    function handleStudent(e) {
        attendanceData.attendance_of_student = e.target.value
    }

    function handleDate(e) {
        attendanceData.attendance_date = e.target.value
    }

    function handlePresent(e) {
        if (attendanceData.present_or_absent === true) {
            attendanceData.present_or_absent = false
        }
        else
            attendanceData.present_or_absent = e
    }

    function handleSubmit(e) {

        e.preventDefault();
        const url = 'http://127.0.0.1:8000/api/attendance/'
        axios.post(url, {
            'attendance_of_student': attendanceData.attendance_of_student,
            'attendance_date': attendanceData.attendance_date,
            'time_checkin': attendanceData.time_checkin,
            'time_checkout': attendanceData.time_checkout,
            'present_or_absent': attendanceData.present_or_absent,
        }).then(setOpenAlert(true)).then(res => msgRes.message = res).then(res => res.data === "Attendance marked successfully" ? setAlertType("success") : setAlertType("error")).catch(res => console.log(res)).finally(props.onClose)
    }

    function handleCloseAlert() {
        setOpenAlert(false)
    }

    return (
        <div>
            <Modal
                {...props}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" sx={{ marginBottom: '15px', display: 'flex', justifyContent: 'center' }} variant="h6" component="h2">Mark Attendance</Typography>
                    <FormControl variant="standard" sx={{ width: '100%', gap: "10px" }}>
                        <InputLabel id="demo-simple-select-standard-label">Student</InputLabel>
                        <Select
                            id="student_id"
                            variant='standard'
                            onChange={(e) => handleStudent(e)}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {
                                props.all_students.map((data) => (
                                    <MenuItem value={data.id}>{data.student_id} - {data.student_name}</MenuItem>
                                ))
                            }
                        </Select>

                        <TextField
                            id="date"
                            label="Date"
                            variant="standard"
                            onFocus={date_onFocus}
                            onBlur={date_onBlur}
                            onChange={(e) => { handleDate(e); if (e.target.value) date_setHasValue(true); else date_setHasValue(false); }} type={date_hasValue || date_focus ? "date" : "text"}
                        />

                        <TextField
                            id="time_checkin"
                            label="In Time"
                            variant="standard"
                            onFocus={timein_onFocus}
                            onBlur={timein_onBlur}
                            onChange={(e) => { handleAttendanceData(e); if (e.target.value) timein_setHasValue(true); else timein_setHasValue(false); }} type={timein_hasValue || timein_focus ? "time" : "text"}
                        />


                        <TextField
                            id="time_checkout"
                            label="Out Time"
                            variant="standard"
                            onFocus={timeout_onFocus}
                            onBlur={timeout_onBlur}
                            onChange={(e) => { handleAttendanceData(e); if (e.target.value) timeout_setHasValue(true); else timeout_setHasValue(false); }} type={timeout_hasValue || timeout_focus ? "time" : "text"}
                        />
                        <div className='flex border-b border-gray-500 hover:border-gray-900 items-center'>
                            <h4 className=' text-gray-600'>Present</h4>
                            <Checkbox onChange={(e) => handlePresent(true)} />
                        </div>
                    </FormControl>
                    <div className='gap-3 flex justify-end'>
                        <Button sx={button} onClick={handleSubmit} >Save Attendance</Button>
                        <Button sx={button} onClick={props.onClose} >Close</Button>
                    </div>
                </Box>
            </Modal>
            <SuccessAlert open={openAlert} message={msgRes.message.data} onClose={handleCloseAlert} autoHideDuration={3000} severity={alertType} />
        </div >
    );
}