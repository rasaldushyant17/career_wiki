/**
 * main.tsx - Application Entry Point
 * ====================================
 * 
 * IN PLAIN HTML: You'd write <script src="app.js"></script> in your HTML file.
 * IN REACT: This file does the same thing — it finds the <div id="root"> 
 *           in index.html and puts our entire app inside it.
 * 
 * Think of it like:
 *   document.getElementById("root").innerHTML = "<App />";
 */

import { createRoot } from "react-dom/client";  // Like document.getElementById
import App from "./App.tsx";                      // Our main component (like a big HTML template)
import "./index.css";                             // Links our CSS stylesheet (like <link rel="stylesheet">)

// This is similar to: document.getElementById("root").innerHTML = renderApp()
createRoot(document.getElementById("root")!).render(<App />);
