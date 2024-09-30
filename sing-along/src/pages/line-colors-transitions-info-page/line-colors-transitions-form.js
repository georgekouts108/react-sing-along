import React, {useState, useEffect} from 'react'

function LineColorsTransitionsForm({
    defaultPrecolor, defaultPostcolor, precolors, postcolors, 
    lineInfo, words, defaultEnterTrans, defaultExitTrans, confirmStyleInfo}) {
    const _words=words;
    const [infoSaved, setInfoSaved] = useState(false);
    const [colorsRefreshed, setColorsRefreshed] = useState(false);

    const [preColorChoice, setPreColorChoice] = useState(lineInfo.preColorChoice)
    const [postColorChoice, setPostColorChoice] = useState(lineInfo.postColorChoice)

    const [enterTransition, setEnterTransition] = useState(defaultEnterTrans);
    
    useEffect(() => {
        setEnterTransition(defaultEnterTrans);
        setInfoSaved(false);
        unsaveColorsAndTransitions();
    }, [defaultEnterTrans]);

    const [exitTransition, setExitTransition] = useState(defaultExitTrans);
    
    useEffect(() => {
        setExitTransition(defaultExitTrans);
        setInfoSaved(false); 
        unsaveColorsAndTransitions();
    }, [defaultExitTrans]);

    const [singlePrecolor, setSinglePrecolor] = useState(defaultPrecolor);
    
    useEffect(() => {
        setSinglePrecolor(defaultPrecolor);
        setInfoSaved(false);
        setColorsRefreshed(false);
        unsaveColorsAndTransitions();
    }, [defaultPrecolor]);
    
    const [singlePostcolor, setSinglePostcolor] = useState(defaultPostcolor);
    
    useEffect(() => {
        setSinglePostcolor(defaultPostcolor);
        setInfoSaved(false);
        setColorsRefreshed(false);
        unsaveColorsAndTransitions();
    }, [defaultPostcolor]);


    const [multiplePrecolors, setMultiplePrecolors] = useState(precolors);
    
    useEffect(() => {
        setMultiplePrecolors(precolors);
        setInfoSaved(false);
        unsaveColorsAndTransitions();
      }, [precolors]);

    const [multiplePostcolors, setMultiplePostcolors] = useState(postcolors);
    useEffect(() => {
        setMultiplePostcolors(postcolors);
        setInfoSaved(false);
        unsaveColorsAndTransitions();
      }, [postcolors]);

    const changeMultiColor = (color, index, preOrPost) => {
        if (preOrPost==='pre') {
            precolors[index]=color
        }
        else {
            postcolors[index]=color
        }
        setInfoSaved(false);
        unsaveColorsAndTransitions();
        setColorsRefreshed(false);
    }
    
    const enterTransitionIDs = {'cutin':0, 'slidein':1, 'fadein':2};
    const exitTransitionIDs = {'cutout':0, 'slideout':1, 'fadeout':2};

    const saveColorsAndTransitions = () => {
        if (!colorsRefreshed) {
            alert(`Please confirm Line ${lineInfo.id+1}'s colors before saving the style details.`);
        }
        else {
            let preColors = [];
            if (!lineInfo.repeatsPreviousTextShown) {
                if (preColorChoice === 'single') {
                    const color = document.getElementById(`single_pre_color_for_line${lineInfo.id}`).value
                    for (let w = 0; w < words.length; w++) {
                        preColors.push(color);
                    }
                }
                else {
                    for (let w = 0; w < words.length; w++) {
                        const color = document.getElementById(`pre_color_for_line${lineInfo.id}_word${w}`).value
                        preColors.push(color);
                    }
                }
            }
            else {
                preColors = precolors;
            }

            const postColors = [];
            if (postColorChoice === 'single') {
                const color = document.getElementById(`single_post_color_for_line${lineInfo.id}`).value
                for (let w = 0; w < words.length; w++) {
                    postColors.push(color)
                }
            }
            else {
                for (let w = 0; w < words.length; w++) {
                    const color = document.getElementById(`post_color_for_line${lineInfo.id}_word${w}`).value
                    postColors.push(color);
                }
            }

            lineInfo.enterTransition = enterTransition;
            lineInfo.exitTransition = exitTransition;
            lineInfo.enterTransitionId = enterTransitionIDs[enterTransition];
            lineInfo.exitTransitionId = exitTransitionIDs[exitTransition];
            lineInfo.preColors = preColors;
            lineInfo.postColors = postColors;
            lineInfo.preColorChoice = preColorChoice;
            lineInfo.postColorChoice = postColorChoice;
            lineInfo.colorsAndTransitionsSaved = true;

            setInfoSaved(true);
            confirmStyleInfo(lineInfo);
        }
    }
    const unsaveColorsAndTransitions =()=>{
        lineInfo.colorsAndTransitionsSaved = false;
        confirmStyleInfo(lineInfo);
    }

    const changePostColorChoice = (choice) => {
        setPostColorChoice(choice);
        lineInfo.postColorChoice=choice;
    }
    const changeSinglePostColor = (color) => {
        setSinglePostcolor(color);
        lineInfo.postColors = new Array(_words.length).fill(color)
    }

    return (
        <div>
            <table style={{border: '3px solid black', textAlign: 'center'}}>
     
                <tbody>
                    <tr colSpan={1+words.length} style={{fontWeight:'bold'}}>
                        LINE {lineInfo.id +1} <span style={{color:'yellow'}}>{lineInfo.repeatsPreviousTextShown ? `(Repeats Line ${lineInfo.id}'s shown text)` : ''}</span>
                    </tr>
                    <tr>
                        <td style={{border: '3px solid black'}}>
                            WORD(S)
                        </td>
                        {
                            words.map((word) => (
                                <td key={word.wordId} style={{border: '3px solid black'}}>
                                    {word.word}
                                    <span><br/>{word.willBeSung ? '🎤' : '🔇'}</span>
                                </td>
                            ))
                        }
                    </tr>
                    
                    <tr>
                        {
                            lineInfo.repeatsPreviousTextShown &&
                            <>
                            <td  style={{border: '3px solid black'}}>
                                PRE-COLOR(S) 
                            </td>
                            <td colSpan={words.length} style={{border: '3px solid black'}}>
                                POST-COLOR(S) for LINE {lineInfo.id}
                            </td>
                            </>
                        }
                        {
                            !lineInfo.repeatsPreviousTextShown &&
                            <>
                                <td style={{border: '3px solid black'}}>
                                    PRE-COLOR(S)<br/><br/>
                                    <input defaultChecked={lineInfo.preColorChoice==='single'} onClick={()=>{setPreColorChoice('single'); setInfoSaved(false);unsaveColorsAndTransitions();}} type='radio' name={`preColorChoice${lineInfo.id}`} value='single' id={`lineId_${lineInfo.id}_preColorChoice_single`}/>
                                    <label htmlFor={`lineId_${lineInfo.id}_preColorChoice_single`}>Same color for all words</label><br/>
                                    <input defaultChecked={lineInfo.preColorChoice==='multiple'} onClick={()=>{setPreColorChoice('multiple'); setInfoSaved(false);unsaveColorsAndTransitions();}} type='radio' name={`preColorChoice${lineInfo.id}`} value='multiple' id={`lineId_${lineInfo.id}_preColorChoice_multiple`}/>
                                    <label htmlFor={`lineId_${lineInfo.id}_preColorChoice_multiple`}>Different color for each word</label><br/>
                                </td>

                                {
                                    preColorChoice==='single' && 
                                    <td colSpan={words.length} style={{border: '3px solid black'}}>
                                        <input  
                                        id={`single_pre_color_for_line${lineInfo.id}`} 
                                        type='color' 
                                        onChange={(e)=>{setSinglePrecolor(e.target.value); setInfoSaved(false); setColorsRefreshed(false);unsaveColorsAndTransitions();}}
                                        value={singlePrecolor} />
                                    </td>
                                }

                                {
                                    preColorChoice==='multiple' && 
                                    words.map((word) => (
                                        <td key={word.wordId} style={{border: '3px solid black'}}>
                                            <input id={`pre_color_for_line${lineInfo.id}_word${word.wordId}`} 
                                            type='color' 
                                            onChange={(e)=>changeMultiColor(e.target.value, word.wordId, 'pre')}
                                            value={multiplePrecolors[word.wordId]}/>
                                        </td>
                                    ))
                                }
                            </>
                        }


                        
                    </tr>

                    <tr>
                        <td style={{border: '3px solid black'}}>
                            POST-COLOR(S)<br/><br/>
                            <input defaultChecked={lineInfo.postColorChoice==='single'} onClick={(e)=>{changePostColorChoice(e.target.value); setInfoSaved(false);unsaveColorsAndTransitions();}} type='radio' name={`postColorChoice${lineInfo.id}`} value='single' id={`lineId_${lineInfo.id}_postColorChoice_single`}/>
                            <label htmlFor={`lineId_${lineInfo.id}_postColorChoice_single`}>Same color for all words</label><br/>
                            <input defaultChecked={lineInfo.postColorChoice==='multiple'} onClick={(e)=>{changePostColorChoice(e.target.value); setInfoSaved(false);unsaveColorsAndTransitions();}} type='radio' name={`postColorChoice${lineInfo.id}`} value='multiple' id={`lineId_${lineInfo.id}_postColorChoice_multiple`}/>
                            <label htmlFor={`lineId_${lineInfo.id}_postColorChoice_multiple`}>Different color for each word</label><br/>
                        </td>
                        {
                            postColorChoice==='single' && 
                            <td colSpan={words.length} style={{border: '3px solid black'}}>
                                <input id={`single_post_color_for_line${lineInfo.id}`} 
                                type='color' 
                                onChange={(e)=>{changeSinglePostColor(e.target.value); setInfoSaved(false); setColorsRefreshed(false);unsaveColorsAndTransitions();}}
                                value={singlePostcolor} />
                            </td>
                        }

                        {
                            postColorChoice==='multiple' && 
                            words.map((word) => (
                                <td key={word.wordId} style={{border: '3px solid black'}}>
                                    <input id={`post_color_for_line${lineInfo.id}_word${word.wordId}`} 
                                    type='color' 
                                    onChange={(e)=>changeMultiColor(e.target.value, word.wordId, 'post')}
                                    value={multiplePostcolors[word.wordId]} />
                                </td>
                            ))
                        }
                    </tr>
                    <tr style={{ border: '3px solid black'}}>
                        <td colSpan={1+words.length} >
                            Enter Transition:
                            <input checked={enterTransition==='slidein'} onClick={()=>{setEnterTransition('slidein'); setInfoSaved(false);unsaveColorsAndTransitions();}} id={`enter_trans_line${lineInfo.id}_slidein`} name={`enter_trans_line${lineInfo.id}`} type='radio'/>slide in
                            <input checked={enterTransition==='cutin'} onClick={()=>{setEnterTransition('cutin'); setInfoSaved(false);unsaveColorsAndTransitions();}} id={`enter_trans_line${lineInfo.id}_cutin`} name={`enter_trans_line${lineInfo.id}`} type='radio'/>cut in
                            <input checked={enterTransition==='fadein'} onClick={()=>{setEnterTransition('fadein'); setInfoSaved(false);unsaveColorsAndTransitions();}} id={`enter_trans_line${lineInfo.id}_fadein`} name={`enter_trans_line${lineInfo.id}`} type='radio'/>fade in
                        </td>
                    </tr>
                    <tr style={{ border: '3px solid black'}}>
                        <td colSpan={1+words.length} >
                            Exit Transition:
                            <input checked={exitTransition==='slideout'} onClick={()=>{setExitTransition('slideout'); setInfoSaved(false);unsaveColorsAndTransitions();}} id={`exit_trans_line${lineInfo.id}_slideout`} name={`exit_trans_line${lineInfo.id}`} type='radio'/>slide out
                            <input checked={exitTransition==='cutout'} onClick={()=>{setExitTransition('cutout'); setInfoSaved(false);unsaveColorsAndTransitions();}} id={`exit_trans_line${lineInfo.id}_cutout`} name={`exit_trans_line${lineInfo.id}`} type='radio'/>cut out
                            <input checked={exitTransition==='fadeout'} onClick={()=>{setExitTransition('fadeout'); setInfoSaved(false);unsaveColorsAndTransitions();}} id={`exit_trans_line${lineInfo.id}_fadeout`} name={`exit_trans_line${lineInfo.id}`} type='radio'/>fade out
                        </td>
                    </tr>
                    <tr style={{ border: '3px solid black'}}>
                        <td colSpan={1+words.length} >
                            <button disabled={colorsRefreshed} onClick={()=>setColorsRefreshed(true)}>Confirm Colors</button>&nbsp;&nbsp;
                            <button disabled={infoSaved} onClick={()=>saveColorsAndTransitions()}>Save Details</button>
                        </td>
                    </tr>
                    
                </tbody>
           
            </table>
        </div>
    )
}

export default LineColorsTransitionsForm;