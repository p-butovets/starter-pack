$(document).ready(function () {
    // Slider
    $('.slider').slick({
        speed: 500,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/chevron-left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/chevron-right.svg"></button>',
        responsive: [{
            breakpoint: 992,
            settings: {
                arrows: false,
                dots: true,
                slidesToShow: 1
            }
        }]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    $('.catalog-item__link').each(function (i) {
        $(this).on('click', function (e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');

        });
    });

    $('.catalog-item__back').each(function (i) {
        $(this).on('click', function (e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');

        });
    });

    //Modals
    $('.modal__close').on('click', function () {
        $('.overlay, #modal-callback, #modal-order, #modal-thankyou').fadeOut();
    });

    $('[data-modal=modal-callback]').on('click', function () {
        $('.overlay, #modal-callback').fadeIn();
    });

    $('.button__catalog-item').each(function (i) {
        $(this).on('click', function () {
            $('#modal-order .modal__subtitle').text($('.catalog-item__title').eq(i).text());
            $('.overlay, #modal-order').fadeIn();
        });
    });

    //Validation
    function validateForm(form) {
        $(form).validate({
            errorClass: "invalid",
            onsubmit: true,
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: "*Имя не может быть пустым",
                phone: "*Укажите телефон",
                email: {
                    required: "*Укажите вашу почту",
                    email: "*Адрес почты не корректный"
                }
            }
        });
    }

    validateForm('#modal-callback form');
    validateForm('#modal-order form');
    validateForm('#consult');

    //Send email
    $('form').submit(function (e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: 'POST',
            url: "https://rokkwork.space/mailer/smart.php",
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");
            $('#modal-callback, #modal-order').fadeOut();
            $('.overlay, #modal-thankyou').fadeIn();
            $('form').trigger('reset');
        });
    });

    //Smooth scroll
    $(window).scroll(function () {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    //Wowjs
    new WOW().init();
});