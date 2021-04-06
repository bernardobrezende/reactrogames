import './App.css';
import Guess from './Guess';

function App() {
  const games = [
      {
          title: 'Alex Kidd in Miracle World',
          url: 'https://www.retrogames.cz/play_170-SegaMS.php',
          platform: 'SMS',
          releasedAt: '1986',
          thumb: 'SMS-Alex_Kidd_in_Miracle_World.gif'
      },
      {
          title: 'Golden Axe',
          url: 'https://www.retrogames.cz/play_037-SegaMS.php',
          platform: 'SMS',
          releasedAt: '1989',
          thumb: 'SMS-Golden_Axe.png'
      },
      {
          title: 'Super Mario Kart',
          url: 'https://www.retrogames.cz/play_789-SNES.php',
          platform: 'SNES',
          releasedAt: '1992',
          thumb: 'SNES-Super_Mario_Kart.gif'
      }
  ];
  return (
    <div className="App">
      <header className="App-header">
        <h1>reactrogames</h1>
        <Guess options={ games } />
      </header>
    </div>
  );
}

export default App;
