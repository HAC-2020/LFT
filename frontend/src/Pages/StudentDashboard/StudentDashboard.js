import React, { useContext } from 'react'
import MainContext from '../../MainContext'
import { Redirect } from 'react-router-dom';

export default function Dashboard() {


    let userData = useContext(MainContext);

    console.log(userData)
    let isLoggedIn = true;
    let isAllowedToStart = true;


    if(isLoggedIn === true){
        return (
            <div style={{margin:'0 auto',maxWidth:'600px'}}>
    
                <h1>Student Dashboard</h1>
                <hr />
                Status - {isAllowedToStart === true ? 'Allowed':'Not Allowed to start'}
                <hr />
                {isAllowedToStart === true ? <button>STart </button> :  <button disabled>Wait Test is Allowed to Start Yet </button> }
                
            </div>
        )
    }else{
        return <Redirect to='/' />
    }

    
}
