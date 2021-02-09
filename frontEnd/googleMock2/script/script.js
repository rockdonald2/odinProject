function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function () {
        const context = this,
            args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

const navBar = document.querySelector('.nav--upper');
const nav = document.querySelector('.nav');

window.addEventListener('scroll', debounce(() => {
    if (window.scrollY > (nav.clientHeight + 10)) {
        navBar.classList.add('fixed');
        setTimeout(() => {
            navBar.classList.add('visible');
        }, 50);
    } else {
        navBar.classList.remove('visible');
        navBar.classList.remove('fixed');
    }
}));