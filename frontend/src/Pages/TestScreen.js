import React from 'react'
import './TestScreen.css';
import { Tabs, AppBar, Tab, TabPanel } from '@material-ui/core';
export default function TestScreen(props){

    

    let {testId} = props.match.params;
    console.log(testId)


    let handleChange = ()=>{

    }

    let value = 0



    return <div style={{margin:'0 auto',width:'80%',border:'1px solid #dedede',display:'flex'}}>
                <div style={{width:'80%',border:'1px solid #dedede'}}>
                    Questions Screen
                </div>
                <div style={{width:'20%',border:'1px solid #dedede',padding:'10px',fontSize:'32px',fontWeight:'200'}}>
                    Question Panel
                    <br />

                    {/* Sections Divider */}
                    <div>
                    <AppBar position="static">
                        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                            <Tab label="Item One"  />
                            <Tab label="Item Two"  />
                            <Tab label="Item Three"  />
                        </Tabs>
                        </AppBar>
                    </div>
                    
                        <div>
                            <button style={{width:'30%'}}>Physics</button>
                            <button style={{width:'30%'}}>Chemistry</button>
                            <button style={{width:'30%'}}>Mathematics</button>
                        </div>


                    <div className='question-panel' style={{style:'1px solid #dedede',margin:'0 auto',width:'100%',display:'block'}}>
                    <button style={{width:'30%'}}>1</button>
                        <button style={{width:'30%'}}>1</button>
                        <button style={{width:'30%'}}>1</button>
                        <button style={{width:'30%'}}>1</button>
                        <button style={{width:'30%'}}>1</button>
                        <button style={{width:'30%'}}>1</button>
                        <button style={{width:'30%'}}>1</button>
                        <button style={{width:'30%'}}>1</button>
                        <button style={{width:'30%'}}>1</button>
                        <button style={{width:'30%'}}>1</button>
                        <button style={{width:'30%'}}>1</button>
                        <button style={{width:'30%'}}>1</button>
                    </div>
                </div>
        </div>
}