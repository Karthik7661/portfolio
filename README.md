# ⚛️ S Karthik – Interactive Quantum Software Portfolio

An ultra-premium, interactive portfolio showcasing academic research, publications, and full-stack software development projects. Featuring a custom client-side **Quantum Convolutional Neural Network (QCNN) Inference Simulator** and dynamic motion graphics.

👉 **Live Production URL:** [https://portfolio-one-gules-juc6kxjk7e.vercel.app](https://portfolio-one-gules-juc6kxjk7e.vercel.app)

---

## 🚀 Tech Stack & Badges

![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-FF007F?style=for-the-badge&logo=framer&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deploys-black?style=for-the-badge&logo=vercel&logoColor=white)

---

## ✨ Key Features & Interactive Systems

### 1. ⚛️ QCNN Inference Simulator
A client-side interactive sandbox demonstrating hybrid quantum-classical neural networks (QCNN) for medical image classification:
* **MRI Input Selector:** Feeds Glioma, Meningioma, or Normal brain MRI features into a simulated quantum system.
* **Precessing Bloch Sphere:** An SVG-rendered sphere showing real-time 3D state vector $|\psi\rangle$ rotation coordinates mapping the parameter angle $\theta$.
* **Quantum Circuit Schematic:** Wires representing qubits ($|q_0\rangle$ to $|q_3\rangle$) with Hadamard, parameterized $R_y(\theta)$, pooling, and measurement gates.
* **Live Probability Chart:** Dynamically visualizes the quantum state probabilities ($|00\rangle$, $|01\rangle$, $|10\rangle$, $|11\rangle$) and predictions.

### 2. 👤 3D Holographic Portrait
An interactive headshot card that tilts in response to your cursor coordinates using perspective transformation equations. It features a pulsating holographic glow that activates on hover.

### 3. 🌀 Smooth Scrolling & Navigation
* Integrated **Lenis Smooth Scroll** for organic viewport transitions.
* Fixed scroll hijacking by applying `data-lenis-prevent` to nested containers, allowing touch, trackpad, and mouse-wheel scrolling inside overflow blocks (GitHub list, Projects Modal, Loading Console).

---

## 🎨 Motion Design & Animations
This site features carefully calibrated, high-end micro-animations to enhance user engagement:
* **Staggered Scroll Entrances:** Elements cascade onto the screen dynamically as you scroll down:
  * *Projects Showcase:* Slide-up cards with custom spring damping.
  * *Publications Catalog:* Slide-in-from-left with a soft blur filter.
  * *Credentials Grid:* Staggered spring bounce slide-ups.
* **Timeline Glow-Flow:** A neon flow path animation on the timeline axis representing career progress.
* **Laser progress sparks:** Glowing spark pings tracking skill proficiency percentages.
* **Spotlight overlay:** Cursor-tracking radial glows on interactive sections.

---

## 🛠️ Local Installation & Development

To run the project locally, ensure you have **Node.js** installed, then execute:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Karthik7661/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser.

---

## 📦 Production Builds & Deployment

This project compiles static build paths via Next.js and is optimized for Vercel deployment:

```bash
# Build the optimized production bundle
npm run build

# Start production server locally
npm start
```
