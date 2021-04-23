import './App.css';
import GameProvider from './context/GameContext';
import Guess from './Guess';

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>reactrogames</h1>
        <GameProvider>
          <Guess />
        </GameProvider>
      </header>
    </div>
  );
}

export default App;
