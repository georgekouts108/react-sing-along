import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import { get_all_scripts, writeSrtContent, downloadSRT } from "../../backend/main";

function SrtGeneratorPage() {
    document.title = 'Generate SRT File: Sing-Along Subtitles Generator'
    const location = useLocation();

    const currentData = location.state?.data;
    
    const [downloadDone, setDownloadDone] = useState(false);
    const [srtFileName, setSrtFileName] = useState('my_lyrics')
    
    const getSRTfile = () => {
        const currentScripts = get_all_scripts(currentData);
        const srtContent = writeSrtContent(currentScripts);
        downloadSRT(srtContent, srtFileName);
        setDownloadDone(true)
    }
    return (
        <div style={{textAlign:'center'}}>
            <h1>🎊 🎶 Your subtitle file is ready! 🎶 🎊</h1>
            <div>
                <p>
                    Download your subtitle file by clicking the button below.<br/><br/>Afterwards, open Aegisub, then drag-and-drop the file into the software.<br/>
                    Then, make sure the video resolution is set to <span style={{fontWeight:'bold'}}>{currentData.frameWidth} x {currentData.frameHeight}</span>.<br/>
                    Afterwards, manually set the exact timings for all the words' highlightings in the song.
                    <br/><br/>
                    Also, if there are more lyrics in your song, you may create more<br/>
                    subtitle files from scratch with the continuing lyrics, and then merge the files together.
                </p>
            </div><br/><br/>
            <div>
                <input placeholder=".srt file name" type="text" value={srtFileName} onChange={(e)=>setSrtFileName(e.target.value)}/>.srt<br/><br/>
                <button disabled={!srtFileName} onClick={()=>getSRTfile()}>Download Subtitle File</button>
            </div>         
            <div>
                {
                    downloadDone && <h2>Your SRT file has been downloaded! ✅<br/><br/>🎵 Happy singing! 🎵</h2>
                }
            </div>
        </div>
    );
}

export default SrtGeneratorPage;
