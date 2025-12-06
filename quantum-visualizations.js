// ===== QUANTUM MECHANICS VISUALIZATIONS =====
// Merged from quantum-mechanics-core repository
// Converted from Python to JavaScript with Canvas API

class QuantumVisualizer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.animationFrame = null;
    }

    clear() {
        this.ctx.fillStyle = '#0a0e27';
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    // ===== DOUBLE SLIT INTERFERENCE PATTERN =====
    doubleSlit(animate = false) {
        this.clear();

        const numPoints = 1000;
        const xRange = 20;
        const wavelength = 1.0;
        const slitDist = 3.0;
        const k = (2 * Math.PI) / wavelength;

        const points = [];
        let maxProb = 0;

        // Calculate interference pattern
        for (let i = 0; i < numPoints; i++) {
            const x = (i / numPoints) * xRange - xRange / 2;
            const r1 = Math.sqrt(x * x + (slitDist / 2) ** 2);
            const r2 = Math.sqrt(x * x + (-slitDist / 2) ** 2);

            // Complex wave superposition
            const real1 = Math.cos(k * r1);
            const imag1 = Math.sin(k * r1);
            const real2 = Math.cos(k * r2);
            const imag2 = Math.sin(k * r2);

            const realSum = real1 + real2;
            const imagSum = imag1 + imag2;

            // Probability density
            const prob = realSum * realSum + imagSum * imagSum;
            points.push({ x, prob });
            maxProb = Math.max(maxProb, prob);
        }

        // Normalize and draw
        this.ctx.strokeStyle = '#00ffff';
        this.ctx.fillStyle = 'rgba(0, 255, 255, 0.3)';
        this.ctx.lineWidth = 2;

        this.ctx.beginPath();
        points.forEach((point, i) => {
            const screenX = ((point.x + xRange / 2) / xRange) * this.width;
            const normalizedProb = (point.prob / maxProb) * (this.height * 0.7);
            const screenY = this.height - normalizedProb - 50;

            if (i === 0) {
                this.ctx.moveTo(screenX, screenY);
            } else {
                this.ctx.lineTo(screenX, screenY);
            }
        });
        this.ctx.stroke();

        // Fill area
        this.ctx.lineTo(this.width, this.height);
        this.ctx.lineTo(0, this.height);
        this.ctx.closePath();
        this.ctx.fill();

        // Draw labels
        this.drawText('Double Slit Interference Pattern', this.width / 2, 30, '20px Orbitron', '#00ffff');
        this.drawText('Ψ Wave Function Superposition', this.width / 2, 60, '14px Inter', '#a0aec0');
    }

    // ===== PARTICLE IN A BOX =====
    particleInBox(n = 2, animate = false) {
        this.clear();

        const L = 1.0;
        const numPoints = 200;
        const points = [];
        let maxProb = 0;

        // Calculate wave function
        for (let i = 0; i <= numPoints; i++) {
            const x = (i / numPoints) * L;
            const psi = Math.sqrt(2 / L) * Math.sin((n * Math.PI * x) / L);
            const prob = psi * psi;
            points.push({ x, prob });
            maxProb = Math.max(maxProb, prob);
        }

        // Draw wave function
        this.ctx.strokeStyle = '#00ff88';
        this.ctx.fillStyle = 'rgba(0, 255, 136, 0.3)';
        this.ctx.lineWidth = 3;

        const margin = 50;
        const graphWidth = this.width - 2 * margin;

        this.ctx.beginPath();
        points.forEach((point, i) => {
            const screenX = margin + (point.x / L) * graphWidth;
            const normalizedProb = (point.prob / maxProb) * (this.height * 0.6);
            const screenY = this.height - normalizedProb - 80;

            if (i === 0) {
                this.ctx.moveTo(screenX, screenY);
            } else {
                this.ctx.lineTo(screenX, screenY);
            }
        });
        this.ctx.stroke();

        // Fill area
        this.ctx.lineTo(margin + graphWidth, this.height - 80);
        this.ctx.lineTo(margin, this.height - 80);
        this.ctx.closePath();
        this.ctx.fill();

        // Draw box walls
        this.ctx.strokeStyle = '#ff0088';
        this.ctx.lineWidth = 4;
        this.ctx.beginPath();
        this.ctx.moveTo(margin, 100);
        this.ctx.lineTo(margin, this.height - 80);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(margin + graphWidth, 100);
        this.ctx.lineTo(margin + graphWidth, this.height - 80);
        this.ctx.stroke();

        // Labels
        this.drawText(`Particle in a Box (n=${n})`, this.width / 2, 30, '20px Orbitron', '#00ff88');
        this.drawText('Quantum Energy Level Visualization', this.width / 2, 60, '14px Inter', '#a0aec0');
    }

    // ===== BLOCH SPHERE (QUBIT VISUALIZATION) =====
    blochSphere(theta = Math.PI / 4, phi = 0, animate = false) {
        this.clear();

        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const radius = Math.min(this.width, this.height) * 0.35;

        // Draw sphere wireframe
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        this.ctx.lineWidth = 1;

        // Latitude lines
        for (let lat = -Math.PI / 2; lat <= Math.PI / 2; lat += Math.PI / 6) {
            this.ctx.beginPath();
            for (let lon = 0; lon <= 2 * Math.PI; lon += 0.1) {
                const x = centerX + radius * Math.cos(lat) * Math.cos(lon);
                const y = centerY + radius * Math.sin(lat);
                if (lon === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            this.ctx.stroke();
        }

        // Longitude lines
        for (let lon = 0; lon < 2 * Math.PI; lon += Math.PI / 6) {
            this.ctx.beginPath();
            for (let lat = -Math.PI / 2; lat <= Math.PI / 2; lat += 0.1) {
                const x = centerX + radius * Math.cos(lat) * Math.cos(lon);
                const y = centerY + radius * Math.sin(lat);
                if (lat === -Math.PI / 2) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            this.ctx.stroke();
        }

        // Draw axes
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        this.ctx.lineWidth = 2;

        // Z-axis (|0⟩ to |1⟩)
        this.ctx.beginPath();
        this.ctx.moveTo(centerX, centerY - radius);
        this.ctx.lineTo(centerX, centerY + radius);
        this.ctx.stroke();

        // X-axis
        this.ctx.beginPath();
        this.ctx.moveTo(centerX - radius, centerY);
        this.ctx.lineTo(centerX + radius, centerY);
        this.ctx.stroke();

        // Draw state vector
        const stateX = radius * Math.sin(theta) * Math.cos(phi);
        const stateY = -radius * Math.cos(theta);
        const stateZ = radius * Math.sin(theta) * Math.sin(phi);

        // Project to 2D
        const projX = centerX + stateX;
        const projY = centerY + stateY;

        // Draw arrow
        this.drawArrow(centerX, centerY, projX, projY, '#ff00ff', 4);

        // Draw state labels
        this.drawText('|0⟩', centerX + 15, centerY - radius - 10, '16px Inter', '#00ffff');
        this.drawText('|1⟩', centerX + 15, centerY + radius + 20, '16px Inter', '#00ffff');
        this.drawText('|+⟩', centerX + radius + 15, centerY + 5, '16px Inter', '#00ffff');
        this.drawText('|−⟩', centerX - radius - 25, centerY + 5, '16px Inter', '#00ffff');

        // Title
        this.drawText('Bloch Sphere - Qubit Superposition', this.width / 2, 30, '20px Orbitron', '#ff00ff');
        this.drawText('|Ψ⟩ = α|0⟩ + β|1⟩', this.width / 2, 60, '16px Inter', '#a0aec0');
    }

    // ===== QUANTUM TUNNELING VISUALIZATION =====
    quantumTunneling(time = 0) {
        this.clear();

        const barrierX = this.width * 0.4;
        const barrierWidth = this.width * 0.2;
        const barrierHeight = this.height * 0.5;

        // Draw potential barrier
        this.ctx.fillStyle = 'rgba(255, 0, 136, 0.3)';
        this.ctx.fillRect(barrierX, this.height / 2 - barrierHeight / 2, barrierWidth, barrierHeight);
        this.ctx.strokeStyle = '#ff0088';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(barrierX, this.height / 2 - barrierHeight / 2, barrierWidth, barrierHeight);

        // Draw wave packet
        const waveX = 100 + time * 2;
        const waveWidth = 80;
        const numPoints = 100;

        this.ctx.strokeStyle = '#00ff88';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();

        for (let i = 0; i < numPoints; i++) {
            const x = waveX + (i / numPoints) * waveWidth;
            const relX = (i / numPoints - 0.5) * 10;
            const envelope = Math.exp(-relX * relX);
            const wave = Math.sin(relX * 5 + time * 0.1);
            const y = this.height / 2 + wave * envelope * 50;

            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }
        this.ctx.stroke();

        // Labels
        this.drawText('Quantum Tunneling Effect', this.width / 2, 30, '20px Orbitron', '#00ff88');
        this.drawText('Wave packet penetrating classical barrier', this.width / 2, 60, '14px Inter', '#a0aec0');
        this.drawText('Barrier', barrierX + barrierWidth / 2, this.height / 2 - barrierHeight / 2 - 20, '14px Inter', '#ff0088');
    }

    // ===== HELPER FUNCTIONS =====
    drawText(text, x, y, font, color) {
        this.ctx.font = font;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = 'center';
        this.ctx.fillText(text, x, y);
    }

    drawArrow(fromX, fromY, toX, toY, color, width) {
        const headLength = 15;
        const angle = Math.atan2(toY - fromY, toX - fromX);

        this.ctx.strokeStyle = color;
        this.ctx.fillStyle = color;
        this.ctx.lineWidth = width;

        // Line
        this.ctx.beginPath();
        this.ctx.moveTo(fromX, fromY);
        this.ctx.lineTo(toX, toY);
        this.ctx.stroke();

        // Arrowhead
        this.ctx.beginPath();
        this.ctx.moveTo(toX, toY);
        this.ctx.lineTo(
            toX - headLength * Math.cos(angle - Math.PI / 6),
            toY - headLength * Math.sin(angle - Math.PI / 6)
        );
        this.ctx.lineTo(
            toX - headLength * Math.cos(angle + Math.PI / 6),
            toY - headLength * Math.sin(angle + Math.PI / 6)
        );
        this.ctx.closePath();
        this.ctx.fill();
    }

    stopAnimation() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
    }
}

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuantumVisualizer;
}
