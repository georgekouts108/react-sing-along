import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import { get_all_scripts, generateSRT } from "../../backend/main";

function SrtGeneratorPage() {
    document.title = 'Generate SRT File: Sing-Along Subtitles Generator'
    const location = useLocation();

    const currentData = location.state?.data;
    console.log(currentData);
    const [fileContent, setFileContent] = useState("");

    const [willCreateNewFile, setWillCreateNewFile] = useState(true);

    // This function handles the file input change event
    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Get the first file
        console.log(file)
        const reader = new FileReader();
        // When the file is read successfully, update the state with its content
        reader.onload = (event) => {
            setFileContent(event.target.result);
            console.log(fileContent)
        };
        reader.readAsText(file); // Read the file content as text
    };

    const getSRTfile = () => {
        const currentScripts = get_all_scripts(currentData);
        generateSRT(currentScripts);

    }
    return (
        <div>
            <h1>Select how you want to generate your subtitle file.</h1>

            <table style={{border: '3px solid black', textAlign: 'center'}}>
                <tbody>
                    <tr>
                        <td>
                            <input defaultChecked={true} id='srt-gen-new' onClick={()=>setWillCreateNewFile(true)} type='radio' name='srt-gen-method'/>
                            <label htmlFor='srt-gen-new'>Create new .srt file from scratch</label>
                        </td>
                        <td>
                            <input id='srt-gen-add' onClick={()=>setWillCreateNewFile(false)} type='radio' name='srt-gen-method'/>
                            <label htmlFor='srt-gen-add'>Add lyrics to existing .srt file</label>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} style={{border: '3px solid black', textAlign: 'center'}}>
                            { 
                                willCreateNewFile && 
                                <div>
                                    <button onClick={()=>getSRTfile()}>Generate Subtitle File</button>
                                </div>
                            }
                            {/* { 
                                !willCreateNewFile && 
                                <div>
                                    <h3>Upload an .srt file</h3>
                                    <input type="file" accept=".srt" onChange={handleFileChange} />
                                    {
                                    fileContent && (
                                        <div>
                                            <h4>File Content:</h4>
                                            <pre>{fileContent}</pre>
                                        </div>
                                    )}
                                </div>
                            } */}
                        </td>
                    </tr>
                </tbody>
            </table>
        
        
        
        </div>
    );
}

export default SrtGeneratorPage;
