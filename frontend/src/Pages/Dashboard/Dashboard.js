import React, { useContext } from 'react'
import MainContext from '../../MainContext'

export default function Dashboard() {


    let userData = useContext(MainContext);

    console.log(userData)

    return (
        <div>
            Student Dashboard
        </div>
    )
}
