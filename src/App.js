import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import LeftNav from './components/nav/LeftNav';

function App() {
  return (
    <>
    <LeftNav />
    </>
  );
}

export default App;
