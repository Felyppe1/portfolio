function handleToggleHamburgerMenu() {
    let menuOptions = hamburgerMenuWrapper.querySelector('[data-popover="menu-options"]')
    let hamburgerMenu = hamburgerMenuWrapper.querySelector('[data-toggle-popover="hamburger-menu"')

    const focusableElements = menuOptions.querySelectorAll('button, a')

    const menuState = menuOptions.dataset.state
    if (menuState === 'open') {
        hamburgerMenu.setAttribute('data-state', 'close')
        menuOptions.setAttribute('data-state', 'close')
        focusableElements.forEach(elem => {
            elem.setAttribute('tabindex', '-1')
        })
    }
    else {
        hamburgerMenu.setAttribute('data-state', 'open')
        menuOptions.setAttribute('data-state', 'open')
        focusableElements.forEach(elem => {
            elem.removeAttribute('tabindex')
        })
    }
}

function handleKeydown(event) {
  const menuOptions = hamburgerMenuWrapper.querySelector('[data-popover="menu-options"]')
  const menuState = menuOptions.dataset.state
  if (menuState === 'close') return 

  const focusableElements = hamburgerMenuWrapper.querySelectorAll('button, a')
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

let hamburgerMenuWrapper = document.querySelector('[data-hamburger-menu-wrapper]')
let hamburgerMenuTriggerList = document.querySelectorAll('[data-hamburger-menu-trigger]')
hamburgerMenuWrapper.addEventListener('keydown', handleKeydown)
hamburgerMenuTriggerList.forEach(elem => elem.addEventListener('click', handleToggleHamburgerMenu))

//TODO: add an overlay every time popup opens
/*When click outside the popup, it closes*/ 
document.addEventListener('click', (event)=>{
  const hamburgerMenu = hamburgerMenuWrapper.querySelector('[data-toggle-popover="hamburger-menu"')
  const menuOptions = hamburgerMenuWrapper.querySelector('[data-popover="menu-options"]')
  const menuState = menuOptions.dataset.state

  if (!menuOptions.contains(event.target) && 
      !hamburgerMenu.contains(event.target) &&
      menuState === 'open') {
          handleToggleHamburgerMenu()
  }
})





//TODO: not having a darkMode variable (maybe, detecting the user's system theme and adding it at first)
function handleChangeTheme() {
    if (darkMode) {
        document.documentElement.className = 'light'

        themeButtonList.forEach(button => button.setAttribute('data-theme', 'light'))

        darkMode = false
    }
    else {
        document.documentElement.className = 'dark'

        themeButtonList.forEach(button => button.setAttribute('data-theme', 'dark'))

        darkMode = true
    }
}
let darkMode = true
let themeButtonList = document.querySelectorAll('[data-theme-button]')
themeButtonList.forEach(button => button.addEventListener('click', handleChangeTheme))






function handleToRight() {
    if (visibleProject >= projects.length - 1) return

    translateOffset += projectWidth
    projectsListElem.style.translate = `-${widthOffset + translateOffset}rem`

    projects[visibleProject].classList.remove('project-focus')
    pagesElement.children[visibleProject].setAttribute('data-page-state', 'behind')
    
    visibleProject++

    projects[visibleProject].classList.add('project-focus')
    pagesElement.children[visibleProject].setAttribute('data-page-state', 'current')

    arrowLeft.classList.remove('hidden')
    if (visibleProject == projects.length - 1) {
        arrowRight.classList.add('hidden')
    }
}

function handleToLeft() {
    if (visibleProject <= 0) return

    translateOffset -= projectWidth
    projectsListElem.style.translate = `-${widthOffset + translateOffset}rem`

    projects[visibleProject].classList.remove('project-focus')
    pagesElement.children[visibleProject].setAttribute('data-page-state', 'ahead')

    visibleProject--

    pagesElement.children[visibleProject].setAttribute('data-page-state', 'current')
    projects[visibleProject].classList.add('project-focus')

    arrowRight.classList.remove('hidden')
    if (visibleProject == 0) {
        arrowLeft.classList.add('hidden')
    }
}
let arrowRight = document.querySelector('[data-projects-section__arrow-right]')
let arrowLeft = document.querySelector('[data-projects-section__arrow-left]')
arrowRight.addEventListener('click', handleToRight)
arrowLeft.addEventListener('click', handleToLeft)


let projects = document.querySelectorAll('[data-project]')
let pagesElement = document.querySelector('[data-pages]')
projects.forEach((_, index) => {
    let span = document.createElement('span')
    span.classList.add('page')
    span.innerText = index + 1
    span.setAttribute('data-page-state', index == 0 ? 'current' : 'ahead')
    pagesElement.append(span)
})
const totalPagesElement = document.querySelector('[data-total-pages]')
totalPagesElement.innerText = projects.length
let visibleProject = 0

function setProjectWidth() {
    fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize)
    projectWidth = parseFloat(getComputedStyle(projects[0]).width) / fontSize
    
    widthOffset = projectWidth / 2
    translateOffset = projectWidth * visibleProject
    projectsListElem.style.translate = `-${widthOffset + translateOffset}rem`
}

