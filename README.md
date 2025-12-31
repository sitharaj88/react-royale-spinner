# React Royale Spinner 👑

**The Ultimate Wheel of Fortune Component for React.**  
Create engaging, premium-quality "Spin to Win" experiences with modern physics animations, procedural audio, and endless customization.

![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)
![React](https://img.shields.io/badge/react-18%2B-61DAFB.svg)
![TypeScript](https://img.shields.io/badge/typescript-ready-blue.svg)

---

## ✨ Features

- **🎮 Physics-Based Animation**: Powered by `framer-motion` for realistic acceleration, deceleration, and friction.
- **🎨 Premium Aesthetics**: Built-in support for gradients, shadows, and glassmorphism. Defaults to a stunning "Gold & Luxury" theme.
- **🔊 Procedural Audio**: Integrated Web Audio API engine generating "tick" and "win" sounds without large assets.
- **🎊 Celebration Effects**: Automatic confetti explosion on win (powered by `canvas-confetti`).
- **🔧 Fully Customizable**: Control every aspect—from rim colors to pointer design, fonts, and segment styles.
- **📱 Responsive & Accessible**: scalable SVG graphics and ARIA support.

---

## 📦 Installation

```bash
npm install react-royale-spinner framer-motion canvas-confetti clsx
# or
yarn add react-royale-spinner framer-motion canvas-confetti clsx
```

## 🚀 Quick Start

```tsx
import { SpinWheel, WheelItem } from 'react-royale-spinner';
import 'react-royale-spinner/dist/react-royale-spinner.css';

const items: WheelItem[] = [
  { id: 1, label: 'iPhone 15', color: '#e74c3c', textColor: '#fff' },
  { id: 2, label: '$50 Cash', color: '#f1c40f', textColor: '#000' },
  { id: 3, label: 'Free Spin', color: '#3498db', textColor: '#fff' },
  { id: 4, label: 'Better Luck', color: '#95a5a6', textColor: '#fff' },
];

function App() {
  return (
    <SpinWheel 
      items={items} 
      onSpinFinish={(result) => alert(`You won: ${result.label}`)} 
    />
  );
}
```

---

## 🎨 Professional Customization ("Gaming King" Theme)

Create a high-end casino or gaming feel with custom gradients and pointers:

```tsx
<SpinWheel 
  items={items}
  size={500}
  // Gold & dark luxury theme used in casinos
  primaryColor="conic-gradient(from 0deg, #f1c40f, #b8860b, #f1c40f, #b8860b)"
  secondaryColor="radial-gradient(circle, #f1c40f, #b8860b)"
  rimStyle={{ 
      border: '8px solid #4a3b00',
      boxShadow: '0 0 30px rgba(241, 196, 15, 0.4)'
  }}
  pointerProps={{
      src: '/path/to/custom-jewel-pointer.png', // Or use style object for CSS shape
      style: { width: 60, height: 80, top: -30 }
  }}
  fontFamily="'Cinzel', serif"
/>
```

---

## ⚙️ Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| **Core** | | | |
| `items` | `WheelItem[]` | **Required** | Array of segments (see WheelItem type). |
| `onSpinFinish` | `(item) => void` | - | Callback fired when the wheel stops. |
| `size` | `number` | `300` | Diameter of the wheel in pixels. |
| `spinDuration` | `number` | `4` | Duration of the spin in seconds. |
| **Visuals** | | | |
| `primaryColor` | `string` | *Gold Gradient* | Background/rim of the wheel container. can be a gradient string. |
| `secondaryColor` | `string` | *Gold Gradient* | Background of the center knob. |
| `rimStyle` | `CSSProperties` | - | Override style object for the outer rim container. |
| `pointerProps` | `object` | - | Customize the pointer `{ src, style, color }`. |
| **Typography** | | | |
| `fontFamily` | `string` | `Arial` | CSS font-family for segment labels. |
| `fontSize` | `number` | `14` | Font size (responsive auto-scaling available). |
| `textColor` | `string` | `#fff` | Default text color if not specified in `WheelItem`. |
| **Features** | | | |
| `disableSound` | `boolean` | `false` | Turn off procedural sound effects. |
| `disableConfetti` | `boolean` | `false` | Turn off the confetti celebration effect. |
| **Development** | | | |
| `debugResult` | `number` | - | Force a specific segment index (0-based) to win. |

### WheelItem Type

```typescript
interface WheelItem {
  id: string | number;
  label: string;
  color: string;      // Segment background color
  textColor?: string; // Optional override for this segment
  style?: CSSProperties; // Advanced style overrides
}
```

---

## 📜 License

Apache 2.0 © [Your Name/Company]

---

Built with ❤️ for the React Community.
