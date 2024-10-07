import React from 'react'
import { useNavigate } from 'react-router-dom';
import './home-page.styles.css'
import dsasLogo from '../../assets/images/logos/dsas_logo.webp'

function HomePage() {
    document.title = 'Home: Sing-Along Subtitle Generator'
    const navigate = useNavigate();

    return (
        <div className='home-page-main'>
            <div className='home-page-content'>
                <img className='dsas-logo-home' src={dsasLogo} alt='dsas-logo'/> 
                <h1 className='home-page-subtitle'>SUBTITLE GENERATOR</h1>
                <h2 className='home-page-subtitle2'>So you at home can sing along!</h2>
            </div>
            <h3>Click on one of the options below to begin</h3>
            <button className='start-button'
                onClick={()=>navigate('/line-text-info')}>Start a New Set of Lyrics
            </button>
            <button className='start-button'
                onClick={()=>navigate('/combine-srts')}>Merge Multiple Sets of Lyrics
            </button>
        </div>
    )
}

export default HomePage;