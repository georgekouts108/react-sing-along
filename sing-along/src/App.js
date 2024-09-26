import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home-page/home-page';

function App() {
  
  document.title = 'Home: Sing-Along Subtitle Generator'
  
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/' element={<HomePage />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
