import { useState } from 'react'
import { SpinWheel } from './components/SpinWheel'
import type { WheelItem } from './components/SpinWheel'

const segments: WheelItem[] = [
  { id: 1, label: '50 Gems', color: '#2c3e50', textColor: '#f1c40f' },
  { id: 2, label: 'Try Again', color: '#c0392b', textColor: '#ecf0f1' },
  { id: 3, label: '100 Gems', color: '#8e44ad', textColor: '#f1c40f' },
  { id: 4, label: 'Free Spin', color: '#16a085', textColor: '#ecf0f1' },
  { id: 5, label: 'JACKPOT', color: '#f1c40f', textColor: '#000', style: { fontWeight: '900', fontSize: '18px' } },
  { id: 6, label: 'No Luck', color: '#7f8c8d', textColor: '#ecf0f1' },
  { id: 7, label: '20 Gems', color: '#2980b9', textColor: '#f1c40f' },
  { id: 8, label: 'Mystery', color: '#d35400', textColor: '#ecf0f1' },
];

function App() {
  const [winner, setWinner] = useState<WheelItem | null>(null);

  const handleSpinFinish = (result: WheelItem) => {
    setWinner(result);
    console.log("Winner:", result);
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'radial-gradient(circle at center, #2c3e50 0%, #000000 100%)',
      fontFamily: "'Trebuchet MS', sans-serif",
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, width: '100%', height: '100%',
        backgroundImage: 'linear-gradient(30deg, #111 12%, transparent 12.5%, transparent 87%, #111 87.5%, #111), linear-gradient(150deg, #111 12%, transparent 12.5%, transparent 87%, #111 87.5%, #111), linear-gradient(30deg, #111 12%, transparent 12.5%, transparent 87%, #111 87.5%, #111), linear-gradient(150deg, #111 12%, transparent 12.5%, transparent 87%, #111 87.5%, #111), linear-gradient(60deg, #222 25%, transparent 25.5%, transparent 75%, #222 75.5%, #222), linear-gradient(60deg, #222 25%, transparent 25.5%, transparent 75%, #222 75.5%, #222)',
        backgroundSize: '80px 140px',
        backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px',
        opacity: 0.2,
        pointerEvents: 'none'
      }} />

      <h1 style={{
        marginBottom: '40px',
        color: '#f1c40f',
        fontSize: '3rem',
        textTransform: 'uppercase',
        letterSpacing: '4px',
        textShadow: '0 0 10px rgba(241, 196, 15, 0.5), 0 4px 4px rgba(0,0,0,0.8)',
        zIndex: 1
      }}>
        Royale Spinner
      </h1>

      <div style={{ zIndex: 1, position: 'relative' }}>
        <SpinWheel
          items={segments}
          onSpinFinish={handleSpinFinish}
          size={500}
          primaryColor="conic-gradient(from 0deg, #f1c40f, #b8860b, #f1c40f, #b8860b, #f1c40f)"
          secondaryColor="radial-gradient(circle, #f1c40f, #b8860b)"
          textColor="#fff"
          fontFamily="'Arial Black', sans-serif"
          rimStyle={{
            border: '8px solid #4a3b00',
            boxShadow: '0 0 40px rgba(241, 196, 15, 0.3), inset 0 0 20px rgba(0,0,0,0.5)'
          }}
          pointerProps={{
            // Using a CSS shape for a more "Royal" pointer
            style: {
              border: 'none',
              background: 'linear-gradient(to bottom, #e74c3c, #c0392b)',
              boxShadow: '0 4px 6px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
              clipPath: 'polygon(50% 100%, 0 0, 100% 0)',
              width: 60,
              height: 80,
              top: -35
            }
          }}
        />
      </div>

      {winner && (
        <div style={{
          marginTop: '50px',
          padding: '20px 40px',
          background: 'rgba(0,0,0,0.8)',
          border: '2px solid #f1c40f',
          borderRadius: '12px',
          boxShadow: '0 0 20px rgba(241, 196, 15, 0.2)',
          zIndex: 1,
          animation: 'fadeIn 0.5s ease-out'
        }}>
          <h2 style={{ margin: 0, color: '#f1c40f', textTransform: 'uppercase' }}>
            Won: <span style={{ color: '#fff' }}>{winner.label}</span>
          </h2>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

export default App
