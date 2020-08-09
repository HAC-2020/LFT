import React, { Component } from 'react'
import * as bodyPix from '@tensorflow-models/body-pix';

export default class VideoDetection extends Component {


    constructor(){
        super()
        this.video = window.document.getElementById("__video_monitor_id__");
        this.canvas = window.document.getElementById("__canvas") || {getContext:(val)=>{}};
        this.context = this.canvas.getContext('2d') || ''

    }
    state = {
        stream:{}
    }
    async componentDidMount(){
        this.video = window.document.getElementById("__video_monitor_id__");
        this.canvas = window.document.getElementById("__canvas")
        console.log(this.canvas.getContext('2d'))
        this.context = this.canvas.getContext('2d') 
        let canVas = this.canvas;
        let ourCanvas = this.context;
        const net = await bodyPix.load(/** optional arguments, see below **/);
        let detection_part = ()=>{
            window.navigator.mediaDevices.getUserMedia({audio:false,video:true}).then(stream=>{
                this.video.srcObject = stream
                console.log(stream)
                this.setState({stream:stream})
                console.log(this.context)
                // this.context.drawImage(stream,0,0,650,400);
                let ourVideo = this.video;

                

        predict()

        async function predict(){
            let image = ourCanvas.drawImage(ourVideo,0,0,650,400);

            // const predictions = await model.classify(canvas)    
            // console.log(predictions)
            // status.innerHTML = `Prediction : ${predictions[0].className} / ${predictions[0].probability}`;

            const segmentation = await net.segmentPerson(canVas);
            console.log(segmentation)

            if(segmentation.allPoses.length == 0){
                alert("USer is not in Screen!!")
            }








            requestAnimationFrame(predict)
            // setTimeout(()=>predict(),16.67)
        }





                // this.video.srcObject = stream;
            })
        }


        detection_part()


    }


    render() {
        return (
            <div>
                
                <video width='650px' height='400px' id='__video_monitor_id__' autoPlay></video>
                <canvas ref={s=>{
                    this.context = s;
                    // console.log(this.context.getContext('2d'))
                }} id='__canvas' width='650px' height="400px" ></canvas>
            </div>
        )
    }
}
