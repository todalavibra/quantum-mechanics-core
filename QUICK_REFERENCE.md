# ⚡ Quantum Gravity Control Panel - Quick Reference

## 🎮 Keyboard Shortcuts

| Key Combination | Action |
|----------------|--------|
| `Ctrl + Enter` | Toggle Quantum Gravity ON/OFF |
| `Ctrl + R` | Reset Reality to Normal |
| `Ctrl + E` | Export Code for Any Website |
| `Escape` | Close Export Modal |

## 🎛️ Control Parameters

### Quantum Probability (0-100%)
**What it does**: Controls chaos/randomness in physics
- **0%**: Smooth, predictable physics
- **50%**: Moderate jitter and unpredictability  
- **100%**: Maximum chaos - elements jitter wildly

### Time Dilation (0.5x - 5.0x)
**What it does**: Adjusts simulation speed
- **0.5x**: Slow motion (Matrix-style)
- **1.0x**: Normal speed
- **5.0x**: Fast forward

### Antigravity Toggle
**What it does**: Inverts gravity direction
- **OFF**: Elements fall down ⬇️
- **ON**: Elements float up ⬆️

### Dispersal Button 💥
**What it does**: Explodes all elements from screen center
- Creates radial force outward
- Adds random spin to elements
- Best used after activation

### Animation Speed (0.5s - 5.0s)
**What it does**: Duration of fall animation (legacy mode)

### Rotation Intensity (0° - 360°)
**What it does**: Initial rotation angle (legacy mode)

### Scale Factor (0.5 - 1.5)
**What it does**: Initial size multiplier (legacy mode)

### Activation Delay (0s - 5s)
**What it does**: Wait time before physics starts

## 🚀 Quick Start

### Method 1: Use the Control Panel
1. Open `index.html` in browser
2. Adjust parameters to your liking
3. Click "Activate Quantum Gravity" or press `Ctrl+Enter`
4. Watch reality collapse! 🌌

### Method 2: Use on Any Website
1. Open `index.html`
2. Configure your desired settings
3. Click "Export Code"
4. Copy the generated JavaScript
5. Open any website
6. Open browser console (F12)
7. Paste and press Enter
8. Magic! ✨

### Method 3: Direct Console Command
```javascript
// On any page with gravity_hack.js loaded
activateGravity({
    quantumProbability: 50,
    antigravity: false,
    timeDilation: 1.0,
    dispersal: true
});
```

## 🎯 Common Use Cases

### 1. Slow Motion Gravity
```javascript
activateGravity({
    timeDilation: 0.5,
    quantumProbability: 0
});
```

### 2. Chaotic Antigravity
```javascript
activateGravity({
    antigravity: true,
    quantumProbability: 100,
    timeDilation: 2.0
});
```

### 3. Explosive Dispersal
```javascript
activateGravity({
    dispersal: true,
    timeDilation: 0.7,
    quantumProbability: 30
});
```

### 4. Fast Chaos Mode
```javascript
activateGravity({
    quantumProbability: 100,
    timeDilation: 3.0,
    dispersal: true
});
```

## 🎨 Visual Effects Guide

### Quantum Probability Effects
- **Low (0-30%)**: Subtle wobble, mostly stable
- **Medium (31-70%)**: Noticeable jitter, unpredictable bounces
- **High (71-100%)**: Wild chaos, elements fly randomly

### Time Dilation Effects
- **Slow (0.5x)**: Cinematic slow-motion falls
- **Normal (1.0x)**: Natural physics speed
- **Fast (2.0x+)**: Rapid, energetic movement

### Antigravity Behavior
- Elements float upward instead of falling
- Bounces off ceiling boundary
- Combine with dispersal for "explosion upward" effect

### Dispersal Animation
- All elements pushed away from screen center
- Creates "reality shattering" effect
- Works best with medium time dilation (0.7-1.5x)

## 🔧 Troubleshooting

### "Nothing happens when I press Ctrl+Enter"
- Check browser console for errors (F12)
- Verify Matter.js CDN loaded (check Network tab)
- Ensure `gravity_hack.js` is loaded before `script.js`

### "Elements disappear but don't fall"
- Check if elements are too small (min 5x5 pixels)
- Verify canvas is visible (check z-index)
- Look for JavaScript errors in console

### "Physics is too slow/fast"
- Adjust Time Dilation slider
- Check computer performance (close other tabs)
- Reduce Quantum Probability for better performance

### "Can't interact with page after activation"
- This is expected - elements are now physics objects
- Press `Ctrl+R` or click "Reset Reality" to restore
- Or call `deactivateGravity()` in console

## 💡 Pro Tips

1. **Start with low Quantum Probability** (10-30%) to see smooth physics first
2. **Use Time Dilation 0.7x** for most dramatic slow-motion effect
3. **Activate Dispersal** after elements have fallen for secondary explosion
4. **Toggle Antigravity** while physics is running for instant direction change
5. **Combine effects** for unique results (e.g., antigravity + dispersal + high probability)

## 📱 Browser Compatibility

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ Full | Best performance |
| Firefox | ✅ Full | Excellent support |
| Edge | ✅ Full | Chromium-based |
| Safari | ⚠️ Partial | May need polyfills |
| Mobile | ⚠️ Limited | Touch controls not optimized |

## 🎓 Learning Resources

- **Matter.js Docs**: https://brm.io/matter-js/
- **Canvas API**: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
- **Physics Concepts**: https://en.wikipedia.org/wiki/Classical_mechanics

## 🆘 Need Help?

1. Check `README.md` for detailed documentation
2. Review `IMPLEMENTATION_SUMMARY.md` for technical details
3. Open browser console (F12) to see error messages
4. Test with `test-gravity.html` for isolated debugging

---

**Remember**: Reality is just a suggestion. Break it responsibly! 🌌⚛️
