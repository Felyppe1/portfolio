function getFocusables(htmlElement) {
  return (
    [...htmlElement.querySelectorAll(
        'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
    )].filter(elem => {
        if(!elem.hasAttribute('disabled') && !elem.hasAttribute('hidden') && elem.type != 'hidden') return elem
    })
  )
}