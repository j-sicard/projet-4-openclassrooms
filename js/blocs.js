function setUpSpecialNavs() {
  $(".navbar-toggle").click(function (e) {
    var c = $(this).closest("nav"),
      a = c.find("ul.site-navigation"),
      f = a.clone();
    if (a.parent().hasClass("nav-special")) {
      if ((e.stopPropagation(), $(this).hasClass("selected-nav")))
        $(".blocsapp-special-menu blocsnav").removeClass("open"),
          $(".selected-nav").removeClass("selected-nav"),
          setTimeout(function () {
            $(".blocsapp-special-menu").remove(),
              $("body").removeClass("lock-scroll"),
              $(".selected-nav").removeClass("selected-nav");
          }, 300);
      else {
        $(this).addClass("selected-nav");
        var b,
          g,
          d,
          h = c.attr("class").replace("navbar", "").replace("row", ""),
          i = a
            .parent()
            .attr("class")
            .replace("navbar-collapse", "")
            .replace("collapse", "");
        ($(".content-tint").length = -1),
          $("body").append('<div class="content-tint"></div>'),
          f
            .insertBefore(".page-container")
            .wrap(
              '<div class="blocsapp-special-menu ' +
                h +
                '"><blocsnav class="' +
                i +
                '">'
            ),
          $("blocsnav").prepend(
            '<a class="close-special-menu animated fadeIn" style="animation-delay:0.5s;"><div class="close-icon"></div></a>'
          ),
          (b = "fadeInRight"),
          (g = 0),
          (d = 60),
          $(".blocsapp-special-menu blocsnav").hasClass("fullscreen-nav")
            ? ((b = "fadeIn"), (d = 100))
            : $(".blocsapp-special-menu").hasClass("nav-invert") &&
              (b = "fadeInLeft"),
          $(".blocsapp-special-menu blocsnav li").each(function () {
            $(this).parent().hasClass("dropdown-menu")
              ? $(this).addClass("animated fadeIn")
              : ((g += d),
                $(this)
                  .attr("style", "animation-delay:" + g + "ms")
                  .addClass("animated " + b));
          }),
          setTimeout(function () {
            $(".blocsapp-special-menu blocsnav").addClass("open"),
              $(".content-tint").addClass("on"),
              $("body").addClass("lock-scroll");
          }, 10);
      }
    }
  }),
    $("body")
      .on(
        "mousedown touchstart",
        ".content-tint, .close-special-menu",
        function (a) {
          $(".content-tint").removeClass("on"),
            $(".selected-nav").click(),
            setTimeout(function () {
              $(".content-tint").remove();
            }, 10);
        }
      )
      .on("click", ".blocsapp-special-menu a", function (a) {
        $(a.target).closest(".dropdown-toggle").length ||
          $(".close-special-menu").mousedown();
      });
}
function extraNavFuncs() {
  $(".site-navigation a").click(function (a) {
    $(a.target).closest(".dropdown-toggle").length ||
      $(".navbar-collapse").collapse("hide");
  }),
    $("a.dropdown-toggle").click(function (a) {
      $(this).parent().addClass("target-open-menu"),
        $(this)
          .closest(".dropdown-menu")
          .find(".dropdown.open")
          .each(function (a) {
            $(this).hasClass("target-open-menu") || $(this).removeClass("open");
          }),
        $(".target-open-menu").removeClass("target-open-menu");
    });
}
function setFillScreenBlocHeight() {
  $(".bloc-fill-screen").each(function (a) {
    var b = $(this);
    (window.fillBodyHeight = 0),
      $(this)
        .find(".container")
        .each(function (a) {
          (fillPadding = 2 * parseInt($(this).css("padding-top"))),
            (fillBodyHeight = b.hasClass("bloc-group")
              ? fillPadding + $(this).outerHeight() + 50
              : fillBodyHeight + fillPadding + $(this).outerHeight() + 50);
        }),
      $(this).css("height", getFillHeight() + "px");
  });
}
function getFillHeight() {
  var a = $(window).height();
  return a < fillBodyHeight && (a = fillBodyHeight + 100), a;
}
function scrollToTarget(a) {
  1 == a
    ? (a = 0)
    : 2 == a
    ? (a = $(document).height())
    : ((a = $(a).offset().top),
      $(".sticky-nav").length &&
        (a -= $(".sticky-nav .navbar-header").height())),
    $("html,body").animate({ scrollTop: a }, "slow"),
    $(".navbar-collapse").collapse("hide");
}
function animateWhenVisible() {
  hideAll(),
    inViewCheck(),
    $(window).scroll(function () {
      inViewCheck(), scrollToTopView(), stickyNavToggle();
    });
}
function setUpDropdownSubs() {
  $("ul.dropdown-menu [data-toggle=dropdown]").on("click", function (b) {
    b.preventDefault(),
      b.stopPropagation(),
      $(this).parent().siblings().removeClass("open"),
      $(this).parent().toggleClass("open");
    var a = $(this).parent().children(".dropdown-menu");
    a.offset().left + a.width() > $(window).width() &&
      a.addClass("dropmenu-flow-right");
  });
}
function stickyNavToggle() {
  var c = 0,
    a = "sticky";
  if ($(".sticky-nav").hasClass("fill-bloc-top-edge")) {
    var b = $(".fill-bloc-top-edge.sticky-nav")
      .parent()
      .css("background-color");
    "rgba(0, 0, 0, 0)" == b && (b = "#FFFFFF"),
      $(".sticky-nav").css("background", b),
      (c = $(".sticky-nav").height()),
      (a = "sticky animated fadeInDown");
  }
  $(window).scrollTop() > c
    ? ($(".sticky-nav").addClass(a),
      "sticky" == a &&
        $(".page-container").css("padding-top", $(".sticky-nav").height()))
    : ($(".sticky-nav").removeClass(a).removeAttr("style"),
      $(".page-container").removeAttr("style"));
}
function hideAll() {
  $(".animated").each(function (a) {
    $(this).closest(".hero").length ||
      $(this).removeClass("animated").addClass("hideMe");
  });
}
function inViewCheck() {
  $($(".hideMe").get().reverse()).each(function (d) {
    var a = jQuery(this),
      b = a.offset().top + a.height(),
      c = $(window).scrollTop() + $(window).height();
    if ((a.height() > $(window).height() && (b = a.offset().top), b < c)) {
      var e = a.attr("class").replace("hideMe", "animated");
      a.css("visibility", "hidden").removeAttr("class"),
        setTimeout(function () {
          a.attr("class", e).css("visibility", "visible");
        }, 0.01);
    }
  });
}
function scrollToTopView() {
  $(window).scrollTop() > $(window).height() / 3
    ? $(".scrollToTop").hasClass("showScrollTop") ||
      $(".scrollToTop").addClass("showScrollTop")
    : $(".scrollToTop").removeClass("showScrollTop");
}
function setUpVisibilityToggle() {
  $(document).on("click", "[data-toggle-visibility]", function (b) {
    b.preventDefault();
    var a = $(this).attr("data-toggle-visibility");
    if (-1 != a.indexOf(",")) {
      var c = a.split(",");
      $.each(c, function (a) {
        d($("#" + c[a]));
      });
    } else d($("#" + a));
    function d(a) {
      a.is("img") ? a.toggle() : a.slideToggle();
    }
  });
}
function setUpLightBox() {
  window.targetLightbox,
    $(document)
      .on("click", "[data-lightbox]", function (f) {
        f.preventDefault();
        var b = (targetLightbox = $(this)).attr("data-lightbox"),
          g = targetLightbox.attr("data-autoplay"),
          c =
            '<p class="lightbox-caption">' +
            targetLightbox.attr("data-caption") +
            "</p>",
          a = "no-gallery-set",
          d = targetLightbox.attr("data-frame");
        targetLightbox.attr("data-gallery-id") &&
          (a = targetLightbox.attr("data-gallery-id")),
          targetLightbox.attr("data-caption") || (c = "");
        var e = "";
        1 == g && (e = "autoplay");
        var h = $(
          '<div id="lightbox-modal" class="modal fade"><div class="modal-dialog"><div class="modal-content ' +
            d +
            ' blocs-lb-container"><button id="blocs-lightbox-close-btn" type="button" class="close-lightbox" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><div class="modal-body"><a href="#" class="prev-lightbox" aria-label="prev"><span class="fa fa-chevron-left"></span></a><a href="#" class="next-lightbox" aria-label="next"><span class="fa fa-chevron-right"></span></a><img id="lightbox-image" class="img-responsive" src="' +
            b +
            '"><div id="lightbox-video-container" class="embed-responsive embed-responsive-16by9"><video controls ' +
            e +
            ' class="embed-responsive-item"><source id="lightbox-video" src="' +
            b +
            '" type="video/mp4"></video></div>' +
            c +
            "</div></div></div></div>"
        );
        $("body").append(h),
          "fullscreen-lb" == d &&
            ($("#lightbox-modal")
              .addClass("fullscreen-modal")
              .append(
                '<a class="close-full-screen-modal animated fadeIn" style="animation-delay:0.5s;" onclick="$(\'#lightbox-modal\').modal(\'hide\');"><div class="close-icon"></div></a>'
              ),
            $("#blocs-lightbox-close-btn").remove()),
          ".mp4" == b.substring(b.length - 4)
            ? ($("#lightbox-image, .lightbox-caption").hide(),
              $("#lightbox-video-container").show())
            : ($("#lightbox-image,.lightbox-caption").show(),
              $("#lightbox-video-container").hide()),
          $("#lightbox-modal").modal("show"),
          "no-gallery-set" == a
            ? (0 == $("a[data-lightbox]").index(targetLightbox) &&
                $(".prev-lightbox").hide(),
              $("a[data-lightbox]").index(targetLightbox) ==
                $("a[data-lightbox]").length - 1 && $(".next-lightbox").hide())
            : (0 == $('a[data-gallery-id="' + a + '"]').index(targetLightbox) &&
                $(".prev-lightbox").hide(),
              $('a[data-gallery-id="' + a + '"]').index(targetLightbox) ==
                $('a[data-gallery-id="' + a + '"]').length - 1 &&
                $(".next-lightbox").hide()),
          addLightBoxSwipeSupport();
      })
      .on("hidden.bs.modal", "#lightbox-modal", function () {
        $("#lightbox-modal").remove();
      }),
    $(document).on("click", ".next-lightbox, .prev-lightbox", function (f) {
      f.preventDefault();
      var b = "no-gallery-set",
        c = $("a[data-lightbox]").index(targetLightbox),
        a = $("a[data-lightbox]").eq(c + 1);
      targetLightbox.attr("data-gallery-id") &&
        ((c = $(
          'a[data-gallery-id="' +
            (b = targetLightbox.attr("data-gallery-id")) +
            '"]'
        ).index(targetLightbox)),
        (a = $('a[data-gallery-id="' + b + '"]').eq(c + 1))),
        $(this).hasClass("prev-lightbox") &&
          ((a = $('a[data-gallery-id="' + b + '"]').eq(c - 1)),
          "no-gallery-set" == b && (a = $("a[data-lightbox]").eq(c - 1)));
      var d = a.attr("data-lightbox");
      if (".mp4" == d.substring(d.length - 4)) {
        var e = "";
        1 == a.attr("data-autoplay") && (e = "autoplay"),
          $("#lightbox-image, .lightbox-caption").hide(),
          $("#lightbox-video-container")
            .show()
            .html(
              "<video controls " +
                e +
                ' class="embed-responsive-item"><source id="lightbox-video" src="' +
                d +
                '" type="video/mp4"></video>'
            );
      } else $("#lightbox-image").attr("src", d).show(), $(".lightbox-caption").html(a.attr("data-caption")).show(), $("#lightbox-video-container").hide();
      (targetLightbox = a),
        $(".next-lightbox, .prev-lightbox").hide(),
        "no-gallery-set" == b
          ? ($("a[data-lightbox]").index(a) !=
              $("a[data-lightbox]").length - 1 && $(".next-lightbox").show(),
            $("a[data-lightbox]").index(a) > 0 && $(".prev-lightbox").show())
          : ($('a[data-gallery-id="' + b + '"]').index(a) !=
              $('a[data-gallery-id="' + b + '"]').length - 1 &&
              $(".next-lightbox").show(),
            $('a[data-gallery-id="' + b + '"]').index(a) > 0 &&
              $(".prev-lightbox").show());
    });
}
function addSwipeSupport() {
  $(".carousel-inner").length &&
    $(".carousel-inner").swipe({
      swipeLeft: function (a, b, c, d, e) {
        $(this).parent().carousel("next");
      },
      swipeRight: function () {
        $(this).parent().carousel("prev");
      },
      threshold: 0,
    });
}
function addKeyBoardSupport() {
  $(window).keydown(function (a) {
    37 == a.which
      ? $(".prev-lightbox").is(":visible") && $(".prev-lightbox").click()
      : 39 == a.which &&
        $(".next-lightbox").is(":visible") &&
        $(".next-lightbox").click();
  });
}
function addLightBoxSwipeSupport() {
  $("#lightbox-image").length &&
    $("#lightbox-image").swipe({
      swipeLeft: function (a, b, c, d, e) {
        $(".next-lightbox").is(":visible") && $(".next-lightbox").click();
      },
      swipeRight: function () {
        $(".prev-lightbox").is(":visible") && $(".prev-lightbox").click();
      },
      threshold: 0,
    });
}
$(document).ready(function () {
  $("#scroll-hero").click(function (a) {
    a.preventDefault(),
      $("html,body").animate(
        { scrollTop: $("#scroll-hero").closest(".bloc").height() },
        "slow"
      );
  }),
    extraNavFuncs(),
    setUpSpecialNavs(),
    setUpDropdownSubs(),
    setUpLightBox(),
    setUpVisibilityToggle(),
    addSwipeSupport(),
    addKeyBoardSupport(),
    -1 != navigator.userAgent.indexOf("Safari") &&
      -1 == navigator.userAgent.indexOf("Chrome") &&
      $("#page-loading-blocs-notifaction").remove();
}),
  $(window)
    .load(function () {
      setFillScreenBlocHeight(),
        animateWhenVisible(),
        $("#page-loading-blocs-notifaction").remove();
    })
    .resize(function () {
      setFillScreenBlocHeight();
    }),
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });
