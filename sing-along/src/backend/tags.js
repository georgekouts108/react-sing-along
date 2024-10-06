export const get_pos_tag = (x, y) => {
    return `{\\pos(${x},${y})}`
}

export const get_clip_tag = (top_left_x, top_left_y, bottom_right_x, bottom_right_y) => {
    return `{\\clip(${top_left_x},${top_left_y},${bottom_right_x},${bottom_right_y})}`
}
    
export const get_color_tag = (color_hex, timing=0) => {
    const r = color_hex.substring(1,3)
    const g = color_hex.substring(3,5)
    const b = color_hex.substring(5)
    let tag = timing !== 0 ? `\\${timing}c&H${(b+g+r)}&` : `\\c&H${(b+g+r)}&`
    
    return `{${tag}}`
}

export const get_move_tag = (xi, yi, xf, yf, delta_ms) => {
    return `{\\move(${xi},${yi},${xf},${yf},0,${delta_ms})}`
}
    