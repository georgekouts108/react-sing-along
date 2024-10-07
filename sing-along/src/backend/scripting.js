import { entering_script, singing_script, move_up_script, next_line_waiting_script, exiting_script } from "./scriptMaker";
import { get_move_tag } from "./tags";
import { alter_timestamp, to_milliseconds, time_difference } from "./timestamps";

export const get_scripts_one_line = (font, font_size, X_position, y_waiting, y_singing, y_discarded, clip_tag, pos_tag, lyrics) => {

    const SCRIPTS = []

    for (let i=0; i < lyrics.length; i++){
        const row = lyrics[i]

        const lyric_id = row.id
        const lyric_text_shown = row.textShown
        const lyric_text_sung = row.textHeard
        const indexes_of_sung_words = row.indexesOfShownWordsSung
        const sing_time = row.singTime
        const exit_time = row.exitTime
        const pre_colors = row.preColors
        const post_colors = row.postColors
        const will_enter = row.enterTransitionId
        const will_exit = row.exitTransitionId

        // ## step 1: make an entering script
        if (will_enter !== 0) {

            const enter_script = {}
            enter_script['type'] = 'ENTER'
            enter_script['lyric_id'] = lyric_id
            enter_script['lyric_text_shown'] = lyric_text_shown
            enter_script['actual_words_being_sung'] = lyric_text_sung

            if (lyric_id === 0) {
                if (to_milliseconds(sing_time) >= 2000){
                    enter_script['trigger_time'] = alter_timestamp(sing_time, -1000)
                    enter_script['move_duration'] = 500
                }
                else{
                    enter_script['trigger_time'] = "0:00:00.000"
                    if (to_milliseconds(sing_time) > 500){
                        enter_script['move_duration'] = 500
                    }
                    else {
                        enter_script['move_duration'] = to_milliseconds(sing_time)
                    }
                }
            }
            else{
                enter_script['trigger_time'] = lyrics[i - 1].exitTime
                let delta = time_difference(sing_time, lyrics[i - 1].exitTime)
                if (delta >= 500){
                    enter_script['move_duration'] = 500
                }
                else{
                    enter_script['move_duration'] = delta
                }
            }

            let transition_tag1 = ''
            if (will_enter === 1) {
                transition_tag1 = get_move_tag(X_position, y_waiting, X_position, y_singing, enter_script['move_duration'])
            }
            else if (will_enter === 2){
                transition_tag1 = `{\\fad(${enter_script['move_duration']},0)}${pos_tag}`
            }

            enter_script['stop_time'] = sing_time
            enter_script['code'] = `{\\fn${font}}{\\fs${font_size}}${entering_script(clip_tag, transition_tag1, pre_colors, lyric_text_shown)}`

            SCRIPTS.push(enter_script)
        }

        //## step 2: make a mandatory singing script
        const sing_script = {}
        sing_script['type'] = 'SING'
        sing_script['lyric_id'] = lyric_id
        sing_script['lyric_text_shown'] = lyric_text_shown
        sing_script['actual_words_being_sung'] = lyric_text_sung
        sing_script['sing_time'] = sing_time

        if (will_exit!==0){
            sing_script['stop_time'] = exit_time
        }
        else{
            if (i !== lyrics.length - 1){
                sing_script['stop_time'] = lyrics[i + 1].singTime
            }
            else {
                sing_script['stop_time'] = exit_time
            }
        }

        const on_screen_time = time_difference(sing_script['stop_time'], sing_script['sing_time'])
        const ss = singing_script(clip_tag, pos_tag, pre_colors, post_colors, indexes_of_sung_words, lyric_text_shown, on_screen_time)
        sing_script['code'] = `{\\fn${font}}{\\fs${font_size}}${ss}`
        SCRIPTS.push(sing_script)

        //## step 3: make an exiting script, if the user optionally wanted one
        if (will_exit!==0){
            const exit_script = {}
            exit_script['type'] = 'EXIT'
            exit_script['lyric_id'] = lyric_id
            exit_script['lyric_text_shown'] = lyric_text_shown
            exit_script['actual_words_sung'] = lyric_text_sung

            exit_script['trigger_time'] = exit_time

            if (i !== lyrics.length - 1){
                const delta = time_difference(lyrics[i + 1].singTime, exit_time)
                if (delta >= 500){
                    exit_script['move_duration'] = 500
                }
                else {
                    exit_script['move_duration'] = delta
                }
                exit_script['stop_time'] = lyrics[i + 1].singTime
            }
            else{
                exit_script['move_duration'] = 500
                exit_script['stop_time'] = alter_timestamp(exit_time, 2000)
            }
            let transition_tag2 = ''
            if (will_exit === 1){
                transition_tag2 = get_move_tag(X_position, y_singing, X_position, y_discarded, exit_script['move_duration'])
            }
            else if (will_exit === 2){
                transition_tag2 = `{\\fad(0,${exit_script['move_duration']})}${pos_tag}`
            }
            exit_script['code'] = `{\\fn${font}}{\\fs${font_size}}${exiting_script(clip_tag, transition_tag2, post_colors, lyric_text_shown)}`
            SCRIPTS.push(exit_script)
        }
    }
    
    return SCRIPTS;
}    

