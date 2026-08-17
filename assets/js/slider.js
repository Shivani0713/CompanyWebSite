(function ($) {
    "use strict";

    $(document).ready(function () {

        /* ===============================
           Animation Function
        =============================== */
        function sliderAnimations(elements) {
            var animationEndEvents =
                "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";

            elements.each(function () {
                var $this = $(this);
                var delay = $this.data("delay");
                var duration = $this.data("duration");
                var animationType = "solera-animation " + $this.data("animation");

                $this.css({
                    "animation-delay": delay,
                    "-webkit-animation-delay": delay,
                    "animation-duration": duration,
                });

                $this.addClass(animationType).one(animationEndEvents, function () {
                    $this.removeClass(animationType);
                });
            });
        }

        /* ===============================
           SLIDER OPTIONS
        =============================== */

        var sliderOptions = {
            speed: 1000,
            loop: true,
            effect: "fade",
            grabCursor: true,

            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },

            pagination: {
                el: ".solera-dot-pagination",
                clickable: true,
            },

            navigation: {
                nextEl: ".solera-next",
                prevEl: ".solera-prev",
            },

            on: {

                /* Slider Init */
                init: function () {

                    var anim = $(this.slides[this.activeIndex]).find("[data-animation]");
                    sliderAnimations(anim);

                    /* TOTAL SLIDES */
                    var totalSlides = this.slides.length - this.loopedSlides * 2;
                    $(".solera-total").text(("0" + totalSlides).slice(-2));

                    /* CURRENT SLIDE */
                    $(".solera-current").text(("0" + (this.realIndex + 1)).slice(-2));
                },

                /* Animation Start */
                slideChangeTransitionStart: function () {
                    var anim = $(this.slides[this.activeIndex]).find("[data-animation]");
                    sliderAnimations(anim);
                },

                /* Update Counter */
                slideChange: function () {
                    $(".solera-current").text(("0" + (this.realIndex + 1)).slice(-2));
                }
            }
        };

        /* ===============================
           INIT SWIPER
        =============================== */

        var swiper = new Swiper(".solera-slider", sliderOptions);

    });

    

})(jQuery);
