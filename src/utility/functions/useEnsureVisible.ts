export function ensureInView(elementId: string) {
  const element = document.getElementById(elementId)
  if (element) {
    const elementBottomPosition = element.getBoundingClientRect().bottom
    const viewportHeight = window.innerHeight
    if (elementBottomPosition > viewportHeight) {
      window.scrollBy({
        top: elementBottomPosition - viewportHeight,
        behavior: 'smooth'
      })
    }
  }
}
