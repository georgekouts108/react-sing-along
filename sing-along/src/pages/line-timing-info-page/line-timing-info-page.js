import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './line-timing-info-page.styles.css'

function LineTimingInfoPage() {
    document.title = 'Line Timing: Sing-Along Subtitle Generator'
    const navigate = useNavigate();
    const location = useLocation();

    const data = location.state?.data;
    
    const timestamps = [];
    for (let l = 0; l < data.lines.length; l++) {
        timestamps.push({lineId: data.lines[l].id, singTime: '', exitTime: ''})
    }

    const confirmAllTimestamps = () => {
        for (let t = 0; t < timestamps.length; t++) {
            data.lines[t].singTime = timestamps[t].singTime
            data.lines[t].exitTime = timestamps[t].exitTime
        }
        console.log("🎊 FINAL INFO: ")
        console.log(data)

        // navigate('/file-generation-page', { 
        //     state: {data: data}
        // });
    }

    const updatePendingLineID = (isGoingForward) => {
        if (!isGoingForward && pendingLineID > 0) {
            setPendingLineID(pendingLineID - 1);
        }
        else if (isGoingForward && pendingLineID < timestamps.length - 1) {
            setPendingLineID(pendingLineID + 1);
        }
    }

    const recordSingTime = () => {
        console.log(`sing time recorded for line ${pendingLineID+1}`)
        if (pendingLineID+1 === timestamps.length) {
            setSingTimesDone(true);
            setTimerRunning(false);
        }
        updatePendingLineID(true);
    }

    const recordExitTime = () => {
        console.log(`exit time recorded for line ${pendingLineID+1}`)
        if (pendingLineID+1 === timestamps.length) {
            setExitTimesDone(true);
            setTimerRunning(false);
        }
        updatePendingLineID(true);
    }

    const [pendingLineID, setPendingLineID] = useState(0);
    const [timestampTypeInProgress, setTimestampTypeInProgress] = useState('sing') // 'sing' or 'exit'
    const [singTimesDone, setSingTimesDone] = useState(false);
    const [exitTimesDone, setExitTimesDone] = useState(false);
    const [singTimesConfirmed, setSingTimesConfirmed] = useState(false);
    const [exitTimesConfirmed, setExitTimesConfirmed] = useState(false);
    const [timerRunning, setTimerRunning] = useState(false);

    return (
        <div className='line-timing-info-page-main'>
            <header className='header'></header>
            
            <div className='content'>
                <h1>Line Timing Info</h1>
                <hr/>
                <table style={{border:'3px solid black', textAlign:'center'}}>
                    <tbody >
                        <tr>
                            <td style={{backgroundColor:'black'}}></td>
                            <td style={{border:'3px solid black'}}>Next Pending Line</td>
                            <td style={{backgroundColor:'black'}}></td>
                        </tr>
                        <tr>
                            <td style={{border:'3px solid black'}}>
                                <button disabled={pendingLineID===0 || timerRunning} onClick={()=>updatePendingLineID(false)}>Backward</button>
                            </td>
                            <td style={{border:'3px solid black'}}>
                                <h3 style={{color:'blue'}}>Line {timestamps[pendingLineID].lineId+1} of {timestamps.length} 
                                    {data.lines[pendingLineID].repeatsPreviousTextShown && <>{`\n(repeats Line ${timestamps[pendingLineID].lineId} text)`}</>}
                                </h3>
                                <h4>Text Shown:<br/><i style={{color:'green'}}>{data.lines[pendingLineID].textShown}</i></h4>  
                                <h4>Text Heard:<br/><i style={{color:'red'}}>{data.lines[pendingLineID].textHeard}</i></h4>      
                            </td> 
                            <td style={{border:'3px solid black'}}>
                                <button disabled={pendingLineID===timestamps.length-1  || timerRunning} onClick={()=>updatePendingLineID(true)}>Forward</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <h1>{timestampTypeInProgress==='sing' ? 'SING TIME = ' : 'EXIT TIME = '}00:00:00.000</h1>
                {
                    timestampTypeInProgress==='sing' &&
                    <div>
                        <p>Press the button below to start the timer and/or record the sing time for the next pending line.</p>
                        <p>(NOTE: Starting the timer on '00:00:00.000' will record 00:00:00.000)</p>
                        <p>If you make a mistake, click "Pause Timer" and then keep clicking "Backward" until you reach the line<br/> where you'd like to restart from.</p>
                        <p>If you do not wish to do all the lines in one shot, click "Pause Timer" and then click "Start Timer"<br/>again when you're ready to resume.</p>
                        
                        <button disabled={singTimesDone} onClick={()=>{setTimerRunning(true) ; recordSingTime()}}>Start Timer and/or <br/>Record Sing Time</button>&nbsp;&nbsp;
                        <button disabled={!timerRunning} onClick={()=>{setTimerRunning(false)}}>Pause<br/>Timer</button><br/><br/>
                        <button disabled={!singTimesDone} onClick={()=>{setPendingLineID(0); setSingTimesConfirmed(true); setTimestampTypeInProgress('exit')}}>Confirm All Sing Timestamps</button>
                    </div>
                }
                {
                    timestampTypeInProgress==='exit' &&
                    <div>
                        <p>Press the button below to start the timer or record the exit time for the next pending line.</p>
                        <p>(NOTE: Starting the timer on '00:00:00.000' will NOT record 00:00:00.000)</p>
                        <button disabled={exitTimesDone} onClick={()=>{setTimerRunning(true) ; recordExitTime()}}>Start Timer or <br/>Record Exit Time</button>&nbsp;&nbsp;
                        <button disabled={!timerRunning} onClick={()=>{setTimerRunning(false)}}>Pause<br/>Timer</button><br/><br/>
                        
                        <button disabled={!exitTimesDone} onClick={()=>{setExitTimesConfirmed(true);}}>Confirm All Exit Timestamps</button>
                   
                    </div>
                }
                <hr/>
                <button disabled={!(singTimesConfirmed && exitTimesConfirmed)} onClick={()=>confirmAllTimestamps()}>Finish</button>
            </div>
        </div>
    )
}

export default LineTimingInfoPage;