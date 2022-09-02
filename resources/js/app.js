import Alpine from 'alpinejs';
import collapse from '@alpinejs/collapse';

window.Alpine = Alpine;
Alpine.plugin(collapse);
Alpine.start();

import { Swiper, Navigation} from 'swiper';
Swiper.use([ Navigation ])

var carousels = document.getElementsByClassName("carousel");
for (var i = 0; i < carousels.length; i++) {
    var element = carousels[i].querySelectorAll('.swiper')[0];

    var prevBtn = carousels[i].querySelectorAll('.swiper-prev')[0];
    var nextBtn = carousels[i].querySelectorAll('.swiper-next')[0];

    const swiper = new Swiper(element, {
        loop: false,
        slidesPerView: 'auto',
        navigation: {
            nextEl: nextBtn,
            prevEl: prevBtn,
        },
    });
}

import './../sass/app.scss';
import './main';
