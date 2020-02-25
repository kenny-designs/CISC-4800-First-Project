// Constants
const fadeInClass  = 'fade-in',
      fadeOutClass = 'fade-out';

// Obtain elements
let controlsButton  = document.getElementById('controls-button'),
    titleText       = document.getElementById('title-text'),
    controlsText    = document.getElementById('controls-text');

// Enable Controls Overlay
controlsButton.addEventListener('click', (e) => {
  toggleFade(titleText);
  toggleFade(controlsText);
});

/**
 * Toggles element between the fade-in and fade-out classes
 * if it has either of them. Otherwise, it does nothing.
 * @param elm - The element to swap fades
 */ 
function toggleFade(elm) {
  if (elm.className === fadeInClass) {
    elm.classList.remove(fadeInClass);
    elm.classList.add(fadeOutClass);
  }
  else if (elm.className === fadeOutClass) {
    elm.classList.remove(fadeOutClass);
    elm.classList.add(fadeInClass);
  }
}
