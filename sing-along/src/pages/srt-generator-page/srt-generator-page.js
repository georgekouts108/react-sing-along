import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

function SrtGeneratorPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const currentData = location.state?.data;
    const [fileContent, setFileContent] = useState("");

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

    return (
        <div>
        <h3>Upload an .srt File</h3>
        <input type="file" accept=".srt" onChange={handleFileChange} />
        {fileContent && (
            <div>
            <h4>File Content:</h4>
            <pre>{fileContent}</pre>
            </div>
        )}
        </div>
    );
}

export default SrtGeneratorPage;
