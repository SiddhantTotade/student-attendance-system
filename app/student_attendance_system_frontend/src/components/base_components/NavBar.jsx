import { Typography } from '@mui/material';
import * as React from 'react';
import AllStudents from '../students_components/AllStudents'

export default function NavBar() {

    return (
        <>
            <div>
                <div>
                    <div className=''>
                        <Typography>Hello</Typography>
                    </div>
                </div>
            </div>
            <AllStudents />
        </>
    );
}