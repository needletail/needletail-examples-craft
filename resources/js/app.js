import {Client} from "@needletail/ui";

window.needletail = new Client(window.needletail_read_key);

import('./needletail/home-search-bar');
import('./needletail/result-search-bar');
import('./needletail/geo-search-bar');
import('./needletail/result');

import('../sass/app.scss');