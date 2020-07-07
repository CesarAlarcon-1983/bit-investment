'use strict';

// Constructor
var Header = function() {
    var header = $('.header');
    var body = $('body');
    var menuOpen = $('.header__hamburguer');
    var  headerContainer = $('.header__container');

    menuOpen.on('click', function(){
        header.toggleClass('-open');
        body.addClass('-hideOverflow');
    });

    var initialScroll = 0;
    var currentScroll = 0;
    var direction;

    $(window).on('scroll', function(e) {
        console.log(e);
        if(initialScroll == 0) {
            currentScroll = $(window)[0].scrollY;
            initialScroll = currentScroll;

            header.addClass('header--scrolled-down');
        }

        if(initialScroll > 0) {
            currentScroll = $(window)[0].scrollY;

            direction = currentScroll - initialScroll;

            if(direction < 0) {
                header.addClass('header--scrolled-up');
            } else {
                header.removeClass('header--scrolled-up');
            }

            if(currentScroll == 0) {
                header.removeClass('header--scrolled-down');
                header.removeClass('header--scrolled-up');
            }

            initialScroll = currentScroll;
        }
    })
    // window.onscroll = function() {resizeHeaderOnScroll()};

    // function resizeHeaderOnScroll() {
    //     if (body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    //         header.addClass('header--scrolled-down');
    //     } 
        
    //     if(body.scrollTop < 50 || document.documentElement.scrollTop < 50) {
    //         header.removeClass('header--scrolled-down');
    //     }

    //     // if() {
    //     //     header.removeClass('header--scrolled');
    //     // }
    // }
};

module.exports = Header;
