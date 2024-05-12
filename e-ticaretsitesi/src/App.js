import React from 'react';
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Mainpage from './pages/mainpage';
import Loginpage from './pages/loginpage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <>
      <Router>
            <Routes>
                <Route path="/" element={<Mainpage/>}/>
                <Route path="/login" element={<Loginpage/>}/>
            </Routes>
      </Router>
    </>
  );
}

export default App;
