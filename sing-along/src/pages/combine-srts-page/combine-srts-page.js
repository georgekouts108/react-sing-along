import React, { useState } from 'react'
import { downloadSRT } from '../../backend/main';

function CombineSRTPage() {
    document.title = 'Combine SRT Files: Sing-Along Subtitle Generator'

    const [loadedFileContent, setLoadedFileContent] = useState('')
    const [fileContents, setFileContents] = useState([]);

    const handleFileChange = (e) => {    
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            setLoadedFileContent(event.target.result);
        };
        reader.readAsText(file);
    };

    const addSRTContent = () => {
        const _fc = fileContents;
        _fc.push(loadedFileContent);
        setFileContents(_fc);
        clearLoadedSRT();
        console.log(fileContents);
    };

    const clearLoadedSRT=()=>{
        document.getElementById('fileInput').value = '';
        setLoadedFileContent('');
    };

    const downloadCombinedSRT = () => {
        let combinedSRT = '';
        for (let f = 0; f < fileContents.length; f++) {
            combinedSRT += fileContents[f];
        }
        downloadSRT(combinedSRT);
    }

    return (
        <div style={{textAlign:'center'}}>
            <h1>Combine Multiple Subtitle Files</h1>
            <hr/><hr/><br/>
            <h3>Number of subtitle (.srt) files loaded: {fileContents.length}</h3>
            <input id='fileInput' type="file" accept=".srt" onChange={handleFileChange} />
            <br/><br/>
            <button disabled={!loadedFileContent} onClick={()=>{addSRTContent()}}>Add Loaded SRT Content to Queue</button><br/><br/>
            <button disabled={!loadedFileContent} onClick={()=>clearLoadedSRT()}>Clear Loaded SRT Content</button><br/><br/>
            <button disabled={fileContents.length===0 || loadedFileContent} onClick={()=>downloadCombinedSRT()}>Download Combined Subtitle File</button>
        </div>
    )
}

export default CombineSRTPage;