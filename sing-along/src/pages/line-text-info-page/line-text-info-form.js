import React, {useState} from 'react'

function LineTextInfoForm(props) {
    const [lineId] = useState(props.line.id)

    const [repeatsPreviousTextShown, setRepeatsPreviousTextShown] = useState(props.line.wasCloned ? props.line.repeatsPreviousTextShown : false);
    const [textShown, setTextShown] = useState(props.line.wasCloned ? props.line.textShown : '');
    
    const [textHeard, setTextHeard] = useState(props.line.wasCloned ? props.line.textHeard : '');
    
    let indexesOfSungWords = props.line.wasCloned ? props.line.indexesOfShownWordsSung : '';

    const [lineConfirmed, setLineConfirmed] = useState(props.line.wasCloned ? props.line.lineConfirmed : false);

    const getWords = (text) => {
        const wordArray = [];
        const words = text.trim().split(' ');
        for (let w = 0; w < words.length; w++) {
            wordArray.push({ wordId: w, word: words[w] });
        }
        return wordArray;
    }

    const [wordsShown, setWordsShown] = useState(props.line.wasCloned ? getWords(props.line.textShown) : []);

    const updateTextShown = (newText) => {
        let cleanedText = newText.replace(/\s+/g, ' ');
        
        setTextShown(cleanedText);
        setTextHeard(cleanedText);
        
        if (cleanedText !== '') {
            setWordsShown(getWords(cleanedText));
        }
        else {
            setWordsShown([])
        }
        selectAllWords(false);
    }

    const selectAllWords = (choice) => {
        for (let w = 0; w < wordsShown.length; w++) {
            document.getElementById(`lineId_${lineId}_wordId_${w}`).checked = choice;
        }
        updateIndexesOfSungWords();
    }
    const updateIndexesOfSungWords = () => {
        let indexes = [];
        for (let w = 0; w < wordsShown.length; w++) {
            let box = document.getElementById(`lineId_${lineId}_wordId_${w}`);
            if (box.checked) {
                indexes.push(w);
            }
        }
        indexesOfSungWords = indexes.join(',');
    }
    const confirmLine = () => {
        setLineConfirmed(true);
        
        const _line = props.line;
        _line.id = lineId
        _line.lineConfirmed = true
        _line.textShown = textShown
        _line.textHeard = textHeard 
        _line.indexesOfShownWordsSung = indexesOfSungWords
        _line.repeatsPreviousTextShown = repeatsPreviousTextShown

        props.confirmEntry(_line)
    }
    const repeatPreviousTextShown = (isChecked) => {
        setRepeatsPreviousTextShown(isChecked)
        if (isChecked) {
            const previousLine = props.getPreviousLine(lineId);
            if (previousLine.lineConfirmed) {
                updateTextShown(previousLine.textShown);
            }
        }
        else {
            updateTextShown('');
        }
    }

    return (
        <div>
            <table style={{border: '3px solid black'}}>
                <tbody>
                    <tr>
                        <td style={{textAlign:'center',border: '3px solid black'}}>LINE {`#${lineId + 1}`}<br/><br/>
                            <button disabled={!props.latestLineIsConfirmed} onClick={()=>props.clone(lineId)}>Duplicate</button>
                        </td>
                        <td style={{textAlign:'center',border: '3px solid black'}}>
                        {   
                            (lineId > 0) &&
                            <>
                                <input id={`repPrevTS_line${lineId}`} onClick={(e)=>repeatPreviousTextShown(e.target.checked)} disabled={(lineConfirmed && props.getPreviousLine(lineId).lineConfirmed)} type='checkbox' defaultChecked={false} />
                                <label htmlFor={`repPrevTS_line${lineId}`}>Repeats text shown of LINE #{lineId}<br/>(this line must be confirmed)</label>
                                <br/><br/>
                            </>
                        }
                        {lineId === 0 && <h3>not applicable to first line</h3> }
                        </td>
                        <td style={{textAlign:'center',border: '3px solid black'}}>
                            <>
                            Text Shown:<br/><input 
                            disabled={lineConfirmed || repeatsPreviousTextShown}
                            style={{width:300, textAlign:'center'}}
                            value={textShown}
                            onChange={(e) => updateTextShown(e.target.value)}
                            type='text' 
                            placeholder={`text shown for line #${lineId+1}`}/><br/>
                            </>
                            <br/>
                            Text Heard:<br/><input
                            disabled={lineConfirmed}
                            style={{width:300, textAlign:'center'}} 
                            value={textHeard}
                            onChange={(e) =>setTextHeard(e.target.value)}
                            type='text' 
                            placeholder={`text heard for line #${lineId+1}`}/>
                        </td>
                        <td style={{textAlign:'center',border: '3px solid black'}}>
                            <>
                                <p>
                                    Select the words that will actually be highlighted:<br/>
                                    {wordsShown.length===0 && '(no words entered yet)'}
                                </p>
                                {
                                    
                                    wordsShown.length>0 && 
                                    <div>
                                        <button disabled={lineConfirmed} onClick={()=>selectAllWords(true)}>Select All Words</button>
                                        <button disabled={lineConfirmed} onClick={()=>selectAllWords(false)}>Deselect All Words</button>
                                        <br/>
                                        {
                                            wordsShown.map((word)=>(
                                                <span key={word.wordId}>
                                                    <input 
                                                    disabled={lineConfirmed}
                                                    onClick={()=>updateIndexesOfSungWords()}
                                                    name={`lineId_${lineId}_wordId_${word.wordId}`}
                                                    type='checkbox' 
                                                    id={`lineId_${lineId}_wordId_${word.wordId}`} />
                                                    <label htmlFor={`lineId_${lineId}_wordId_${word.wordId}`}>{word.word}</label>
                                                </span>
                                            ))
                                        }
                                        <br/>
                                    </div>
                                }
                            </>
                        </td>
                        <td style={{textAlign:'center',border: '3px solid black'}}>
                            <button disabled={lineConfirmed || !textShown} onClick={()=>confirmLine()}>Confirm Line {`# ${lineId+1}`}</button>
                            <br/>{lineConfirmed && <h1>✅</h1>}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default LineTextInfoForm;