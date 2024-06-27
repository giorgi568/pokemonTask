import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <>
      <div className='mainWrapper'>
        <h1 className='header'>PokeTypes</h1>

        <div className='box'>
          <h3>Pokemon type guessing quiz</h3>
          <ul>
            <li>you have 8 minute</li>
            <li>get as many correct as you can</li>
          </ul>
          <Link to='/game'>
            <button>Start Quiz</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default App;