export const get_scripts_two_lines = (font, font_size, X_position, y_coords, pos_tags, clip_tag, lyrics) => {
    //# 1. for each lyric, check to see how many times it will be repeated consecutively
    let repetitions = []
    let next_line = ''
    let count = 0
    let parent_lyric_id = 0
    for (let l = 0; l < lyrics.length; l++){
        let lyric = lyrics[l];

        if (lyric.textShown !== next_line){
            if (next_line !== ''){
                repetitions.push({parent_lyric_id:parent_lyric_id, next_line:next_line, count:count})
            }
            next_line = lyric.textShown
            count = 1
            parent_lyric_id = lyric.id
        }
        else{
            count += 1
        }
    }
    repetitions.push({parent_lyric_id:parent_lyric_id, next_line:next_line, count:count})

    const y_A = y_coords[0]
    const y_B = y_coords[1]
    const y_C = y_coords[2]
    const y_D = y_coords[3]
    const y_DISC = y_coords[4]

    const pos_A = pos_tags[0]
    const pos_B = pos_tags[1]
    // const pos_C = pos_tags[2]
    // const pos_D = pos_tags[3]

    //# move the first line from C to A
    let sing_time_of_first = lyrics[repetitions[0].parent_lyric_id].singTime
    //let stop_time_of_last = lyrics[repetitions[0].parent_lyric_id + repetitions[0].count - 1].exitTime
    const m1 = {
        'type': 'MOVE C to A',
        'lyric_id': lyrics[repetitions[0].parent_lyric_id].id,
        'lyric_text_shown': lyrics[repetitions[0].parent_lyric_id].textShown,
        'actual_words_being_sung': lyrics[repetitions[0].parent_lyric_id].textHeard,
        'stop_time': sing_time_of_first
    }

    if (to_milliseconds(sing_time_of_first) >= 2000){
        m1['trigger_time'] = alter_timestamp(sing_time_of_first, -1000)
        m1['move_duration'] = 500
    }
    else{
        m1['trigger_time'] = "0:00:00.000"
        if (to_milliseconds(sing_time_of_first) > 500){
            m1['move_duration'] = 500
        }
        else {
            m1['move_duration'] = to_milliseconds(sing_time_of_first)
        }
    }
    let move_tag1 = get_move_tag(X_position, y_C, X_position, y_A, m1['move_duration'])
    let move_script1 = move_up_script(clip_tag, move_tag1, lyrics[repetitions[0].parent_lyric_id].preColors, lyrics[repetitions[0].parent_lyric_id].textShown)
    m1['code'] = `{\\fn${font}}{\\fs${font_size}}${move_script1}`

    //# move the second line from D to B
    const m2 = {
        'type': 'MOVE D to B',
        'lyric_id': lyrics[repetitions[1].parent_lyric_id].id,
        'lyric_text_shown': lyrics[repetitions[1].parent_lyric_id].textShown,
        'actual_words_being_sung': lyrics[repetitions[1].parent_lyric_id].textHeard,
        'stop_time': sing_time_of_first
    }
    if (to_milliseconds(sing_time_of_first) >= 2000){
        m2['trigger_time'] = alter_timestamp(sing_time_of_first, -1000)
        m2['move_duration'] = 500
    }
    else{
        m2['trigger_time'] = "0:00:00.000"
        if (to_milliseconds(sing_time_of_first) > 500){
            m2['move_duration'] = 500
        }
        else{
            m2['move_duration'] = to_milliseconds(sing_time_of_first)
        }
    }

    let move_tag2 = get_move_tag(X_position, y_D, X_position, y_B, m2['move_duration'])
    let move_script2 = move_up_script(clip_tag, move_tag2, lyrics[repetitions[1].parent_lyric_id].preColors, lyrics[repetitions[1].parent_lyric_id].textShown)    
    m2['code'] = `{\\fn${font}}{\\fs${font_size}}${move_script2}`
    
    const SCRIPTS = [m1, m2]

    for (let r=0; r < repetitions.length;r++) {
        //# know when the current line will start and stop being in the singing position
        //# (this is how long the lyric after -- if any -- must wait before shifting to pos A)
        let sing_time_of_first_rep = lyrics[repetitions[r].parent_lyric_id].singTime
        let stop_time_of_last_rep = lyrics[repetitions[r].parent_lyric_id + repetitions[r].count - 1].exitTime

        //# if we are not at the final line, create a WAIT script for the next line (r+1)
        if (r !== repetitions.length - 1){
            const w = {
                'type': 'WAIT',
                'lyric_id': lyrics[repetitions[r + 1].parent_lyric_id].id,
                'lyric_text_shown': lyrics[repetitions[r + 1].parent_lyric_id].textShown,
                'actual_words_being_sung': lyrics[repetitions[r + 1].parent_lyric_id].textHeard,
                'trigger_time': sing_time_of_first_rep,
                'stop_time': stop_time_of_last_rep,
                'code': `{\\fn${font}}{\\fs${font_size}}${next_line_waiting_script(clip_tag, pos_B, lyrics[repetitions[r + 1].parent_lyric_id].preColors,
                    lyrics[repetitions[r + 1].parent_lyric_id].textShown)}`
            }
            SCRIPTS.push(w)
        }
        //# make a SING script for each repetition of the current line
        let current_lyric_id_for_sing_scripts = repetitions[r].parent_lyric_id
        let final_lyric_id_for_sing_scripts = repetitions[r].parent_lyric_id + repetitions[r].count - 1

        while (current_lyric_id_for_sing_scripts <= final_lyric_id_for_sing_scripts) {
            let row = lyrics[current_lyric_id_for_sing_scripts]
            let lyric_id = row.id
            let lyric_text_shown = row.textShown
            let lyric_text_sung = row.textHeard
            let indexes_of_sung_words = row.indexesOfShownWordsSung
            let sing_time = row.singTime
            let exit_time = row.exitTransitionId !== 0 ? row.exitTime : lyrics[current_lyric_id_for_sing_scripts + 1].singTime
            let pre_colors = row.preColors
            let post_colors = row.postColors

            const s = {
                'type': 'SING',
                'lyric_id': lyric_id,
                'lyric_text_shown': lyric_text_shown,
                'actual_words_being_sung': lyric_text_sung,
                'sing_time': sing_time,
                'stop_time': exit_time
            }
            let on_screen_time = time_difference(s['stop_time'], s['sing_time'])
            
            s['code'] = `{\\fn${font}}{\\fs${font_size}}${singing_script(clip_tag, pos_A, pre_colors, post_colors, indexes_of_sung_words,lyric_text_shown, on_screen_time)}`
            SCRIPTS.push(s)
            current_lyric_id_for_sing_scripts += 1
        }
        //# make a MOVE A to DISCARD script for the current line
        let lyric_id_of_last_occurrence = repetitions[r].parent_lyric_id + repetitions[r].count - 1
        let stop_time_of_last_occurrence = lyrics[lyric_id_of_last_occurrence].exitTime
        let move_duration = 0
        let end_time = ""

        if (r !== repetitions.length - 1){
            let sing_time_of_next_line_first_occurrence = lyrics[repetitions[r + 1].parent_lyric_id].singTime

            if (time_difference(sing_time_of_next_line_first_occurrence, stop_time_of_last_occurrence) < 500) {
                move_duration = time_difference(sing_time_of_next_line_first_occurrence, stop_time_of_last_occurrence)
            }
            else{
                move_duration = 500
            }
                
            end_time = sing_time_of_next_line_first_occurrence
        }
        else {
            move_duration = 500
            end_time = alter_timestamp(stop_time_of_last_occurrence, 500)
        }

        let move_tag = get_move_tag(X_position, y_A, X_position, y_DISC, move_duration)
        let move_script = move_up_script(clip_tag, move_tag, lyrics[lyric_id_of_last_occurrence].postColors, lyrics[lyric_id_of_last_occurrence].textShown)

        const m = {
            'type': 'MOVE A to DISCARD',
            'lyric_id': lyrics[lyric_id_of_last_occurrence].id,
            'lyric_text_shown': lyrics[lyric_id_of_last_occurrence].textShown,
            'actual_words_being_sung': lyrics[lyric_id_of_last_occurrence].textHeard,
            'move_duration': move_duration,
            'trigger_time': stop_time_of_last_occurrence,
            'stop_time': end_time,
            'code': `{\\fn${font}}{\\fs${font_size}}${move_script}`
        }

        SCRIPTS.push(m);

       // # if we're not at the final line, make a MOVE B to A script for the next line (r+1)

        if (r !== repetitions.length - 1){
            let lyric_id_of_next_line = repetitions[r + 1].parent_lyric_id
            move_tag2 = get_move_tag(X_position, y_B, X_position, y_A, move_duration)
            move_script2 = move_up_script(clip_tag, move_tag2, lyrics[lyric_id_of_next_line].preColors,
                                          lyrics[lyric_id_of_next_line].textShown)
            const m2 = {
                'type': 'MOVE B to A',
                'lyric_id': lyrics[lyric_id_of_next_line].id,
                'lyric_text_shown': lyrics[lyric_id_of_next_line].textShown,
                'actual_words_being_sung': lyrics[lyric_id_of_next_line].textHeard,
                'move_duration': move_duration,
                'trigger_time': stop_time_of_last_occurrence,
                'stop_time': end_time,
                'code': `{\\fn${font}}{\\fs${font_size}}${move_script2}`
            }
            SCRIPTS.push(m2)

            //# if the next line is not the final line, make a MOVE C to B script for the line after it (r+2)
            if (r + 1 !== repetitions.length - 1){
                let lyric_id_of_line_after = repetitions[r + 2].parent_lyric_id
                let move_tag3 = get_move_tag(X_position, y_C, X_position, y_B, move_duration)
                let move_script3 = move_up_script(clip_tag, move_tag3, lyrics[lyric_id_of_line_after].preColors, lyrics[lyric_id_of_line_after].textShown)
                
                const m3 = {
                    'type': 'MOVE C to B',
                    'lyric_id': lyrics[lyric_id_of_line_after].id,
                    'lyric_text_shown': lyrics[lyric_id_of_line_after].textShown,
                    'actual_words_being_sung': lyrics[lyric_id_of_line_after].textHeard,
                    'move_duration': move_duration,
                    'trigger_time': stop_time_of_last_occurrence,
                    'stop_time': end_time,
                    'code': `{\\fn${font}}{\\fs${font_size}}${move_script3}`
                }
                SCRIPTS.push(m3)
            }
        }
    }
    return SCRIPTS
}