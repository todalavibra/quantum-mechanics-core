// ===== STATE MANAGEMENT =====
const state = {
    quantumProbability: 30,
    animationSpeed: 2.0,
    rotationIntensity: 10,
    scaleFactor: 0.9,
    delayTime: 1.0,
    activeTerms: [
        "Superposition", "Entanglement", "Ψ Wave Function", "Tunneling",
        "Planck", "Heisenberg", "Qubit", "Schrödinger", "Decoherence"
    ]
};

// ===== DOM ELEMENTS =====
const elements = {
    probabilitySlider: document.getElementById('quantum-probability'),
    probabilityValue: document.getElementById('probability-value'),
    speedSlider: document.getElementById('animation-speed'),
    speedValue: document.getElementById('speed-value'),
    rotationSlider: document.getElementById('rotation-intensity'),
    rotationValue: document.getElementById('rotation-value'),
    scaleSlider: document.getElementById('scale-factor'),
    scaleValue: document.getElementById('scale-value'),
    delaySlider: document.getElementById('delay-time'),
    delayValue: document.getElementById('delay-value'),
    activateBtn: document.getElementById('activate-btn'),
    resetBtn: document.getElementById('reset-btn'),
    exportBtn: document.getElementById('export-btn'),
    populateBtn: document.getElementById('populate-btn'),
    demoContent: document.getElementById('demo-content'),
    exportModal: document.getElementById('export-modal'),
    closeModal: document.getElementById('close-modal'),
    exportCode: document.getElementById('export-code'),
    copyCodeBtn: document.getElementById('copy-code-btn'),
    statusText: document.querySelector('.status-text'),
    chips: document.querySelectorAll('.chip'),
    vizBtns: document.querySelectorAll('.viz-btn')
};

// ===== QUANTUM VISUALIZER =====
let quantumViz = null;

// ===== INITIALIZATION =====
function init() {
    setupEventListeners();
    updateAllValues();
    initQuantumVisualizations();
}

// ===== QUANTUM VISUALIZATION SETUP =====
function initQuantumVisualizations() {
    quantumViz = new QuantumVisualizer('quantum-canvas');
    // Show double slit by default
    quantumViz.doubleSlit();
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Slider updates
    elements.probabilitySlider.addEventListener('input', (e) => {
        state.quantumProbability = parseInt(e.target.value);
        elements.probabilityValue.textContent = `${state.quantumProbability}%`;
    });

    elements.speedSlider.addEventListener('input', (e) => {
        state.animationSpeed = parseFloat(e.target.value);
        elements.speedValue.textContent = `${state.animationSpeed.toFixed(1)}s`;
    });

    elements.rotationSlider.addEventListener('input', (e) => {
        state.rotationIntensity = parseInt(e.target.value);
        elements.rotationValue.textContent = `${state.rotationIntensity}°`;
    });

    elements.scaleSlider.addEventListener('input', (e) => {
        state.scaleFactor = parseFloat(e.target.value);
        elements.scaleValue.textContent = state.scaleFactor.toFixed(2);
    });

    elements.delaySlider.addEventListener('input', (e) => {
        state.delayTime = parseFloat(e.target.value);
        elements.delayValue.textContent = `${state.delayTime.toFixed(1)}s`;
    });

    // Chip toggles
    elements.chips.forEach(chip => {
        chip.addEventListener('click', () => {
            const term = chip.dataset.term;
            chip.classList.toggle('active');

            if (chip.classList.contains('active')) {
                if (!state.activeTerms.includes(term)) {
                    state.activeTerms.push(term);
                }
            } else {
                state.activeTerms = state.activeTerms.filter(t => t !== term);
            }
        });
    });

    // Action buttons
    elements.activateBtn.addEventListener('click', activateQuantumGravity);
    elements.resetBtn.addEventListener('click', resetReality);
    elements.exportBtn.addEventListener('click', showExportModal);
    elements.populateBtn.addEventListener('click', populateContent);

    // Modal controls
    elements.closeModal.addEventListener('click', hideExportModal);
    elements.copyCodeBtn.addEventListener('click', copyCode);

    // Close modal on outside click
    elements.exportModal.addEventListener('click', (e) => {
        if (e.target === elements.exportModal) {
            hideExportModal();
        }
    });

    // Visualization button controls
    elements.vizBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            elements.vizBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            // Show corresponding visualization
            const vizType = btn.dataset.viz;
            switchVisualization(vizType);
        });
    });
}

