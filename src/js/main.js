@@include('./modules/menu.js');
@@include('./modules/verification.js');

$(document).ready(function(){
    // Aos Animation instance
    AOS.init();

    menu();
    verifyForms();

    // carousel
    $(".owl-carousel").owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 8000,
        dots: false,
        nav: true,
        navText: [$('.owl-navigation .owl-nav-prev'), $('.owl-navigation .owl-nav-next')],
        responsive: {
            0: { items: 1 },
            320: { items: 1 },
            767: { items: 2 },
            960: { items: 3 },
        },
    });
})


