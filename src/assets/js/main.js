import '../scss/main.scss';
import './navControl';
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
} from '@fortawesome/free-solid-svg-icons';
import {
    msQuery,
    msCreate,
    msQueryAll
} from 'making-stuffs-queries';

library.add(faStar, faBars);
dom.i2svg();


msQuery('#terms').addEventListener('click', (e) => {
    e.stopPropagation();
    const modal = msCreate('ms-modal', {
        open: '',
        templateID: 'termsTemplate'
    });
    msQuery('body').append(modal);
});

msQuery('#privacy').addEventListener('click', (e) => {
    e.stopPropagation();
    const modal = msCreate('ms-modal', {
        open: '',
        templateID: 'privacyTemplate'
    });
    msQuery('body').append(modal);
});

msQueryAll('.service-tile').forEach(tile => {
    tile.addEventListener('click', e => {
        e.stopPropagation();
        const modal = msCreate('ms-modal', {
            open: '',
            templateID: tile.dataset.modal
        });
        msQuery('body').append(modal);
    });
});