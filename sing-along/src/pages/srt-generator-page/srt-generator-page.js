import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import { get_all_scripts, writeSrtContent, downloadSRT } from "../../backend/main";

function SrtGeneratorPage() {
    document.title = 'Generate SRT File: Sing-Along Subtitles Generator'
    const location = useLocation();

    const currentData = location.state?.data;
    
    const [downloadDone, setDownloadDone] = useState(false);
    
    const getSRTfile = () => {
        const currentScripts = get_all_scripts(currentData);
        const srtContent = writeSrtContent(currentScripts);
        downloadSRT(srtContent);
        setDownloadDone(true)
    }
    return (
        <div style={{textAlign:'center'}}>
            <h1>🎊 🎶 Your subtitle file is ready! 🎶 🎊</h1>
            <div>
                <p>
                    Download your subtitle file by clicking the button below.<br/><br/>Afterwards, open Aegisub, then drag-and-drop the file into the software.<br/>
                    Then, make sure the video resolution <span style={{fontWeight:'bold'}}>(frame width x frame height)</span> is set to the same values you entered.<br/>
                    Afterwards, you must manually set the exact timings for all the words' highlights in the song.
                    <br/><br/>
                    Also, if the lyrics in your subtitle file are not all the lyrics in your song, you may create a new<br/>
                    subtitle file from scratch with the rest of the lyrics, and then merge the .srt files together.
                </p>
            </div><br/><br/>
            <div>
                <button onClick={()=>getSRTfile()}>Download Subtitle File</button>
            </div>         
            <div>
                {
                    downloadDone && <h3>Your SRT file has been downloaded!<br/><br/>Happy singing! 🎶🎤</h3>
                }
            </div>
        </div>
    );
}

export default SrtGeneratorPage;
