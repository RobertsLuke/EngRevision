// node-polyfills.js
// This file creates polyfills for Node.js built-in modules used in the browser

// Note: Using the full Buffer import since we're in an ES module
import { Buffer } from 'buffer';

// Add Node.js global objects to the window object
window.Buffer = Buffer;
