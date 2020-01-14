import {msQuery, msCreate} from 'making-stuffs-queries';

const nav = msQuery('.top-nav');
const main = msQuery('main');
const header = msQuery('header');
const contact = msQuery('#contact');

let options = {
    threshold: 0.02,
    margin: 0,
    rot: null
}

const callback = (entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting && entry.target === main) {
            nav.classList.add('scrolling');
        } else if(!entry.isIntersecting && entry.target === main && window.scrollY < header.offsetHeight) {
            nav.classList.remove('scrolling');
        } else if(entry.isIntersecting && entry.target === contact) {
            return addMap();
        }
    });
}

const addMap = () => {
    const placeHolder = msQuery('.contact-info');
    if(placeHolder.childElementCount === 0 ) {
        const iFrameOptions = { 
            src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2475.638917579317!2d-0.17216638471171977!3d51.64813750822486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876194b8eedcd0d%3A0xb869a879f52e9c43!2smobile%20mechanic%20and%20tyres!5e0!3m2!1sen!2suk!4v1576429278378!5m2!1sen!2suk", 
            width: "100%",
            height: "100%",
            frameborder: "0",
            style: "border:0;",
            allowfullscreen:""
        }
        const mapiFrame = msCreate('iframe', iFrameOptions);
        placeHolder.appendChild(mapiFrame);
    } else return;
}

const observer = new IntersectionObserver(callback, options);

observer.observe(main);
observer.observe(contact);