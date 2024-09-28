import React, {useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './line-styles-info-page.styles.css'
// import SingAlongSongsLogo from '../../components/sing-along-songs-logo/sing-along-songs-logo';
// import { staff } from '../../assets/misc/misc';

function LineStylesInfoPage() {
    document.title = 'Line Styles Info: Sing-Along Subtitle Generator'
    
    const navigate = useNavigate();
    const location = useLocation();

    const data = location.state?.data;
    console.log(data)

    const [lineCount, setLineCount] = useState(data.lineCount)
    const [lines, setLines] = useState(data.lines)

    const [defaultPreColor, setDefaultPreColor] = useState('#ffff00')
    const [defaultPostColor, setDefaultPostColor] = useState('#ffffff')

    const transitionOptions = ['Slide', 'Cut', 'Fade'];

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
                        </tr>
                        <tr>
                            <td style={{textAlign:'center', border: '3px solid black'}}>
                                <input onChange={(e)=>setDefaultPreColor(e.target.value)} type='color' defaultValue={defaultPreColor} />
                            </td>
                            <td style={{textAlign:'center', border: '3px solid black'}}>
                                <input onChange={(e)=>setDefaultPostColor(e.target.value)} type='color' defaultValue={defaultPostColor} />
                            </td>
                            <td style={{textAlign:'center', border: '3px solid black'}}>
                                {
                                    transitionOptions.map((option) => (
                                        <>
                                            <input id={`defaultEnterTransition_${option}`} name='defaultEnterTransition' type='radio' value={`${option}_in`} />
                                            <label htmlFor={`defaultEnterTransition_${option}`}>{`${option} In`}</label>
                                            <br/>
                                        </>
                                    ))
                                }
                            </td>
                            <td style={{textAlign:'center', border: '3px solid black'}}>
                            {
                                transitionOptions.map((option) => (
                                    <>
                                        <input id={`defaultExitTransition_${option}`} name='defaultExitTransition' type='radio' value={`${option} Out`} />
                                        <label htmlFor={`defaultExitTransition_${option}`}>{`${option} Out`}</label>
                                        <br/>
                                    </>
                                ))
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>
              
                <hr/>
                {
                    lineCount>0 &&
                    lines.map((line) => (
                        <div key={line.id}> 
                            <p>styles interface for line {line.id}</p>
                        </div>
                    ))
                }
                <hr/>
            </div>
        </div>
    )
}

export default LineStylesInfoPage;