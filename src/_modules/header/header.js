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

    //Header resize logic
    var initialScroll = 0;
    var currentScroll = 0;
    var direction;

    $(window).on('scroll', function(e) {
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

    //data toggle logic
    var targets = $('[data-target]');
    var contents = $('[data-content]');
    var contentContainer = $('.home__como-invertir__wrapper');

    const contentsHeight = contents.map(function() {
        return $(this).height();
    })

    const maxHeight = Math.max.apply(Math,contentsHeight);

    contentContainer.height(maxHeight);
    
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
};

module.exports = Header;
