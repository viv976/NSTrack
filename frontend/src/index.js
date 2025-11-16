import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import "@/styles/smooth-scroll.css";
import { initSmoothScrolling } from "@/utils/smoothScroll";
import App from "@/App";

// Initialize smooth scrolling
if (typeof window !== 'undefined') {
  // Add a small delay to ensure the DOM is fully loaded
  const init = () => {
    initSmoothScrolling();
    
    // Add smooth scrolling class to the body
    document.body.classList.add('smooth-scroll');
    
    // Add smooth scrolling to the main container
    const main = document.querySelector('main');
    if (main) {
      main.classList.add('scroll-container');
    }
  };
  
  if (document.readyState === 'complete') {
    init();
  } else {
    window.addEventListener('load', init);
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
