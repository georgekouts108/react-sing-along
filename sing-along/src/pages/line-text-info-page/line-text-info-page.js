import React from 'react'
import { useNavigate } from 'react-router-dom';
import './line-text-info-page.styles.css'

import SingAlongSongsLogo from '../../components/sing-along-songs-logo/sing-along-songs-logo';

function LineTextInfoPage() {
    document.title = 'Line Text Info: Sing-Along Subtitle Generator'
    const navigate = useNavigate();

    return (
        <div className='main'>
            <header className='header'>
                <SingAlongSongsLogo/>
            </header>
            
        </div>
    )
}

export default LineTextInfoPage;