import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './line-typography-frame-info-page.styles.css'
import oneLinePic from '../../assets/images/screenshots/oneLinePic.png'
import twoLinePic from '../../assets/images/screenshots/twoLinePic.jpg'
import bottomPosition from '../../assets/images/screenshots/bottomPosition.png'
import centerPosition from '../../assets/images/screenshots/centerPosition.png'
import FontPicker from './font-picker';
import { fonts } from '../../data/fonts/font-names';
import { transform_text, get_longest_line_display } from '../../backend/getScripts';

function LineTypographyFrameInfoPage() {
    document.title = 'Typography & Frame Details: Sing-Along Subtitle Generator'
    const navigate = useNavigate();
    const location = useLocation();

    const [grammar, setGrammar] = useState('original')
    const [font, setFont] = useState(fonts[0]);
    const [wouldBeFontSize, setWouldBeFontSize] = useState(50);

    const data = location.state?.data;

    const [longestTextShown] = useState(data.longestTextShown)
    const [tentFrameWidth, setTentFrameWidth] = useState(640)
    const [tentFrameHeight, setTentFrameHeight] = useState(480)
    
    let _frame_width = 640
    let _frame_height = 480
    let _font_size = 50
    const [position, setPosition] = useState('bottom')
    let _max_line_count = 1
    let _y_sing = _frame_height - (_font_size * _max_line_count);        
    let _y_wait = _y_sing + (_font_size * (_max_line_count===1 ? 1 : 1.5));
 
    const [fontWordSpacing, setFontWordSpacing] = useState(font.wordSpacing);
    const [sampleText, setSampleText] = useState('')
    const [customFontName, setCustomFontName] = useState('MyFontName')

    const confirmFrameDetails = () => {
        _frame_width = parseFloat(document.getElementById('frameWidth').value)
        _frame_height = parseFloat(document.getElementById('frameHeight').value)
        _font_size = parseFloat(document.getElementById('fontSize').value)
        _max_line_count = parseInt((document.getElementById('maxTwoLinesBtn').checked ? 2 : 1)); 
        
        let _pos_centered = document.getElementById('framePositionCentered').checked
        let _pos_bottom = document.getElementById('framePositionBottom').checked
        let _pos_custom = document.getElementById('framePositionCustom').checked
        let _custom_y_sing = parseFloat(document.getElementById('customYsing').value)
        const _font_name = (font.name==='Other Font') ? document.getElementById('customFontName').value : font.name

        let _word_spacing = 1;
        if (font.name==='Other Font') {
            _word_spacing = document.getElementById('customWordSpacing1').checked ? 1 : 2;
        }
        else {
            _word_spacing = font.wordSpacing;
        } 

        if (isNaN(_frame_height) || isNaN(_frame_width)) {
            alert('ERROR: The frame width and/or height are missing.')
        }
        else if (font.name === 'Other Font' && _font_name==='') {
            alert('ERROR: You have not specified the name of a custom font.')
        }
        else if (isNaN(_font_size) || _font_size <= 0) {
            alert('ERROR: The font size is missing or invalid.')
        }
        else if (_pos_custom && (isNaN(_custom_y_sing) || _custom_y_sing-_font_size<0 || _custom_y_sing>_frame_height)) {
            alert('ERROR: The custom Y-Sing coordinate is either missing or will make lines appear partially or entirely off-screen.')
        }
        else {
            let _position = '';
            if (_pos_centered) {
                _y_sing = ((_frame_height/2) + (_font_size/2))
                _y_wait = _y_sing + (_font_size * (_max_line_count===1 ? 1 : 1.25));
                _position = 'centered'
            }
            else if (_pos_bottom) {
                if (_max_line_count === 1) {
                    _y_sing = _frame_height * 0.93
                    _y_wait = _y_sing + _font_size;
                }
                else {
                    _y_wait = _frame_height * 0.93
                    _y_sing = _y_wait - (_font_size * 1.5)
                }
                _position = 'bottom'
            }
            else if (_pos_custom) {
                _y_sing = parseFloat(document.getElementById('customYsing').value)
                _y_wait = _y_sing + (_font_size * (_max_line_count===1 ? 1 : 1.25));
                _position = 'custom'
            }

            const _font_info = {fontName: _font_name, fontWordSpacing: _word_spacing, fontSize: _font_size};
            const _state = {
                data: {
                    lines: data.lines,
                    lineCount: data.lineCount,
                    grammar: grammar,
                    frameHeight: _frame_height, 
                    frameWidth: _frame_width,
                    ySing: _y_sing, 
                    yWait: _y_wait, 
                    maxLineCount: _max_line_count,
                    position: _position,
                    fontInfo: _font_info,
                }
            }
            
            navigate('/line-timing-info', { 
                state: _state
            });
        }
    }
   
    useEffect(() => {
        setFontWordSpacing(font.wordSpacing);
    }, [font])

    return (
        <div className='line-typography-frame-info-page-main'>
            <header className='header'></header>
            
            <div className='content'>
                <h1>Typography & Frame Details</h1>
                <hr/>
                <table style={{textAlign:'center', border: '3px solid black'}}>
                    <tbody>
                        <tr >
                            <td style={{textAlign:'center', border: '3px solid black'}}>
                            Frame Width
                            </td>
                            <td style={{textAlign:'center', border: '3px solid black'}}>
                            Frame Height
                            </td>
                            <td style={{textAlign:'center', border: '3px solid black'}}>
                            Grammar Choice
                            </td>
                            <td style={{textAlign:'center', border: '3px solid black'}}>
                            Font Size
                            </td>
                        </tr>
                        <tr>
                            <td style={{textAlign:'center', border: '3px solid black'}}>
                                <input style={{textAlign:'center'}}
                                defaultValue={640} 
                                value={tentFrameWidth}
                                onChange={(e)=>setTentFrameWidth(e.target.value)}
                                id='frameWidth' 
                                type='number'/><br/>pixels <br/>
                            </td>
                            <td style={{textAlign:'center', border: '3px solid black'}}>
                                <input style={{textAlign:'center'}}
                                defaultValue={480} 
                                value={tentFrameHeight}
                                onChange={(e)=>setTentFrameHeight(e.target.value)}
                                id='frameHeight' 
                                type='number'/><br/>pixels <br/>
                            </td>
                            <td style={{textAlign:'center', border: '3px solid black'}}>
                                <input defaultChecked={true} onClick={()=>{setGrammar('original');}} name='grammar_choice' id='grammar_original' type='radio'/><label  htmlFor='grammar_original'>Keep as entered</label><br/>
                                <input onClick={()=>{setGrammar('uppercase');}} name='grammar_choice' id='grammar_uppercase' type='radio'/><label  htmlFor='grammar_uppercase'>UPPERCASE</label><br/>
                                <input onClick={()=>{setGrammar('lowercase');}} name='grammar_choice' id='grammar_lowercase' type='radio'/><label  htmlFor='grammar_lowercase'>lowercase</label><br/>
                                <input onClick={()=>{setGrammar('capsfirstonly');}} name='grammar_choice' id='grammar_capsfirstonly' type='radio'/><label  htmlFor='grammar_capsfirstonly'>Capitalize only first word</label><br/>
                                <input onClick={()=>{setGrammar('capsallwords');}} name='grammar_choice' id='grammar_capsallwords' type='radio'/><label htmlFor='grammar_capsallwords'>Capitalize Every Word</label><br/>
                            </td>
                            <td style={{textAlign:'center', border: '3px solid black'}}>
                                <input style={{textAlign:'center'}}
                                placeholder='Font Size'
                                id='fontSize' 
                                value={wouldBeFontSize}
                                onChange={(e) => setWouldBeFontSize(e.target.value)}
                                type='number'/>
                            </td>
                            
                        </tr>
                    </tbody>
                </table>


                <hr/>
                <table>
                    <tbody style={{border: '3px solid black'}}>
                        <tr>
                            <td style={{border: '3px solid black', textAlign:'center'}}> 
                                <h2>Select the position of the lines</h2>
                                <table>
                                    <tbody style={{border: '3px solid black'}}>
                                        <tr>
                                            <td style={{border: '3px solid black'}}>
                                                <input onClick={()=>{setPosition('bottom')}} defaultChecked={true} value='bottom' name='framePosition' id='framePositionBottom' type='radio'/>
                                                <label htmlFor='framePositionBottom'>Bottom of Frame</label><br/>   
                                                <label htmlFor='framePositionBottom'><img width={250} height={200} src={bottomPosition} alt="f"/><br/></label> 
                                            </td>
                                            <td style={{border: '3px solid black'}}>
                                                <input onClick={()=>{setPosition('centered')}} name='framePosition' value='centered' id='framePositionCentered' type='radio'/>
                                                <label htmlFor='framePositionCentered'>Middle Of Frame</label><br/>
                                                <label htmlFor='framePositionCentered'><img width={250} height={200} src={centerPosition} alt="f"/><br/></label>
                                            </td>
                                            <td style={{border: '3px solid black'}}>
                                                <input onClick={()=>{setPosition('custom')}} name='framePosition' value='custom' id='framePositionCustom' type='radio'/>
                                                <label htmlFor='framePositionCustom'>Custom Position</label><br/>
                                                <input style={{textAlign:'center'}}
                                                placeholder='custom Y-Sing'
                                                id='customYsing' 
                                                disabled={position!=='custom'}
                                                type='number'/>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td colSpan={3} rowSpan={2} style={{border: '3px solid black', textAlign:'center'}}>
                                <h2>Select your default font for each line</h2>
                                <h4>Choose a font from the catalogue below, or select "Other Font" to enter a custom font.<br/>
                                In order to use a font (listed or custom), you must have it installed on your local operating system.</h4>

                                <h4>All the fonts below were used in one or more of the following videocassette series: 
                                    <ul>
                                        <li><i>Disney Sing-Along Songs</i></li>
                                        <li><i>Alvin & the Chipmunks Sing-Alongs</i></li>
                                        <li><i>Screen Songs</i> by Fleischer Studios</li>
                                        <li><i>Dr. Seuss Sing-Along Classics</i></li>
                                        <li><i>Animaniacs Sing-Along</i></li>
                                    </ul>
                                </h4>
                                
                                Enter sample text: 
                                <input style={{textAlign:'center', width:250}}
                                placeholder='Sample text here'
                                id='fontSampleText' 
                                type='text'
                                value={sampleText}
                                onChange={(e)=>setSampleText(e.target.value)}/><br/><br/>
                                <div style={{justifyContent:'center'}}>
                                    <FontPicker sampleText={sampleText} grammarChoice={grammar} configureFont={setFont}/>
                                </div>
                                
                                {
                                    font.name !== 'Other Font' &&
                                    <>
                                    
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div style={{border: '3px solid black', textAlign:'center'}}>
                                                        <h3>Example 1: </h3>
                                                        <img width={240} height={200} src={font.example1.screenshot} alt="f"/>
                                                        <h4><i>{font.example1.videoName}</i></h4>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div style={{border: '3px solid black', textAlign:'center'}}>
                                                        <h3>Example 2: </h3>
                                                        <img width={240} height={200} src={font.example2.screenshot} alt="f"/>
                                                        <h4><i>{font.example2.videoName}</i></h4>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <h4 style={{color:'orange'}}>
                                        For the font <i>{font.name}</i>, there will be {fontWordSpacing} space(s) between each word.
                                    </h4>
                                    </>
                                }
                                {
                                    font.name === 'Other Font' &&
                                    <div style={{textAlign:'center'}}>
                                        <p>Enter custom font name:</p>
                                        <input style={{textAlign:'center', width:250}}
                                        placeholder='custom font name'
                                        id='customFontName' 
                                        value={customFontName}
                                        onChange={(e)=>setCustomFontName(e.target.value)}
                                        type='text'/><br/>
                                        <p>Select the number of spaces between each word: </p>
                                        <input defaultChecked={true} name='customWordSpacing' id='customWordSpacing1' type='radio'/><label htmlFor='customWordSpacing1'>1 Space</label><br/>
                                        <input name='customWordSpacing' id='customWordSpacing2' type='radio'/><label htmlFor='customWordSpacing2'>2 Spaces</label>
                                    </div>
                                }
                                <h4>
                                    Also, it is suggested to copy-paste the sample subtitle below (with the longest line that'll be shown on screen) into Aegisub {font.fid !== 'other' ? `with ${fontWordSpacing} space(s) in between each word`: '' }, and try different font sizes
                                    until there's one you're satisfied with.<br/><br/>
                                    <span style={{color:'lime', fontSize:24}}>{`{\\pos(${tentFrameWidth/2},${Math.round(tentFrameHeight*0.93, 2)})}{\\fs${wouldBeFontSize}}{\\fn${font.fid !== 'other' ? font.name : (customFontName ? customFontName : 'MyFont')}}`}{get_longest_line_display(transform_text(longestTextShown, grammar), fontWordSpacing)}</span><br/><br/> 
                                    
                                </h4>
                            </td>
                        </tr>
                        <tr style={{border: '3px solid black'}}>
                            <td style={{border: '3px solid black', textAlign:'center'}}>
                            <h2>Select the maximum number of lines<br/>on the screen at once</h2>  
                                <table>
                                    <tbody style={{border: '3px solid black'}}>
                                        <tr style={{border: '3px solid black'}}>
                                            <td style={{border: '3px solid black'}}>
                                                <div id='maxOneLine'>
                                                    <input defaultChecked={true} name='maxLines' id='maxOneLineBtn' type='radio' value='maxOneLine'/>
                                                    <label htmlFor='maxOneLineBtn'>Max. 1 Line</label>
                                                    <br/>
                                                    <label htmlFor='maxOneLineBtn'><img width={200} height={200} src={oneLinePic} alt="f"/><br/></label>
                                                </div>
                                            </td>
                                            <td style={{border: '3px solid black'}}>
                                                <div id='maxTwoLines'>
                                                    <input name='maxLines' id='maxTwoLinesBtn' type='radio' value='maxTwoLines'/>
                                                    <label htmlFor='maxTwoLinesBtn'>Max. 2 Lines</label>
                                                    <br/>
                                                    <label htmlFor='maxTwoLinesBtn'><img width={200} height={200} src={twoLinePic} alt="g"/></label>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <hr/>
                    <button onClick={()=>confirmFrameDetails()}>Confirm Frame Details</button>
                <hr/>
            </div>
        </div>
    )
}

export default LineTypographyFrameInfoPage;