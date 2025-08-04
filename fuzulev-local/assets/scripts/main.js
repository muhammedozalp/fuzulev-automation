/*! jquery.cookie v1.4.1 | MIT */
!(function (a) {
    "function" == typeof define && define.amd
        ? define(["jquery"], a)
        : "object" == typeof exports
        ? a(require("jquery"))
        : a(jQuery);
})(function (a) {
    function b(a) {
        return h.raw ? a : encodeURIComponent(a);
    }
    function c(a) {
        return h.raw ? a : decodeURIComponent(a);
    }
    function d(a) {
        return b(h.json ? JSON.stringify(a) : String(a));
    }
    function e(a) {
        0 === a.indexOf('"') &&
            (a = a.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
        try {
            return (
                (a = decodeURIComponent(a.replace(g, " "))),
                h.json ? JSON.parse(a) : a
            );
        } catch (b) {}
    }
    function f(b, c) {
        var d = h.raw ? b : e(b);
        return a.isFunction(c) ? c(d) : d;
    }
    var g = /\+/g,
        h = (a.cookie = function (e, g, i) {
            if (void 0 !== g && !a.isFunction(g)) {
                if (
                    ((i = a.extend({}, h.defaults, i)),
                    "number" == typeof i.expires)
                ) {
                    var j = i.expires,
                        k = (i.expires = new Date());
                    k.setTime(+k + 864e5 * j);
                }
                return (document.cookie = [
                    b(e),
                    "=",
                    d(g),
                    i.expires ? "; expires=" + i.expires.toUTCString() : "",
                    i.path ? "; path=" + i.path : "",
                    i.domain ? "; domain=" + i.domain : "",
                    i.secure ? "; secure" : "",
                ].join(""));
            }
            for (
                var l = e ? void 0 : {},
                    m = document.cookie ? document.cookie.split("; ") : [],
                    n = 0,
                    o = m.length;
                o > n;
                n++
            ) {
                var p = m[n].split("="),
                    q = c(p.shift()),
                    r = p.join("=");
                if (e && e === q) {
                    l = f(r, g);
                    break;
                }
                e || void 0 === (r = f(r)) || (l[q] = r);
            }
            return l;
        });
    (h.defaults = {}),
        (a.removeCookie = function (b, c) {
            return void 0 === a.cookie(b)
                ? !1
                : (a.cookie(b, "", a.extend({}, c, { expires: -1 })),
                  !a.cookie(b));
        });
});
function formatThis(value) {
    value = value.split(".").join("").replace(/₺/g, "");
    return value;
}

$(document).ready(function () {
    $.validator.addMethod(
        "phoneCustomRule",
        function (value, element) {
            var counter = 0;
            var limit = 5;
            var current = -1;
            value = value
                .replace(/[\])}[{(]/g, "")
                .replace(/-/g, "")
                .replace(/\s/g, "");
            for (var i = 0; i < value.length; i++) {
                if (current == value[i]) {
                    counter++;
                    if (counter == limit) return false;
                } else {
                    counter = 0;
                    current = value[i];
                }
            }
            return true;
        },
        "Telefon numarası geçersiz."
    );
    $.validator.addMethod(
        "emailCustomRule",
        function (value, element) {
            var pattern = new RegExp(
                /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i
            );
            return this.optional(element) || pattern.test(value);
        },
        "Lütfen geçerli bir e-posta adresi girin."
    );
    let propertyValue = $("[name='propertyValue']");
    let advance = $("[name='Pesinat']");
    let maturity = $("[name='Vade']");

    $(window).resize(function (e) {
        if (e.currentTarget.innerWidth < 1024) {
            $("#device-error").addClass("js-show");
            $("header,main,footer,form").addClass("js-hide");
        } else {
            $("#device-error").removeClass("js-show");
            $("header,main,footer,form").removeClass("js-hide");
        }
    });

    if (window.innerWidth >= 1024 && window.innerWidth > 768) {
        /**
         *
         * Full Slider
         *
         */

        var mainSlider = document.getElementById("js-full-slider");
        if (mainSlider) {
            var fullSlider = new Swiper(mainSlider, {
                slidesPerView: 1,
                autoplay: false,
                pagination: {
                    el: ".c-full-slider__pagination",
                    clickable: true,
                },
                navigation: {
                    nextEl: ".c-full-slider__nav--next",
                    prevEl: ".c-full-slider__nav--prev",
                },
                effect: "fade",
                on: {
                    init: function () {
                        sendPromotionView(this.slides[this.activeIndex], this.activeIndex + 1);
                    },
                    slideChange: function () {
                        sendPromotionView(this.slides[this.activeIndex], this.activeIndex + 1);
                    }
                },
            });
        }
        /**
         *
         * Campany Slider
         *
         */

        var campanySlider = document.getElementById("js-campany-slider");

        if (campanySlider) {
            var cmpSlider = new Swiper(campanySlider, {
                slidesPerView: 1.1,
                spaceBetween: 50,
              
                autoplay: true,
                loop: false,
                pagination: {
                    el: ".c-campany-slider__pagination",
                    clickable: true,
                },
                navigation: {
                    nextEl: ".c-campany-slider__nav--next",
                    prevEl: ".c-campany-slider__nav--prev",
                },
                breakpoints: {
                    991: {
                        slidesPerView: 1,
                        spaceBetween: 30,
                    },
                    767: {
                        slidesPerView: 1.5,                        
                        spaceBetween: 8,
                    },
                },
                on: {
                    init: function () {
                        checkAndSendEvent(this.slides[this.activeIndex], this.activeIndex + 1);
                    },
                    slideChange: function () {
                        checkAndSendEvent(this.slides[this.activeIndex], this.activeIndex + 1);
                    }
                },
            });

            var campaignTab = document.getElementById("campaignTab");

            if (campaignTab && campaignTab.querySelector(".number-of-items")) {
                var itemsLength = campanySlider.querySelectorAll(".swiper-pagination-bullet").length;
                campaignTab.querySelector(".number-of-items").textContent = itemsLength;
            }
        }

        /**
         *
         * Comments Slider
         *
         */

        var commentSlider = document.getElementById("js-comments-slider");
        if (commentSlider) {
            var cmSlider = new Swiper(commentSlider, {
                slidesPerView: 1.1,
                spaceBetween: 8,
                centeredSlides: true,
                autoplay: true,
                loop: true,
                pagination: {
                    el: ".c-comments__pagination",
                    clickable: true,
                },
                breakpoints: {
                    991: {
                        slidesPerView: 3,
                        centeredSlides: false,
                        centerMode: true,
                        spaceBetween: 30,
                    },
                    767: {
                        slidesPerView: 1.5,
                        centerMode: false,
                        spaceBetween: 8,
                    },
                },
            });
        }

        /**
         *
         * Search Area Desktop
         *
         */

        $("#js-desktop-search-input").click(function (e) {
            $("#js-desktop-search-input").parent().addClass("js-open");
            $("#js-desktop-search-input").parent().next().addClass("js-open");
            if (window.innerWidth <= 575) {
                $(".o-search-area").addClass("js-open");
            }
        });

        $(document).mouseup(function (e) {
            var desktopSearchInput = $(".o-search-area__wrapper");

            if (
                !desktopSearchInput.is(e.target) &&
                desktopSearchInput.has(e.target).length === 0
            ) {
                // input dışına tıklanınca
                $("#js-desktop-search-input").parent().removeClass("js-open");
                $("#js-desktop-search-input")
                    .parent()
                    .next()
                    .removeClass("js-open");
                if (window.innerWidth <= 575) {
                    $(".o-search-area").removeClass("js-open");
                }
            }
        });

        const header = document.querySelector(".o-header");
        const body = document.querySelector("body");
        let lastScrollTop = 0;

        window.addEventListener(
            "scroll",
            function () {
                var st =
                    window.pageYOffset || document.documentElement.scrollTop;
                if (!header) return;

                if (st > lastScrollTop) {
                    header.classList.add("fixed");
                    header.classList.remove("js-sticky");
                    body.classList.remove("js-sticky-body");
                } else if (st < lastScrollTop) {
                    header.classList.remove("fixed");
                    header.classList.add("js-sticky");
                    body.classList.add("js-sticky-body");
                }
                if (st == 0) {
                    body.classList.remove("js-sticky-body");
                    header.classList.remove("js-sticky");
                }

                lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
            },
            false
        );

        /* $(window).scroll(function () {
            if ($(window).scrollTop() > 50) {
                $(".o-header").addClass("js-sticky");
            }
            if ($(window).scrollTop() < 51) {
                $(".o-header").removeClass("js-sticky");
            }

            // if (window.innerWidth <= 767) {
            //   if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            //     $('.o-footer').addClass('js-page-end');
            //   }
            // }
        }); */

        /**
         *
         * Hamburger Menu
         *
         */

        $(".o-nav-icon").click(function (e) {
            $(this).toggleClass("js-open");
            $(".o-mobile-nav").toggleClass("js-open");
            $(".o-mobile-nav__container").toggleClass("js-open");
            $("body").toggleClass("js-lock");
        });

        /**
         *
         * Back to Top
         *
         */

        $(".o-footer__up").click(function () {
            $("html, body").animate(
                {
                    scrollTop: 0,
                },
                1200
            );
        });

        var forms = document.querySelectorAll(".o-call-form");
        $("[name='callPhone']").inputmask("(599) 999 99 99", {
            clearIncomplete: true,
        });
        $("[name='callFullName']").keypress(function (e) {
            e = e || window.event;
            var charCode = typeof e.which == "undefined" ? e.keyCode : e.which;
            var charStr = String.fromCharCode(charCode);
            if (/\d/.test(charStr)) {
                return false;
            }
        });
        if ($(".o-call-form").length > 0) {
            forms.forEach((form) => {
                var input = $(".js-int-phone");

                // $(input).each(function (index, element) {
                //     var iti = window.intlTelInput(element, {});

                //     var iti = window.intlTelInput(element, {
                //         formatOnDisplay: true,
                //         preferredCountries: ["tr"],
                //         utilsScript:
                //             "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.14/js/utils.js",
                //     });

                //     $(element).on("countrychange", function (event) {
                //         var selectedCountryData = iti.getSelectedCountryData();
                //         (newPlaceholder = intlTelInputUtils.getExampleNumber(
                //             selectedCountryData.iso2,
                //             true,
                //             intlTelInputUtils.numberFormat.INTERNATIONAL
                //         )),
                //             iti.setNumber("");
                //         mask = newPlaceholder.replace(/[1-9]/g, "0");
                //         $(this).mask(mask);
                //     });

                //     iti.promise.then(function () {
                //         $(element).trigger("countrychange");
                //     });
                // });

                $(form).validate({
                    rules: {
                        callFullName: "required",
                        callPhone: {
                            required: true,
                            phoneCustomRule: true,
                        },
                        callKvkk: "required",
                    },

                    errorPlacement: function (error, element) {
                        var placement = $(element).data("error");
                        if (placement) {
                            $(placement).append(error);
                        }
                    },

                    errorElement: "div",
                    errorClass: "form-error",
                });
            });
        }
        if ($("#contact").length > 0) {
            console.log($(this));
            $("#contact").validate({
                rules: {
                    callFullName: "required",
                    callPhone: {
                        required: true,
                        phoneCustomRule: true,
                    },
                    callKvkk: "required",
                },

                errorPlacement: function (error, element) {
                    var placement = $(element).data("error");
                    if (placement) {
                        $(placement).append(error);
                    }
                },

                errorElement: "div",
                errorClass: "form-error",
            });
        }

        var sliderForms = document.querySelectorAll(".custom-slider-form");
        $("[name='callPhoneSlider']").inputmask("(599) 999 99 99", {
            clearIncomplete: true,
        });
        $("[name='callFullNameSlider']").keypress(function (e) {
            e = e || window.event;
            var charCode = typeof e.which == "undefined" ? e.keyCode : e.which;
            var charStr = String.fromCharCode(charCode);
            if (/\d/.test(charStr)) {
                return false;
            }
        });
        if ($(".custom-slider-form").length > 0) {
            sliderForms.forEach((form) => {
                var input = $(".js-slider-phone");

                // $(input).each(function (index, element) {
                //     var iti = window.intlTelInput(element, {});

                //     var iti = window.intlTelInput(element, {
                //         formatOnDisplay: true,
                //         preferredCountries: ["tr"],
                //         utilsScript:
                //             "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.14/js/utils.js",
                //     });

                //     $(element).on("countrychange", function (event) {
                //         var selectedCountryData = iti.getSelectedCountryData();
                //         (newPlaceholder = intlTelInputUtils.getExampleNumber(
                //             selectedCountryData.iso2,
                //             true,
                //             intlTelInputUtils.numberFormat.INTERNATIONAL
                //         )),
                //             iti.setNumber("");
                //         mask = newPlaceholder.replace(/[1-9]/g, "0");
                //         $(this).mask(mask);
                //     });

                //     iti.promise.then(function () {
                //         $(element).trigger("countrychange");
                //     });
                // });

                $(form).validate({
                    rules: {
                        callFullNameSlider: "required",
                        callPhoneSlider: {
                            required: true,
                            phoneCustomRule: true,
                        },
                        callKvkkSlider: "required",
                    },

                    errorPlacement: function (error, element) {
                        var placement = $(element).data("error");
                        if (placement) {
                            $(placement).append(error);
                        }
                    },

                    errorElement: "div",
                    errorClass: "form-error",
                });
            });
        }
        /**
         *
         * Call Form Submit
         *
         */
        forms.forEach((form) => {
            $(form).submit(function (e) {
                e.preventDefault();
                var isvalidate = $(form).valid();
                if (isvalidate) {
                    var formdata = new FormData($(form)[0]);
                    formSubmitEvent(form);
                    $.ajax({
                        type: "POST",
                        url: $(form).attr("action"),
                        data: formdata,
                        processData: false,
                        contentType: false,
                        dataType: "JSON",
                        success: function (response) {
                            console.log(response);
                            if ($(form).find("button[type='submit']").data("formtype")) {
                                let data = $(form).find("button[type='submit']").data("formtype");
                                formSuccessEvent(data);
                            }
                            if (response == 1) {
                                $(form).find(".o-call-form__head").hide();
                                $(form).find(".o-call-form__content").hide();
                                $(form).find(".o-call-form__footer").hide();
                                $(form)
                                    .find(".o-call-form__message--success")
                                    .show();
                            } else if (response == 0) {
                                $(form).find(".o-call-form__head").hide();
                                $(form).find(".o-call-form__content").hide();
                                $(form).find(".o-call-form__footer").hide();
                                $(form)
                                    .find(".o-call-form__message--error")
                                    .show();
                                var pElement = $(
                                    ".o-call-form__message-content p"
                                ); // p etiketini seçme
                                pElement.html(
                                    "Formunuz gönderilemedi. Lütfen tekrar deneyin"
                                );
                            } else {
                                $(form).find(".o-call-form__head").hide();
                                $(form).find(".o-call-form__content").hide();
                                $(form).find(".o-call-form__footer").hide();
                                $(form)
                                    .find(".o-call-form__message--error")
                                    .show();
                                var pElement = $(
                                    ".o-call-form__message-content p"
                                ); // p etiketini seçme
                                pElement.html(
                                    "Aynı anda çok sayıda form göndermeyi denediniz.<br> Lütfen biraz bekleyiniz! Bize ulaşmak için 444 63 13’ü arayabilirsiniz."
                                );
                            }
                        },
                    });
                }
            });
        });

        $(
            ".o-call-form__message--success .c-button, .o-call-form__message--error .c-button "
        ).click(function () {
            location.reload();
        });

        var accordion = $(".c-accordion");

        if (accordion.length > 0) {
            var accordionItems = $(".c-accordion__item");

            accordionItems.find(".c-accordion__head").each(function () {
                $(this).on("click", function () {
                    if ($(this).parent().hasClass("js-active")) {
                        $(this).parent().removeClass("js-active");
                    } else {
                        $(accordionItems).removeClass("js-active");
                        $(this).parent().addClass("js-active");
                    }
                });
            });
        }

        /**
         *
         * Payment Plans
         *
         */

        // var FormatInput = wNumb({ decimals: 0, thousand: "" });
        // advancePayment.noUiSlider.on("update", function (values, handle) {
        //     $(advance).val(formatThis(values[0]));
        // });

        const advancePayment = $("#advancePayment");
        if (advancePayment.length) {
            const minValDiv = advancePayment.find(".min-val");
            const maxValDiv = advancePayment.find(".max-val");
            const minVal = Number(minValDiv.attr("data-min-value"));
            const maxVal = Number(maxValDiv.attr("data-max-value"));
            const startVal = (minVal + maxVal) / 2;

            const format = wNumb({
                decimals: 3,
                thousand: ".",
                suffix: " ₺",
            });

            minValDiv.text(format.to(minVal));
            maxValDiv.text(format.to(maxVal));

            noUiSlider.create(advancePayment[0], {
                start: startVal,
                connect: [true, false],
                tooltips: true,
                step: 5000,
                range: {
                    min: minVal,
                    max: maxVal,
                },
                format: format,
            });

            advancePayment[0].noUiSlider.on(
                "update",
                function (values, handle) {
                    $(advance).val(formatter(values[0]));
                }
            );
        }
        function formatter(data) {
            return data.replace(/(₺|\.)/g, "").replace(" ", "");
        }

        const finansman = $("#finansman-degeri");
        if (finansman.length) {
            const minValDiv = finansman.find(".min-val");
            const maxValDiv = finansman.find(".max-val");
            const minVal = Number(minValDiv.attr("data-min-value"));
            const maxVal = Number(maxValDiv.attr("data-max-value"));
            const startVal = (minVal + maxVal) / 2;

            const format = wNumb({
                decimals: 3,
                thousand: ".",
                suffix: " ₺",
            });

            minValDiv.text(format.to(minVal));
            maxValDiv.text(format.to(maxVal));

            noUiSlider.create(finansman[0], {
                start: startVal,
                connect: [true, false],
                tooltips: true,
                step: 5000,
                range: {
                    min: minVal,
                    max: maxVal,
                },
                format: format,
            });

            finansman[0].noUiSlider.on("update", function (values, handle) {
                console.log(values, handle);
                $(propertyValue).val(formatter(values[0]));
            });
        }

        const advancePayment2 = document.getElementById("advance-2");
        if (advancePayment2) {
            const minValDiv = advancePayment2.querySelector(".min-val");
            const maxValDiv = advancePayment2.querySelector(".max-val");
            const minVal = Number(minValDiv.dataset.minValue);
            const maxVal = Number(maxValDiv.dataset.maxValue);
            const startVal2 = (minVal + maxVal) / 2;

            const format2 = wNumb({
                decimals: 0,
            });

            minValDiv.textContent = minVal;
            maxValDiv.textContent = maxVal;

            noUiSlider.create(advancePayment2, {
                start: startVal2,
                connect: [true, false],
                tooltips: true,
                step: 5,
                range: {
                    min: minVal,
                    max: maxVal,
                },
                format: format2,
            });

            advancePayment2.noUiSlider.on("update", (values, handle) => {
                $(maturity).val(values[0]);
            });
        }

        //Custom Select
        if ($(".js-custom-select").length > 0) {
            $(".js-custom-select").select2({
                minimumResultsForSearch: -1,
            });
        }

        //Custom Dropdown
        $(".c-custom-dropdown__head").click(function (e) {
            $(".c-custom-dropdown").toggleClass("js-open");
            $(".c-custom-dropdown__icon").toggleClass("js-open");
            $(".c-custom-dropdown__list").toggleClass("js-open");
        });

        if ("#contact".length > 0) {
            $("#contact").validate({
                rules: {
                    contactFullName: "required",
                    contactPhone: "required",
                    contactEmail: "required",
                    contactKvkk: "required",
                },

                errorPlacement: function (error, element) {
                    var placement = $(element).data("error");
                    if (placement) {
                        $(placement).append(error);
                    }
                    //  else {
                    //     error.insertAfter(element);
                    // }
                },

                errorElement: "div",
                errorClass: "form-error",
            });
        }
        if ($("#map").length > 0) {
            function initMap() {
                map = new google.maps.Map(
                    document.getElementById("map"),
                    {
                        zoom: 14,
                        center: { lat: 41.070120354928285, lng: 29.016025327673272 },
                    }
                );
                setMarkers();
            }

            const branches = [
                ["Genel Müdürlük", 41.070120354928285, 29.016025327673272]
            ];

            function setMarkers() {
                const image = {
                    url: "/assets/images-mobile/icons/marker.svg",
                };

                for (let i = 0; i < branches.length; i++) {
                    const branch = branches[i];

                    new google.maps.Marker({
                        position: { lat: branch[1], lng: branch[2] },
                        map,
                        icon: image,
                        title: branch[0],
                        zIndex: branch[3],
                    });
                }
            }
            initMap();
        }

        $(".js-phone").mask("999 999 99 99");
        $("#callPhone").mask("999 999 99 99");
    } else {
        $("#device-error").addClass("js-show");
        $("header,main,footer,form").addClass("js-hide");
    }
    function formatNumber(num) {
        return num.toLocaleString("de-DE");
    }
    $("#calculatorPopupOpener").click(function () {
        let form = $("#paymentForm");
        var formDataArray = $(form).serializeArray();
        // console.log(formDataArray);

        calculateEvent(
            formDataArray[0].value,
            formDataArray[4].value,
            formDataArray[3].value
        );
        $.ajax({
            type: "GET",
            url: "https://www.fuzulev.com.tr/calculatePayment",
            data: formDataArray,
            success: function (response) {
                // console.log(response);
                response = JSON.parse(response);
                let pesinat = formatNumber(response.pesinat) + " TL";
                // let grupKisi =
                let ilkTaksit = response.ilkTaksit;
                let orgUcret =
                    formatNumber(response.OrganizasyonUcreti) + " TL";
                var formattedNumber = ilkTaksit.toLocaleString("tr-TR", {
                    style: "currency",
                    currency: "TRY",
                });
                var truncatedNumber = formattedNumber.split(",")[0];

                let totalMaaliyet =
                    formatNumber(response.ToplamMaliyet) + " TL";
                let kampanyaAdi = response.kampanyatipi;

                let iskontofee =
                    formatNumber(response.iskontoluOrganizasyonUcreti) + " TL";
                $("#advanceText").html(pesinat);
                $("#participantsText").html(
                    formatNumber(response.OrgTutari) + " TL"
                );
                $("#firstPayment").html(truncatedNumber + " TL");
                $("#organizationFee").html(orgUcret);
                $("#organizationFeeiskonto").html(iskontofee);
                $("#totalNumber").html(totalMaaliyet);
                $("#propertyDetailText").html(kampanyaAdi);
                Fancybox.show([{ src: "#calculatorPopup", type: "inline" }]);
            },
            error: function (xhr, status, error) {
                console.log(error);
            },
        });
    });
});
var mapLoad = false;
var mapSearch;
let searchMarkers = [];
var map;
$(document).ready(function () {
    $("#contact").submit(function (e) {
        e.preventDefault();
        let thisForm = $(this);
        var isvalidate = $("#contact").valid();
        if (isvalidate) {
            formSubmitEvent(document.querySelector("#contact"));
            var formdata = new FormData($("#contact")[0]);
            $.ajax({
                type: "POST",
                url: $(this).attr("action"),
                data: formdata,
                processData: false,
                contentType: false,
                dataType: "JSON",
                success: function (response) {
                    $(".c-contact-form, .c-box-list__head").hide();
                    formSuccessEvent("contact");
                    $(thisForm)
                        .closest(".c-box-list__item.c-box-list__item--half")
                        .find(".o-call-form__message--success")
                        .show();
                },
                error: function (err) {
                    console.log(err);
                    console.log(
                        $(thisForm)
                            .closest(".c-box-list__item.c-box-list__item--half")
                            .find(".o-call-form__message--error")
                            .show()
                    );
                    $(thisForm)
                        .closest(".c-box-list__item.c-box-list__item--half")
                        .find(".o-call-form__message--error")
                        .addClass("showThanks")
                        .show();
                },
            });
        }
    });
    $(document).on("input", "input[type='email']", function () {
        const regex = /[=!><{}[\]+^$*?\\|~`#%&:;="×÷√\/()'½£,]/g;
        let val = $(this).val();
        if (regex.test(val)) {
            $(this).val(val.replace(regex, ""));
        }
    });
    $(document).on("input", "input[name='callFullName']", function () {
        const regex = /[^A-Za-zğüşıöçĞÜŞİÖÇ\s]/g;
        let val = $(this).val();
        if (regex.test(val)) {
            $(this).val(val.replace(regex, ""));
        }
    });

    $(document).on("input", "input[name='callFullNameSlider']", function () {
        const regex = /[^A-Za-zğüşıöçĞÜŞİÖÇ\s]/g;
        let val = $(this).val();
        if (regex.test(val)) {
            $(this).val(val.replace(regex, ""));
        }
    });

    /* function initCounters() {
        function handleIntersection(entries) {
            entries.map((entry) => {
                if (entry.isIntersecting) {
                    document
                        .querySelectorAll(
                            ".animation-numbers:not(.visible) .count"
                        )
                        .forEach((counter) => {
                            animateValue(
                                counter,
                                parseFloat(counter.getAttribute("data-start")),
                                parseFloat(counter.getAttribute("data-value")),
                                700
                            );
                        });
                    entry.target.classList.add("visible");
                }
            });
        }
        const observer = new IntersectionObserver(handleIntersection);
        let component = document.querySelector(".animation-numbers");
        if (!component) return;

        observer.observe(component);

        function animateValue(obj, start, end, duration) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min(
                    (timestamp - startTimestamp) / duration,
                    1
                );
                if (end.toString().includes(".")) {
                    let endFixLength = end.toString().split(".")[1].length;
                    obj.innerHTML = parseFloat(
                        progress * (end - start) + start
                    ).toFixed(endFixLength);
                } else {
                    obj.innerHTML = Math.floor(
                        progress * (end - start) + start
                    );
                }

                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }
    }

    initCounters(); */

    const speed = 200;
    function initCounters() {
        function handleIntersection(entries) {
            entries.map((entry) => {
                if (entry.isIntersecting) {
                    document
                        .querySelectorAll(
                            ".animation-numbers:not(.visible) .count"
                        )
                        .forEach((counter) => {
                            const animate = () => {
                                const value =
                                    +counter.getAttribute("data-value");
                                const data = +counter.innerText
                                    .split(".")
                                    .join("");
                                const isSplit =
                                    counter.getAttribute("data-split");
                                const time = value / speed;

                                if (isSplit === "true") {
                                    console.log("value", value);
                                    if (data < value) {
                                        const newValue = data + time;

                                        const formattedValue =
                                            newValue.toLocaleString("en-US", {
                                                minimumFractionDigits: 0,
                                            });
                                        counter.innerText =
                                            formattedValue.replace(/,/g, ".");
                                        setTimeout(animate, 1);
                                    } else {
                                        counter.innerText = value
                                            .toLocaleString("en-US")
                                            .replace(/,/g, ".");
                                    }
                                } else {
                                    if (data < value) {
                                        counter.innerText = Math.ceil(
                                            data + time
                                        );
                                        setTimeout(animate, 1);
                                    } else {
                                        counter.innerText =
                                            value.toLocaleString();
                                    }
                                }
                            };

                            animate();
                        });
                    entry.target.classList.add("visible");
                }
            });
        }
        const observer = new IntersectionObserver(handleIntersection);
        let component = document.querySelector(".animation-numbers");
        if (!component) return;

        observer.observe(component);
    }

    initCounters();

    $("#konumButonu").click(function (e) {
        e.preventDefault();
        $(".loading").addClass("active");
        displayLocationInfo();
    });

    $(".o-section__redirect-box").click(function (e) {
        if($(this).attr("href") == "javascript:;"){
            e.preventDefault();
        }
    });

    $("#city").on("change", function () {
        $(".options").remove();
        $(".frkitm").remove();
        var token = $('.c-box-list--contact input[name="_token"]').val();
        $.ajax({
            url: "fetch-cities",
            type: "POST",
            data: { cities: $(this).val(), _token: token },
            success: function (sonuc) {
                var subeListesi = "";
                $.each(JSON.parse(sonuc), function (index, value) {
                    var row = "";
                    row +='<option value="' + value.id + '" class="options">' +value.title +"</option>";
                    $(row).insertAfter("#afterSelect");
                    subeListesi += setSubeHtml(value);
                });
                $('#subeListesi').html(subeListesi);
            },
        });
    });


    $("#year").on("change", function () {
        var token = $('.c-box-list--contact input[name="_token"]').val();
        $.ajax({
            url: "fetch-district",
            type: "POST",
            data: { city: $("#city").val(),district:$(this).val(), _token: token },
            success: function (sonuc) {
                var subeListesi = "";
                $.each(JSON.parse(sonuc), function (index, value) {
                    var frkid = $("#year").val();
                    $(`[data-frkid="${frkid}"]`).hide();
                    subeListesi += setSubeHtml(value);
                });
                $('#subeListesi').html(subeListesi);
            },
        });
    });

    $(document).on("click", ".frkcbttn", function () {
        var cor = $(this).data("cor");
        var long = $(this).data("long");
        var position = { lat: cor, lng: long };
        if(!mapLoad){
            mapLoad = true;
            $('#mapDetail').slideUp();
            $('#mapx').slideDown();
            mapSearch = new google.maps.Map(
                document.getElementById("mapx"), {zoom: 14, center: position}
            );
        }else{
            mapSearch.setCenter(new google.maps.LatLng(cor, long));
        }
        $('html, body').animate({scrollTop: $("#mapFrameBox").position().top - 120 }, 800, "swing");
        addMarker(position)
    });

    function setMapOnAll(mapSearch) {
        for (let i = 0; i < searchMarkers.length; i++) {
            searchMarkers[i].setMap(mapSearch);
        }
    }

    function deleteMarkers() {
        setMapOnAll(null)
        searchMarkers = [];
    }

    function addMarker(position) {
        const image = {url: "/assets/images-mobile/icons/marker.svg"};
        const marker = new google.maps.Marker({position, });
        new google.maps.Marker({
            position: position, map:mapSearch,
            icon: image
        });
        searchMarkers.push(marker);
    }

    //Mobile Map
});

function ScrollDown() {
    $("html, body").animate(
        {
            scrollTop:
                $(".seoTextContent").offset().top - $("header").height() - 60,
        },
        "fast"
    );
}

function setSubeHtml(value){
    var branch = `<div class="c-box-list__item frkitm mkbbm">
                                      <div class="c-box-list__head">
                                          <h4 class="c-box-list__title">${value.title} Şube</h4>
                                      </div>
                                      <div class="c-box-list__content">
                                          <div class="c-box-list__row"><p class="c-box-list__adress">${value.Adres}</p></div>
                                          <div class="c-box-list__row border-bottom">
                                              <span>
                                                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                      <g clip-path="url(#clip0_130_35486)">
                                                          <path d="M12.4531 3.125C13.5132 3.40951 14.4799 3.96785 15.256 4.74399C16.0321 5.52013 16.5905 6.48676 16.875 7.54687" stroke="#2FB7C4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                          <path d="M7.22656 9.75003C7.8697 11.0782 8.94366 12.1494 10.2734 12.7891C10.3715 12.8355 10.48 12.8556 10.5882 12.8474C10.6965 12.8392 10.8007 12.8029 10.8906 12.7422L12.8437 11.4375C12.93 11.379 13.0298 11.3433 13.1336 11.3337C13.2374 11.3242 13.342 11.3411 13.4375 11.3828L17.0938 12.9532C17.2187 13.0052 17.3231 13.0968 17.3909 13.214C17.4586 13.3311 17.486 13.4673 17.4688 13.6016C17.3529 14.5061 16.9114 15.3373 16.2269 15.9398C15.5424 16.5424 14.6619 16.8748 13.75 16.875C10.9321 16.875 8.22956 15.7556 6.23699 13.763C4.24442 11.7705 3.125 9.06795 3.125 6.25003C3.12521 5.33815 3.45767 4.45759 4.06018 3.77312C4.66269 3.08864 5.49395 2.64716 6.39844 2.53128C6.53269 2.51403 6.66888 2.5414 6.78605 2.60916C6.90322 2.67692 6.99487 2.78132 7.04687 2.90628L8.61719 6.57034C8.65802 6.66436 8.67511 6.76698 8.66693 6.86916C8.65876 6.97134 8.62558 7.06994 8.57031 7.15628L7.26562 9.14065C7.20754 9.2304 7.17345 9.33355 7.16661 9.44024C7.15977 9.54693 7.18041 9.65359 7.22656 9.75003V9.75003Z" stroke="#2FB7C4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                          <path d="M11.6562 6.09375C12.1845 6.2603 12.6649 6.55176 13.0566 6.94344C13.4482 7.33512 13.7397 7.81546 13.9063 8.34375" stroke="#2FB7C4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                      </g>
                                                      <defs>
                                                          <clipPath id="clip0_130_35486">
                                                              <rect width="20" height="20" fill="white" />
                                                          </clipPath>
                                                      </defs>
                                                  </svg>
                                                  </span>
                                              <label><a href="tel:${value.Tel}" onclick="phoneEventSube('footer',this)" data-text="${value.title} Şubesi">${value.Tel}</a></label>
                                          </div>
                                          <div class="c-box-list__row ">
                                              <span>
                                                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                      <g clip-path="url(#clip0_1261_45744)">
                                                          <path d="M19.25 4.8125L11 12.375L2.75 4.8125" stroke="#2FB7C4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                          <path d="M2.75 4.8125H19.25V16.5C19.25 16.6823 19.1776 16.8572 19.0486 16.9861C18.9197 17.1151 18.7448 17.1875 18.5625 17.1875H3.4375C3.25516 17.1875 3.0803 17.1151 2.95136 16.9861C2.82243 16.8572 2.75 16.6823 2.75 16.5V4.8125Z" stroke="#2FB7C4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                          <path d="M9.49609 11L2.96484 16.9898" stroke="#2FB7C4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                          <path d="M19.0352 16.9898L12.5039 11" stroke="#2FB7C4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                      </g>
                                                      <defs>
                                                          <clipPath id="clip0_1261_45744"><rect width="22" height="22" fill="white" /></clipPath>
                                                      </defs>
                                                  </svg>
                                              </span>
                                              <label>
                                                  <a href="mailto:${value.Mail}">${value.Mail}</a>
                                              </label>
                                          </div>
                                          <div class="c-box-list__row c-box-list__row--actions">
                                          <a data-cor="${value.coordinate}" data-long="${value.longitude}" id="showButton" class="c-button frkcbttn c-button--full c-button--ghost-transparent">Haritada Göster</a>
                                          </div>
                                      </div>
                                  </div>`;
    return branch;
}

function displayLocationInfo() {
    const d = new Date();
    let time = d.getTime();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var boy = position.coords.latitude;
            var en = position.coords.longitude;
            var token = $('.c-box-list--contact input[name="_token"]').val();
            $.ajax({
                url: "fetch-coordinate?v="+time,
                type: "POST",
                data: { cor: boy, long: en, _token: token },
                success: function (sonuc) {
                    $(".loading").removeClass("active");
                    var subeListesi = "";
                    $.each(JSON.parse(sonuc), function (index, value) {
                        subeListesi += setSubeHtml(value);
                    });
                    $('#subeListesi').html(subeListesi);
                },
            });
        });
    } else {
        alert("Tarayıcınız konum bilgisini desteklemiyor.");
        $(".loading").removeClass("active");
    }
}

$('.o-nav__item-phone').click(function(){

})