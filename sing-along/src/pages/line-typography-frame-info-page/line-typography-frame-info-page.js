import React, {useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './line-typography-frame-info-page.styles.css'
import oneLinePic from '../../assets/images/screenshots/oneLinePic.png'
import twoLinePic from '../../assets/images/screenshots/twoLinePic.jpg'

function LineTypographyFrameInfoPage() {
    document.title = 'Typography & Frame Details: Sing-Along Subtitle Generator'
    const navigate = useNavigate();
    const location = useLocation();

    const [grammar, setGrammar] = useState('original')
    const [font, setFont] = useState('Dom Casual D')
    const data = location.state?.data;
    

    let _frame_width = 640
    let _frame_height = 480
    let _font_size = 40
    let _centered = false
    let _max_line_count = 1
    let _y_sing = _centered ? ((_frame_height/2) + _font_size): (_frame_height - (_font_size * _max_line_count));        
    let _y_wait = _y_sing + (_font_size * (_max_line_count===1 ? 1 : 1.5));

    const confirmFrameDetails = () => {
        _frame_width = parseFloat(document.getElementById('frameWidth').value)
        _frame_height = parseFloat(document.getElementById('frameHeight').value)
        _font_size = parseFloat(document.getElementById('fontSize').value)
        _centered = document.getElementById('framePositionCentered').checked
        _max_line_count = parseInt((document.getElementById('maxTwoLinesBtn').checked ? 2 : 1)); 
        _y_sing = _centered ? (parseFloat(_frame_height/2) + _font_size) : (_frame_height - (_font_size * (_max_line_count===1? 1 : 2.5)));        
        _y_wait = _y_sing + (_font_size * (_max_line_count===1 ? 1 : 1.5));
         
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
                centered: _centered,
                font:font,
                fontSize: _font_size
            }
        }
        console.log(_state)
        // navigate('/finished', { 
            // state: _state
        // });
    }


    return (
        <div className='line-typography-frame-info-page-main'>
            <header className='header'></header>
            
            <div className='content'>
                <h1>Typography & Frame Details</h1>
                <hr/>
                <table style={{textAlign:'center',border: '3px solid black'}}>
                    <tbody>
                        <tr >
                            <td style={{textAlign:'center',border: '3px solid black'}}>
                            Frame Width
                            </td>
                            <td style={{textAlign:'center',border: '3px solid black'}}>
                            Frame Height
                            </td>
                            <td style={{textAlign:'center',border: '3px solid black'}}>
                            Grammar Choice
                            </td>
                            <td style={{textAlign:'center',border: '3px solid black'}}>
                            Font Size
                            </td>
                            <td style={{textAlign:'center',border: '3px solid black'}}>
                            Lines on<br/>Frame Center?
                            </td>
                        </tr>
                        <tr>
                            <td style={{textAlign:'center', border: '3px solid black'}}>
                                <input style={{textAlign:'center'}}
                                defaultValue={640} 
                                id='frameWidth' 
                                type='number'/><br/>pixels <br/>
                            </td>
                            <td style={{textAlign:'center', border: '3px solid black'}}>
                                <input style={{textAlign:'center'}}
                                defaultValue={480} 
                                id='frameHeight' 
                                type='number'/><br/>pixels <br/>
                            </td>
                            <td style={{textAlign:'center', border: '3px solid black'}}>
                                <input defaultChecked={true} onClick={()=>setGrammar('original')} name='grammar_choice' id='grammar_original' type='radio'/><label  htmlFor='grammar_original'>Keep as entered</label><br/>
                                <input onClick={()=>setGrammar('uppercase')} name='grammar_choice' id='grammar_uppercase' type='radio'/><label  htmlFor='grammar_uppercase'>UPPERCASE</label><br/>
                                <input onClick={()=>setGrammar('lowercase')} name='grammar_choice' id='grammar_lowercase' type='radio'/><label  htmlFor='grammar_lowercase'>lowercase</label><br/>
                                <input onClick={()=>setGrammar('capsfirstonly')} name='grammar_choice' id='grammar_capsfirstonly' type='radio'/><label  htmlFor='grammar_capsfirstonly'>Capitalize only first word</label><br/>
                                <input onClick={()=>setGrammar('capsallwords')} name='grammar_choice' id='grammar_capsallwords' type='radio'/><label htmlFor='grammar_capsallwords'>Capitalize Every Word</label><br/>
                            </td>
                            <td style={{textAlign:'center', border: '3px solid black'}}>
                                <input style={{textAlign:'center'}}
                                defaultValue={40} 
                                id='fontSize' 
                                type='number'/>
                            </td>
                            <td style={{textAlign:'center',border: '3px solid black'}}>
                                <input name='framePosition' value={true} id='framePositionCentered' type='radio'/>
                                <label htmlFor='ysing_centered'>Middle Of Frame</label><br/>

                                <input  defaultChecked={true} value={false} name='framePosition' id='framePositionCustom' type='radio'/>
                                <label htmlFor='ysing_custom'>Custom Coordinate</label><br/>           
                            </td>
                        </tr>
                    </tbody>
                </table>


                <hr/>
                <table>
                    <tbody style={{border: '3px solid black'}}>
                        <tr>
                            <td style={{border: '3px solid black'}}> 
                                <h2>Select the maximum number of lines<br/>on the screen at once</h2>   
                            </td>
                            <td style={{border: '3px solid black'}}>
                                <h2>Select your default font for each line</h2>
                                <h4>You may choose from the font catalogue below, or type the name of the font you wish to use.</h4>

                                <h4>All the fonts below have been used in one or more of these videocassette series: 
                                    <i>
                                    <ul>
                                        <li>Disney Sing-Along Songs</li>
                                        <li>Alvin & the Chipmunks Sing-Alongs</li>
                                        <li>Screen Songs by Fleischer Studios</li>
                                        <li>Dr. Seuss Sing-Along Classics</li>
                                    </ul>
                                    </i>
                                </h4>
                            </td>
                        </tr>
                        <tr style={{border: '3px solid black'}}>
                            <td style={{border: '3px solid black'}}>
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
                            <td style={{border: '3px solid black'}}>
                            (font repertoire here)
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