var showingMenu = false
function showMenu() {
    let line1 = document.querySelector('.line1')
    let line2 = document.querySelector('.line2')
    let line3 = document.querySelector('.line3')
    let menuOptions = document.querySelector('.menu-options')
    if (showingMenu) {
        line1.style.transform = ''
        line1.style.width = ''
        line2.style.opacity = '1'
        line3.style.transform = ''
        line3.style.width = ''

        menuOptions.style.transform = 'translateX(110%)'
        menuOptions.style.borderRadius = '12.5rem'
        
        showingMenu = false
    }
    else {
        line2.style.opacity = '0'

        line1.style.transform = 'rotate(42deg) translate(0.375rem, 0.563rem)'
        line1.style.width = '2.5rem'
        line3.style.transform = 'rotate(-42deg) translate(0.375rem, -0.563rem)'
        line3.style.width = '2.5rem'

        menuOptions.style.transform = 'translateX(0)'
        menuOptions.style.borderRadius = '0px'

        showingMenu = true
    }
}

function scrollToSection(htmlElement) {
    if (htmlElement.id == 'portfolio') {
        let section1 = document.querySelector('.section1')
        section1.scrollIntoView( {behavior : 'smooth'})
    }
    else {
        if (htmlElement.id == 'aboutMe' || htmlElement.id == 'arrowDown1') {
            let section2 = document.querySelector('.section2') 
            section2.scrollIntoView( {behavior : 'smooth'})
        }
        else {
            let section3 = document.querySelector('.section3')
            section3.scrollIntoView( {behavior : 'smooth'})
        }
    }
}

var darkMode = true
function changeTheme() {
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

function handleToRight() {
    let indice = 0
    if (visibleProject < projects.length - 1) {
        projects.forEach(project => {
            let pagesList = document.querySelectorAll('.pages')

            if (indice == visibleProject) {
                project.style.translate = '-100%'
                project.style.scale = '.7'
                project.style.opacity = '.3'

                pagesList[indice].style.translate = '0 -200%'
            }
            else if (indice == visibleProject + 1) {
                project.style.translate = '0'
                project.style.scale = '1'
                project.style.opacity = '1'

                pagesList[indice].style.translate = '0 0'
            }
            else if (indice > visibleProject + 1) {
                //let translateNumber = Number(window.getComputedStyle(project).translate.replace(/\W+/g, ''))
                //project.style.translate = `${translateNumber - 85}%` 

                project.style.translate = `${100 + (85 * ((indice - visibleProject) - 2))}%`
                project.style.scale = '.7'
                project.style.opacity = '.3'
            }
            else if (indice < visibleProject) {
                //let translateNumber = Number(window.getComputedStyle(project).translate.replace(/\W+/g, ''))
                //project.style.translate = `${-translateNumber - 85}%`
                
                project.style.translate = `${-100 + (-85 * (visibleProject - indice))}%`
                project.style.scale = '.7'
                project.style.opacity = '.3'
            }
            indice++         
        })
        visibleProject++

        let leftButton = document.querySelector('.fa-chevron-left')
        leftButton.classList.remove('hiddenButton')

        if (visibleProject == projects.length - 1) {
            let rightButton = document.querySelector('.fa-chevron-right')
            rightButton.classList.add('hiddenButton')
        }
    }
}

function handleToLeft() {
    let indice = 0
    if (visibleProject > 0) {
        let pagesList = document.querySelectorAll('.pages')

        projects.forEach(project => {
            if (indice == visibleProject) {
                project.style.translate = '100%'
                project.style.scale = '.7'
                project.style.opacity = '.3'

                pagesList[indice].style.translate = '0 200%'
            }
            else if (indice > visibleProject) {
                //let translateNumber = Number(window.getComputedStyle(project).translate.replace(/\W+/g, ''))
                //project.style.translate = `${translateNumber + 85}%`
                
                project.style.translate = `${100 + (85 * (indice - visibleProject))}%`
                project.style.scale = '.7'
                project.style.opacity = '.3'
            }
            else if (indice == visibleProject - 1) {
                project.style.translate = '0'
                project.style.scale = '1'
                project.style.opacity = '1'

                pagesList[indice].style.translate = '0 0'
            }
            else if (indice < visibleProject - 1) {
                //let translateNumber = Number(window.getComputedStyle(project).translate.replace(/\W+/g, ''))
                //project.style.translate = `${-translateNumber + 85}%`

                project.style.translate = `${-100 + (85 * ((indice - visibleProject) + 2))}%`
                project.style.scale = '.7'
                project.style.opacity = '.3'
            }
            indice++
        })
        visibleProject--

        let rightButton = document.querySelector('.fa-chevron-right')
        rightButton.classList.remove('hiddenButton')

        if (visibleProject == 0) {
            let leftButton = document.querySelector('.fa-chevron-left')
            leftButton.classList.add('hiddenButton')
        }
    }
}

let projects = document.querySelectorAll('.projects-div')
let currentPage = document.querySelector('.current-page')
let indice = 0
projects.forEach(project => {
    if (indice == 0) {
        project.style.translate = '0'
    }
    else {
        if (indice == 1) {
            project.style.translate = '100%'
            project.style.scale = '.7'
            project.style.opacity = '.3'
        }
        else {
            project.style.translate = `${((indice - 1) * 85) + 100}%`
            project.style.scale = '.7'
            project.style.opacity = '.3'
        }
    }

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


/*Show and close form*/
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
const hiddenElements = document.querySelectorAll('.hidden')
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
            showMenu()
    }
})

let portuguese = true
function handleChangeLanguage() {
    let textsList = document.querySelectorAll(".texts")

    let portugueseAnimation = document.querySelector('.portugueseAnimation')
    let englishAnimation = document.querySelector('.englishAnimation')

    let usaFlags = document.querySelectorAll('.usaFlag')
    let brazilFlags = document.querySelectorAll('.brazilFlag')

    if (portuguese) {
        textsList.forEach((text, index) => {
            text.innerText = language.english[index]
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
        textsList.forEach((text, index) => {
            text.innerText = language.portuguese[index]
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

var startX, startY
let projectsContainer = document.querySelector('.projects-container')
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
})

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