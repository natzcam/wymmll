(function ($) {
  $(function () {

    $('.menu-btn').floatingActionButton({
      hoverEnabled: false
    });

    smoothScroll();
    countDown();

    $(window).on('load', function (e) {
      slideshow();
    });

    $(window).on('orientationchange', function (e) {
      $(window).one('resize', function () {
        slideshow();
      });
    });

  });

  function smoothScroll() {
    $('.menu-btn ul a.btn-floating').click(function (event) {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
        location.hostname == this.hostname) {
        var target = $(this.hash);
        if (target.length) {
          event.preventDefault();

          if (this.hash == '#slideshow' && target.css('position') == 'fixed') {
            target = $('#home');
          }

          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000, function () {
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) {
              return false;
            } else {
              $target.attr('tabindex', '-1');
              $target.focus();
            };
          });
        }
      }
    });
  }

  function countDown() {
    //countdown
    $(".countdown").countdown("2018/08/18", function (event) {
      $(this).text(
        event.strftime('%D days %H:%M:%S')
      );
    });

  }

  function slideshow() {
    $(".slick-slider").slick('unslick');
    $('#slideshow').html('');

    var ih = Math.ceil($('#slideshow').height());
    var iw = Math.ceil($('#slideshow').width());
    var landscape = ih < iw;

    if (iw < 400) {
      iw = 400;
    } else if (iw < 700) {
      iw = 700;
    } else if (iw < 1000) {
      iw = 1000
    } else if (iw < 1500) {
      iw = 1500
    }
    if (ih < 400) {
      ih = 400;
    } else if (ih < 700) {
      ih = 700;
    } else if (ih < 1000) {
      ih = 1000
    } else if (ih < 1500) {
      ih = 1500
    }

    var imgids = [{
        id: 1
      },
      {
        id: 2,
        o: 'l'
      },
      {
        id: 3
      },
      {
        id: 4
      },
      {
        id: 5
      },
      {
        id: 6,
        o: 'l'
      },
      {
        id: 7
      },
      {
        id: 8
      },
      {
        id: 9
      },
      {
        id: 10
      },
      {
        id: 11
      },
      {
        id: 12,
        pcrop: "c_lpad,b_rgb:9AB5C8"
      },
      {
        id: 13
      },
      {
        id: 14
      },
      {
        id: 15
      },
      {
        id: 16
      }
    ];


    var template =
      '<div class="photo-container">' +
      '<img class="prenup-photo" data-lazy="https://res.cloudinary.com/do5gftokk/image/upload/${crop},q_95,w_${width},h_${height},dpr_${dpr}/${id}-${o}.JPG" width="${width}" height="${height}">' +
      '<img class="ajax-loader" src="images/loader.svg">' +
      '</div>'


    for (var i in imgids) {
      var values = imgids[i];

      var values = Object.assign({
        width: iw,
        height: ih,
        dpr: "1.0",
        lcrop: "c_lfill,g_faces",
        pcrop: "c_lfill,g_center",
        o: landscape ? 'l' : 'p'
      }, values);

      if (landscape) {
        values.crop = values.lcrop;
      } else {
        values.crop = values.pcrop;
      }

      if (navigator.connection) {
        if (navigator.connection.downlink > 1.0) {
          values.dpr = "1.5";
        } else if (navigator.connection.downlink > 2.0) {
          values.dpr = "2.0";
        }
      }

      $('#slideshow').append($.tmpl(template, values));
    }

    $('#slideshow img.prenup-photo').on('load', function (e) {
      if (this.complete) {
        $(this).siblings('.ajax-loader').hide();
      }
    });

    $('#slideshow').slick({
      lazyLoad: 'progressive',
      arrows: false,
      speed: 500,
      fade: true,
      cssEase: 'linear',
      autoplay: true,
      autoplaySpeed: 5000,
      pauseOnFocus: false,
      pauseOnHover: false
    });

  }

})(jQuery);