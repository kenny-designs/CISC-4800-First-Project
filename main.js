// Obtain elements
let controlsButton  = document.getElementById('controls-button'),
    controlsOverlay = document.getElementById('controls-overlay');

// Enable Controls Overlay
controlsButton.addEventListener('click', (e) => {
  controlsOverlay.style.display = 'block';
});

// Disable Controls Overlay
controlsOverlay.addEventListener('click', (e) => {
  controlsOverlay.style.display = 'none';
});
