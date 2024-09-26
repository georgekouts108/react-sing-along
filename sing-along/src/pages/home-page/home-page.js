import React from 'react'
import { useNavigate } from 'react-router-dom';
import './home-page.styles.css'
import dsasLogo from '../../assets/images/logos/dsas_logo.webp'

function HomePage() {
    document.title = 'Home: Sing-Along Subtitle Generator'
    const navigate = useNavigate();

    return (
        <div className='main'>
            <div className='home-page-content'>
                <img className='dsas-logo' src={dsasLogo} alt='dsas-logo'/> 
                <h1 className='home-page-subtitle'>SUBTITLE GENERATOR</h1>
                <h2 className='home-page-subtitle2'>So you at home can sing along!</h2>
            </div>
            <button className='start-button'
                onClick={()=>navigate('/line-text-info')}>Get Started!
            </button>
        </div>
    )
}

export default HomePage;