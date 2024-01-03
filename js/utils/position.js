export const getElementOffset = (element) => {
  const { top, left, width, height } = element.getBoundingClientRect();
  return {
    left: left + window.scrollX,
    top: top + window.scrollY,
    width,
    height
  };
}

export const getElementGroundDistance = (element, targetElement) => {
  const { height } = getElementOffset(element);
  const { height: targetHeight } = getElementOffset(targetElement);
  const groundHeight = window.innerHeight - targetHeight - height;

  return groundHeight;
}