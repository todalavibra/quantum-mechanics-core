/**
 * ===================================================================
 * QUANTUM GRAVITY HACK - Matter.js Physics Engine
 * ===================================================================
 * 
 * This module implements a Google Antigravity-style browser hack
 * enhanced with quantum mechanics controls. It uses Matter.js to
 * create realistic physics simulations of DOM elements.
 * 
 * Features:
 * - DOM to Physics body conversion
 * - Quantum Probability (randomness/jitter)
 * - Antigravity toggle (invert gravity)
 * - Dispersal animation (explosive radial force)
 * - Time Dilation (slow motion control)
 * - Ctrl+Enter activation shortcut
 * 
 * Dependencies: Matter.js (CDN loaded in HTML)
 * ===================================================================
 */

// ===== MATTER.JS ALIASES =====
const { Engine, Render, Runner, World, Bodies, Body, Events, Mouse, MouseConstraint } = Matter;

// ===== PHYSICS ENGINE STATE =====
class GravityHackEngine {
    constructor() {
        this.engine = null;
        this.render = null;
        this.runner = null;
        this.world = null;
        this.canvas = null;
        this.physicsEnabled = false;
        this.originalElements = []; // Store original DOM elements and their properties
        this.physicsBodies = []; // Store Matter.js bodies
        this.mouseConstraint = null;

        // Quantum parameters
        this.quantumProbability = 0; // 0-100%
        this.antigravityEnabled = false;
        this.timeDilation = 1.0; // 0.5 to 5.0
        this.dispersalActive = false;
    }

