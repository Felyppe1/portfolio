class Modal {
    modal
    modalTrigger
    modalClose
    modalOverlay
    onCloseCallback

    constructor({ modal, modalTrigger, modalClose, onCloseCallback = null}) {
        this.modalTrigger = modalTrigger
        this.modalClose = modalClose
        this.modal = modal
        this.onCloseCallback = onCloseCallback

        this.modal.classList.add('modal-basics')
        this.modal.setAttribute('data-state', 'close')

        this.modalOverlay = document.createElement('div')
        this.modalOverlay.classList.add('overlay', 'overlay--dark')
        
        this.modal?.addEventListener('keydown', this.handleTabKey.bind(this))
        this.modalTrigger?.addEventListener('click', this.showModal.bind(this))
        this.modalClose?.addEventListener('click', this.closeModal.bind(this))
        this.modalOverlay.addEventListener('click', this.closeModal.bind(this))
    }

    showModal() {
        this.modal.setAttribute('data-state', 'open')
        this.modal.style.transition = '.3s'
        document.documentElement.style.overflow = 'hidden'

        document.body.append(this.modalOverlay)

        this.modalClose?.focus()
    }

    closeModal() {
        this.modal.setAttribute('data-state', 'close')
        this.modal.style.transition = '0s'
        document.documentElement.style.removeProperty('overflow')

        this.modalOverlay.remove()

        this.modalTrigger?.focus()

        if (typeof this.onCloseCallback === 'function') {
            this.onCloseCallback()
        }
    }

    handleTabKey(event) {
        const focusableElements = this.getFocusables()

        const firstFocusable = focusableElements[0]
        const lastFocusable = focusableElements[focusableElements.length - 1]

        if (event.key === 'Tab') {
            if (event.shiftKey && document.activeElement === firstFocusable) {
                event.preventDefault()
                lastFocusable.focus()
            } else if (!event.shiftKey && document.activeElement === lastFocusable) {
                event.preventDefault()
                firstFocusable.focus()
            }
        }
    }

    getFocusables() {
        return (
          [...this.modal.querySelectorAll(
              'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])')
          ].filter(elem => {
              if(!elem.hasAttribute('disabled') && !elem.hasAttribute('hidden') && elem.type != 'hidden') return elem
          })
        )
    } 
}