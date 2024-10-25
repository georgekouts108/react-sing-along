import React, { useState } from 'react'
import { downloadSRT } from '../../backend/main';

function CombineSRTPage() {
    document.title = 'Combine SRT Files: Sing-Along Subtitle Generator'

    const [loadedFileContent, setLoadedFileContent] = useState('')
    const [fileContents, setFileContents] = useState([]);
    
    const [loadedFileName, setLoadedFileName] = useState('')
    const [fileNames, setFileNames] = useState([]);

    const handleFileChange = (e) => {    
        const file = e.target.files[0];
        
        const reader = new FileReader();
        reader.onload = (event) => {
            setLoadedFileContent(event.target.result);
            setLoadedFileName(file.name);
        };
        reader.readAsText(file);
    };

    const addSRTContent = () => {
        const _fc = fileContents;
        _fc.push(loadedFileContent);

        const _fn = fileNames;
        _fn.push(loadedFileName);

        setFileNames(_fn);
        setFileContents(_fc);

        clearLoadedSRT();
    };

    const clearLoadedSRT=()=>{
        document.getElementById('fileInput').value = '';
        setLoadedFileContent('');
        setLoadedFileName('')
    };

    const downloadCombinedSRT = () => {
        let combinedSRT = '';
        for (let f = 0; f < fileContents.length; f++) {            
            combinedSRT += fileContents[f];            
        }
        downloadSRT(combinedSRT);
    }
    const deleteSRT = (index) => {
        const updatedFnames = []
        const updatedFcontents = []
        for (let i = 0; i < fileNames.length; i++) {
            if (i !== index) {
                updatedFnames.push(fileNames[i])
                updatedFcontents.push(fileContents[i])
            }
        }
        setFileNames(updatedFnames);
        setFileContents(updatedFcontents);
    }
    return (
        <div style={{textAlign:'center'}}>
            <h1>Combine Multiple Subtitle Files</h1>
            <hr/><hr/><br/>
            <h3>The lyrics in the following subtitle (.srt) files will be added in order from top to bottom:</h3>
            {
                fileContents.length === 0 && <h3 style={{color:'red'}}>No files added</h3>
            }
            {
                fileContents.length > 0 &&
                
                    <div>
                        {
                            [...Array(fileNames.length).keys()].map((index) => (
                                <h4 key={index}>
                                    <span  style={{color:'blue'}}>{fileNames[index]}</span>&nbsp;&nbsp;&nbsp;
                                    <button onClick={()=>deleteSRT(index)}>Delete This File</button>
                                </h4>
                            ))
                        }
                    </div>
            }
            <hr/><hr/>
            <input id='fileInput' type="file" accept=".srt" onChange={handleFileChange} />
            <br/><br/>
            <button disabled={!loadedFileContent} onClick={()=>{addSRTContent()}}>Add Loaded SRT Content to Queue</button><br/><br/>
            <button disabled={!loadedFileContent} onClick={()=>clearLoadedSRT()}>Clear Loaded SRT Content</button><br/><br/>
            <button disabled={fileContents.length===0 || loadedFileContent} onClick={()=>downloadCombinedSRT()}>Download Combined Subtitle File</button>
        </div>
    )
}

export default CombineSRTPage;