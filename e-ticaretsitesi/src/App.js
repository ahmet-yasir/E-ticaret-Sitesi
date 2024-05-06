import React from 'react';
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Mainpage from './pages/mainpage';
import Loginpage from './pages/loginpage';

function App() {
  return (
      <Router>
            <Routes>
                <Route path="/" element={<Mainpage/>} />
                <Route path="/login" element={<Loginpage/>} />
                <Route path="/login/:id" element={<Loginpage/>} />
                <Route path="/login" element={<Loginpage/>} />
                <Route path="/login" element={<Loginpage/>} />
            </Routes>
        </Router>
  );
}

export default App;
