import '../scss/main.scss';
import './navControl';
import './tileFlipper';
import './contact';
import './observers';

import { library, dom} from '@fortawesome/fontawesome-svg-core';
import {faStar, faBars, faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons';

library.add(faStar, faBars, faAngleDoubleRight);
dom.i2svg();

module.hot.accept((err) => console.log(err));