// ===== VISUALIZATION SWITCHER =====
function switchVisualization(type) {
    if (!quantumViz) return;

    switch (type) {
        case 'doubleSlit':
            quantumViz.doubleSlit();
            break;
        case 'particleBox':
            quantumViz.particleInBox(2);
            break;
        case 'blochSphere':
            quantumViz.blochSphere(Math.PI / 4, 0);
            break;
        case 'tunneling':
            quantumViz.quantumTunneling(0);
            break;
        default:
            quantumViz.doubleSlit();
    }
}

// ===== UPDATE DISPLAY VALUES =====
function updateAllValues() {
    elements.probabilityValue.textContent = `${state.quantumProbability}%`;
    elements.speedValue.textContent = `${state.animationSpeed.toFixed(1)}s`;
    elements.rotationValue.textContent = `${state.rotationIntensity}°`;
    elements.scaleValue.textContent = state.scaleFactor.toFixed(2);
    elements.delayValue.textContent = `${state.delayTime.toFixed(1)}s`;
}

// ===== QUANTUM GRAVITY ACTIVATION =====
function activateQuantumGravity() {
    updateStatus('Activating Quantum Field...', '#ffaa00');

    // Get all elements in demo area
    const demoElements = elements.demoContent.querySelectorAll('a, span, div, p, h1, h2, button');

    // Phase 1: Inject Quantum Terminology
    demoElements.forEach((el, index) => {
        const probability = state.quantumProbability / 100;

        if (el.innerText &&
            el.innerText.trim().length > 0 &&
            el.innerText.trim().length < 20 &&
            Math.random() > (1 - probability) &&
            state.activeTerms.length > 0) {

            const randomTerm = state.activeTerms[Math.floor(Math.random() * state.activeTerms.length)];
            el.innerText = randomTerm;
            el.style.color = "#00FF00";
            el.style.fontFamily = "monospace";
            el.style.textShadow = "0 0 10px #00FF00";
        }
    });

    // Phase 2: Apply Antigravity Physics
    elements.demoContent.style.overflow = "hidden";
    elements.demoContent.style.transition = `transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)`;
    elements.demoContent.style.transform = `rotate(${state.rotationIntensity}deg) scale(${state.scaleFactor})`;

    // Phase 3: The Fall
    setTimeout(() => {
        updateStatus('Quantum Gravity Active!', '#ff00ff');

        demoElements.forEach(el => {
            const randomSpeed = Math.random() * state.animationSpeed + (state.animationSpeed / 2);
            el.style.transition = `all ${randomSpeed}s ease-in`;
            el.style.transform = `translate(${Math.random() * 200 - 100}px, ${window.innerHeight}px) rotate(${Math.random() * 360}deg)`;
            el.style.opacity = "0.8";
        });

        // Show completion message
        setTimeout(() => {
            updateStatus('Reality Collapsed', '#00ff88');
            showNotification('Quantum Mechanics Core loaded successfully!');
        }, state.animationSpeed * 1000);

    }, state.delayTime * 1000);
}

// ===== RESET REALITY =====
function resetReality() {
    updateStatus('Restoring Reality...', '#00d4ff');

    // Reset demo content
    const demoElements = elements.demoContent.querySelectorAll('a, span, div, p, h1, h2, button');

    demoElements.forEach(el => {
        el.style.transition = 'all 0.5s ease';
        el.style.transform = 'translate(0, 0) rotate(0deg)';
        el.style.opacity = '1';
        el.style.color = '';
        el.style.fontFamily = '';
        el.style.textShadow = '';
    });

    elements.demoContent.style.transform = 'rotate(0deg) scale(1)';
    elements.demoContent.style.overflow = '';

    setTimeout(() => {
        // Restore original content
        populateContent();
        updateStatus('System Ready', '#00ff88');
    }, 500);
}

// ===== POPULATE DEMO CONTENT =====
function populateContent() {
    elements.demoContent.innerHTML = `
        <h1>Welcome to the Quantum Realm</h1>
        <p>This is a demonstration environment where you can test the quantum gravity effects in real-time.</p>
        
        <div class="demo-card">
            <h2>Quantum Mechanics</h2>
            <p>The study of matter and energy at the molecular, atomic, nuclear, and even smaller microscopic levels.</p>
            <button>Learn More</button>
        </div>

        <div class="demo-card">
            <h2>General Relativity</h2>
            <p>Einstein's theory of gravitation describing gravity as a geometric property of space and time.</p>
            <button>Explore Theory</button>
        </div>

        <div class="demo-card">
            <h2>String Theory</h2>
            <p>A theoretical framework in which point-like particles are replaced by one-dimensional strings.</p>
            <button>Dive Deeper</button>
        </div>

        <div class="demo-links">
            <a href="#physics">Physics</a>
            <a href="#mathematics">Mathematics</a>
            <a href="#cosmology">Cosmology</a>
            <a href="#particles">Particle Physics</a>
        </div>

        <span class="demo-label">Quantum State: Active</span>
        <span class="demo-label">Gravity: Normal</span>
        <span class="demo-label">Reality: Stable</span>
    `;
}

