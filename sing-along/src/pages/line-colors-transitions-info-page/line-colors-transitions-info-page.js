import React, {useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './line-colors-transitions-info-page.styles.css'
import LineColorsTransitionsForm from './line-colors-transitions-form'

function LineColorsTransitionsInfoPage() {
    document.title = 'Line Styles Info: Sing-Along Subtitle Generator'
   
    const navigate = useNavigate();
    const location = useLocation();

    const [defaultPreColor, setDefaultPreColor] = useState('#05dfd7');
    const [defaultPostColor, setDefaultPostColor] = useState('#ffffff');

    const data = location.state?.data;

    const elaboratedLines = [];
    for (let l = 0; l < data.lines.length; l++) {
        const _line = data.lines[l];
        const _words = _line.textShown.split(' ')

        _line.enterTransition = 'slidein';
        _line.exitTransition = 'slideout';
        _line.enterTransitionId = 1;
        _line.exitTransitionId = 1;

        _line.preColors = new Array(_words.length).fill(defaultPreColor);
        _line.postColors = new Array(_words.length).fill(defaultPostColor);
        _line.preColorChoice = 'single';
        _line.postColorChoice = 'single';

        if (_line.repeatsPreviousTextShown) {
            _line.preColors = _line.postColors;
        }
        _line.colorsAndTransitionsSaved = false;
        elaboratedLines.push(_line)
    }
    const [lines, setLines] = useState(elaboratedLines)

    const [lineCount, setLineCount] = useState(data.lineCount)
    
    const [defaultEnterTransition, setDefaultEnterTransition] = useState('slidein')
    const [defaultExitTransition, setDefaultExitTransition] = useState('slideout')
    const transitionOptions = ['slide', 'cut', 'fade'];

    const confirmAllInformation = () => {
        let savedCount = 0;
        for (let u = 0; u < lines.length; u++) {
            savedCount += lines[u].colorsAndTransitionsSaved ? 1 : 0;
        }

        if (savedCount === lines.length){
            const data = {
                lines: lines,
                lineCount: lines.length
            }
            console.log(data)
            navigate('/line-typography-frame-info', { 
                state: data
            });
        }
        else {
            alert(`ERROR: ${lines.length-savedCount} line(s) do not have their colors/transitions saved.`)
        }
        

        
    }
    const updateLine = (lineObject) => {
        const updatedLines = lines;
        for (let l = 0; l < lines.length; l++) {
            if (updatedLines[l].id===lineObject.id) {
                updatedLines[l] = lineObject;

                if (l !== lines.length-1 && updatedLines[l+1].repeatsPreviousTextShown){
                    updatedLines[l+1].preColorChoice=lineObject.postColorChoice;
                    updatedLines[l+1].preColors=lineObject.postColors;
                }
                
            } 
        }
        
        setLines(updatedLines);
    }

    return (
        <div className='line-colors-transitions-info-page-main'>
            <header className='header'>
            </header>
            
            <div className='content'>
                <h1>Colors and Transitions</h1>
                <hr/>
                <button onClick={()=>confirmAllInformation()}>Confirm All Information</button><br/><br/>
                <table style={{textAlign:'center',border: '3px solid black'}}>
                    <tbody>
                        <tr >
                            <td style={{textAlign:'center',border: '3px solid black'}}>
                            Default<br/>Pre-Color
                            </td>
                            <td style={{textAlign:'center',border: '3px solid black'}}>
                            Default<br/>Post-Color
                            </td>
                            <td style={{textAlign:'center',border: '3px solid black'}}>
                            Default<br/>Enter Transition
                            </td>
                            <td style={{textAlign:'center',border: '3px solid black'}}>
                            Default<br/>Exit Transition
                            </td>
                            {/* <td style={{textAlign:'center', border: '3px solid black'}}>
                            Default<br/>Grammar Style
                            </td> */}
                        </tr>
                        <tr>
                            <td style={{textAlign:'center', border: '3px solid black'}}>
                                <input onChange={(e)=>setDefaultPreColor(e.target.value)} type='color' value={defaultPreColor} />
                            </td>
                            <td style={{textAlign:'center', border: '3px solid black'}}>
                                <input onChange={(e)=>setDefaultPostColor(e.target.value)} type='color' value={defaultPostColor} />
                            </td>
                            <td style={{textAlign:'center', border: '3px solid black'}}>
                                {
                                    transitionOptions.map((option) => (
                                        <div key={option}>
                                            <input onClick={()=>setDefaultEnterTransition(option+'in')} defaultChecked={option==='slide'} id={`defaultEnterTransition_${option}`} name='defaultEnterTransition' type='radio' value={`${option}in`} />
                                            <label htmlFor={`defaultEnterTransition_${option}`}>{`${option} in`}</label>
                                            <br/>
                                        </div>
                                    ))
                                }
                            </td>
                            <td style={{textAlign:'center', border: '3px solid black'}}>
                            {
                                transitionOptions.map((option) => (
                                    <div key={option}>
                                        <input onClick={()=>setDefaultExitTransition(option+'out')} defaultChecked={option==='slide'} id={`defaultExitTransition_${option}`} name='defaultExitTransition' type='radio' value={`${option}out`} />
                                        <label htmlFor={`defaultExitTransition_${option}`}>{`${option} out`}</label>
                                        <br/>
                                    </div>
                                ))
                                }
                            </td>
                            {/* <td style={{textAlign:'center', border: '3px solid black'}}>
                                <input defaultChecked={true} onClick={()=>setGrammar('original')} name='grammar_choice' id='grammar_original' type='radio'/><label  htmlFor='grammar_original'>Keep as entered</label><br/>
                                <input onClick={()=>setGrammar('uppercase')} name='grammar_choice' id='grammar_uppercase' type='radio'/><label  htmlFor='grammar_uppercase'>UPPERCASE</label><br/>
                                <input onClick={()=>setGrammar('lowercase')} name='grammar_choice' id='grammar_lowercase' type='radio'/><label  htmlFor='grammar_lowercase'>lowercase</label><br/>
                                <input onClick={()=>setGrammar('capsfirstonly')} name='grammar_choice' id='grammar_capsfirstonly' type='radio'/><label  htmlFor='grammar_capsfirstonly'>Capitalize only first word</label><br/>
                                <input onClick={()=>setGrammar('capsallwords')} name='grammar_choice' id='grammar_capsallwords' type='radio'/><label htmlFor='grammar_capsallwords'>Capitalize Every Word</label><br/>
                            </td> */}
                        </tr>
                    </tbody>
                </table>
              
                <hr/>
                {
                    lineCount>0 &&
                    lines.map((line) => {
                        const _words = line.textShown.split(' ')
                        const words = []
                        for (let w = 0; w < _words.length; w++) {
                            words.push({wordId:w, word:_words[w], willBeSung:line.indexesOfShownWordsSung.includes(w)})
                        }
                        
                        let default_pre_color = defaultPreColor;
                        if (line.repeatsPreviousTextShown) {
                            if (lines[line.id - 1].postColorChoice==='single') {
                                default_pre_color = lines[line.id - 1].postColors[0];
                            }
                        }

                        return (
                            <div key={line.id}> 
                                <LineColorsTransitionsForm 
                                    defaultEnterTrans={defaultEnterTransition}
                                    defaultExitTrans={defaultExitTransition}
                                    defaultPrecolor={default_pre_color} 
                                    defaultPostcolor={defaultPostColor}
                                    precolors={line.preColors} 
                                    postcolors={line.postColors} 
                                    lineInfo={line} 
                                    words={words}
                                    confirmStyleInfo={updateLine}/>
                                <br/>
                            </div>
                        )
                    } )
                }
                <hr/>
            </div>
        </div>
    )
}

export default LineColorsTransitionsInfoPage;