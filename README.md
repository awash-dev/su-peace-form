# Samara Peace Forum Union — Frontend Client

This is the official frontend repository for the **Samara University Peace Forum Union** web application. It is built using modern vanilla JavaScript, structural HTML, and a powerful custom CSS rendering engine.

## 🚀 Technology Stack

The project relies on a lightweight, dependency-free architecture using:
- **Core:** Vanilla JavaScript (ESM) & Modern HTML5
- **Styling:** Custom CSS Design System (no styling frameworks)
- **Animation:** Custom WAAPI motion engine (`motion.js`) with physics-based spring rendering.
- **Bundler:** Vite
- **API Connectivity:** Backend hosted separately (Express/Node.js)

## 📁 Architecture & File Structure

```text
client/
├── index.html           # Landing Page
├── mission.html         # Our Mission & Vision
├── resources.html       # Research & Forum Documents
├── unions.html          # Members & Divisions Directory
├── news.html            # Latest Events & Articles
├── contact.html         # Contact Form & Queries
├── dashboard.html       # Super Admin Dashboard
├── public/              # Static assets (images, seo data)
└── src/
    ├── api/index.js     # Backend integration endpoints
    ├── main.js          # Core Controller (Routing, Data Rendering)
    ├── motion.js        # Physics & Viewport intersection motion engine
    └── style.css        # Centralized Design System 
```

## ✨ Key Features
- **Dynamic Preloader Engine:** Intercepts loading states with customized brand loader logic.
- **Staggered Animations:** Deeply choreographed motion logic seamlessly rendered without heavy third-party packages (saving bandwidth & increasing mobile performance).
- **Responsive Mobile Engine:** Extensive breakpoints explicitly defined to gracefully compress spatial geometry and handle side-bars/models beautifully on mobile.
- **Integrated Admin Dashboard:** Full CRUD management GUI for News, Members, and Admin tasks wrapped inside the same frontend context (`dashboard.html`).

## 🛠️ Local Setup

1. **Install Dependencies** (Vite context)
   ```bash
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm run dev
   ```

3. **Build Payload for Production**
   ```bash
   npm run build
   ```

## 🌍 Environment Configurations
You can adjust the global API endpoint pointing to your backend host by modifying the central `window.API_BASE` configuration embedded inside the frontend, or locally configuring inside `api/index.js`.
