import React, { useContext } from 'react'
import MainContext from '../MainContext';
export default function FacultyDashboard() {


    let userData = useContext(MainContext);

    console.log(userData)

    return (
        <div>
            Faculty Dashboard
        </div>
    )
}
