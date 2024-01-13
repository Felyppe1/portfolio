var showingMenu = false
function handleToggleMenuVisibility() {
    // TODO: use accessibility attr to detect if popover is opened
    // How to lock tabindex inside popover

    let hamburgerMenu = document.querySelector('.hamburger-menu')
    let menuOptions = document.querySelector('.menu-options')
    let focusableElements = menuOptions.querySelectorAll('button, a')

    if (showingMenu) {
        hamburgerMenu.classList.remove('hamburger-menu--selected')
        menuOptions.classList.remove('menu-options--opened')
        focusableElements.forEach(elem => {
            elem.setAttribute('tabindex', '-1')
        })
    }
    else {
        hamburgerMenu.classList.add('hamburger-menu--selected')
        menuOptions.classList.add('menu-options--opened')
        focusableElements.forEach(elem => {
            elem.removeAttribute('tabindex')
        })
    }

    showingMenu = !showingMenu
}
let elementsToggleMenuVisibility = document.querySelectorAll('[data-toggle-menu-visibility]')
elementsToggleMenuVisibility.forEach(elem => elem.addEventListener('click', handleToggleMenuVisibility))


var darkMode = true
function handleChangeTheme() {
    let faMoonList = document.querySelectorAll('.fa-moon')
    let faSunList = document.querySelectorAll('.fa-sun')
    let menuOptions = document.querySelector('.menu-options')
    let formContainer = document.querySelector('.form-container')
    let inputList = document.querySelectorAll('input')
    let textarea = document.querySelector('textarea')
    
    if (darkMode) {
        for (faMoon of faMoonList) {
            faMoon.style.transform = 'translateX(-200%)'
        }
        for (faSun of faSunList) {
            faSun.style.transform = 'translateX(0)'
        }
        document.documentElement.style.setProperty('--bg-color', '#f4f4f4');
        document.documentElement.style.setProperty('--second-color', '#0e0e0e');
        menuOptions.style.backgroundColor = 'rgb(95 95 95)'
        formContainer.style.backgroundColor = '#fafafa'
        for (input of inputList) {
            input.style.backgroundColor = '#fafafa'
        }
        textarea.style.backgroundColor = '#fafafa'

        darkMode = false
    }
    else {
        for (faMoon of faMoonList) {
            faMoon.style.transform = 'translateX(0)'
        }
        for (faSun of faSunList) {
            faSun.style.transform = 'translateX(200%)'
        }
        document.documentElement.style.setProperty('--bg-color', '#0e0e0e');
        document.documentElement.style.setProperty('--second-color', '#f4f4f4');
        menuOptions.style.backgroundColor = 'rgb(34 34 34)'
        formContainer.style.backgroundColor = 'rgb(27 27 27)'
        for (input of inputList) {
            input.style.backgroundColor = 'rgb(27 27 27)'
        }
        textarea.style.backgroundColor = 'rgb(27 27 27)'

        darkMode = true
    }
}
let themeButtons = document.querySelectorAll('[data-theme-button]')
themeButtons.forEach(button => button.addEventListener('click', handleChangeTheme))






