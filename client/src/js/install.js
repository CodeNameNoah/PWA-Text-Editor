// Get the reference to the button with the id 'buttonInstall'
const butInstall = document.getElementById('buttonInstall');

// Listen for the 'beforeinstallprompt' event, which is fired when the browser wants to prompt the user to install the app
window.addEventListener('beforeinstallprompt', (event) => {
    // Store the event object in the global 'deferredPrompt' variable for later use
    window.deferredPrompt = event;

    // Make sure the 'hidden' class is removed from the install button
    butInstall.classList.toggle('hidden', false);
});

// Listen for a click event on the install button
butInstall.addEventListener('click', async () => {
    // Retrieve the stored event object from 'deferredPrompt'
    const promptEvent = window.deferredPrompt;

    // If there is no prompt event, return and do nothing
    if (!promptEvent) {
        return;
    }

    // Trigger the installation prompt
    promptEvent.prompt();

    // Clear the stored event object after the prompt has been shown
    window.deferredPrompt = null;

    // Hide the install button by adding the 'hidden' class
    butInstall.classList.toggle('hidden', true);
});

// Listen for the 'appinstalled' event, which is fired when the app has been successfully installed
window.addEventListener('appinstalled', (event) => {
    // Clear the stored event object
    window.deferredPrompt = null;
});
