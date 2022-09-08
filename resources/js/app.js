import {Client, Events} from "@needletail/ui";

window.needletail = new Client(window.needletail_read_key);
window.needletail.loaded = false;

document.addEventListener('DOMContentLoaded', async () => {
    if (window.needletail.loaded) {
        return;
    }

    await import('./needletail/home-search-bar');
    await import('./needletail/result-search-bar');
    await import('./needletail/geo-search-bar');
    await import('./needletail/result');
    await import('./needletail/aggregation');

    window.needletail.loaded = true;
    Events.emit('DOMContentLoaded');
});

import('../sass/app.scss');