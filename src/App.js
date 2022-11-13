import './App.css';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import LeftNav from './components/nav/LeftNav';
import { useState } from 'react';
import TopNav from './components/nav/TopNav';
import { signal } from '@preact/signals';
import Start from './pages/Start';

function App() {
  const loggedIn = signal(true);
  const [expanded, setExpanded] = useState(true)
  return (
    <>
    <Router>
    <TopNav />
      <LeftNav expanded={expanded} setExpanded={setExpanded} />
      <main style={
        expanded ?
        {
          marginLeft: 'calc(2px + var(--main-nav-width))',
          width : 'calc(100vw - (2px + var(--main-nav-width)))'
        } : 
        {
          marginLeft: 'calc(2px + var(--main-nav-width-min))',
          width : 'calc(100vw - (2px + var(--main-nav-width-min)))'
        }
      }>
        <Routes>
          <Route path='/' element={<Start />} />
        </Routes>

      </main>

    </Router>
    </>
  );
}

export default App;
