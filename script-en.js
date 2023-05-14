var showingMenu = false
function mostrarMenu() {
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
        menuOptions.style.borderRadius = '200px'
        
        showingMenu = false
    }
    else {
        line2.style.opacity = '0'

        line1.style.transform = 'rotate(42deg) translate(6px, 9px)'
        line1.style.width = '40px'
        line3.style.transform = 'rotate(-43deg) translate(6px, -10px)'
        line3.style.width = '40px'

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

/* var projects = document.querySelectorAll('.projects-div')
var visibleProject = 0
function changeRight(htmlTag) {
    let currentPage = document.querySelector('.current-page')
    if (visibleProject == 0) {
        projects[0].style.transform = 'translate(-150%) scale(.7)'
        projects[0].style.opacity = '.3'
        projects[1].style.transform = 'translate(-50%)'
        projects[1].style.opacity = '1'
        projects[2].style.transform = 'translate(50%) scale(.7)'

        currentPage.children[0].style.transform = 'translateY(-200%)'
        currentPage.children[1].style.transform = 'translateY(0%)'
        currentPage.children[2].style.transform = 'translateY(200%)'
    }
    else {
        if (visibleProject == 1) {
            projects[0].style.transform = 'translate(-230%) scale(.7)'
            projects[1].style.transform = 'translate(-150%) scale(.7)'
            projects[1].style.opacity = '.3'
            projects[2].style.transform = 'translate(-50%) scale(1)'
            projects[2].style.opacity = '1'

            currentPage.children[0].style.transform = 'translateY(-300%)'
            currentPage.children[1].style.transform = 'translateY(-150%)'
            currentPage.children[2].style.transform = 'translateY(0%)'
        }
    }
    visibleProject++
    if (htmlTag.parentNode.classList[0] == 'projects-container') {
        if (visibleProject > 0) {
            let arrowLeft = document.querySelector('.fa-chevron-left')
            arrowLeft.style.display = 'inline'
        }
        if (visibleProject == 2) {
            let arrowRight = document.querySelector('.fa-chevron-right')
            arrowRight.style.display = 'none'
        }
    }
}

function changeLeft(htmlTag) {
    let currentPage = document.querySelector('.current-page')
    if (visibleProject == 2) {
        projects[0].style.transform = 'translate(-150%) scale(.7)'
        projects[1].style.transform = 'translate(-50%) scale(1)'
        projects[1].style.opacity = '1'
        projects[2].style.transform = 'translate(50%) scale(.7)'
        projects[2].style.opacity = '.3'

        currentPage.children[0].style.transform = 'translateY(-200%)'
        currentPage.children[1].style.transform = 'translateY(0%)'
        currentPage.children[2].style.transform = 'translateY(200%)'
    }
    else {
        if (visibleProject == 1) {
            projects[0].style.transform = 'translate(-50%) scale(1)'
            projects[0].style.opacity = '1'
            projects[1].style.transform = 'translate(50%) scale(.7)'
            projects[1].style.opacity = '.3'
            projects[2].style.transform = 'translate(130%) scale(.7)'

            currentPage.children[0].style.transform = 'translateY(0%)'
            currentPage.children[1].style.transform = 'translateY(200%)'
            currentPage.children[2].style.transform = 'translateY(400%)'
        }
    }
    visibleProject--
    if (htmlTag.parentNode.classList[0] == 'projects-container') {
        if (visibleProject == 0) {
            let arrowLeft = document.querySelector('.fa-chevron-left')
            arrowLeft.style.display = 'none'
        }
        if (visibleProject < 2) {
            let arrowRight = document.querySelector('.fa-chevron-right')
            arrowRight.style.display = 'inline'
        }
    }
} */
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
        htmlTag.nextElementSibling.style.removeProperty('display')
        htmlTag.nextElementSibling.nextElementSibling.style.removeProperty('display')
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

/*Section 1 animation orchestra*/
const hello = document.querySelector('.hello')
hello.addEventListener('animationstart', takeOffAnimation)
function takeOffAnimation() {
    setTimeout( ()=>{
        hello.style.setProperty('--helloBlink', '0s')
    }, 1000)

    setTimeout( ()=>{  
        hello.style.setProperty('--helloContent', 'none')
    }, 2050)


    const iAm = document.querySelector('.i-am')
    setTimeout( ()=>{
        iAm.style.setProperty('--iAmWidth', '0.3rem')
    }, 2050)

    setTimeout( ()=>{
        iAm.style.setProperty('--iAmBlink', '0s')
    }, 2800)

    setTimeout( ()=>{
        iAm.style.setProperty('--iAmWidth', '0rem')
    }, 4150)


    const iAm2 = document.querySelector('.i-am2')
    setTimeout( ()=>{
        iAm2.style.setProperty('--iAm2Width', '0.3rem')
    }, 2050)

    setTimeout( ()=>{
        iAm2.style.setProperty('--iAm2Blink', '0s')
    }, 2800)

    setTimeout( ()=>{
        iAm2.style.setProperty('--iAm2Width', '0rem')
    }, 3400)


    const iAm3 = document.querySelector('.i-am3')
    setTimeout( ()=>{
        iAm3.style.setProperty('--iAm3Width', '0.3rem')
    }, 3400)

    setTimeout( ()=>{
        iAm3.style.setProperty('--iAm3Width', '0rem')
    }, 4450)


    const developer = document.querySelector('.developer')
    setTimeout( ()=>{
        developer.style.setProperty('--developerWidth', '0.3rem')
    }, 4150)

    setTimeout( ()=>{
        developer.style.setProperty('--developerBlink', '0s')
    }, 4900)

    setTimeout( ()=>{
        developer.style.setProperty('--developerBlink', '700ms')
    }, 6500)
}

/*When the div is on the screen, the animation starts*/
const observer = new IntersectionObserver( (entries)=>{
    entries.forEach((entry)=>{
        if (entry.isIntersecting) {
            entry.target.classList.add('show')
        }
        else {
            entry.target.classList.remove('show')
        }
    })
})
const hiddenElements = document.querySelectorAll('.hidden')
hiddenElements.forEach( (el)=>observer.observe(el))

/*When click outsite the popup, it closes*/
const body = document.querySelector('body')
body.addEventListener('click', (e)=>{
    let menuOptions = document.querySelector('.menu-options')
    if (showingMenu && 
        e.target.classList[0] != 'hamburger-menu' && 
        e.target.classList[0] != 'lines' &&
        e.target != menuOptions &&
        menuOptions.contains(e.target) != true
        ) {
        mostrarMenu()
    }

    let formContainer = document.querySelector('.form-container')
    if (showingForm &&
        e.target.innerText != 'Contact' &&
        e.target != formContainer &&
        formContainer.contains(e.target) != true) {
            closeForm()
        }
})
