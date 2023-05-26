// Import the Workbox library from 'workbox-window' module
import { Workbox } from 'workbox-window';

// Import the Editor class from the './editor' module
import Editor from './editor';

// Import the './database' module (presumably for setting up a database)
import './database';

// Import the '../css/style.css' module (presumably for styling)
import '../css/style.css';

// Get the element with id 'main' from the DOM
const main = document.querySelector('#main');

// Clear the HTML content of the 'main' element
main.innerHTML = '';

// Function to load a spinner element
const loadSpinner = () => {
  // Create a 'div' element for the spinner
  const spinner = document.createElement('div');
  // Add the 'spinner' class to the spinner element
  spinner.classList.add('spinner');
  // Set the inner HTML of the spinner element to a loading spinner markup
  spinner.innerHTML = `
    <div class="loading-container">
      <div class="loading-spinner" />
    </div>
  `;
  // Append the spinner element to the 'main' element
  main.appendChild(spinner);
};

// Create a new instance of the Editor class
const editor = new Editor();

// Check if the 'editor' variable is undefined
if (typeof editor === 'undefined') {
  // Call the loadSpinner function to display a loading spinner
  loadSpinner();
}

// Check if service workers are supported in the browser
if ('serviceWorker' in navigator) {
  // Create a new instance of Workbox using the service worker file '/src-sw.js'
  const workboxSW = new Workbox('/src-sw.js');
  // Register the Workbox service worker
  workboxSW.register();
} else {
  // Print an error message to the console if service workers are not supported
  console.error('Service workers are not supported in this browser.');
}
