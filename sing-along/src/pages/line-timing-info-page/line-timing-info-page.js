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

    const [pendingLineID, setPendingLineID] = useState(0);

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
                                <button disabled={pendingLineID===0} onClick={()=>updatePendingLineID(false)}>Backward</button>
                            </td>
                            <td style={{border:'3px solid black'}}>
                                <h3 style={{color:'blue'}}>Line {timestamps[pendingLineID].lineId+1} of {timestamps.length} 
                                    {data.lines[pendingLineID].repeatsPreviousTextShown && <><br/>{`\n(repeats Line ${timestamps[pendingLineID].lineId} text)`}</>}
                                </h3>
                                <h4>Text Shown:<br/><i style={{color:'green'}}>{data.lines[pendingLineID].textShown}</i></h4>  
                                <h4>Text Heard:<br/><i style={{color:'red'}}>{data.lines[pendingLineID].textHeard}</i></h4>      
                            </td> 
                            <td style={{border:'3px solid black'}}>
                                <button disabled={pendingLineID===timestamps.length-1} onClick={()=>updatePendingLineID(true)}>Forward</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default LineTimingInfoPage;