let fontSize = 0
let projectWidth = 0
let widthOffset = 0
let translateOffset = 0
const projectsListElem = document.querySelector('[data-projects-section__list]')

const resizeObserver = new ResizeObserver(entries => {
    if (entries[0]) {
        setProjectWidth()
    }
})
resizeObserver.observe(document.body)






/*When the div is on the screen, the animation starts */
const observer = new IntersectionObserver(
    entries => {
        entries.forEach((entry)=>{
            entry.target.classList.toggle('show', entry.isIntersecting)
        })
    }, 
    {
        threshold: 0.2
    }
)
const hiddenElements = document.querySelectorAll('[data-hidden-effect]')
hiddenElements.forEach(el => observer.observe(el))






let portuguese = true
function handleChangeLanguage() {
    let textsList = document.querySelectorAll('[data-text]')

    let portugueseAnimation = document.querySelector('.portugueseAnimation')
    let englishAnimation = document.querySelector('.englishAnimation')

    let usaFlags = document.querySelectorAll('.usaFlag')
    let brazilFlags = document.querySelectorAll('.brazilFlag')

    if (portuguese) {
        textsList.forEach(text => {
            const textValue = text.dataset.text
            console.log(text.dataset.text)
            text.innerText = language.english[textValue]
        })

        portugueseAnimation.classList.add('hideAnimation')
        englishAnimation.classList.remove('hideAnimation')

        usaFlags.forEach(flag => {
            flag.classList.add('hideFlag')
        })
        brazilFlags.forEach(flag => {
            flag.classList.remove('hideFlag')
        })

        portuguese = false
    }
    else {
        textsList.forEach(text => {
            const textValue = text.dataset.text
            text.innerText = language.portuguese[textValue]
        })

        portugueseAnimation.classList.remove('hideAnimation')
        englishAnimation.classList.add('hideAnimation')

        usaFlags.forEach(flag => {
            flag.classList.remove('hideFlag')
        })
        brazilFlags.forEach(flag => {
            flag.classList.add('hideFlag')
        })

        portuguese = true
    }
}
let langButtons = document.querySelectorAll('[data-lang-button]')
langButtons.forEach(button => button.addEventListener('click', handleChangeLanguage))








var startX, startY
let projectsContainer = document.querySelector('.projects-section')
projectsContainer.addEventListener('touchstart', (event)=>{
    startX = event.touches[0].clientX
    startY = event.touches[0].clientY
})
  
projectsContainer.addEventListener('touchend', function(event) {
    var endX = event.changedTouches[0].clientX
    var endY = event.changedTouches[0].clientY

    var deltaX = endX - startX
    var deltaY = endY - startY

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (Math.abs(deltaX) > 20) {
            if (deltaX > 0) {
                if (event.target.classList[0] != 'fa-sharp') {
                    handleToLeft()
                }
            } else {
                if (event.target.classList[0] != 'fa-sharp') {
                    handleToRight()
                }
            }
        }
    }
})







