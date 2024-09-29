import React, {useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './line-styles-info-page.styles.css'
// import SingAlongSongsLogo from '../../components/sing-along-songs-logo/sing-along-songs-logo';
// import { staff } from '../../assets/misc/misc';
import LyricStyleForm from '../../components/lyric-style-form';

function LineStylesInfoPage() {
    document.title = 'Line Styles Info: Sing-Along Subtitle Generator'
    
    const navigate = useNavigate();
    const location = useLocation();

    const data = location.state?.data;

    const [lineCount, setLineCount] = useState(data.lineCount)
    const [lines, setLines] = useState(data.lines)

    const [defaultPreColor, setDefaultPreColor] = useState('#ffff00')
    const [defaultPostColor, setDefaultPostColor] = useState('#ffffff')

    const [defaultEnterTransition, setDefaultEnterTransition] = useState('slidein')
    const [defaultExitTransition, setDefaultExitTransition] = useState('slideout')
    const transitionOptions = ['slide', 'cut', 'fade'];

    const [grammar, setGrammar] = useState('original')

    const confirmAllInformation = () => {
        // const data = {
        // }
        // console.log(data)

        // navigate('/line-timing', { 
        //     state: data
        // });
    }

    return (
        <div className='line-text-info-page-main'>
            <header className='header'>
                {/* <SingAlongSongsLogo/> */}
            </header>
            
            <div className='content'>
                <h1>Line Styles Information</h1>
                <hr/>
                <table style={{textAlign:'center',border: '3px solid black'}}>
                    <tbody>
                        <tr >
                            <td style={{textAlign:'center',border: '3px solid black'}}>
                            Default<br/>Pre-Color<br/>{defaultPreColor}
                            </td>
                            <td style={{textAlign:'center',border: '3px solid black'}}>
                            Default<br/>Post-Color<br/>{defaultPostColor}
                            </td>
                            <td style={{textAlign:'center',border: '3px solid black'}}>
                            Default<br/>Enter Transition
                            </td>
                            <td style={{textAlign:'center',border: '3px solid black'}}>
                            Default<br/>Exit Transition
                            </td>
                            <td style={{textAlign:'center', border: '3px solid black'}}>
                            Default<br/>Grammar Style
                            </td>
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
                            <td style={{textAlign:'center', border: '3px solid black'}}>
                                <input defaultChecked={true} onClick={()=>setGrammar('original')} name='grammar_choice' id='grammar_original' type='radio'/><label  htmlFor='grammar_original'>Keep as entered</label><br/>
                                <input onClick={()=>setGrammar('uppercase')} name='grammar_choice' id='grammar_uppercase' type='radio'/><label  htmlFor='grammar_uppercase'>UPPERCASE</label><br/>
                                <input onClick={()=>setGrammar('lowercase')} name='grammar_choice' id='grammar_lowercase' type='radio'/><label  htmlFor='grammar_lowercase'>lowercase</label><br/>
                                <input onClick={()=>setGrammar('capsfirstonly')} name='grammar_choice' id='grammar_capsfirstonly' type='radio'/><label  htmlFor='grammar_capsfirstonly'>Capitalize only first word</label><br/>
                                <input onClick={()=>setGrammar('capsallwords')} name='grammar_choice' id='grammar_capsallwords' type='radio'/><label htmlFor='grammar_capsallwords'>Capitalize Every Word</label><br/>
                            </td>
                        </tr>
                    </tbody>
                </table>
              
                <hr/>
                {
                    lineCount>0 &&
                    lines.map((line) =>{
                        console.log(line)
                        const _words = line.textShown.split(' ')
                        const words = []
                        for (let w = 0; w < _words.length; w++) {
                            words.push({wordId:w, word:_words[w], willBeSung:line.indexesOfShownWordsSung.includes(w)})
                        }
                        return (
                            <div key={line.id}> 
                                <LyricStyleForm 
                                    defaultEnterTrans={defaultEnterTransition}
                                    defaultExitTrans={defaultExitTransition}
                                    defaultPrecolor={defaultPreColor} 
                                    defaultPostcolor={defaultPostColor}
                                    precolors={new Array(words.length).fill(defaultPreColor)} 
                                    postcolors={new Array(words.length).fill(defaultPostColor)} 
                                    lineInfo={line} 
                                    words={words}/>
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

export default LineStylesInfoPage;