'use strict';

// Constructor
var Header = function() {
    var header = $('.header');
    var body = $('body');
    var menuOpen = $('.header__hamburguer');
    var headerContainer = $('.header__container');
    var headerItems = $('.header__item');

    menuOpen.on('click', function(){
        header.toggleClass('-open');
        body.toggleClass('-hideOverflow');
    });

    headerItems.on('click', function() {
        header.removeClass('-open');
        body.removeClass('-hideOverflow');
    })

    //Header resize logic
    var initialScroll = 0;
    var currentScroll = 0;
    var direction;

    $(window).on('scroll', function(e) {
        const viewport = window.innerWidth;

        if(viewport >= 720) {
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
        }
    })

    //data toggle logic
    var targets = $('[data-target]');
    var contents = $('[data-content]');
    // var contentContainer = $('.home__como-invertir__wrapper-left');

    // const contentsHeight = contents.map(function() {
    //     return $(this).height();
    // })

    // const maxHeight = Math.max.apply(Math, contentsHeight);

    // console.log(maxHeight);

    // var viewport = window.innerWidth;

    // if(viewport >= 720) {
    //     contentContainer.height(maxHeight);
    // } else  {
    //     contentContainer.height('auto');
    // }

    // $(window).resize(function() {
    //     viewport = window.innerWidth;

    //     if(viewport >= 720) {
    //         contentContainer.height(maxHeight);
    //     } else  {
    //         contentContainer.height('auto');
    //     }
    // })

    $(targets[0]).addClass('-active')
    $(contents[0]).addClass('-active')
    $(contents[0]).addClass('-show')

    targets.on('click', function(e) {
        e.preventDefault();

        targets.removeClass('-active');
        targets.removeClass('-show');
        contents.removeClass('-active');
        contents.removeClass('-show');
        $(this).addClass('-active');

        var target = $(this).data('target');

        var targettedContent = contents.filter(function() {
            return $(this).data('content') === target;
        });

        targettedContent.addClass('-show');
        setTimeout(() => {
            targettedContent.addClass('-active');
        }, 5);
    })

    $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#buscar"]')
    .not('[href="#"]')
    .not('[href="#0"]')
    .not('[href="#registro"]')
    .not('[href="#login"]')
    .click(function(event) {
        // On-page links
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
            &&
            location.hostname == this.hostname
        ) {
          // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top + -90
                }, 1000, function() {
                // Callback after animation
                // Must change focus!
                    var $target = $(target);
                    $target.focus();
                });
            }
        }
    });
};

module.exports = Header;
