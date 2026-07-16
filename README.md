# NexaSoul Simulation 1.2

NexaSoul Simulation 1.2 is an immersive React + Three.js experience with animated stage progression, neon visuals, and a touch-reactive UI.

## Features
- Immersive 3D scene built with React Three Fiber
- Animated stage progression and unlock flow
- Interactive QR modal and visitor counter experience
- Vite + TypeScript build setup

## Local development

```bash
git clone https://github.com/shubham123df/NexaSoul-Simulation1.2.git
cd NexaSoul-Simulation1.2
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Production build

```bash
npm run build
```

The optimized static files will be generated in the `dist/` folder.

## Deploying on Render

This project is a Vite static app, so Render can host it as a Static Site.

### Render setup steps
1. Sign in to Render and click New + > Static Site.
2. Connect your GitHub repository.
3. Select the repository `shubham123df/NexaSoul-Simulation1.2`.
4. Use these settings:
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
5. Click Create Static Site.
6. Render will build and deploy the app automatically.

### Important note
If you use client-side routing in the future, add a rewrite rule so all requests return `/index.html`.

## Project structure
- `src/` – React and Three.js scene components
- `public/` – static assets such as QR images
- `dist/` – production build output

## Scripts
- `npm run dev` – start the local development server
- `npm run build` – create a production build
- `npm run preview` – preview the production build locally
