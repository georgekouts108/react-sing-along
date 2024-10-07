import React from 'react'

function CombineSRTPage() {
    document.title = 'Combine SRT Files: Sing-Along Subtitle Generator'
    let filesContents = [];
    const handleFileChange = (e) => {    
        const files = e.target.files; // Get the first file

        for (let f = 0; f < files.length; f++) {
            const reader = new FileReader();
            
            reader.onload = (event) => {
            //     // const _merged = [...filesContents, [event.target.result]];
            //     filesContents = [...filesContents, event.target.result]
            };
            reader.readAsText(files[f]);
        }
        console.log(filesContents)
    };

    return (
        <div>
            <h3>Upload .srt files</h3>
            <input multiple type="file" accept=".srt" onChange={handleFileChange} />            
        </div>
    )
}

export default CombineSRTPage;