    /**
     * Initialize the Matter.js physics engine
     * Creates the engine, world, and canvas renderer
     */
    init() {
        console.log('🚀 Initializing Matter.js Physics Engine...');

        // Create physics engine
        this.engine = Engine.create({
            enableSleeping: false,
            gravity: {
                x: 0,
                y: 1, // Normal gravity (positive = down)
                scale: 0.001
            }
        });

        this.world = this.engine.world;

        // Create canvas for rendering
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'gravity-hack-canvas';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 999999;
            pointer-events: none;
            background: transparent;
        `;
        document.body.appendChild(this.canvas);

        // Create renderer
        this.render = Render.create({
            canvas: this.canvas,
            engine: this.engine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                wireframes: false,
                background: 'transparent',
                pixelRatio: window.devicePixelRatio || 1
            }
        });

        // Add mouse control for dragging physics bodies
        const mouse = Mouse.create(this.canvas);
        this.mouseConstraint = MouseConstraint.create(this.engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: { visible: false }
            }
        });

        // Enable pointer events on canvas when physics is active
        this.canvas.style.pointerEvents = 'auto';
        World.add(this.world, this.mouseConstraint);

        // Create boundaries (floor, walls, ceiling)
        this.createBoundaries();

        // Start the engine
        this.runner = Runner.create();
        Runner.run(this.runner, this.engine);
        Render.run(this.render);

        // Handle window resize
        window.addEventListener('resize', () => this.handleResize());

        // Apply quantum jitter on each update
        Events.on(this.engine, 'beforeUpdate', () => this.applyQuantumEffects());

        this.physicsEnabled = true;
        console.log('✅ Physics Engine Initialized');
    }

    /**
     * Create invisible boundaries (walls, floor, ceiling)
     * to contain the physics simulation
     */
    createBoundaries() {
        const thickness = 50;
        const width = window.innerWidth;
        const height = window.innerHeight;

        const boundaries = [
            // Floor
            Bodies.rectangle(width / 2, height + thickness / 2, width, thickness, {
                isStatic: true,
                render: { fillStyle: 'transparent' }
            }),
            // Left wall
            Bodies.rectangle(-thickness / 2, height / 2, thickness, height * 2, {
                isStatic: true,
                render: { fillStyle: 'transparent' }
            }),
            // Right wall
            Bodies.rectangle(width + thickness / 2, height / 2, thickness, height * 2, {
                isStatic: true,
                render: { fillStyle: 'transparent' }
            }),
            // Ceiling (for antigravity mode)
            Bodies.rectangle(width / 2, -thickness / 2, width, thickness, {
                isStatic: true,
                render: { fillStyle: 'transparent' }
            })
        ];

        World.add(this.world, boundaries);
    }

    /**
     * Handle window resize - update canvas and boundaries
     */
    handleResize() {
        if (!this.render) return;

        this.render.canvas.width = window.innerWidth;
        this.render.canvas.height = window.innerHeight;
        this.render.options.width = window.innerWidth;
        this.render.options.height = window.innerHeight;

        // Recreate boundaries
        World.clear(this.world, false);
        this.createBoundaries();

        // Re-add physics bodies
        this.physicsBodies.forEach(body => World.add(this.world, body));
    }

    /**
     * ===================================================================
     * DOM TO PHYSICS CONVERSION
     * ===================================================================
     * 
     * This is the core mechanism that makes the "antigravity" effect work.
     * 
     * Process:
     * 1. Identify all visible DOM elements on the page
     * 2. Measure their bounding boxes (position, size)
     * 3. Capture their visual appearance (text, images, colors)
     * 4. Create Matter.js bodies with matching dimensions
     * 5. Render the bodies to look like the original elements
     * 6. Hide the original DOM elements
     * 7. Let physics take over!
     * 
     * Text vs Images:
     * - TEXT: Rendered using canvas fillText with matching font/color
     * - IMAGES: Drawn using canvas drawImage from the original img src
     * - BACKGROUNDS: Captured and applied as body fill color
     */
    convertDOMToPhysics(targetElement = document.body) {
        console.log('🔄 Converting DOM elements to physics bodies...');

        // Select elements to convert (exclude our own canvas and controls)
        const selector = 'a, span, div:not(#gravity-hack-canvas):not(.control-panel), p, h1, h2, h3, button, img, li, td, th';
        const elements = targetElement.querySelectorAll(selector);

        let convertedCount = 0;

        elements.forEach((el) => {
            // Skip if element is not visible or too small
            const rect = el.getBoundingClientRect();
            if (rect.width < 5 || rect.height < 5 || rect.top > window.innerHeight) {
                return;
            }

            // Skip if element is our control panel or canvas
            if (el.closest('.control-panel') || el.id === 'gravity-hack-canvas') {
                return;
            }

            // Create physics body based on element type
            const body = this.createBodyFromElement(el, rect);

            if (body) {
                // Store original element data
                this.originalElements.push({
                    element: el,
                    rect: rect,
                    body: body
                });

                // Add body to world
                World.add(this.world, body);
                this.physicsBodies.push(body);

                // Hide original element
                el.style.opacity = '0';
                el.style.pointerEvents = 'none';

                convertedCount++;
            }
        });

        console.log(`✅ Converted ${convertedCount} elements to physics bodies`);
    }

    /**
     * Create a Matter.js body from a DOM element
     * Handles different element types (text, images, containers)
     */
    createBodyFromElement(el, rect) {
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        const width = rect.width;
        const height = rect.height;

        // Get computed styles
        const styles = window.getComputedStyle(el);
        const backgroundColor = styles.backgroundColor;
        const color = styles.color;
        const fontSize = styles.fontSize;
        const fontFamily = styles.fontFamily;
        const fontWeight = styles.fontWeight;

        // Create physics body (rectangle for simplicity)
        const body = Bodies.rectangle(x, y, width, height, {
            restitution: 0.6, // Bounciness
            friction: 0.1,
            density: 0.001,
            render: {
                fillStyle: backgroundColor !== 'rgba(0, 0, 0, 0)' ? backgroundColor : '#ffffff',
                strokeStyle: '#000000',
                lineWidth: 1
            }
        });

        // Store element-specific rendering data
        body.elementData = {
            type: this.getElementType(el),
            text: el.innerText?.trim() || '',
            color: color,
            fontSize: fontSize,
            fontFamily: fontFamily,
            fontWeight: fontWeight,
            backgroundColor: backgroundColor,
            tagName: el.tagName.toLowerCase()
        };

        // Handle images separately
        if (el.tagName === 'IMG') {
            body.elementData.type = 'image';
            body.elementData.imageSrc = el.src;
            body.elementData.image = el; // Store reference to load image
        }

        return body;
    }

    /**
     * Determine element type for rendering
     */
    getElementType(el) {
        if (el.tagName === 'IMG') return 'image';
        if (el.innerText && el.innerText.trim().length > 0) return 'text';
        return 'container';
    }

    /**
     * Custom rendering for physics bodies
     * This makes the bodies look like the original DOM elements
     */
    renderBodies() {
        const ctx = this.render.context;
        const bodies = this.physicsBodies;

        bodies.forEach(body => {
            const { position, angle, bounds } = body;
            const data = body.elementData;

            if (!data) return;

            ctx.save();
            ctx.translate(position.x, position.y);
            ctx.rotate(angle);

            const width = bounds.max.x - bounds.min.x;
            const height = bounds.max.y - bounds.min.y;

            // Draw background
            if (data.backgroundColor && data.backgroundColor !== 'rgba(0, 0, 0, 0)') {
                ctx.fillStyle = data.backgroundColor;
                ctx.fillRect(-width / 2, -height / 2, width, height);
            }

            // Render based on type
            if (data.type === 'text' && data.text) {
                // TEXT RENDERING
                ctx.fillStyle = data.color || '#000000';
                ctx.font = `${data.fontWeight} ${data.fontSize} ${data.fontFamily}`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                // Truncate text if too long
                const maxLength = 50;
                const displayText = data.text.length > maxLength
                    ? data.text.substring(0, maxLength) + '...'
                    : data.text;

                ctx.fillText(displayText, 0, 0);
            } else if (data.type === 'image' && data.image) {
                // IMAGE RENDERING
                try {
                    ctx.drawImage(data.image, -width / 2, -height / 2, width, height);
                } catch (e) {
                    // Fallback if image fails to load
                    ctx.fillStyle = '#cccccc';
                    ctx.fillRect(-width / 2, -height / 2, width, height);
                }
            }

            // Draw border
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
            ctx.lineWidth = 1;
            ctx.strokeRect(-width / 2, -height / 2, width, height);

            ctx.restore();
        });
    }

    /**
     * ===================================================================
     * QUANTUM EFFECTS
     * ===================================================================
     */

    /**
     * Apply quantum probability effects
     * Higher probability = more random jitter/chaos
     */
    applyQuantumEffects() {
        if (this.quantumProbability === 0) return;

        const jitterStrength = this.quantumProbability / 100;

        this.physicsBodies.forEach(body => {
            if (body.isStatic) return;

            // Random force application based on quantum probability
            if (Math.random() < jitterStrength) {
                const forceMagnitude = 0.001 * jitterStrength;
                const forceX = (Math.random() - 0.5) * forceMagnitude;
                const forceY = (Math.random() - 0.5) * forceMagnitude;

                Body.applyForce(body, body.position, {
                    x: forceX,
                    y: forceY
                });
            }

            // Random angular velocity
            if (Math.random() < jitterStrength * 0.5) {
                Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.1 * jitterStrength);
            }
        });
    }

    /**
     * Toggle antigravity mode
     * Inverts gravity direction (elements float up instead of fall down)
     */
    toggleAntigravity(enabled) {
        this.antigravityEnabled = enabled;

        if (enabled) {
            // Invert gravity (negative = up)
            this.engine.world.gravity.y = -1;
            console.log('🔼 Antigravity ENABLED - Elements will float upward');
        } else {
            // Normal gravity (positive = down)
            this.engine.world.gravity.y = 1;
            console.log('🔽 Antigravity DISABLED - Normal gravity restored');
        }
    }

    /**
     * Activate dispersal animation
     * Applies explosive radial force from center of screen
     */
    activateDispersal() {
        console.log('💥 Activating Dispersal Effect...');

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const explosionForce = 0.1;

        this.physicsBodies.forEach(body => {
            if (body.isStatic) return;

            // Calculate direction from center to body
            const dx = body.position.x - centerX;
            const dy = body.position.y - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy) || 1;

            // Normalize and apply force
            const forceX = (dx / distance) * explosionForce;
            const forceY = (dy / distance) * explosionForce;

            Body.applyForce(body, body.position, {
                x: forceX,
                y: forceY
            });

            // Add random spin
            Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.3);
        });

        this.dispersalActive = true;
        console.log('✅ Dispersal Complete - Reality scattered!');
    }

    /**
     * Set time dilation (slow motion effect)
     * @param {number} speed - 0.5 (slow) to 5.0 (fast)
     */
    setTimeDilation(speed) {
        this.timeDilation = Math.max(0.5, Math.min(5.0, speed));
        this.engine.timing.timeScale = this.timeDilation;
        console.log(`⏱️ Time Dilation set to ${this.timeDilation.toFixed(2)}x`);
    }

    /**
     * Set quantum probability
     * @param {number} probability - 0 to 100
     */
    setQuantumProbability(probability) {
        this.quantumProbability = Math.max(0, Math.min(100, probability));
        console.log(`🎲 Quantum Probability set to ${this.quantumProbability}%`);
    }

    /**
     * Cleanup and destroy physics engine
     */
    destroy() {
        if (!this.physicsEnabled) return;

        console.log('🧹 Destroying physics engine...');

        // Stop engine
        if (this.runner) {
            Runner.stop(this.runner);
        }

        if (this.render) {
            Render.stop(this.render);
        }

        // Clear world
        World.clear(this.world, false);
        Engine.clear(this.engine);

        // Remove canvas
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }

        // Restore original elements
        this.originalElements.forEach(({ element }) => {
            element.style.opacity = '';
            element.style.pointerEvents = '';
        });

        // Reset state
        this.originalElements = [];
        this.physicsBodies = [];
        this.physicsEnabled = false;

        console.log('✅ Physics engine destroyed, reality restored');
    }
}

// ===== GLOBAL INSTANCE =====
let gravityHack = null;

/**
 * ===================================================================
 * ACTIVATION FUNCTION
 * ===================================================================
 * 
 * This is the main entry point called when user activates the effect
 */
function activateGravity(options = {}) {
    console.log('🚀 ACTIVATING QUANTUM GRAVITY HACK...');

    // Destroy existing instance if any
    if (gravityHack) {
        gravityHack.destroy();
    }

    // Create new instance
    gravityHack = new GravityHackEngine();

    // Initialize physics engine
    gravityHack.init();

    // Apply options
    if (options.quantumProbability !== undefined) {
        gravityHack.setQuantumProbability(options.quantumProbability);
    }

    if (options.antigravity !== undefined) {
        gravityHack.toggleAntigravity(options.antigravity);
    }

    if (options.timeDilation !== undefined) {
        gravityHack.setTimeDilation(options.timeDilation);
    }

    // Convert DOM to physics (with slight delay for engine to stabilize)
    setTimeout(() => {
        gravityHack.convertDOMToPhysics(options.targetElement);

        // Activate dispersal if requested
        if (options.dispersal) {
            setTimeout(() => {
                gravityHack.activateDispersal();
            }, 500);
        }

        // Override rendering to use custom element rendering
        Events.on(gravityHack.render, 'afterRender', () => {
            gravityHack.renderBodies();
        });
    }, 100);

    console.log('✅ QUANTUM GRAVITY HACK ACTIVATED!');

    return gravityHack;
}

/**
 * Deactivate and restore normal page
 */
function deactivateGravity() {
    if (gravityHack) {
        gravityHack.destroy();
        gravityHack = null;
    }
}

/**
 * ===================================================================
 * KEYBOARD SHORTCUT: Ctrl+Enter
 * ===================================================================
 */
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();

        if (!gravityHack || !gravityHack.physicsEnabled) {
            // Activate with default settings
            activateGravity({
                quantumProbability: 30,
                antigravity: false,
                timeDilation: 1.0,
                dispersal: false
            });
        } else {
            // Deactivate
            deactivateGravity();
        }
    }
});

// ===== EXPORT FOR USE IN OTHER MODULES =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { activateGravity, deactivateGravity, GravityHackEngine };
}
