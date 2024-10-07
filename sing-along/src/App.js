import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home-page/home-page';
import LineTextInfoPage from './pages/line-text-info-page/line-text-info-page';
import LineColorsTransitionsInfoPage from './pages/line-colors-transitions-info-page/line-colors-transitions-info-page';
import LineTypographyFrameInfoPage from './pages/line-typography-frame-info-page/line-typography-frame-info-page';
import LineTimingInfoPage2 from './pages/line-timing-info-page/line-timing-info-page2';
import SrtGeneratorPage from './pages/srt-generator-page/srt-generator-page';
import CombineSRTPage from './pages/combine-srts-page/combine-srts-page';

function App() {  
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/' element={<HomePage />}/>
          <Route exact path='/line-text-info' element={<LineTextInfoPage />}/>
          <Route exact path='/line-colors-transitions-info' element={<LineColorsTransitionsInfoPage />}/>
          <Route exact path='/line-typography-frame-info' element={<LineTypographyFrameInfoPage />}/>
          <Route exact path='/line-timing-info' element={<LineTimingInfoPage2 />}/>
          <Route exact path='/srt-generator' element={<SrtGeneratorPage />}/>
          <Route exact path='/combine-srts' element={<CombineSRTPage />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