function handleToRight() {
    if (visibleProject >= projects.length - 1) return

    translateOffset += projectWidth
    projectsListElem.style.translate = `-${widthOffset + translateOffset}rem`

    projects[visibleProject].classList.remove('project-focus')
    visibleProject++
    projects[visibleProject].classList.add('project-focus')

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
    visibleProject--
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
let currentPage = document.querySelector('.current-page')
let indice = 0
projects.forEach(project => {
    //CRIA AS TAGS <p> PARA CADA PÁGINA
    let pageElement = document.createElement('p')
    pageElement.innerText = indice + 1
    if (indice != 0) {
        pageElement.style.translate = '0 200%'
    }
    pageElement.classList.add('pages')
    currentPage.append(pageElement)

    indice++
})
const pagesTotalNumber = document.querySelector('.pages-total-number')
pagesTotalNumber.innerText = projects.length
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




/*Animation of the form labels*/
function typeForm(htmlTag) {
    htmlTag.previousElementSibling.style.transform = 'translate(0)'
    htmlTag.previousElementSibling.style.opacity = '1'
}

function losesFocus(htmlTag) {
    if (htmlTag.value == '') {
        htmlTag.previousElementSibling.style.removeProperty('transform')
        htmlTag.previousElementSibling.style.opacity = '.6'
        if (htmlTag.id == 'email') {
            htmlTag.nextElementSibling.style.removeProperty('display')
            htmlTag.nextElementSibling.nextElementSibling.style.removeProperty('display')
        }
    }
    else {
        if (htmlTag.id == 'email') {
            let user = htmlTag.value.substring(0, htmlTag.value.indexOf('@'))
            let domain = htmlTag.value.substring(htmlTag.value.indexOf('@') + 1)
        
            //REFAZER USANDO REGEX
            if ((user.length < 1) ||  
                (domain.length < 3) ||
                (user.search('@') != -1) || //if find @
                (domain.search('@') != -1) || //if find @
                (user.search(' ') != -1) || //if find ' '
                (domain.search(' ') != -1) || //if find ' '
                (domain.search('.') == -1) || //if don't find .
                (domain.indexOf('.') < 1) || //if . is the first letter
                (domain.lastIndexOf('.') == domain.length - 1)) { //if . is the last letter
                    htmlTag.nextElementSibling.style.removeProperty('display')
                    htmlTag.nextElementSibling.nextElementSibling.style.display = 'inline'
                    /* let circleExclamation = document.querySelector('.fa-circle-exclamation')
                    circleExclamation.style.display = 'inline' */
                }
            else {
                htmlTag.nextElementSibling.style.display = 'inline'
                htmlTag.nextElementSibling.nextElementSibling.style.removeProperty('display')
            }
            }
            
        }
        
}

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


/*When click outside the popup, it closes*/ 
document.addEventListener('click', (event)=>{
    const formContainer = document.querySelector('.form-container')
    const contactBtn = document.querySelector('.contact-btn')
    const menuOptions = document.querySelector('.menu-options')
    const hamburgerMenu = document.querySelector('.hamburger-menu')

    if (!formContainer.contains(event.target) && 
        !contactBtn.contains(event.target) &&
        showingForm) {
            closeForm()
    }
    if (!menuOptions.contains(event.target) && 
        !hamburgerMenu.contains(event.target) &&
        showingMenu) {
            handleToggleMenuVisibility()
    }
})

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
var showingForm = false
const body = document.querySelector('body')
function showForm() {
    const behindFormContainer = document.querySelector('.behind-form-container')
    behindFormContainer.style.display = 'block'

    const formContainer = document.querySelector('.form-container')
    formContainer.style.transform = 'translate(-50%, -50%) scale(1)'
    formContainer.style.transition = '.5s'

    body.style.overflow = 'hidden' /*Body was created down the code*/
    showingForm = true
}

function closeForm() {
    const behindFormContainer = document.querySelector('.behind-form-container')
    behindFormContainer.style.display = 'none'

    const formContainer = document.querySelector('.form-container')
    formContainer.style.transform = 'translate(-50%, -50%) scale(0)'
    formContainer.style.transition = '0s'

    body.style.removeProperty('overflow') /*Body was created down the code*/
    showingForm = false
}

function sendEmail() {
    let nameInput = document.querySelector('#name')
    let emailInput = document.querySelector('#email')
    let subjectInput = document.querySelector('#subject')
    let messageInput = document.querySelector('#message')
    var params = {
        name: nameInput.value,
        email: emailInput.value,
        subject: subjectInput.value,
        message: messageInput.value
    }
    const serviceId = "service_sh5qn8c"
    const templateId = "template_9qgvdbs"

    emailjs.send(serviceId, templateId, params)
        .then(resp => {
            nameInput.value = ''
            emailInput.value = ''
            subjectInput.value = ''
            messageInput.value = ''

            losesFocus(nameInput)
            losesFocus(emailInput)
            losesFocus(subjectInput)
            losesFocus(messageInput)
            closeForm()

            let successMessage = document.querySelector('.email-sent')
            successMessage.style.display = 'flex'

            setTimeout(()=>{
                successMessage.style.display = 'none'
            }, 5000)
        })
        .catch(error => console.log(error))
}

function closeMessage() {
    let successMessage = document.querySelector('.email-sent')
    successMessage.style.display = 'none'
}