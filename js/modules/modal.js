class Modal {
    modal
    modalTrigger
    modalClose
    modalOverlay
    onClose

    constructor({ modal, modalTrigger, modalClose, onClose = null}) {
        this.modalTrigger = modalTrigger
        this.modalClose = modalClose
        this.onClose = onClose

        this.modal = document.createElement('div')
        this.modal.classList.add('modal-basics')
        this.modal.setAttribute('data-state', 'close')
        this.modal.append(modal)
        document.body.append(this.modal)
        
        this.modalOverlay = document.createElement('div')
        this.modalOverlay.classList.add('overlay', 'overlay--dark')
        
        this.modal?.addEventListener('keydown', this.handleTabKey.bind(this))
        this.modalTrigger?.addEventListener('click', this.showModal.bind(this))
        this.modalClose?.addEventListener('click', this.closeModal.bind(this))
        this.modalOverlay.addEventListener('click', this.closeModal.bind(this))
    }

    showModal() {
        this.modal.setAttribute('data-state', 'open')
        document.documentElement.style.overflow = 'hidden'

        document.body.append(this.modalOverlay)

        this.modalClose?.focus()
    }

    closeModal() {
        this.modal.setAttribute('data-state', 'close')
        document.documentElement.style.removeProperty('overflow')

        this.modalOverlay.remove()

        this.modalTrigger?.focus()

        if (typeof this.onClose === 'function') {
            this.onClose()
        }
    }

    handleTabKey(event) {
        const focusableElements = this.getModalFocusables()

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

    getModalFocusables() {
        return getFocusables(this.modal)
    } 
}