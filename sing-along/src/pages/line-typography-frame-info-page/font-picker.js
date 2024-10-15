import React, { useState } from 'react'
import { fonts } from '../../data/fonts/font-names'
import { transform_text } from '../../backend/getScripts';

function FontPicker({sampleText, grammarChoice, configureFont}) {
    
    const font_rows = [];
    let f = 0;
    while (f < fonts.length){
        let left = f;
        let right = Math.min(f+2, fonts.length);
        font_rows.push(fonts.slice(left, right));
        f = right;
    }
    
    const [fontRows] = useState(font_rows);

    const getFontButton = (font) => {
        return <>
            <input defaultChecked={font.name==='ITC Korinna Std'} onClick={()=>configureFont(font)} name='font' id={`font_${font.fid}`} type='radio'/>
            <label 
            style={{fontFamily:font.name, fontSize:20, color: font.fid!=='other' ? 'white':'lime'}} 
            htmlFor={`font_${font.fid}`}>{transform_text(sampleText ? sampleText : font.name, grammarChoice)}
            </label>
            </>      
    }

    return (
        <div style={{textAlign:'center'}}>
            <table style={{border: '3px solid black'}}>
                <tbody>
                    {
                        fontRows.map((fontrow) => (
                            <tr key={fontrow[0].fid}>
                                {
                                    fontrow.map((font) => (
                                        <td key={font.fid} style={{border: '3px solid black'}}>
                                            {getFontButton(font)}
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default FontPicker;

