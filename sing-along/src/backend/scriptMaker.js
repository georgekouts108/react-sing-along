import { get_color_tag } from "./tags";

// for max-1-line case

export const entering_script = (clip_tag, move_tag, colors, lyric_text, word_spacing) => {
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
    const avg_k_time = parseInt((screen_time / 10) / sung_word_indexes.length)

    let subtitle = ""
    for (let w = 0; w < words.length; w++) {
        const k_tag = sung_word_indexes.includes(w) ? `{\\k${avg_k_time}}` : `{\\k0}` 

        const color_bf_tag = get_color_tag(pre_colors[w], 2)
        const color_af_tag = get_color_tag(post_colors[w], 1)

        let next_word = color_bf_tag + k_tag + color_af_tag + words[w]
        if (w !== words.length - 1){
            next_word += ' '.repeat(word_spacing)
        } 
        subtitle += next_word
    }
        
    return `${clip_tag}${pos_tag}${subtitle}`
}

export const exiting_script = (clip_tag, move_tag, colors, lyric_text, word_spacing) => {
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

export const move_up_script = (clip_tag, move_tag, colors, lyric_text, word_spacing) => {
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