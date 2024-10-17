import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './line-text-info-page.styles.css'
import LineTextInfoForm from './line-text-info-form'

function LineTextInfoPage() {
    document.title = 'Line Text Info: Sing-Along Subtitle Generator'
    
    const navigate = useNavigate();

    const [lineCount, setLineCount] = useState(0)
    const [lines, setLines] = useState([])
    const [latestLineConfirmed, setLatestLineConfirmed] = useState(false)

    const updateLineCount = (up, cloned=false, clonedLineID=undefined) => {
        if (!up) {
            if (lineCount > 0) {
                setLineCount(lineCount - 1);
                const _lines = lines.slice(0, lines.length-1)
                _lines[_lines.length - 1].nextLineRepeatsTextShown = false
                setLines(_lines)
                setLatestLineConfirmed(true)
            }
        }
        else {
            setLineCount(lineCount + 1);
            if (!cloned) {
                setLines([...lines, {
                    id: lineCount, 
                    lineConfirmed: false, 
                    wasCloned: false, 
                    clonedLineID: clonedLineID,
                    nextLineRepeatsTextShown: false
                }])
            }
            else {
                const clonedLine = lines[clonedLineID];
                
                const _clone = {
                    id:lineCount, 
                    lineConfirmed: false, 
                    wasCloned: true, 
                    clonedLineID: clonedLineID,
                    indexesOfShownWordsSung: clonedLine.indexesOfShownWordsSung,
                    repeatsPreviousTextShown: false,
                    nextLineRepeatsTextShown: false,
                    textHeard: clonedLine.textHeard,
                    textShown: clonedLine.textShown
                }

                setLines([...lines, _clone])
            }
            setLatestLineConfirmed(false)
        }
    }
    const cloneLine = (originalLineID) => {
        updateLineCount(true, true, originalLineID);
    }
    
    const updateLines = (lineObject) => {
        if (lines.length > 0) {
            const updatedLines = lines;
            for (let u = 0; u < updatedLines.length; u++) {
                if (updatedLines[u].id === lineObject.id) {
                    updatedLines[u] = lineObject;
                    if (lineObject.repeatsPreviousTextShown) {
                        updatedLines[u-1].nextLineRepeatsTextShown = true;
                    }
                    break;
                }
            }
            setLines(updatedLines);
            setLatestLineConfirmed(true);
        }
    }

    const getPreviousLine = (currentLineId) => {
        return lines[currentLineId - 1];
    }

    const confirmAllLines = () => {

        // get the longest textShown line
        let longestTextShown = ''
        for (let l = 0; l < lines.length; l++) {
            if (l === 0) {
                longestTextShown = lines[l].textShown;
            }
            else {
                if (lines[l].textShown.length > longestTextShown.length){
                    longestTextShown = lines[l].textShown
                }
            }
        }

        const data = {
            lines: lines, 
            lineCount: lineCount,
            longestTextShown: longestTextShown
        }
     
        navigate('/line-colors-transitions-info', { 
            state: {data: data}
        });
    }

    return (
        <div className='line-text-info-page-main'>
            <header className='header'></header>
            
            <div className='content'>
                <h1>Line Text</h1>
                <hr/>
                <table style={{border: '3px solid black'}}>
                    <tbody>
                        <tr style={{textAlign:'center', fontWeight:'bold'}}>
                            <td style={{border: '3px solid black', backgroundColor:'black'}}></td>
                            <td style={{border: '3px solid black'}}>Line ID</td>
                            <td style={{border: '3px solid black'}}>Repeats Previous Text Shown?</td>
                            <td style={{border: '3px solid black'}}>Text Shown</td>
                            <td style={{border: '3px solid black'}}>Text Heard</td>
                            <td style={{border: '3px solid black'}}>Sung Words Shown</td>
                            <td style={{border: '3px solid black'}}>Post Filler (Optional)</td>
                            <td style={{border: '3px solid black', backgroundColor:'black'}}></td>
                        </tr>
                        {
                            lineCount>0 &&
                            lines.map((line) => (
                                <LineTextInfoForm 
                                key={line.id} 
                                latestLineIsConfirmed={latestLineConfirmed} 
                                clone={cloneLine} 
                                getPreviousLine={getPreviousLine} 
                                confirmEntry={updateLines} 
                                line={line}/>
                            ))
                        }
                    </tbody>
                </table>
            
            <h4>Total number of lines: <span style={{color: (lineCount===0 ? 'rgb(216, 5, 5)': 'white') }}>{lineCount}</span></h4>
                <button disabled={!latestLineConfirmed && lineCount>0} onClick={()=>updateLineCount(true)}>Add New Blank Line</button>
                <button disabled={!lineCount} onClick={()=>updateLineCount(false)}>Delete Latest Line</button>
                <button disabled={!lineCount} onClick={()=>confirmAllLines()}>Confirm All Lines</button>
            </div>
        </div>
    )
}

export default LineTextInfoPage;