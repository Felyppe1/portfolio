function scrollToSection(htmlElement) {
    if (htmlElement.id == 'portfolio') {
        let section1 = document.querySelector('.section1')
        section1.scrollIntoView( {behavior : 'smooth'})
    }
    else {
        if (htmlElement.id == 'aboutMe') {
            let section2 = document.querySelector('.section2') 
            section2.scrollIntoView( {behavior : 'smooth'})
        }
        else {
            let section3 = document.querySelector('.section3')
            section3.scrollIntoView( {behavior : 'smooth'})
        }
    }
}

var projects = document.querySelectorAll('.projects-div')
var visibleProject = 0

function changeRight() {
    if (visibleProject < projects.length - 1) {
        let arrowLeft = document.querySelector('.fa-chevron-left')
        arrowLeft.style.display = 'inline'
        for (var cont = 0; cont < projects.length; cont++) {
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
    }
    if (visibleProject == 1) {
        let arrowRight = document.querySelector('.fa-chevron-right')
        arrowRight.style.display = 'none'
    }
}

function changeLeft() {
    if (visibleProject == 1) {
        let arrowLeft = document.querySelector('.fa-chevron-left')
        arrowLeft.style.display = 'none'
    } 
    if (visibleProject > 0) {
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
    }
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

