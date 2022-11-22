import './App.css';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import LeftNav from './components/nav/LeftNav';
import { useState } from 'react';
import TopNav from './components/nav/TopNav';
import { signal } from '@preact/signals';
import AddBorrower from './pages/AddBorrower';
import Home from './pages/Home';

function App() {
  const loggedIn = signal(true);
  const [expanded, setExpanded] = useState(true)
  return (
    <>
    <Router>
    <TopNav />
      <LeftNav expanded={expanded} setExpanded={setExpanded} />
      <main style={
        // expanded ?
        {
          marginLeft: 'calc(2px + var(--main-nav-width))',
          width : 'calc(100vw - (2px + var(--main-nav-width)))'
        } 
        // : 
        // {
        //   marginLeft: 'calc(2px + var(--main-nav-width-min))',
        //   width : 'calc(100vw - (2px + var(--main-nav-width-min)))'
        // }
      }>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='add-borrower' element={<AddBorrower />} />
        </Routes>

      </main>

    </Router>
    </>
  );
}

export default App;
