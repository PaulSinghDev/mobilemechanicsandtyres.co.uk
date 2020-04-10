import {
    msQuery,
    msQueryAll
} from 'making-stuffs-queries';

const links = msQueryAll('.top-nav-link');
const navButton = msQuery('.top-nav-responsive');
const navBar = msQuery('.top-nav-links');

function debounce(func, wait, immediate) {
    var timeout;

    return function executedFunction() {
        var context = this;
        var args = arguments;

        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };

        var callNow = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(later, wait);

        if (callNow) func.apply(context, args);
    };
};

const menuToggle = (e) => {
    e.stopPropagation();
    if(!msQuery('nav').classList.contains('scrolling')) {
        msQuery('nav').classList.toggle('scrolling');
    }

    if(navBar.classList.contains('active')) {
        navBar.classList.remove('active');
        navBar.setAttribute('aria-expanded', false);
        navButton.setAttribute('aria-expanded', false);
        document.removeEventListener('click', () => navBar.classList.remove('active'));
    } else {
        navBar.classList.add('active');
        navBar.setAttribute('aria-expanded', true);
        navButton.setAttribute('aria-expanded', true);
        document.addEventListener('click', () => navBar.classList.remove('active'));
    }

};

const resizeListener = () => {
    if (window.innerWidth < 820) {
        links.forEach(link => link.addEventListener('click', menuToggle));
        navBar.setAttribute('responsive', '');
    } else {
        links.forEach(link => link.removeEventListener('click', menuToggle));
        navBar.removeAttribute('responsive');
        if(navBar.classList.contains('active')) navBar.classList.remove('active');
    }
};

navButton.addEventListener('click', e => menuToggle(e));

window.addEventListener('resize', debounce(resizeListener, 250));

window.addEventListener('load', resizeListener);