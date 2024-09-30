import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home-page/home-page';
import LineTextInfoPage from './pages/line-text-info-page/line-text-info-page';
import LineColorsTransitionsInfoPage from './pages/line-colors-transitions-info-page/line-colors-transitions-info-page';

function App() {  
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/' element={<HomePage />}/>
          <Route exact path='/line-text-info' element={<LineTextInfoPage />}/>
          <Route exact path='/line-colors-transitions-info' element={<LineColorsTransitionsInfoPage />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