// ===== EXPORT CODE MODAL =====
function showExportModal() {
    const code = generateExportCode();
    elements.exportCode.textContent = code;
    elements.exportModal.classList.add('active');
}

function hideExportModal() {
    elements.exportModal.classList.remove('active');
}

function generateExportCode() {
    return `// QUANTUM GRAVITY HACK - Generated Code
// Paste this into your browser console on any webpage

(function() {
    // Configuration
    const config = {
        quantumTerms: ${JSON.stringify(state.activeTerms)},
        probability: ${state.quantumProbability / 100},
        animationSpeed: ${state.animationSpeed},
        rotationIntensity: ${state.rotationIntensity},
        scaleFactor: ${state.scaleFactor},
        delayTime: ${state.delayTime}
    };

    // Get all elements
    const allElements = document.querySelectorAll('a, span, div, p, h1, h2, button');

    // Phase 1: Inject Quantum Terminology
    allElements.forEach((el, index) => {
        if (el.innerText && 
            el.innerText.trim().length > 0 && 
            el.innerText.trim().length < 20 && 
            Math.random() > (1 - config.probability)) {
            
            el.innerText = config.quantumTerms[Math.floor(Math.random() * config.quantumTerms.length)];
            el.style.color = "#00FF00";
            el.style.fontFamily = "monospace";
            el.style.textShadow = "0 0 10px #00FF00";
        }
    });

    // Phase 2: Apply Antigravity Physics
    document.body.style.overflow = "hidden";
    document.body.style.transition = "transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)";
    document.body.style.transform = \`rotate(\${config.rotationIntensity}deg) scale(\${config.scaleFactor})\`;

    // Phase 3: The Fall
    setTimeout(() => {
        allElements.forEach(el => {
            const randomSpeed = Math.random() * config.animationSpeed + (config.animationSpeed / 2);
            el.style.transition = \`all \${randomSpeed}s ease-in\`;
            el.style.transform = \`translate(\${Math.random() * 200 - 100}px, \${window.innerHeight + 500}px) rotate(\${Math.random() * 360}deg)\`;
            el.style.opacity = "0.8";
        });
        
        console.log("Status: Quantum Gravity Active");
        alert("Quantum Mechanics Core loaded successfully!");
    }, config.delayTime * 1000);
})();`;
}

function copyCode() {
    const code = elements.exportCode.textContent;
    navigator.clipboard.writeText(code).then(() => {
        const originalText = elements.copyCodeBtn.innerHTML;
        elements.copyCodeBtn.innerHTML = '<span class="btn-icon">✓</span> Copied!';
        elements.copyCodeBtn.style.background = 'linear-gradient(135deg, #00ff88, #00d4ff)';

        setTimeout(() => {
            elements.copyCodeBtn.innerHTML = originalText;
            elements.copyCodeBtn.style.background = '';
        }, 2000);
    }).catch(err => {
        showNotification('Failed to copy code. Please copy manually.', true);
    });
}

// ===== UTILITY FUNCTIONS =====
function updateStatus(text, color) {
    elements.statusText.textContent = text;
    elements.statusText.style.color = color;
    document.querySelector('.status-dot').style.background = color;
}

function showNotification(message, isError = false) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${isError ? '#ff4444' : 'linear-gradient(135deg, #00ff88, #00d4ff)'};
        color: ${isError ? '#fff' : '#0a0e27'};
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== INITIALIZE APP =====
document.addEventListener('DOMContentLoaded', init);

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter: Activate
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        activateQuantumGravity();
    }

    // Ctrl/Cmd + R: Reset (prevent default browser refresh)
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        resetReality();
    }

    // Ctrl/Cmd + E: Export
    if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        showExportModal();
    }

    // Escape: Close modal
    if (e.key === 'Escape') {
        hideExportModal();
    }
});

console.log('%c🚀 Quantum Gravity Control Panel Loaded', 'color: #00ff88; font-size: 16px; font-weight: bold;');
console.log('%cKeyboard Shortcuts:', 'color: #00d4ff; font-size: 14px;');
console.log('%c  Ctrl/Cmd + Enter: Activate Quantum Gravity', 'color: #fff;');
console.log('%c  Ctrl/Cmd + R: Reset Reality', 'color: #fff;');
console.log('%c  Ctrl/Cmd + E: Export Code', 'color: #fff;');
console.log('%c  Escape: Close Modal', 'color: #fff;');
