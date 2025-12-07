# Quantum Gravity Control Panel 🚀⚛️

A powerful web-based reality manipulation interface that merges **quantum mechanics visualizations** with **Google Antigravity-style browser physics** using Matter.js.

## 🌟 Features

### Core Physics Engine (`gravity_hack.js`)
- **Matter.js Integration**: Real physics simulation with collision detection, gravity, and forces
- **DOM to Physics Conversion**: Automatically converts HTML elements into physics bodies
- **Smart Rendering**: Preserves text and images in physics bodies
- **Interactive**: Drag and throw elements with mouse

### Quantum Controls
1. **Quantum Probability (0-100%)**: Controls randomness/jitter in physics
   - At 0%: Normal physics behavior
   - At 100%: Maximum chaos with random forces applied to all bodies

2. **Antigravity Toggle**: Inverts gravity direction
   - OFF: Elements fall down (normal gravity)
   - ON: Elements float upward (inverted gravity)

3. **Time Dilation (0.5x - 5.0x)**: Adjust simulation speed
   - 0.5x: Slow motion (half speed)
   - 1.0x: Normal time
   - 5.0x: Fast forward (5x speed)

4. **Dispersal Effect**: Explosive radial force from screen center
   - Scatters all physics bodies outward
   - Adds random spin to each element

5. **Rotation Intensity (0-360°)**: Initial body rotation
6. **Scale Factor (0.5-1.5)**: Initial body size
7. **Activation Delay (0-5s)**: Time before physics activates

### Quantum Mechanics Visualizations
- **Double Slit Experiment**: Wave-particle duality
- **Particle in a Box**: Quantum confinement
- **Bloch Sphere**: Qubit state representation
- **Quantum Tunneling**: Barrier penetration

## 🎮 Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + Enter` | Toggle Quantum Gravity |
| `Ctrl + R` | Reset Reality |
| `Ctrl + E` | Export Code |
| `Escape` | Close Modal |

## 🔧 Technical Architecture

### File Structure
```
quantum-mechanics-core/
├── index.html                    # Main HTML structure
├── styles.css                    # Glassmorphism UI styles
├── script.js                     # Control panel logic
├── gravity_hack.js              # Matter.js physics engine ⭐
├── quantum-visualizations.js    # Canvas-based quantum simulations
└── README.md                    # This file
```

### How DOM-to-Physics Conversion Works

#### 1. **Element Detection**
```javascript
const selector = 'a, span, div, p, h1, h2, h3, button, img, li, td, th';
const elements = document.querySelectorAll(selector);
```

#### 2. **Bounding Box Measurement**
```javascript
const rect = el.getBoundingClientRect();
const x = rect.left + rect.width / 2;
const y = rect.top + rect.height / 2;
```

#### 3. **Physics Body Creation**
```javascript
const body = Bodies.rectangle(x, y, width, height, {
    restitution: 0.6,  // Bounciness
    friction: 0.1,
    density: 0.001
});
```

#### 4. **Visual Data Storage**
The original element's appearance is captured:

**For TEXT elements:**
```javascript
body.elementData = {
    type: 'text',
    text: el.innerText,
    color: computedStyle.color,
    fontSize: computedStyle.fontSize,
    fontFamily: computedStyle.fontFamily
};
```

**For IMAGE elements:**
```javascript
body.elementData = {
    type: 'image',
    imageSrc: el.src,
    image: el  // Reference for canvas drawImage
};
```

#### 5. **Custom Rendering**
After Matter.js updates physics, we render each body:

```javascript
// TEXT RENDERING
ctx.fillStyle = data.color;
ctx.font = `${data.fontWeight} ${data.fontSize} ${data.fontFamily}`;
ctx.fillText(data.text, 0, 0);

// IMAGE RENDERING
ctx.drawImage(data.image, -width/2, -height/2, width, height);
```

### Quantum Effects Implementation

#### Quantum Probability (Jitter)
Applied on every physics update:
```javascript
applyQuantumEffects() {
    const jitterStrength = this.quantumProbability / 100;
    
    this.physicsBodies.forEach(body => {
        if (Math.random() < jitterStrength) {
            const forceX = (Math.random() - 0.5) * 0.001 * jitterStrength;
            const forceY = (Math.random() - 0.5) * 0.001 * jitterStrength;
            Body.applyForce(body, body.position, { x: forceX, y: forceY });
        }
    });
}
```

