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

    console.log(SCRIPTS);
}