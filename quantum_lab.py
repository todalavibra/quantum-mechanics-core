quantum_lab.py
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

def double_slit():
    print("\n--- Visualizing Double Slit Interference ---")
    x = np.linspace(-10, 10, 1000)
    wavelength = 1.0
    slit_dist = 3.0
    k = 2 * np.pi / wavelength
    r1 = np.sqrt(x**2 + (slit_dist/2)**2)
    r2 = np.sqrt(x**2 + (-slit_dist/2)**2)
    psi = np.exp(1j * k * r1) + np.exp(1j * k * r2)
    prob = np.abs(psi)**2
    
    plt.figure(figsize=(10, 5))
    plt.style.use('dark_background')
    plt.plot(x, prob, color='cyan')
    plt.fill_between(x, prob, color='cyan', alpha=0.3)
    plt.title("Double Slit Interference Pattern")
    plt.show()

def particle_box():
    print("\n--- Visualizing Particle in a Box (n=2) ---")
    L = 1.0
    x = np.linspace(0, L, 100)
    n = 2
    psi = np.sqrt(2/L) * np.sin(n * np.pi * x / L)
    prob = psi**2
    
    plt.figure(figsize=(10, 5))
    plt.style.use('dark_background')
    plt.plot(x, prob, color='lime')
    plt.fill_between(x, prob, color='lime', alpha=0.3)
    plt.axvline(0, color='red'); plt.axvline(L, color='red')
    plt.title(f"Particle in a Box (Level {n})")
    plt.show()

def bloch_sphere():
    print("\n--- Visualizing Qubit (Superposition) ---")
    fig = plt.figure(figsize=(8, 8))
    ax = fig.add_subplot(111, projection='3d')
    plt.style.use('dark_background')
    
    # Sphere
    u, v = np.mgrid[0:2*np.pi:20j, 0:np.pi:10j]
    x = np.cos(u)*np.sin(v)
    y = np.sin(u)*np.sin(v)
    z = np.cos(v)
    ax.plot_wireframe(x, y, z, color='gray', alpha=0.2)
    
    # Arrow (State)
    ax.quiver(0, 0, 0, 1, 0, 0, length=1.0, color='magenta', linewidth=3)
    ax.text(1.2, 0, 0, '|Ψ⟩ Superposition', color='white')
    ax.set_title("Bloch Sphere Visualization")
    plt.show()

if __name__ == "__main__":
    print("Select Simulation:")
    print("1. Double Slit")
    print("2. Particle in a Box")
    print("3. Bloch Sphere")
    choice = input("Enter 1, 2, or 3: ")
    
    if choice == '1': double_slit()
    elif choice == '2': particle_box()
    elif choice == '3': bloch_sphere()
    else: print("Invalid choice.")
