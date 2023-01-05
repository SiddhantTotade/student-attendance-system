import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import CreateStudentModal from './CreateStudent';
import MarkAttendance from './Attendance';
import axios from 'axios'

const button = {
    'background': '#0283ad',
    'color': 'white',
    '&:hover': {
        background: "#036e91",
    }
}

export default function AllStudents() {
    const [createStudent, setCreateStudent] = useState(false)
    const [markAttendance, setMarkAttendance] = useState(false)

    const [studentsData, setStudentsData] = useState([])

    useEffect(() => {
        const url = 'http://127.0.0.1:8000/api/students/'

        const fetchData = async () => {
            try {
                const response = await axios.get(url)
                setStudentsData(response.data)
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [])

    const handleCreateStudent = () => {
        setCreateStudent(true)
    }

    const handleCreateStudentClose = () => {
        setCreateStudent(false)
    }

    const handleMarkAttendance = () => {
        setMarkAttendance(true)
    }

    const handleMarkAttendanceClose = () => {
        setMarkAttendance(false)
    }

    return (
        <>
            <div className='w-2/5 m-auto'>
                <div className='flex justify-between items-end'>
                    <div className='gap-2 flex mb-2'>
                        <Button sx={button} onClick={handleCreateStudent} >Create Student</Button>
                        <Button sx={button} onClick={handleMarkAttendance} >Mark Attendance</Button>
                    </div>
                    <div>
                        <Typography>Total Students : {studentsData.length}</Typography>
                    </div>
                </div>
                <div className='w-full mt-3'>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Student Name</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Student ID</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {studentsData.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <>
                                            <TableCell align="center">{row.student_name}</TableCell>
                                            <TableCell align="center">{row.student_id}</TableCell>
                                        </>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            <CreateStudentModal open={createStudent} onClose={handleCreateStudentClose} />
            <MarkAttendance open={markAttendance} onClose={handleMarkAttendanceClose} all_students={studentsData} />
        </>
    );
}