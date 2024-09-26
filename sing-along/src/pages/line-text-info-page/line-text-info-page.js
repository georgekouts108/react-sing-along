import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './line-text-info-page.styles.css'
import SingAlongSongsLogo from '../../components/sing-along-songs-logo/sing-along-songs-logo';
import { staff } from '../../assets/misc/misc';
import LineEntryForm from '../../components/line-entry-form';

function LineTextInfoPage() {
    document.title = 'Line Text Info: Sing-Along Subtitle Generator'
    
    const navigate = useNavigate();

    const [lineCount, setLineCount] = useState(0)
    const [lines, setLines] = useState([])

    const updateLineCount = (up) => {
        if (!up) {
            if (lineCount > 0) {
                setLineCount(lineCount - 1);
                setLines(lines.slice(0, lines.length-1))
            }
        }
        else {
            setLines([...lines, {id:lineCount, lineConfirmed:false}])
            setLineCount(lineCount + 1);
        }
    }

    const updateLines = (lineObject) => {
        if (lines.length > 0) {
            const updatedLines = lines;
            for (let u = 0; u < updatedLines.length; u++) {
                if (updatedLines[u].id === lineObject.id) {
                    updatedLines[u] = lineObject;
                    break;
                }
            }
            setLines(updatedLines);
        }
    }

    const getPreviousLine = (currentLineId) => {
        return lines[currentLineId - 1];
    }

    const confirmAllLines = () => {
        const data = {
            lines: lines, 
            lineCount: lineCount
        }
        console.log(data)

        // navigate('/line-text-info', { 
        //     state: data
        // });
    }

    return (
        <div className='line-text-info-page-main'>
            <header className='header'>
                <SingAlongSongsLogo/>
            </header>
            
            <div className='content'>
                {staff()}
                <h1>Line Text Information</h1>
                <h4>Total number of lines: <span style={{color: (lineCount===0 ? 'rgb(216, 5, 5)': 'white') }}>{lineCount}</span></h4>
                <button onClick={()=>updateLineCount(true)}>Add New Line</button>
                <button disabled={!lineCount} onClick={()=>updateLineCount(false)}>Delete Latest Line</button>
                <button disabled={!lineCount} onClick={()=>confirmAllLines()}>Confirm All Lines</button>
                <hr/>
                {
                lineCount>0 &&
                lines.map((line) => (
                    <div key={line.id}> 
                        <LineEntryForm getPreviousLine={getPreviousLine} confirmEntry={updateLines} line={line}/>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default LineTextInfoPage;