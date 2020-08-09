import React, { useContext, useState, useEffect } from 'react'
import './TestScreen.css';
import { Tabs, AppBar, Tab, TabPanel } from '@material-ui/core';
import MainContext from '../MainContext';
import { Redirect } from 'react-router-dom';
import VideoDetection from './VideoDetection';





export default function TestScreen(props){




    let mainContext = useContext(MainContext);
    // console.log(mainContext)
    let {testId} = props.match.params;
    // console.log(testId)

    let RenderStatus = localStorage.getItem("token")


    let [questions,setQuestions] = useState([])

    let [loaded,setLoaded] = useState(false)

    let handleChange = ()=>{

    }

    let value = 0
    useEffect(()=>{





        let loadQuestions = async ()=>{

            



        let response = await fetch('https://lft-hac.herokuapp.com/api/v1/paper',{method:"GET",headers:{
            'Authorization':'Bearer '+RenderStatus
        }})

        let da = (await response.json())
      
        setQuestions(da.data.papers[0].questions)
        setLoaded(true)





        }

        loadQuestions()






    },[])
    
    let [questionNo,setQuestionNo] = useState(0)


    if(((RenderStatus !== null) || toString(RenderStatus).length === 0)){

        if(loaded === true){
            // Laoded
             
            return <div>
                <div style={{margin:'0 auto',width:'80%',border:'1px solid #dedede',display:'flex'}}>
            <div style={{width:'80%',border:'1px solid #dedede'}}>
             
                <div style={{fontSize:'44px',fontWeight:'200',padding:'20px'}}>
                {questions[questionNo]}
                </div>
                <div style={{padding:'10px'}}>
        
                    <textarea placeholder='Type your Answer Here ....' style={{width:'100%',padding:'10px',fontSize:'20px',fontWeight:'200',border:'1px solid #dedede',outline:'1px solid #dedede'}}></textarea>
        
                    <br />
                    <hr />
                    <button onClick={()=>{
                        if(questionNo > 1){
                            setQuestionNo(questionNo-1)
                        }else{
                            alert("Can't go back")
                        }
                    }}>Previous</button>
                    <button>Save</button>
                    <button onClick={()=>{
                        if(questions.length-1 !== questionNo){
                            setQuestionNo(questionNo+1)
                        }else{
                            alert("Can't move Forward than this")
                        }
                    }}>Next</button>
                </div>
        
        
        
        
        
        
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
                        <button style={{width:'33.33%'}}>Physics</button>
                        <button style={{width:'33.33%'}}>Chemistry</button>
                        <button style={{width:'33.33%'}}>Mathematics</button>
                    </div>
        
        
                <div className='question-panel' style={{style:'1px solid #dedede',margin:'0 auto',width:'100%',display:'block'}}>
               
                {questions.map((each,index)=>{
                    return <button key={index} style={{width:'33.33%'}} onClick={()=>setQuestionNo(index)}>{index+1}</button>
                })}
                </div>
            </div>
        </div>
                <br />
                <hr />
                
                
                <div style={{margin:'0 auto',width:'80%',border:'1px solid #dedede',display:'flex',padding:'10px'}}>This Section will only be displayed in Development mode to work on Detection part of our project</div>
                <div style={{margin:'0 auto',width:'80%',border:'1px solid #dedede',display:'flex',padding:'10px'}}>
                <br />
                <VideoDetection />
                </div>
            </div>
        }else{
            return <div>Loading Please Wait....</div>
        }


    }else{
        return <Redirect to='/' />
    }
}