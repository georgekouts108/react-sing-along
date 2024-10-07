import { max_one_line_scripting, max_two_line_scripting, transform_text } from "./getScripts";

export const get_all_scripts = (data) => {
    
    const lines = data.lines;

    for (let l = 0; l <lines.length; l++) { 
        const line = lines[l];

        line.textShown = transform_text(line.textShown, data.grammar)
        line.textHeard = transform_text(line.textHeard, data.grammar)

        const indexes = []
        for (let i = 0; i < line.indexesOfShownWordsSung.split(',').length; i++) {
            indexes.push(parseInt(line.indexesOfShownWordsSung.split(',')[i]))
        }
        line.indexesOfShownWordsSung = indexes;
        lines[l] = line;
    }

    let SCRIPTS = []
    const frame_details_info = [data.grammar, data.fontInfo.fontSize, data.frameWidth, data.frameHeight, data.ySing, data.yWait, data.fontInfo.fontName]
    if (data.maxLineCount === 1){
        SCRIPTS = max_one_line_scripting(lines, frame_details_info)
    }
    else if (data.maxLineCount === 2) {
        SCRIPTS = max_two_line_scripting(lines, frame_details_info)
    }

    return SCRIPTS;
}

export const writeSrtContent = (currentScripts, firstIndexNum=1) => {
    let content = '';

    let sub_index = firstIndexNum;

    for (let s = 0; s < currentScripts.length; s++){
        const script = currentScripts[s];
        const script_type = script['type']

        let ti = ""
        if (['ENTER', 'EXIT', 'WAIT'].includes(script_type) || script_type.includes('MOVE')) {
            if (script['trigger_time'].includes("\"") || script['trigger_time'].includes("\'")){
                ti = script['trigger_time'].substring(1, script['trigger_time'].length-1).replace('.', ',')
            }
            else {
                ti = script['trigger_time'].replace('.', ',')
            }
        }

        else if (script_type === 'SING'){
            ti = script['sing_time'].substring(1, script['sing_time'].length-1).replace('.', ',')
        }

        const tf = script['stop_time'].substring(1, script['stop_time'].length-1).replace('.', ',')

        content += 
        `${sub_index}
        ${ti} --> ${tf}
        ${script['code']}

        `
        sub_index += 1
    }
    return content;
}

export const downloadSRT = (srtContent) => {
    const blob = new Blob([srtContent], { type: 'text/srt' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'subtitles.srt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}