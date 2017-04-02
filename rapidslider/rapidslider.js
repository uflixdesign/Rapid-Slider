/*!
 * Rapid Slider v0.1.1 (https://cs.uflixdesign.com/rapid-slider)
 * Copyright 2011-2017 UFLIX DESIGN
 * Licensed under MIT (https://opensource.org/licenses/MIT)
 */

(function($){


    $.fn.rapidslider = function(options){

        return this.each(function(){
            var el = $(this);

            // If already instantiated =====================
            var instance = el.data('rapidslider-instance');
            if( typeof instance !== 'undefined' && !instance) return;

            // Instantiate Rapid Slider =====================
            el.data(
                'rapidslider-instance',
                new rapidSlider(el, $.extend({}, defaultOptions, options ))
            );
        });

    };

    $.fn.rapidslider.getInstance = function(){
        return el.data('rapidslider-instance');
    };

    // Default Options ===================
    var defaultOptions = {
        autoplay: false,
        loop: true,
        start: 0,
        speed: 400,
        pause: 3500,
        beforeSlide: function (){},
        afterSlide: function (){},
    };

    // Rapid Slider Class ===================
    var rapidSlider = function(slider, options){

        var self = this;
        self.currentSlideIndex = parseInt(options.start);
        self.sliding = false;

        var slidesWraper = slider.find('.rapidslider-slides');
        var slides = slider.find('.rapidslider-slide');
        var pagination = slider.find('.rapidslider-pagination')
        var timer = null;

        self.init = function(){

            slidesWraper.height(slider.height());
            self.events();
            self.resize();
            $(window).resize(function(){
                self.resize();
            });
            self.pagination();

            if(options.autoplay){
                if( timer ) clearTimeout( timer );
                timer = setTimeout( self.next, options.pause );
            }


            self.setSlide( slides.eq(self.currentSlideIndex) );


        };

        self.pagination = function(){
            pages = '';
            for( var i = 1; i <= slides.length; i++ ){
                pages += '<li>' + i + '</li>';
            }
            pagination.append(pages);

        };

        self.events = function(){
            slider.on('click', '.rapidslider-next', function(e){
                self.next();
            });
            slider.on('click', '.rapidslider-prev', function(e){
                self.next();
            });

            pagination.on('click', 'li', function(e){
                var page = pagination.find('li').index(this);
                self.show( page );
            });
        };

        self.resize = function(){
            slidesWraper.height(slider.height());
            slides.each(function(i, e){
                var slide = $(e);
                var slideImage = slide.find('.rapidslider-slide-image');
                var img = new Image();
                (function( img, slideImage ){
                    img.onload = function(){

                        var slideRatio = slide.width() / slide.height();
                        var imageRatio = img.width / img.height;

                        if( slideRatio > imageRatio ){
                            slideImage.width(slide.width());
                            slideImage.height(1 / imageRatio * slide.width());
                            slideImage.css('margin-top', -(slideImage.height() - slide.height() ) / 2 + 'px' );
                            slideImage.css('margin-left', '0px' );
                        }else{
                            slideImage.height(slide.height());
                            slideImage.width(imageRatio * slide.height());
                            slideImage.css('margin-top', '0px' );
                            slideImage.css('margin-left', -(slideImage.width() - slide.width() ) / 2 + 'px' );
                        }

                    };

                    img.src = slideImage.attr('src');
                })(img, slideImage);
            });
        };

        self.next = function(){

            var nextSlide = self.currentSlideIndex + 1;
            if( nextSlide >= slides.length ){
                if( options.loop ) nextSlide = 0;
                else return;
            }

            self.show(nextSlide);
        };

        self.show = function(slideIndex){

            if( self.sliding ) return;
            if( slideIndex >= slides.length ) return;
            if( self.currentSlideIndex == slideIndex ) return;

            slider.trigger('rs.beforeSlide', [self.currentSlideIndex, slideIndex]);

            self.sliding = true;
            var currentSlide = slides.eq(self.currentSlideIndex);
            var showSlide = slides.eq(slideIndex);

            showSlide.removeClass('active').addClass('slide-in')
                .css({
                    'top': slider.height() + 'px'
                })
                .animate({
                    'top': '0px'
                }, options.speed);

            currentSlide.addClass('slide-out')
                .css({
                    'top': '0px'
                })
                .animate({
                    'top': (- slider.height()) + 'px'
                }, options.speed, function(){

                    self.unsetSlide( currentSlide );
                    self.setSlide( showSlide );

                    var prevSlide
                    self.currentSlideIndex = slideIndex;
                    self.sliding = false;

                    slider.trigger('rs.afterSlide', [slideIndex, prevSlide]);

                    if(options.autoplay){
                        if( timer ) clearTimeout( timer );
                        timer = setTimeout( self.next, options.pause );
                    }

                });

        };


        self.unsetSlide = function( slide ){
            slide.removeClass('slide-out');
        };

        self.setSlide = function(slide){
            if( !slide || !slide.length ) return;

            var index = slides.index( slide );
            pagination.find('li.active').removeClass('active');
            pagination.find('li').eq(index).addClass('active');


            slide.removeClass('slide-in').addClass('active');
            var caption = slide.find('.rapidslider-slide-image').attr('title');
            slider.find('.rapidslider-caption').html( caption );

        };


        self.init();
    };

})(jQuery);
