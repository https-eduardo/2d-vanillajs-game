export const getElementOffset = (element) => {
  const { top, left, width, height } = element.getBoundingClientRect();
  return {
    left: left + window.scrollX,
    top: top + window.scrollY,
    width,
    height
  };
}