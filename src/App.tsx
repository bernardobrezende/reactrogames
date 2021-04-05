import logo from './logo.svg';
import './App.css';
import RandomGame from './RandomGame';

function App() {
  const games = {
      1: {
          title: 'Alex Kidd in Miracle World',
          url: 'https://www.retrogames.cz/play_170-SegaMS.php',
          platform: 'SMS',
          thumb: 'SMS-Alex_Kidd_in_Miracle_World.gif'
      },
      2: {
          title: 'Golden Axe',
          url: 'https://www.retrogames.cz/play_037-SegaMS.php',
          platform: 'SMS',
          thumb: 'SMS-Golden_Axe.png'
      },
      3: {
          title: 'Super Mario Kart',
          url: 'https://www.retrogames.cz/play_789-SNES.php',
          platform: 'SNES',
          thumb: 'SNES-Super_Mario_Kart.gif'
      }
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          reactrogames
        </p>
        <RandomGame { ...games } />
      </header>
    </div>
  );
}

export default App;
