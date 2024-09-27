import React, {useState} from 'react'

function LineEntryForm(props) {
    const [lineId] = useState(props.line.id)

    const [repeatsPreviousTextShown, setRepeatsPreviousTextShown] = useState(props.line.wasCloned ? props.line.repeatsPreviousTextShown:false);
    const [displayChoice, setDisplayChoice] = useState(props.line.wasCloned ? props.line.displayChoice:'default');
    const [textShown, setTextShown] = useState(props.line.wasCloned ? props.line.textShown:'');
    
    const [textHeard, setTextHeard] = useState(props.line.wasCloned ? props.line.textHeard:'');
    let indexesOfSungWords = props.line.wasCloned ? props.line.indexesOfShownWordsSung:undefined;

    const [lineConfirmed, setLineConfirmed] = useState(props.line.wasCloned ? props.line.lineConfirmed:false);

    const getWords = (text) => {
        const wordArray = [];
        const words = text.trim().split(' ');
        for (let w = 0; w < words.length; w++) {
            wordArray.push({ wordId: w, word: words[w] });
        }
        return wordArray;
    }

    const [wordsShown, setWordsShown] = useState(props.line.wasCloned ? getWords(props.line.textShown):[]);

    const updateTextShown = (newText) => {
        
        setTextShown(newText);
        setTextHeard(newText);
        
        if (newText !== '') {
            setWordsShown(getWords(newText));
        }
        else {
            setWordsShown([])
        }
        selectAllWords(false);
    }
    // const updateTextHeard = (textHeard) => {
    //     setTextHeard(textHeard);
    // }

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
        if (displayChoice === 'default') {
            updateIndexesOfSungWords();
        }
        setLineConfirmed(true);
        
        const _line = props.line;
        _line.id = lineId
        _line.lineConfirmed = true
        _line.displayChoice = displayChoice 
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

    const updateDisplayChoice = (dchoice) => {
        setDisplayChoice(dchoice);
        updateTextShown('');
        setTextHeard('');
        

    }
    return (
        <div>
            <h3>LINE {`#${lineId + 1}`}</h3>
            {props.line.wasCloned && <h4>{`(Cloned from LINE #${props.line.clonedLineID+1})`}</h4>}
            <button disabled={!lineConfirmed} onClick={()=>props.clone(lineId)}>Clone This Line</button>
            <br/><br/>
            {   
                (lineId > 0 && displayChoice==='default') &&
                <>
                    <input id={`repPrevTS_line${lineId}`} onClick={(e)=>repeatPreviousTextShown(e.target.checked)} disabled={(lineConfirmed && props.getPreviousLine(lineId).lineConfirmed)} type='checkbox' defaultChecked={false} />
                    <label htmlFor={`repPrevTS_line${lineId}`}>Repeats text shown of LINE #{lineId} (this line must be confirmed)</label>
                    <br/><br/>
                </>
            }

            <input disabled={lineConfirmed} defaultChecked={true} onClick={()=>{updateDisplayChoice('default')}} type='radio' name={`displayType${lineId}`} value='default' id={`lineId_${lineId}_displayChoice_default`}/>
            <label htmlFor={`lineId_${lineId}_displayChoice_default`}>Default Display (Text Shown required)</label><br/>
            
            <input disabled={lineConfirmed} defaultChecked={props.line.displayChoice==='custom' || false} onClick={()=>{updateDisplayChoice('custom')}} type='radio' name={`displayType${lineId}`} value='custom' id={`lineId_${lineId}_displayChoice_custom`}/>
            <label htmlFor={`lineId_${lineId}_displayChoice_custom`}>Custom Display</label>
            
            <br/><br/>
            {
                (displayChoice==='default') && 
                <>
                Text Shown: <input 
                disabled={lineConfirmed || repeatsPreviousTextShown}
                style={{width:300}}
                value={textShown}
                onChange={(e) => updateTextShown(e.target.value)}
                type='text' 
                placeholder={`#${lineId} text shown`}/><br/>
                </>
            }

            Text Heard: <input
            disabled={lineConfirmed}
            style={{width:300}} 
            value={textHeard}
            onChange={(e) =>setTextHeard(e.target.value)}
            type='text' 
            placeholder={`#${lineId} text heard`}/>
            <br/><br/>

            {
                (displayChoice==='default') && 
                (<>
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
                                    <>
                                        <input 
                                        disabled={lineConfirmed}
                                        onClick={()=>updateIndexesOfSungWords()}
                                        name={`lineId_${lineId}_wordId_${word.wordId}`}
                                        type='checkbox' 
                                        id={`lineId_${lineId}_wordId_${word.wordId}`} />
                                        <label htmlFor={`lineId_${lineId}_wordId_${word.wordId}`}>{word.word}</label>
                                    </>
                                ))
                            }
                            <br/>
                        </div>
                    }
                </>
                )
            }

            <button disabled={lineConfirmed} onClick={()=>confirmLine()}>Confirm Line {`# ${lineId+1}`}</button>
            <hr/>
        </div>
    )
}

export default LineEntryForm;