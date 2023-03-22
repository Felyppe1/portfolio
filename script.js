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
        /* line1.style.transform = 'rotate(37deg) translate(4px, 12px)'
        line1.style.width = '40px'
        line3.style.transform = 'rotate(-38deg) translate(3px, -10px)'
        line3.style.width = '40px' */

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

var showingMenu = false

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
        darkMode = true
    }
}

var projects = document.querySelectorAll('.projects-div')
var visibleProject = 0

function changeRight(htmlTag) {
    /* if (visibleProject < projects.length - 1) {
        let arrowLeft = document.querySelector('.fa-chevron-left')
        arrowLeft.style.display = 'inline'
    } */
    
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
    



        /* for (var cont = 0; cont < projects.length; cont++) {
            if (cont == visibleProject) {
                projects[cont].style.transform = 'translate(-200%) scale(.7)'
                projects[cont].style.opacity = '0.3'
                console.log(cont)
            }
            else {
                if (cont < visibleProject) {
                    projects[cont].style.transform = 'translate(-300%) scale(.7)'
                    console.log(cont)
                }
                else {
                    if (cont == visibleProject + 1) {
                        projects[cont].style.transform = 'translate(-50%)'
                        projects[cont].style.opacity = '1'
                        console.log(cont)
                    }
                    else {
                        if (cont == visibleProject + 2) {
                            projects[cont].style.transform = 'translate(100%) scale(.7)'
                            console.log(cont)
                        }
                        projects[cont].style.transform = 'translate(200%) scale(.7)'
                        console.log(cont)
                    }
                }
            }
        }
        visibleProject++
    } */
    /* if (visibleProject == 2) {
        let arrowRight = document.querySelector('.fa-chevron-right')
        arrowRight.style.display = 'none'
    } */
}

function changeLeft(htmlTag) {
    /* if (visibleProject == 1) {
        let arrowLeft = document.querySelector('.fa-chevron-left')
        arrowLeft.style.display = 'none'
    }  */
    
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
    

    
    /* if (visibleProject > 0) {
        let arrowRight = document.querySelector('.fa-chevron-right')
        arrowRight.style.display = 'block'
        for (var cont = 0; cont < projects.length; cont++) {
            if (cont == visibleProject) {
                projects[cont].style.transform = 'translate(100%) scale(.7)'
                projects[cont].style.opacity = '0.3'
                console.log(cont)
            }
            else {
                if (cont > visibleProject) {
                    projects[cont].style.transform = 'translate(200%) scale(.7)'
                    console.log(cont)
                }
                else {
                    if (cont == visibleProject - 1) {
                        projects[cont].style.transform = 'translate(-50%)'
                        projects[cont].style.opacity = '1'
                        console.log(cont)
                    }
                    else {
                        if (cont == visibleProject - 2) {
                            projects[cont].style.transform = 'translate(-200%) scale(.7)'
                            console.log(cont)
                            break
                        }
                        projects[cont].style.transform = 'translate(-300%) scale(.7)'
                        console.log(cont)
                    }
                    

                }
            }
        }
        visibleProject--
    } */
}

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

const hello = document.querySelector('.hello')
hello.addEventListener('animationstart', takeOffAnimation)

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

const main = document.querySelector('main')
main.addEventListener('click', ()=>{
    if (showingMenu) {
        mostrarMenu()
    }
})