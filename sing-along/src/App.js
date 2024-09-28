import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home-page/home-page';
import LineTextInfoPage from './pages/line-text-info-page/line-text-info-page';
import LineStylesInfoPage from './pages/line-styles-info-page/line-styles-info-page';
function App() {
  
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/' element={<HomePage />}/>
          <Route exact path='/line-text-info' element={<LineTextInfoPage />}/>
          <Route exact path='/line-styles-info' element={<LineStylesInfoPage />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
