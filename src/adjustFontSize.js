const defaultFontSize = 90;
export function adjustFontSize(displayId, containerId, minFontSize = 20) {
  const display = document.getElementById(displayId);
  const container = document.getElementById(containerId);
  if (!display || !container) return;

  let fontSize = parseInt(window.getComputedStyle(display).fontSize, 10);

  while (
    display.scrollHeight > container.clientHeight &&
    fontSize > minFontSize
  ) {
    fontSize--;
    display.style.fontSize = fontSize + 'px';
  }

  while (
    display.scrollHeight <= container.clientHeight &&
    fontSize < defaultFontSize
  ) {
    fontSize++;
    display.style.fontSize = fontSize + 'px';
    if (display.scrollHeight > container.clientHeight) {
      fontSize--;
      display.style.fontSize = fontSize + 'px';
      break;
    }
  }
}