/*Related to form*/
const contactFormModalContainer = document.querySelector('[data-modal="contact-form"]')
const contactFormModal = new Modal({
    modal: contactFormModalContainer,
    modalTrigger: document.querySelector('[data-open-modal="contact-form"'),
    modalClose: contactFormModalContainer.querySelector('[data-close-modal="contact-form"]')
})

function clearContactForm({ clearFields }) {
    contactFormInputList.forEach(input => {
        if (clearFields) {
            input.value = ''
            input.setAttribute('data-filled', 'false')
        }
        input.removeAttribute('data-state')
        input.nextElementSibling?.remove()
    })
}

async function handleSubmitContactForm(event) {
    event.preventDefault()

    let submitButton = contactForm.querySelector('[data-contact-form-submit]')
    submitButton.disabled = true

    let spinner = document.createElement('span')
    spinner.classList.add('spinner')
    submitButton.prepend(spinner)

    clearContactForm({ clearFields: false })

    let isFormValid = true

    const createError = (errorMessage, label) => {
        // let p = document.createElement('p')
        // p.classList.add('contact-form__error')
        // p.innerText = errorMessage

        let i = document.createElement('i') //Temporary while there's no translation for the error messages
        i.classList.add('fa-solid', 'fa-circle-exclamation', 'contact-form__error')

        label.append(i)

        label.querySelector('[data-contact-form-input]').setAttribute('data-state', 'invalid')

        isFormValid = false
    }


    let nameInput = contactForm.querySelector('#name')
    if (nameInput.value == '' || nameInput.value == null) {
        createError('Nome é obrigatório', nameInput.parentNode)
    }
    
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    let emailInput = contactForm.querySelector('#email')
    if (emailInput.value == '' || emailInput.value == null) {
        createError('Email é obrigatório', emailInput.parentNode)
    } else if (!emailRegex.test(emailInput.value)) {
        createError('Email inválido', emailInput.parentNode)
    }

    let subjectInput = contactForm.querySelector('#subject')
    if (subjectInput.value == '' || subjectInput.value == null) {
        createError('Assunto é obrigatório', subjectInput.parentNode)
    }

    let messageInput = contactForm.querySelector('#message')
    if (messageInput.value == '' || messageInput.value == null) {
        createError('Mensagem é obrigatório', messageInput.parentNode)
    }

    if (isFormValid) {
        await sendEmail()
    }
      
    submitButton.disabled = false
    spinner.remove()
}

let contactForm = document.querySelector('[data-contact-form]')
contactForm.addEventListener('submit', handleSubmitContactForm)

let contactFormInputList = contactForm.querySelectorAll('[data-contact-form-input]')
contactFormInputList.forEach(input => {
    input.setAttribute('data-state', 'pristine')

    input.addEventListener('blur', () => {
        if (input.value != '') {
            input.setAttribute('data-filled', 'true')
        } else {
            input.setAttribute('data-filled', 'false')
        }
    })
})


async function sendEmail() {
    const nameInput = contactForm.querySelector('#name')
    const emailInput = contactForm.querySelector('#email')
    const subjectInput = contactForm.querySelector('#subject')
    const messageInput = contactForm.querySelector('#message')
    const params = {
        name: nameInput.value,
        email: emailInput.value,
        subject: subjectInput.value,
        message: messageInput.value
    }
    const serviceId = "service_sh5qn8c"
    const templateId = "template_9qgvdbs"

    await emailjs.send(serviceId, templateId, params)
    clearContactForm({ clearFields: true })
    contactFormModal.closeModal()

    let successMessage = document.querySelector('.email-sent')
    successMessage.style.display = 'flex'

    setTimeout(()=>{
        successMessage.style.display = 'none'
    }, 5000)
}

let closeToast = document.querySelector('[data-close-toast]')
closeToast.addEventListener('click', () => closeToast.parentNode.classList.add('hidden'))