import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import { get_all_scripts, writeSrtContent,downloadSRT } from "../../backend/main";

function SrtGeneratorPage() {
    document.title = 'Generate SRT File: Sing-Along Subtitles Generator'
    const location = useLocation();

    const currentData = location.state?.data;
    
    const [srtIndexOffset, setSrtIndexOffset] = useState(1);
    const [nextSRToffset, setNextSRToffset] = useState(0);
    
    const getSRTfile = () => {
        const currentScripts = get_all_scripts(currentData);
        const srtContent = writeSrtContent(currentScripts, srtIndexOffset);
        setNextSRToffset(srtContent[1]);
        downloadSRT(srtContent[0]);
    }
    return (
        <div style={{textAlign:'center'}}>
            <h1>Generate Your Subtitle File</h1>
            <div>
                <p>If you are creating an .srt file that will be merged with another one you created before, change the SRT 
                    Index Offset to the total number of subtitles from all your preceding .srt files, plus 1.
                <br/>Otherwise, if this is the first .srt file for your song, leave it as 1. </p>
                SRT Index Offset: <input id='download' defaultValue={1} onChange={(e)=>setSrtIndexOffset(parseInt(e.target.value))} type="number" min={1} />
            </div><br/><br/>
            <div>
                <button disabled={srtIndexOffset < 1 || !srtIndexOffset} onClick={()=>getSRTfile()}>Generate Subtitle File</button>
            </div>         
            <div>
                {
                    nextSRToffset > 0 &&
                    <h3>
                        Your SRT file has been downloaded!<br/><br/>
                        In case you plan to create more SRT files to combine with this one,<br/>
                        the index offset of the next SRT file must be {nextSRToffset}.<br/><br/>
                        Happy singing! 🎶🎤
                    </h3>
                }
                
            </div>
        </div>
    );
}

export default SrtGeneratorPage;
