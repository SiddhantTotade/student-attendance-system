import * as React from 'react';
import AllStudents from '../students_components/AllStudents'

export default function NavBar() {

    return (
        <>
            <div className='h-16 bg-blue-500 mb-20 flex items-center'>
                <h1 className='text-white flex text-3xl ml-32 font-title' >Student Attendance System</h1>
            </div>
            <AllStudents />
        </>
    );
}