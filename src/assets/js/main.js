import '../scss/main.scss';
import './navControl';
import './tileFlipper';
import './contact';
import './observers';
import '../web-components/ms-modal';

import {
    library,
    dom
} from '@fortawesome/fontawesome-svg-core';
import {
    faStar,
    faBars,
    faAngleDoubleRight
} from '@fortawesome/free-solid-svg-icons';
import {
    msQuery,
    msCreate
} from 'making-stuffs-queries';

library.add(faStar, faBars, faAngleDoubleRight);
dom.i2svg();


msQuery('#terms').addEventListener('click', (e) => {
    e.stopPropagation();
    const modal = msCreate('ms-modal', { open: '', templateID: 'termsTemplate' })
    msQuery('body').append(modal);
});

msQuery('#privacy').addEventListener('click', (e) => {
    e.stopPropagation();
    const modal = msCreate('ms-modal', { open: '', templateID: 'privacyTemplate' })
    msQuery('body').append(modal);
});

module.hot.accept((err) => console.log(err));