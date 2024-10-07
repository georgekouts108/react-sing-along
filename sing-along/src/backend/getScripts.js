import { get_scripts_one_line, get_scripts_two_lines } from "./scripting";
import { get_clip_tag, get_pos_tag } from "./tags";

export const transform_text = (lyric_text, choice) => {
    if (choice === 'uppercase'){
        return lyric_text.toUpperCase();
    }
    else if (choice === 'lowercase'){
        return lyric_text.toLowerCase();
    }
        
    else if (choice === 'capsfirstonly') {
        return lyric_text[0].toUpperCase() + lyric_text.substring(1).toLowerCase();
    }
        
    else if (choice === 'capsallwords'){
        let result = '';
        const words = lyric_text.split(' ')
        for (let w=0; w < words.length; w++) {
            result += words[w][0].toUpperCase() + words[w].substring(1).toLowerCase();

            if (w !== words.length - 1) {
                result += ' ';
            }
        }
        return result;
    }
        
    return lyric_text
}

export const max_two_line_scripting=(lyrics_info, frame_details) => {
    const font_size = frame_details[1]
    const frame_width = frame_details[2]
    const font = frame_details[6]
    const word_spacing = frame_details[7]

    const A = frame_details[4]
    const B = frame_details[5]

    const CLIP_TAG = get_clip_tag(0, (A - font_size), (frame_width), B)

    const gap = B - A
    const Y_SINGING = A
    const Y_NEXT_LINE = B
    const Y_LINE_AFTER = B + gap
    const Y_SEC_TO_FIRST_LINE = Y_LINE_AFTER + gap
    const Y_DISCARDED = A - gap

    const POS_TAG_SINGING = get_pos_tag(frame_width / 2, Y_SINGING)
    const POS_TAG_NEXT_LINE = get_pos_tag(frame_width / 2, Y_NEXT_LINE)
    const POS_TAG_LINE_AFTER = get_pos_tag(frame_width / 2, Y_LINE_AFTER)
    const POS_TAG_SEC_TO_FIRST_LINE = get_pos_tag(frame_width / 2, Y_SEC_TO_FIRST_LINE)

    const y_coords = [Y_SINGING, Y_NEXT_LINE, Y_LINE_AFTER, Y_SEC_TO_FIRST_LINE, Y_DISCARDED]
    const pos_tags = [POS_TAG_SINGING, POS_TAG_NEXT_LINE, POS_TAG_LINE_AFTER, POS_TAG_SEC_TO_FIRST_LINE]

    return get_scripts_two_lines(font, font_size, frame_width / 2, y_coords, pos_tags, CLIP_TAG, lyrics_info, word_spacing)
}

export const max_one_line_scripting = (lyrics_info, frame_details) => {
    const font_size = frame_details[1]
    const frame_width = frame_details[2]
    const y_sing = frame_details[4]
    const font = frame_details[6]
    const word_spacing = frame_details[7]

    const clip_y_upper = y_sing - font_size
    const clip_y_lower = y_sing

    const CLIP_TAG = get_clip_tag(0, clip_y_upper, frame_width, clip_y_lower)
    const Y_WAITING = frame_details[5]
    const Y_DISCARDED = clip_y_upper
    const POS_TAG = get_pos_tag(frame_width / 2, y_sing)

    return get_scripts_one_line(font, font_size, frame_width / 2, Y_WAITING, y_sing, Y_DISCARDED, CLIP_TAG, POS_TAG, lyrics_info, word_spacing)
}