#### Antigravity Toggle
```javascript
toggleAntigravity(enabled) {
    this.engine.world.gravity.y = enabled ? -1 : 1;
}
```

#### Time Dilation
```javascript
setTimeDilation(speed) {
    this.engine.timing.timeScale = speed; // 0.5 to 5.0
}
```

#### Dispersal Effect
```javascript
activateDispersal() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    this.physicsBodies.forEach(body => {
        const dx = body.position.x - centerX;
        const dy = body.position.y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;
        
        const forceX = (dx / distance) * 0.1;
        const forceY = (dy / distance) * 0.1;
        
        Body.applyForce(body, body.position, { x: forceX, y: forceY });
    });
}
```

## 🎨 Design System

### Color Palette (Quantum Theme)
- **Primary**: `#00ff88` (Quantum Green)
- **Secondary**: `#00d4ff` (Quantum Cyan)
- **Accent**: `#ff00ff` (Quantum Magenta)
- **Warning**: `#ffaa00` (Quantum Orange)

### Glassmorphism Effects
```css
background: rgba(21, 25, 50, 0.7);
backdrop-filter: blur(10px);
border: 1px solid rgba(0, 255, 136, 0.2);
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
```

## 🚀 Usage

### Basic Activation
1. Open `index.html` in a modern browser
2. Adjust quantum parameters in the control panel
3. Click "Activate Quantum Gravity" or press `Ctrl+Enter`
4. Watch as reality collapses into physics simulation!

### Advanced Usage

#### Export for Any Website
1. Configure your desired parameters
2. Click "Export Code"
3. Copy the generated JavaScript
4. Paste into browser console on any webpage
5. Watch the magic happen!

#### Real-time Control
While physics is active:
- Adjust **Time Dilation** slider → Changes simulation speed instantly
- Toggle **Antigravity** → Inverts gravity direction
- Click **Dispersal** → Explodes all elements from center
- Drag elements with mouse to throw them around

## 🔬 Physics Parameters Explained

### Restitution (Bounciness)
```javascript
restitution: 0.6  // 0 = no bounce, 1 = perfect bounce
```

### Friction
```javascript
friction: 0.1  // How much elements slow down when sliding
```

### Density
```javascript
density: 0.001  // Mass per unit area (lighter = floatier)
```

### Gravity Scale
```javascript
gravity: {
    x: 0,
    y: 1,  // or -1 for antigravity
    scale: 0.001  // Strength multiplier
}
```

## 🐛 Troubleshooting

### Physics Not Activating
- Check browser console for errors
- Ensure Matter.js CDN is loaded
- Verify `gravity_hack.js` is included before `script.js`

### Elements Not Visible
- Check if elements are too small (min 5x5 pixels)
- Verify elements aren't hidden by CSS
- Look for elements outside viewport

### Performance Issues
- Reduce number of elements on page
- Lower quantum probability (less jitter = better performance)
- Disable dispersal effect
- Use normal time dilation (1.0x)

## 📚 Dependencies

- **Matter.js** v0.19.0 - Physics engine
- **Google Fonts** - Orbitron & Inter typefaces
- **Modern Browser** - Chrome, Firefox, Edge, Safari (ES6+ support)

## 🎯 Future Enhancements

- [ ] Multiple gravity wells (attract to mouse)
- [ ] Quantum entanglement (link element pairs)
- [ ] Wave function collapse animation
- [ ] Superposition state (elements in multiple positions)
- [ ] Custom element selection (choose what to convert)
- [ ] Save/load presets
- [ ] Mobile touch controls
- [ ] VR/AR integration

## 📄 License

MIT License - Feel free to use, modify, and distribute!

## 🙏 Credits

- **Matter.js** by Liam Brummitt
- **Google Antigravity** concept inspiration
- **Quantum Mechanics** visualizations based on standard physics simulations

---

**Built with ⚛️ by a Creative Technologist who believes reality is just a suggestion.**

*"Any sufficiently advanced technology is indistinguishable from magic." - Arthur C. Clarke*
