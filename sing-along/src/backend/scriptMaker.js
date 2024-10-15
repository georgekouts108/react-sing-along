import { get_color_tag } from "./tags";

// for max-1-line case

export const moving_script = (clip_tag, move_tag, colors, lyric_text, word_spacing) => {
    const words = lyric_text.split(' ')
    let subtitle = ""
    for (let w=0; w < words.length; w++){
        let next_word = get_color_tag(colors[w]) + words[w];
        if (w !== words.length-1) {
            next_word += ' '.repeat(word_spacing)
        }
        subtitle += next_word;
    }
    return `${clip_tag}${move_tag}${subtitle}`
}

export const singing_script = (clip_tag, pos_tag, pre_colors, post_colors, sung_word_indexes, lyric_text, screen_time, word_spacing) =>{
    const words = lyric_text.split(' ')

    let total_highlight_count = 0
    for (let w = 0; w < words.length; w++) {
        total_highlight_count += words[w].includes('-') ? words[w].split('-').length : 1;
    }

    const avg_k_time = parseInt((screen_time / 10) / total_highlight_count)

    let subtitle = ""
    for (let w = 0; w < words.length; w++) {
        const k_tag = sung_word_indexes.includes(w) ? `{\\k${avg_k_time}}` : `{\\k0}` 
        const color_bf_tag = get_color_tag(pre_colors[w], 2)
        const color_af_tag = get_color_tag(post_colors[w], 1)

        if (!words[w].includes('-')) {
            let next_word = color_bf_tag + k_tag + color_af_tag + words[w]
            if (w !== words.length - 1) {
                next_word += ' '.repeat(word_spacing)
            } 
            subtitle += next_word
        }
        else {
            let subsub = ''
            let subwords = words[w].split('-'); // bar-ba-loot = [bar, ba, loot]
            for (let sw = 0; sw < subwords.length; sw++) {
                let next_subword = color_bf_tag + k_tag + color_af_tag + subwords[sw]
                next_subword += (sw !== subwords.length - 1) ? '-' : ''
                subsub += next_subword;
            }
            if (w !== words.length - 1) {
                subsub += ' '.repeat(word_spacing)
            } 
            subtitle += subsub
        }
    }
        
    return `${clip_tag}${pos_tag}${subtitle}`
}

// for max-2-line case

export const next_line_waiting_script = (clip_tag, pos_tag, colors, lyric_text, word_spacing) =>{
    const words = lyric_text.split(' ');
    let subtitle = ''
    for (let w = 0; w < words.length; w++) {
        let next_word = get_color_tag(colors[w]) + words[w];
        if (w !== words.length-1) {
            next_word += ' '.repeat(word_spacing)
        }
        subtitle += next_word;
    }

    return `${clip_tag}${pos_tag}${subtitle}`
}