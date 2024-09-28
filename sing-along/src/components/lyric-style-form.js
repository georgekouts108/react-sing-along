import React, {useState, useEffect} from 'react'

function LyricStyleForm({defaultPrecolor, defaultPostcolor, precolors, postcolors, lineInfo, words}) {

    const [preColorChoice, setPreColorChoice] = useState('single')
    const [postColorChoice, setPostColorChoice] = useState('single')

    const [singlePrecolor, setSinglePrecolor] = useState(defaultPrecolor);
    useEffect(() => {
        setSinglePrecolor(defaultPrecolor);
      }, [defaultPrecolor]);

    const [multiplePrecolors, setMultiplePrecolors] = useState(precolors);
    useEffect(() => {
        setMultiplePrecolors(precolors);
      }, [precolors]);

      const [singlePostcolor, setSinglePostcolor] = useState(defaultPostcolor);
    useEffect(() => {
        setSinglePostcolor(defaultPostcolor);
      }, [defaultPostcolor]);

      const [multiplePostcolors, setMultiplePostcolors] = useState(postcolors);
    useEffect(() => {
        setMultiplePostcolors(postcolors);
      }, [postcolors]);

    const changeMultiColor = (color, index, preOrPost) => {
        const palette = (preOrPost === 'pre' ? multiplePrecolors : multiplePostcolors );
        palette[index]=color;
        
        if (preOrPost==='pre') {
            setMultiplePrecolors(palette);
        }
        else {
            setMultiplePostcolors(palette);
        }
    }

    const [enterTransition, setEnterTransition] = useState('slidein')
    const [exitTransition, setExitTransition] = useState('slideout')
    
    const enterTransitionIDs = {'cutin':0, 'slidein':1, 'fadein':2};
    const exitTransitionIDs = {'cutout':0, 'slideout':1, 'fadeout':2};

    const saveDetails = () => {
        
        const preColors = [];
        if (preColorChoice === 'single') {
            const color = document.getElementById(`pre_color_for_line${lineInfo.id}`).value
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

        const postColors = [];
        if (postColorChoice === 'single') {
            const color = document.getElementById(`post_color_for_line${lineInfo.id}`).value
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

        lineInfo.enterTransition = enterTransitionIDs[enterTransition];
        lineInfo.exitTransition = exitTransitionIDs[exitTransition];
        lineInfo.preColors = "["+preColors.toString().toUpperCase()+"]";
        lineInfo.postColors = "["+postColors.toString().toUpperCase()+"]";

        // props.confirmColors(lineInfo);
    }

    return (
        <div>
            <table style={{border: '3px solid black', textAlign: 'center'}}>
     
                <tbody>
                    <tr colSpan={1+words.length} style={{fontWeight:'bold'}}>
                        LINE {lineInfo.id}
                    </tr>
                    <tr>
                        <td style={{border: '3px solid black'}}>
                            WORD
                        </td>
                        {
                            words.map((word) => (
                                <td key={word[0]} style={{border: '3px solid black'}}>
                                    {word[1]}
                                </td>
                            ))
                        }
                    </tr>
                    
                    <tr>
                        <td style={{border: '3px solid black'}}>
                            PRE-COLOR<br/><br/>
                            <input defaultChecked={true} onClick={()=>{setPreColorChoice('single')}} type='radio' name={`preColorChoice${lineInfo.id}`} value='single' id={`lineId_${lineInfo.id}_preColorChoice_single`}/>
                            <label htmlFor={`lineId_${lineInfo.id}_preColorChoice_single`}>Same color for all words</label><br/>
                            <input onClick={()=>{setPreColorChoice('multiple')}} type='radio' name={`preColorChoice${lineInfo.id}`} value='multiple' id={`lineId_${lineInfo.id}_preColorChoice_multiple`}/>
                            <label htmlFor={`lineId_${lineInfo.id}_preColorChoice_multiple`}>Different color for each word</label><br/>
                        </td>

                        {
                            preColorChoice==='single' && 
                            <td colSpan={words.length} style={{border: '3px solid black'}}>
                                <input  
                                id={`single_pre_color_for_line${lineInfo.id}`} 
                                type='color' 
                                onChange={(e)=>setSinglePrecolor(e.target.value)}
                                value={singlePrecolor} />
                            </td>
                        }

                        {
                            preColorChoice==='multiple' && 
                            words.map((word) => (
                                <td key={word[0]} style={{border: '3px solid black'}}>
                                    <input id={`pre_color_for_line${lineInfo.id}_word${word[0]}`} 
                                    type='color' 
                                    onChange={(e)=>changeMultiColor(e.target.value, word[0], 'pre')}
                                    value={multiplePrecolors[word[0]]}/>
                                </td>
                            ))
                        }
                    </tr>

                    <tr>
                        <td style={{border: '3px solid black'}}>
                            POST-COLOR<br/><br/>
                            <input defaultChecked={true} onClick={()=>{setPostColorChoice('single')}} type='radio' name={`postColorChoice${lineInfo.id}`} value='single' id={`lineId_${lineInfo.id}_postColorChoice_single`}/>
                            <label htmlFor={`lineId_${lineInfo.id}_postColorChoice_single`}>Same color for all words</label><br/>
                            <input onClick={()=>{setPostColorChoice('multiple')}} type='radio' name={`postColorChoice${lineInfo.id}`} value='multiple' id={`lineId_${lineInfo.id}_postColorChoice_multiple`}/>
                            <label htmlFor={`lineId_${lineInfo.id}_postColorChoice_multiple`}>Different color for each word</label><br/>
                        </td>
                        {
                            postColorChoice==='single' && 
                            <td colSpan={words.length} style={{border: '3px solid black'}}>
                                <input id={`post_color_for_line${lineInfo.id}`} 
                                type='color' 
                                onChange={(e)=>setSinglePostcolor(e.target.value)}
                                value={singlePostcolor} />
                            </td>
                        }

                        {
                            postColorChoice==='multiple' && 
                            words.map((word) => (
                                <td key={word[0]} style={{border: '3px solid black'}}>
                                    <input id={`post_color_for_line${lineInfo.id}_word${word[0]}`} 
                                    type='color' 
                                    onChange={(e)=>changeMultiColor(e.target.value, word[0], 'post')}
                                    value={multiplePostcolors[word[0]]} />
                                </td>
                            ))
                        }
                    </tr>
                    <tr style={{ border: '3px solid black'}}>
                        <td colSpan={1+words.length} >
                            Entering Transition:
                            <input defaultChecked={true} onClick={()=>setEnterTransition('slidein')} id={`enter_trans_line${lineInfo.id}_slidein`} name={`enter_trans_line${lineInfo.id}`} type='radio'/>slide in
                            <input onClick={()=>setEnterTransition('cutin')} id={`enter_trans_line${lineInfo.id}_cutin`} name={`enter_trans_line${lineInfo.id}`} type='radio'/>cut in
                            <input onClick={()=>setEnterTransition('fadein')} id={`enter_trans_line${lineInfo.id}_fadein`} name={`enter_trans_line${lineInfo.id}`} type='radio'/>fade in
                        </td>
                    </tr>
                    <tr style={{ border: '3px solid black'}}>
                        <td colSpan={1+words.length} >
                            Exiting Transition:
                            <input defaultChecked={true} onClick={()=>setExitTransition('slideout')} id={`exit_trans_line${lineInfo.id}_slideout`} name={`exit_trans_line${lineInfo.id}`} type='radio'/>slide out
                            <input onClick={()=>setExitTransition('cutout')} id={`exit_trans_line${lineInfo.id}_cutout`} name={`exit_trans_line${lineInfo.id}`} type='radio'/>cut out
                            <input onClick={()=>setExitTransition('fadeout')} id={`exit_trans_line${lineInfo.id}_fadeout`} name={`exit_trans_line${lineInfo.id}`} type='radio'/>fade out
                        </td>
                    </tr>
                    <tr style={{ border: '3px solid black'}}>
                        <td colSpan={1+words.length} >
                            <button onClick={()=>saveDetails()}>Save Details</button>
                        </td>
                    </tr>
                    
                </tbody>
           
            </table>
        </div>
    )
}

export default LyricStyleForm;