function openScholarModal2() {
    $(".popup-2").hide().fadeIn().css("display", "flex");
}
function closeScholarModal2() {
    $(".popup-2").fadeOut();
}
function formatNumber(num) {
    return num.toLocaleString("de-DE");
}
$(function () {
    const nextSection = () => {
        if (
            !$(".question-section.visible").next().hasClass("question-section")
        ) {
            // $(".calc-default")
            //     .css("visibility", "hidden")
            //     .addClass("mobile-safe");
            // $(".calc-modal").fadeIn();

            let form = $("#steps-wizard");
            let token = $("#steps-wizard").find("#tokenId").val();
            var formDataArray = $(form).serializeArray();
            // console.log(formDataArray);
            $.ajax({
                type: "GET",
                url: "https://www.fuzulev.com.tr/calculate",
                data: {
                    type: formDataArray[1].value,
                    first: formDataArray[2].value,
                    tax: formDataArray[4].value,
                    last: formDataArray[5].value,
                    price: formDataArray[3].value,
                    _token: token,
                },
                success: function (response) {
                    testEndEvent();
                    response = JSON.parse(response);
                    let pesinat = formatNumber(response.pesinat) + " TL";
                    let ilkTaksit = formatNumber(response.ilkTaksit);

                    var formattedNumber = ilkTaksit.toLocaleString("tr-TR", {
                        style: "currency",
                        currency: "TRY",
                    });
                    var truncatedNumber = formattedNumber.split(",")[0];

                    let orgUcret =
                        formatNumber(response.OrganizasyonUcreti) + " TL";
                    let totalMaaliyet =
                        formatNumber(response.ToplamMaliyet) + " TL";
                    let kampanyaAdi = response.kampanyatipi;
                    let iskontofee =
                        formatNumber(response.iskontoluOrganizasyonUcreti) +
                        " TL";
                    $("#advanceText").html(pesinat);
                    $("#participantsText").html(
                        formatNumber(response.OrgTutari) + " TL"
                    );
                    $("#firstPayment").html(truncatedNumber + " TL");
                    $("#organizationFee").html(orgUcret);
                    $("#organizationFeeiskonto").html(iskontofee);
                    $("#totalNumber").html(totalMaaliyet);
                    $("#propertyDetailText").html(kampanyaAdi);
                    Fancybox.show([
                        { src: "#calculatorPopup", type: "inline" },
                    ]);
                },
                error: function (xhr, status, error) {
                    console.log(error);
                },
            });
        } else {
            nextQuestionEvent($(".question-section.visible").data("index"));
            visibleQuestionSection.hide().removeClass("visible");
            visibleQuestionSection = visibleQuestionSection
                .next()
                .show()
                .addClass("visible");
            if (
                $(".section-container .question-section:last-of-type").hasClass(
                    "visible"
                )
            ) {
                $("a[href='#next']").text("Sonucu Gör");
            } else {
                $("a[href='#next']").text("Sonraki Soru");
            }
        }
        $(".question-section.visible .error-message").removeClass("show-error");
    };

    const previousSection = () => {
        $("a[href='#next']").text("Sonraki Soru");
        visibleQuestionSection.hide().removeClass("visible");
        visibleQuestionSection = visibleQuestionSection
            .prev()
            .show()
            .addClass("visible");
        $(".question-section.visible .error-message").removeClass("show-error");
        if ($(".first-question-section:visible").length) {
            previousButton.addClass("hidden-btn");
        }
    };

    //Radio boxes
    $(document).on("change", ".o-calculator__item input", function () {
        $(".o-calculator__item").removeClass("activeRadio");
        $(this).parent().addClass("activeRadio");
    });
    // Wizard
    let previousButton = $("#previous");
    let nextButton = $("#next");
    let finishButton = $("#finish");
    let visibleQuestionSection = $(document).find(".question-section.visible");

    nextButton.click(function (e) {
        e.preventDefault();
        let radios = $(document).find(
            ".question-section:visible [type='radio']:checked"
        );
        if (radios.length) {
            if ($(".first-question-section:visible").length) {
                $(".question-section:not(.first-question-section)").remove();
                testStartEvent();

                $.getJSON(
                    `https://www.fuzulev.com.tr/getexam/${radios.val()}`,
                    function (response, textStatus, jqXHR) {
                        let index = response.data.length + 2;
                        for (let i = 0; i < response.data.length; i++) {
                            index--;
                            let data = response.data[i];
                            let section = `
                        <section class="question-section" data-index="${(index =
                            index--)}">
                        <h4 class="o-calculator__steps-title">
                            ${data.question}
                        </h4>
                        <div class="o-calculator__questions">
                            ${(function appendRadios() {
                                let questionsArray = [];
                                for (let e = 0; e < data.answers.length; e++) {
                                    let question = `
                                    <div class="o-calculator__item">
                                    <input type="radio" name="answer[${
                                        data.id
                                    }]" id="q${
                                        data.id + e.toString()
                                    }" value="${
                                        data.answers[e].value
                                    }" required>
                                <label for="q${data.id + e.toString()}">${
                                        data.answers[e].answer
                                    }</label>
                                </div>`;
                                    questionsArray.push(question);
                                }
                                return questionsArray.join("");
                            })()}
                        </div>
                        <div class="error-message">Lütfen bir seçim yapınız.</div>
                    </section>
                        `;
                            $(visibleQuestionSection).after(section);
                        }
                        nextSection();
                        previousButton.removeClass("hidden-btn");
                    }
                );

                return;
            }
            nextSection();
        } else {
            $(".question-section.visible .error-message").addClass(
                "show-error"
            );
        }
    });

    previousButton.click(function (e) {
        e.preventDefault();
        previousSection();
    });
    function isEmptyOrSpaces(str) {
        return str === null || str.match(/^ *$/) !== null;
    }
    const searchInput = $("#js-desktop-search-input");
    $(searchInput).keyup(function (e) {
        let value = e.target.value;
        if (value === "") {
            $("#results .o-search-area__list-item").remove();
        } else {
            $.get(
                "https://www.fuzulev.com.tr/ara",
                { q: value?.toLocaleLowerCase() },
                function (data, textStatus, jqXHR, event) {
                    $("#results .o-search-area__list-item").remove();
                    if (textStatus == "success") {
                        for (let limit = 0; limit < data.length; limit++) {
                            $("#results").append(
                                `<a href="${data[limit].slug}" class="o-search-area__list-item"><b>${data[limit].name}</b></a>`
                            );
                        }
                    }
                }
            );
        }
    });

    $(".js-search-btn").click(function (e) {
        e.preventDefault();
        $("body").toggleClass("compensate-for-scrollbar");
        $(".search-modal").toggleClass("modal-active");
    });

    $(".overlay").click(function () {
        $("body").toggleClass("compensate-for-scrollbar");
        $(".search-modal").toggleClass("modal-active");
        searchInput.val("");
    });

    //Toggle text
    $(".js-toggle-text").click(function (e) {
        e.preventDefault();
        let pTag = $(this).prev("p");
        $(pTag).toggleClass("text-clap-3");
        var text = $(this).find("span").text();
        $(this)
            .find("span")
            .text(
                text == "Daha Fazla Göster"
                    ? "Daha Az Göster"
                    : "Daha Fazla Göster"
            );
    });

    $(".js-detail-btn").click(function (e) {
        e.preventDefault();
        let text = $(this).parent().find("textarea").text();
        if(!text){
            text = $(this).closest("div").find(".js-hide").text();
        }
        $("#text-area-content").text(text);
        openScholarModal2();
    });
    //Check checkboxes
    $('[name="callKvkk"], [name="contactKvkk"]').prop("checked", true);

    //Tabs
    if ($("[data-tab]").length) {
        if (document.location.hash) {
            if ($(window).width() < 992) {
                let hash = document.location.hash;
                let cleanHash = hash.substring(1);
                $(".c-tab__nav a").removeClass("js-open");
                $(".c-plans-list__item").hide();
                $(`[data-tab='${cleanHash}']`).addClass("js-open");
                $(".c-tab__content").addClass("js-open");
                $(`.c-plans-list__item.${cleanHash}`).css("display", "block");
            } else {
                let hash = document.location.hash;
                let cleanHash = hash.substring(1);
                $(".c-tab__item").removeClass("js-active");
                $(".c-plan-boxes__box").hide();
                $(`[data-tab='${cleanHash}']`).addClass("js-active");
                if (!$(".c-walkthrough-boxes").length) {
                    $(".c-tab__content").addClass("js-active");
                } else {
                    $(".c-tab__content").removeClass("js-active");
                }
                $("#" + cleanHash + ".c-tab__content").addClass("js-active");
                $(`.c-plan-boxes__box.${cleanHash}`).css("display", "flex");
            }
        }
    }
    if ($(window).width() < 992) {
        let tabItem = $(".c-tab__nav a");
        $(tabItem).click(function (e) {
            let showClass = $(this).data("tab");
            if(showClass){
                e.preventDefault();
                $(tabItem).removeClass("js-open");
                $(".c-plans-list__item").hide();
                $(this).addClass("js-open");
                $(".c-tab__content").addClass("js-open");
                $(`.c-plans-list__item.${showClass}`).show();
            }
        });
    } else {
        let tabItem = $(".c-tab__item");
        $(tabItem).click(function (e) {
            let showClass = $(this).data("tab");
            if(showClass){
                e.preventDefault();
                $(tabItem).removeClass("js-active");
                $(".c-tab__content").removeClass("js-active");
                $(".c-plan-boxes__box").hide();
                $(this).addClass("js-active");
                $("#" + showClass + ".c-tab__content").addClass("js-active");
                if (!$(".c-walkthrough-boxes").length) {
                    $(".c-tab__content").addClass("js-active");
                }
                $(`.c-plan-boxes__box.${showClass}`).css("display", "flex");
            }
        });
    }

    //Click to show more
    $(".js-more-1").click(function () {
        $(this)
            .parent()
            .find(".c-video-cards__card:visible:last")
            .nextAll()
            .slice(0, 6)
            .addClass("show");
        if (
            !$(this)
                .parent()
                .find(".c-video-cards__card:visible:last")
                .next()
                .is(".c-video-cards__card")
        ) {
            $(this).remove();
        }
    });

    //Copy IBAN
    $(".copy-iban").click(function (e) {
        e.preventDefault();
        let iban = $(this).data("iban");
        let span = $(this).find("span");
        let text = $(span).text();
        navigator.clipboard.writeText(iban);
        $(span).text("Kopyalandı");
        setTimeout(() => {
            $(span).text("IBAN Kopyala");
        }, 2000);
    });
    // $("[data-src^='#']").removeAttr("data-fancybox");
    // $(document).on("click", '[data-src^="#"]', function () {
    //     console.log("loaded");
    //     var href = $(this).data("src");
    // Fancybox.close();
    // Fancybox.show([{ src: href, type: "inline" }]);
    //  Fancybox.show({
    //      content: {
    //          src: href,
    //      },
    //      type: "inline",
    //      afterShow: function (instance, current) {
    //          $(".fancybox__content").on("click", "input", function (e) {
    //              e.stopPropagation();
    //          });
    //      },
    //      // Diğer yapılandırma seçeneklerini buraya ekleyebilirsiniz
    //  });
    // });
    $(document).on("click", '[data-src="#callForm"]', function (e) {
        e.preventDefault();
        var href = $(this).data("src");
        //Fancybox.show([{ src: href, type: "inline" }]);
    });
});


var data = [
    {
        "il": "ADANA",
        "plaka": 1,
        "ilceleri": {
            "0": "ADANA",
            "40": "ALADAĞ",
            "41": "CEYHAN",
            "42": "ÇUKUROVA",
            "43": "FEKE",
            "44": "İMAMOĞLU",
            "45": "KARAİSALI",
            "46": "KARATAŞ",
            "47": "KOZAN",
            "48": "POZANTI",
            "49": "SAİMBEYLİ",
            "50": "SARIÇAM",
            "51": "SEYHAN",
            "52": "TUFANBEYLİ",
            "53": "YUMURTALIK",
            "54": "YÜREĞİR"
        }
    },
    {
        "il": "ADIYAMAN",
        "plaka": 2,
        "ilceleri": {
            "0": "ADIYAMAN",
            "40": "BESNİ",
            "41": "ÇELİKHAN",
            "42": "GERGER",
            "43": "GÖLBAŞI",
            "44": "KAHTA",
            "45": "SAMSAT",
            "46": "SİNCİK",
            "47": "TUT"
        }
    },
    {
        "il": "AFYON",
        "plaka": 3,
        "ilceleri": {
            "0": "AFYON",
            "40": "BAŞMAKÇI",
            "41": "BAYAT",
            "42": "BOLVADİN",
            "43": "ÇAY",
            "44": "ÇOBANLAR",
            "45": "DAZKIRI",
            "46": "DİNAR",
            "47": "EMİRDAĞ",
            "48": "EVCİLER",
            "49": "HOCALAR",
            "50": "İHSANİYE",
            "51": "İSCEHİSAR",
            "52": "KIZILÖREN",
            "53": "SANDIKLI",
            "54": "SİNCANLI",
            "55": "SULTANDAĞI",
            "56": "ŞUHUT",
            "57": "SİNANPAŞA"
        }
    },
    {
        "il": "AĞRI",
        "plaka": 4,
        "ilceleri": {
            "0": "AĞRI",
            "40": "DİYADİN",
            "41": "DOĞUBEYAZIT",
            "42": "ELEŞKİRT",
            "43": "HAMUR",
            "44": "PATNOS",
            "45": "TAŞLIÇAY",
            "46": "TUTAK"
        }
    },
    {
        "il": "AMASYA",
        "plaka": 5,
        "ilceleri": {
            "0": "AMASYA",
            "40": "GÖYNÜCEK",
            "41": "GÜMÜŞHACIKÖY",
            "42": "HAMAMÖZÜ",
            "43": "MERZİFON",
            "44": "SULUOVA",
            "45": "TAŞOVA"
        }
    },
    {
        "il": "ANKARA",
        "plaka": 6,
        "ilceleri": {
            "0": "ANKARA",
            "40": "AKYURT",
            "41": "ALTINDAĞ",
            "42": "AYAŞ",
            "43": "BALA",
            "44": "BEYPAZARI",
            "45": "ÇAMLIDERE",
            "46": "ÇANKAYA",
            "47": "ÇUBUK",
            "48": "ELMADAĞ",
            "49": "ETİMESGUT",
            "50": "EVREN",
            "51": "GÖLBAŞI",
            "52": "GÜDÜL",
            "53": "HAYMANA",
            "54": "KALECİK",
            "55": "KAHRAMANKAZAN",
            "56": "KEÇİÖREN",
            "57": "KIZILCAHAMAM",
            "58": "MAMAK",
            "59": "NALLIHAN",
            "60": "POLATLI",
            "61": "PURSAKLAR",
            "62": "SİNCAN",
            "63": "ŞEREFLİKOÇHİSAR",
            "64": "YENİMAHALLE"
        }
    },
    {
        "il": "ANTALYA",
        "plaka": 7,
        "ilceleri": {
            "0": "ANTALYA",
            "40": "AKSEKİ",
            "41": "AKSU",
            "42": "ALANYA",
            "43": "DEMRE",
            "44": "DÖŞEMEALTI",
            "45": "ELMALI",
            "46": "FİNİKE",
            "47": "GAZİPAŞA",
            "48": "GÜNDOĞMUŞ",
            "49": "İBRADI",
            "50": "KAŞ",
            "51": "KEMER",
            "52": "KEPEZ",
            "53": "KONYAALTI",
            "54": "KORKUTELİ",
            "55": "KUMLUCA",
            "56": "MANAVGAT",
            "57": "MURATPAŞA",
            "58": "SERİK",
            "59": "KALKAN"
        }
    },
    {
        "il": "ARTVİN",
        "plaka": 8,
        "ilceleri": {
            "0": "ARTVİN",
            "40": "ARDANUÇ",
            "41": "ARHAVİ",
            "42": "BORÇKA",
            "43": "HOPA",
            "44": "MURGUL",
            "45": "ŞAVŞAT",
            "46": "YUSUFELİ",
            "47": "KEMALPAŞA"
        }
    },
    {
        "il": "AYDIN",
        "plaka": 9,
        "ilceleri": {
            "0": "AYDIN",
            "40": "BOZDOĞAN",
            "41": "BUHARKENT",
            "42": "ÇİNE",
            "43": "DİDİM",
            "44": "GERMENCİK",
            "45": "İNCİRLİOVA",
            "46": "KARACASU",
            "47": "KARPUZLU",
            "48": "KOÇARLI",
            "49": "KÖŞK",
            "50": "KUŞADASI",
            "51": "KUYUCAK",
            "52": "NAZİLLİ",
            "53": "SÖKE",
            "54": "SULTANHİSAR",
            "55": "YENİPAZAR",
            "56": "EFELER"
        }
    },
    {
        "il": "BALIKESİR",
        "plaka": 10,
        "ilceleri": {
            "0": "BALIKESİR",
            "40": "AYVALIK",
            "41": "BALYA",
            "42": "BANDIRMA",
            "43": "BİGADİÇ",
            "44": "BURHANİYE",
            "45": "DURSUNBEY",
            "46": "EDREMİT",
            "47": "ERDEK",
            "48": "GÖMEÇ",
            "49": "GÖNEN",
            "50": "HAVRAN",
            "51": "İVRİNDİ",
            "52": "KEPSUT",
            "53": "MANYAS",
            "54": "MARMARA",
            "55": "SAVAŞTEPE",
            "56": "SINDIRGI",
            "57": "SUSURLUK",
            "58": "KARESİ"
        }
    },
    {
        "il": "BİLECİK",
        "plaka": 11,
        "ilceleri": {
            "0": "BİLECİK",
            "40": "BOZÜYÜK",
            "41": "GÖLPAZARI",
            "42": "İNHİSAR",
            "43": "OSMANELİ",
            "44": "PAZARYERİ",
            "45": "SÖĞÜT",
            "46": "YENİPAZAR"
        }
    },
    {
        "il": "BİNGÖL",
        "plaka": 12,
        "ilceleri": {
            "0": "BİNGÖL",
            "40": "ADAKLI",
            "41": "GENÇ",
            "42": "KARLIOVA",
            "43": "KIĞI",
            "44": "SOLHAN",
            "45": "YAYLADERE",
            "46": "YEDİSU"
        }
    },
    {
        "il": "BİTLİS",
        "plaka": 13,
        "ilceleri": {
            "0": "BİTLİS",
            "40": "ADİLCEVAZ",
            "41": "AHLAT",
            "42": "GÜROYMAK",
            "43": "HİZAN",
            "44": "MUTKİ",
            "45": "TATVAN"
        }
    },
    {
        "il": "BOLU",
        "plaka": 14,
        "ilceleri": {
            "0": "BOLU",
            "40": "DÖRTDİVAN",
            "41": "GEREDE",
            "42": "GÖYNÜK",
            "43": "KIBRISCIK",
            "44": "MENGEN",
            "45": "MUDURNU",
            "46": "SEBEN",
            "47": "YENİÇAĞA"
        }
    },
    {
        "il": "BURDUR",
        "plaka": 15,
        "ilceleri": {
            "0": "BURDUR",
            "40": "AĞLASUN",
            "41": "ALTINYAYLA",
            "42": "BUCAK",
            "43": "ÇAVDIR",
            "44": "ÇELTİKÇİ",
            "45": "GÖLHİSAR",
            "46": "KARAMANLI",
            "47": "KEMER",
            "48": "TEFENNİ",
            "49": "YEŞİLOVA"
        }
    },
    {
        "il": "BURSA",
        "plaka": 16,
        "ilceleri": {
            "0": "BURSA",
            "40": "BÜYÜKORHAN",
            "41": "GEMLİK",
            "42": "GÜRSU",
            "43": "HARMANCIK",
            "44": "İNEGÖL",
            "45": "İZNİK",
            "46": "KARACABEY",
            "47": "KELES",
            "48": "KESTEL",
            "49": "MUDANYA",
            "50": "MUSTAFAKEMALPAŞA",
            "51": "NİLÜFER",
            "52": "ORHANELİ",
            "53": "ORHANGAZİ",
            "54": "OSMANGAZİ",
            "55": "YENİŞEHİR",
            "56": "YILDIRIM"
        }
    },
    {
        "il": "ÇANAKKALE",
        "plaka": 17,
        "ilceleri": {
            "0": "ÇANAKKALE",
            "40": "AYVACIK",
            "41": "BAYRAMİÇ",
            "42": "BİGA",
            "43": "BOZCAADA",
            "44": "ÇAN",
            "45": "ECEABAT",
            "46": "EZİNE",
            "47": "GELİBOLU",
            "48": "GÖKÇEADA",
            "49": "LAPSEKİ",
            "50": "YENİCE"
        }
    },
    {
        "il": "ÇANKIRI",
        "plaka": 18,
        "ilceleri": {
            "0": "ÇANKIRI",
            "40": "ATKARACALAR",
            "41": "BAYRAMÖREN",
            "42": "ÇERKEŞ",
            "43": "ELDİVAN",
            "44": "ILGAZ",
            "45": "KIZILIRMAK",
            "46": "KORGUN",
            "47": "KURŞUNLU",
            "48": "ORTA",
            "49": "ŞABANÖZÜ",
            "50": "YAPRAKLI"
        }
    },
    {
        "il": "ÇORUM",
        "plaka": 19,
        "ilceleri": {
            "0": "ÇORUM",
            "40": "ALACA",
            "41": "BAYAT",
            "42": "BOĞAZKALE",
            "43": "DODURGA",
            "44": "İSKİLİP",
            "45": "KARGI",
            "46": "LAÇİN",
            "47": "MECİTÖZÜ",
            "48": "OĞUZLAR",
            "49": "ORTAKÖY",
            "50": "OSMANCIK",
            "51": "SUNGURLU",
            "52": "UĞURLUDAĞ"
        }
    },
    {
        "il": "DENİZLİ",
        "plaka": 20,
        "ilceleri": {
            "0": "DENİZLİ",
            "40": "ACIPAYAM",
            "41": "AKKÖY",
            "42": "BABADAĞ",
            "43": "BAKLAN",
            "44": "BEKİLLİ",
            "45": "BEYAĞAÇ",
            "46": "BOZKURT",
            "47": "BULDAN",
            "48": "ÇAL",
            "49": "ÇAMELİ",
            "50": "ÇARDAK",
            "51": "ÇİVRİL",
            "52": "GÜNEY",
            "53": "HONAZ",
            "54": "KALE",
            "55": "SARAYKÖY",
            "56": "SERİNHİSAR",
            "57": "TAVAS",
            "58": "MERKEZEFENDİ",
            "158": "PAMUKKALE"
        }
    },
    {
        "il": "DİYARBAKIR",
        "plaka": 21,
        "ilceleri": {
            "0": "DİYARBAKIR",
            "40": "BAĞLAR",
            "41": "BİSMİL",
            "42": "ÇERMİK",
            "43": "ÇINAR",
            "44": "ÇÜNGÜŞ",
            "45": "DİCLE",
            "46": "EĞİL",
            "47": "ERGANİ",
            "48": "HANİ",
            "49": "HAZRO",
            "50": "KAYAPINAR",
            "51": "KOCAKÖY",
            "52": "KULP",
            "53": "LİCE",
            "54": "SİLVAN",
            "55": "SUR",
            "56": "YENİŞEHİR"
        }
    },
    {
        "il": "EDİRNE",
        "plaka": 22,
        "ilceleri": {
            "0": "EDİRNE",
            "40": "ENEZ",
            "41": "HAVSA",
            "42": "İPSALA",
            "43": "KEŞAN",
            "44": "LALAPAŞA",
            "45": "MERİÇ",
            "46": "SÜLOĞLU",
            "47": "UZUNKÖPRÜ"
        }
    },
    {
        "il": "ELAZIĞ",
        "plaka": 23,
        "ilceleri": {
            "0": "ELAZIĞ",
            "40": "AĞIN",
            "41": "ALACAKAYA",
            "42": "ARICAK",
            "43": "BASKİL",
            "44": "KARAKOÇAN",
            "45": "KEBAN",
            "46": "KOVANCILAR",
            "47": "MADEN",
            "48": "PALU",
            "49": "SİVRİCE"
        }
    },
    {
        "il": "ERZİNCAN",
        "plaka": 24,
        "ilceleri": {
            "0": "ERZİNCAN",
            "40": "ÇAYIRLI",
            "41": "ILIÇ",
            "42": "KEMAH",
            "43": "KEMALİYE",
            "44": "OTLUKBELİ",
            "45": "REFAHİYE",
            "46": "TERCAN",
            "47": "ÜZÜMLÜ"
        }
    },
    {
        "il": "ERZURUM",
        "plaka": 25,
        "ilceleri": {
            "0": "ERZURUM",
            "40": "AŞKALE",
            "41": "AZİZİYE",
            "42": "ÇAT",
            "43": "HINIS",
            "44": "HORASAN",
            "45": "İSPİR",
            "46": "KARAÇOBAN",
            "47": "KARAYAZI",
            "48": "KÖPRÜKÖY",
            "49": "NARMAN",
            "50": "OLTU",
            "51": "OLUR",
            "52": "PALANDÖKEN",
            "53": "PASİNLER",
            "54": "PAZARYOLU",
            "55": "ŞENKAYA",
            "56": "TEKMAN",
            "57": "TORTUM",
            "58": "UZUNDERE",
            "59": "YAKUTİYE"
        }
    },
    {
        "il": "ESKİŞEHİR",
        "plaka": 26,
        "ilceleri": {
            "0": "ESKİŞEHİR",
            "40": "ALPU",
            "41": "BEYLİKOVA",
            "42": "ÇİFTELER",
            "43": "GÜNYÜZÜ",
            "44": "HAN",
            "45": "İNÖNÜ",
            "46": "MAHMUDİYE",
            "47": "MİHALGAZİ",
            "48": "MİHALIÇÇIK",
            "49": "ODUNPAZARI",
            "50": "SARICAKAYA",
            "51": "SEYİTGAZİ",
            "52": "SİVRİHİSAR",
            "53": "TEPEBAŞI"
        }
    },
    {
        "il": "GAZİANTEP",
        "plaka": 27,
        "ilceleri": {
            "0": "GAZİANTEP",
            "40": "ARABAN",
            "41": "İSLAHİYE",
            "42": "KARKAMIŞ",
            "43": "NİZİP",
            "44": "NURDAĞI",
            "45": "OĞUZELİ",
            "46": "ŞAHİNBEY",
            "47": "ŞEHİTKAMİL",
            "48": "YAVUZELİ"
        }
    },
    {
        "il": "GİRESUN",
        "plaka": 28,
        "ilceleri": {
            "0": "GİRESUN",
            "40": "ALUCRA",
            "41": "BULANCAK",
            "42": "ÇAMOLUK",
            "43": "ÇANAKÇI",
            "44": "DERELİ",
            "45": "DOĞANKENT",
            "46": "ESPİYE",
            "47": "EYNESİL",
            "48": "GÖRELE",
            "49": "GÜCE",
            "50": "KEŞAP",
            "51": "PİRAZİZ",
            "52": "ŞEBİNKARAHİSAR",
            "53": "TİREBOLU",
            "54": "YAĞLIDERE"
        }
    },
    {
        "il": "GÜMÜŞHANE",
        "plaka": 29,
        "ilceleri": {
            "0": "GÜMÜŞHANE",
            "40": "KELKİT",
            "41": "KÖSE",
            "42": "KÜRTÜN",
            "43": "ŞİRAN",
            "44": "TORUL"
        }
    },
    {
        "il": "HAKKARİ",
        "plaka": 30,
        "ilceleri": {
            "0": "HAKKARİ",
            "40": "ÇUKURCA",
            "41": "ŞEMDİNLİ",
            "42": "YÜKSEKOVA",
            "159": "DERECİK"
        }
    },
    {
        "il": "HATAY",
        "plaka": 31,
        "ilceleri": {
            "0": "HATAY",
            "40": "ALTINÖZÜ",
            "41": "BELEN",
            "42": "DÖRTYOL",
            "43": "ERZİN",
            "44": "HASSA",
            "45": "İSKENDERUN",
            "46": "KIRIKHAN",
            "47": "KUMLU",
            "48": "REYHANLI",
            "49": "SAMANDAĞ",
            "50": "YAYLADAĞI",
            "51": "DEFNE",
            "52": "ARSUZ",
            "53": "PAYAS",
            "54": "ANTAKYA"
        }
    },
    {
        "il": "ISPARTA",
        "plaka": 32,
        "ilceleri": {
            "0": "ISPARTA",
            "40": "AKSU",
            "41": "ATABEY",
            "42": "EĞİRDİR",
            "43": "GELENDOST",
            "44": "GÖNEN",
            "45": "KEÇİBORLU",
            "46": "SENİRKENT",
            "47": "SÜTÇÜLER",
            "48": "ŞARKİKARAAĞAÇ",
            "49": "ULUBORLU",
            "50": "YALVAÇ",
            "51": "YENİŞARBADE"
        }
    },
    {
        "il": "MERSİN",
        "plaka": 33,
        "ilceleri": {
            "0": "MERSİN",
            "40": "AKDENİZ",
            "41": "ANAMUR",
            "42": "AYDINCIK",
            "43": "BOZYAZI",
            "44": "ÇAMLIYAYLA",
            "45": "ERDEMLİ",
            "46": "GÜLNAR",
            "47": "MEZİTLİ",
            "48": "MUT",
            "49": "SİLİFKE",
            "50": "TARSUS",
            "51": "TOROSLAR",
            "52": "YENİŞEHİR"
        }
    },
    {
        "il": "İSTANBUL",
        "plaka": 34,
        "ilceleri": {
            "0": "İSTANBUL",
            "40": "ADALAR",
            "41": "ARNAVUTKÖY",
            "42": "ATAŞEHİR",
            "43": "AVCILAR",
            "44": "BAĞCILAR",
            "45": "BAHÇELİEVLER",
            "46": "BAKIRKÖY",
            "47": "BAŞAKŞEHİR",
            "48": "BAYRAMPAŞA",
            "49": "BEŞİKTAŞ",
            "50": "BEYKOZ",
            "51": "BEYLİKDÜZÜ",
            "52": "BEYOĞLU",
            "53": "BÜYÜKÇEKMECE",
            "54": "ÇATALCA",
            "55": "ÇEKMEKÖY",
            "56": "ESENLER",
            "57": "ESENYURT",
            "58": "EYÜP",
            "59": "FATİH",
            "60": "GAZİOSMANPAŞA",
            "61": "GÜNGÖREN",
            "62": "KADIKÖY",
            "63": "KAĞITHANE",
            "64": "KARTAL",
            "65": "KÜÇÜKÇEKMECE",
            "66": "MALTEPE",
            "67": "PENDİK",
            "68": "SANCAKTEPE",
            "69": "SARIYER",
            "70": "SİLİVRİ",
            "71": "SULTANBEYLİ",
            "72": "SULTANGAZİ",
            "73": "ŞİLE",
            "74": "ŞİŞLİ",
            "75": "TUZLA",
            "76": "ÜMRANİYE",
            "77": "ÜSKÜDAR",
            "78": "ZEYTİNBURNU",
            "79": "YURTDIŞI",
            "80": "HARAMİDERE"
        }
    },
    {
        "il": "İZMİR",
        "plaka": 35,
        "ilceleri": {
            "0": "İZMİR",
            "40": "ALİAĞA",
            "41": "BALÇOVA",
            "42": "BAYINDIR",
            "43": "BAYRAKLI",
            "44": "BERGAMA",
            "45": "BEYDAĞ",
            "46": "BORNOVA",
            "47": "BUCA",
            "48": "ÇEŞME",
            "49": "ÇİĞLİ",
            "50": "DİKİLİ",
            "51": "FOÇA",
            "52": "GAZİEMİR",
            "53": "GÜZELBAHÇE",
            "54": "KARABAĞLAR",
            "55": "KARABURUN",
            "56": "KARŞIYAKA",
            "57": "KEMALPAŞA",
            "58": "KINIK",
            "59": "KİRAZ",
            "60": "KONAK",
            "61": "MENDERES",
            "62": "MENEMEN",
            "63": "NARLIDERE",
            "64": "ÖDEMİŞ",
            "65": "SEFERİHİSAR",
            "66": "SELÇUK",
            "67": "TİRE",
            "68": "TORBALI",
            "69": "URLA"
        }
    },
    {
        "il": "KARS",
        "plaka": 36,
        "ilceleri": {
            "0": "KARS",
            "40": "AKYAKA",
            "41": "ARPAÇAY",
            "42": "DİGOR",
            "43": "KAĞIZMAN",
            "44": "SARIKAMIŞ",
            "45": "SELİM",
            "46": "SUSUZ"
        }
    },
    {
        "il": "KASTAMONU",
        "plaka": 37,
        "ilceleri": {
            "0": "KASTAMONU",
            "40": "ABANA",
            "41": "AĞLI",
            "42": "ARAÇ",
            "43": "AZDAVAY",
            "44": "BOZKURT",
            "45": "CİDE",
            "46": "ÇATALZEYTİN",
            "47": "DADAY",
            "48": "DEVREKANİ",
            "49": "DOĞANYURT",
            "50": "HANÖNÜ",
            "51": "İHSANGAZİ",
            "52": "İNEBOLU",
            "53": "KÜRE",
            "54": "PINARBAŞI",
            "55": "SEYDİLER",
            "56": "ŞENPAZAR",
            "57": "TAŞKÖPRÜ",
            "58": "TOSYA"
        }
    },
    {
        "il": "KAYSERİ",
        "plaka": 38,
        "ilceleri": {
            "0": "KAYSERİ",
            "40": "AKKIŞLA",
            "41": "BÜNYAN",
            "42": "DEVELİ",
            "43": "FELAHİYE",
            "44": "HACILAR",
            "45": "İNCESU",
            "46": "KOCASİNAN",
            "47": "MELİKGAZİ",
            "48": "ÖZVATAN",
            "49": "PINARBAŞI",
            "50": "SARIOĞLAN",
            "51": "SARIZ",
            "52": "TALAS",
            "53": "TOMARZA",
            "54": "YAHYALI",
            "55": "YEŞİLHİSAR"
        }
    },
    {
        "il": "KIRKLARELİ",
        "plaka": 39,
        "ilceleri": {
            "0": "KIRKLARELİ",
            "40": "BABAESKİ",
            "41": "DEMİRKÖY",
            "42": "KOFÇAZ",
            "43": "LÜLEBURGAZ",
            "44": "PEHLİVANKÖY",
            "45": "PINARHİSAR",
            "46": "VİZE"
        }
    },
    {
        "il": "KIRŞEHİR",
        "plaka": 40,
        "ilceleri": {
            "0": "KIRŞEHİR",
            "40": "AKÇAKENT",
            "41": "AKPINAR",
            "42": "BOZTEPE",
            "43": "ÇİÇEKDAĞI",
            "44": "KAMAN",
            "45": "MUCUR"
        }
    },
    {
        "il": "KOCAELİ",
        "plaka": 41,
        "ilceleri": {
            "0": "KOCAELİ",
            "40": "BAŞİSKELE",
            "41": "ÇAYIROVA",
            "42": "DARICA",
            "43": "DERİNCE",
            "44": "DİLOVASI",
            "45": "GEBZE",
            "46": "GÖLCÜK",
            "47": "İZMİT",
            "48": "KANDIRA",
            "49": "KARAMÜRSEL",
            "50": "KARTEPE",
            "51": "KÖRFEZ"
        }
    },
    {
        "il": "KONYA",
        "plaka": 42,
        "ilceleri": {
            "0": "KONYA",
            "40": "AHIRLI",
            "41": "AKÖREN",
            "42": "AKŞEHİR",
            "43": "ALTINEKİN",
            "44": "BEYŞEHİR",
            "45": "BOZKIR",
            "46": "CİHANBEYLİ",
            "47": "ÇELTİK",
            "48": "ÇUMRA",
            "49": "DERBENT",
            "50": "DEREBUCAK",
            "51": "DOĞANHİSAR",
            "52": "EMİRGAZİ",
            "53": "EREĞLİ",
            "54": "GÜNEYSINIR",
            "55": "HADİM",
            "56": "HALKAPINAR",
            "57": "HÜYÜK",
            "58": "ILGIN",
            "59": "KADINHANI",
            "60": "KARAPINAR",
            "61": "KARATAY",
            "62": "KULU",
            "63": "MERAM",
            "64": "SARAYÖNÜ",
            "65": "SELÇUKLU",
            "66": "SEYDİŞEHİR",
            "67": "TAŞKENT",
            "68": "TUZLUKÇU",
            "69": "YALIHÜYÜK",
            "70": "YUNAK"
        }
    },
    {
        "il": "KÜTAHYA",
        "plaka": 43,
        "ilceleri": {
            "0": "KÜTAHYA",
            "40": "ALTINTAŞ",
            "41": "ASLANAPA",
            "42": "ÇAVDARHİSAR",
            "43": "DOMANİÇ",
            "44": "DUMLUPINAR",
            "45": "EMET",
            "46": "GEDİZ",
            "47": "HİSARCIK",
            "48": "PAZARLAR",
            "49": "SİMAV",
            "50": "ŞAPHANE",
            "51": "TAVŞANLI"
        }
    },
    {
        "il": "MALATYA",
        "plaka": 44,
        "ilceleri": {
            "0": "MALATYA",
            "40": "AKÇADAĞ",
            "41": "ARAPGİR",
            "42": "ARGUVAN",
            "43": "BATTALGAZİ",
            "44": "DARENDE",
            "45": "DOĞANŞEHİR",
            "46": "DOĞANYOL",
            "47": "HEKİMHAN",
            "48": "KALE",
            "49": "KULUNCAK",
            "50": "PÜTÜRGE",
            "51": "YAZIHAN",
            "52": "YEŞİLYURT"
        }
    },
    {
        "il": "MANİSA",
        "plaka": 45,
        "ilceleri": {
            "0": "MANİSA",
            "40": "AHMETLİ",
            "41": "AKHİSAR",
            "42": "ALAŞEHİR",
            "43": "DEMİRCİ",
            "44": "GÖLMARMARA",
            "45": "GÖRDES",
            "46": "KIRKAĞAÇ",
            "47": "KÖPRÜBAŞI",
            "48": "KULA",
            "49": "SALİHLİ",
            "50": "SARIGÖL",
            "51": "SARUHANLI",
            "52": "SELENDİ",
            "53": "SOMA",
            "54": "TURGUTLU",
            "55": "YUNUSEMRE"
        }
    },
    {
        "il": "KAHRAMANMARAŞ",
        "plaka": 46,
        "ilceleri": {
            "0": "KAHRAMANMARAŞ",
            "40": "AFŞİN",
            "41": "ANDIRIN",
            "42": "ÇAĞLAYANCERİT",
            "43": "EKİNÖZÜ",
            "44": "ELBİSTAN",
            "45": "GÖKSUN",
            "46": "NURHAK",
            "47": "PAZARCIK",
            "48": "TÜRKOĞLU",
            "149": "DULKADİROĞLU",
            "150": "ONİKİŞUBAT"
        }
    },
    {
        "il": "MARDİN",
        "plaka": 47,
        "ilceleri": {
            "0": "MARDİN",
            "40": "DARGEÇİT",
            "41": "DERİK",
            "42": "KIZILTEPE",
            "43": "MAZIDAĞI",
            "44": "MİDYAT",
            "45": "NUSAYBİN",
            "46": "ÖMERLİ",
            "47": "SAVUR",
            "48": "YEŞİLLİ",
            "149": "ARTUKLU"
        }
    },
    {
        "il": "MUĞLA",
        "plaka": 48,
        "ilceleri": {
            "0": "MUĞLA",
            "40": "BODRUM",
            "41": "DALAMAN",
            "42": "DATÇA",
            "43": "FETHİYE",
            "44": "KAVAKLIDERE",
            "45": "KÖYCEĞİZ",
            "46": "MARMARİS",
            "47": "MİLAS",
            "48": "ORTACA",
            "49": "ULA",
            "50": "YATAĞAN",
            "51": "SEYDİKEMER"
        }
    },
    {
        "il": "MUŞ",
        "plaka": 49,
        "ilceleri": {
            "0": "MUŞ",
            "40": "BULANIK",
            "41": "HASKÖY",
            "42": "KORKUT",
            "43": "MALAZGİRT",
            "44": "VARTO"
        }
    },
    {
        "il": "NEVŞEHİR",
        "plaka": 50,
        "ilceleri": {
            "0": "NEVŞEHİR",
            "40": "ACIGÖL",
            "41": "AVANOS",
            "42": "DERİNKUYU",
            "43": "GÜLŞEHİR",
            "44": "HACIBEKTAŞ",
            "45": "KOZAKLI",
            "46": "ÜRGÜP"
        }
    },
    {
        "il": "NİĞDE ",
        "plaka": 51,
        "ilceleri": {
            "0": "NİĞDE ",
            "40": "ALTUNHİSAR",
            "41": "BOR",
            "42": "ÇAMARDI",
            "43": "ÇİFTLİK",
            "44": "ULUKIŞLA"
        }
    },
    {
        "il": "ORDU",
        "plaka": 52,
        "ilceleri": {
            "0": "ORDU",
            "40": "AKKUŞ",
            "41": "AYBASTI",
            "42": "ÇAMAŞ",
            "43": "ÇATALPINAR",
            "44": "ÇAYBAŞI",
            "45": "FATSA",
            "46": "GÖLKÖY",
            "47": "GÜLYALI",
            "48": "GÜRGENTEPE",
            "49": "İKİZCE",
            "50": "KABADÜZ",
            "51": "KABATAŞ",
            "52": "KORGAN",
            "53": "KUMRU",
            "54": "MESUDİYE",
            "55": "PERŞEMBE",
            "56": "ULUBEY",
            "57": "ÜNYE",
            "58": "ALTINORDU"
        }
    },
    {
        "il": "RİZE",
        "plaka": 53,
        "ilceleri": {
            "0": "RİZE",
            "40": "ARDEŞEN",
            "41": "ÇAMLIHEMŞİN",
            "42": "ÇAYELİ",
            "43": "DEREPAZARI",
            "44": "FINDIKLI",
            "45": "GÜNEYSU",
            "46": "HEMŞİN",
            "47": "İKİZDERE",
            "48": "İYİDERE",
            "49": "KALKANDERE",
            "50": "PAZAR"
        }
    },
    {
        "il": "SAKARYA",
        "plaka": 54,
        "ilceleri": {
            "0": "SAKARYA",
            "40": "ADAPAZARI",
            "41": "AKYAZI",
            "42": "ARİFİYE",
            "43": "ERENLER",
            "44": "FERİZLİ",
            "45": "GEYVE",
            "46": "HENDEK",
            "47": "KARAPÜRÇEK",
            "48": "KARASU",
            "49": "KAYNARCA",
            "50": "KOCAALİ",
            "51": "PAMUKOVA",
            "52": "SAPANCA",
            "53": "SERDİVAN",
            "54": "SÖĞÜTLÜ",
            "55": "TARAKLI"
        }
    },
    {
        "il": "SAMSUN ",
        "plaka": 55,
        "ilceleri": {
            "0": "SAMSUN ",
            "40": "ALAÇAM",
            "41": "ASARCIK",
            "42": "ATAKUM",
            "43": "AYVACIK",
            "44": "BAFRA",
            "45": "CANİK",
            "46": "ÇARŞAMBA",
            "47": "HAVZA",
            "48": "İLKADIM",
            "49": "KAVAK",
            "50": "LADİK",
            "51": "2024-05-19",
            "52": "SALIPAZARI",
            "53": "TEKKEKÖY",
            "54": "TERME",
            "55": "VEZİRKÖPRÜ",
            "56": "YAKAKENT"
        }
    },
    {
        "il": "SİİRT",
        "plaka": 56,
        "ilceleri": {
            "0": "SİİRT",
            "40": "AYDINLAR",
            "41": "BAYKAN",
            "42": "ERUH",
            "43": "KURTALAN",
            "44": "PERVARİ",
            "45": "ŞİRVAN"
        }
    },
    {
        "il": "SİNOP",
        "plaka": 57,
        "ilceleri": {
            "0": "SİNOP",
            "40": "AYANCIK",
            "41": "BOYABAT",
            "42": "DİKMEN",
            "43": "DURAĞAN",
            "44": "ERFELEK",
            "45": "GERZE",
            "46": "SARAYDÜZÜ",
            "47": "TÜRKELİ"
        }
    },
    {
        "il": "SİVAS",
        "plaka": 58,
        "ilceleri": {
            "0": "SİVAS",
            "40": "AKINCILAR",
            "41": "ALTINYAYLA",
            "42": "DİVRİĞİ",
            "43": "DOĞANŞAR",
            "44": "GEMEREK",
            "45": "GÖLOVA",
            "46": "GÜRÜN",
            "47": "HAFİK",
            "48": "İMRANLI",
            "49": "KANGAL",
            "50": "KOYULHİSAR",
            "51": "SUŞEHRİ",
            "52": "ŞARKIŞLA",
            "53": "ULAŞ",
            "54": "YILDIZELİ",
            "55": "ZARA"
        }
    },
    {
        "il": "TEKİRDAĞ",
        "plaka": 59,
        "ilceleri": {
            "0": "TEKİRDAĞ",
            "40": "ÇERKEZKÖY",
            "41": "ÇORLU",
            "42": "HAYRABOLU",
            "43": "MALKARA",
            "44": "MARMARAEREĞLİSİ",
            "45": "MURATLI",
            "46": "SARAY",
            "47": "ŞARKÖY",
            "48": "ERGENE",
            "148": "SÜLEYMANPAŞA",
            "149": "KAPAKLI"
        }
    },
    {
        "il": "TOKAT",
        "plaka": 60,
        "ilceleri": {
            "0": "TOKAT",
            "40": "ALMUS",
            "41": "ARTOVA",
            "42": "BAŞÇİFTLİK",
            "43": "ERBAA",
            "44": "NİKSAR",
            "45": "PAZAR",
            "46": "REŞADİYE",
            "47": "SULUSARAY",
            "48": "TURHAL",
            "49": "YEŞİLYURT",
            "50": "ZİLE"
        }
    },
    {
        "il": "TRABZON",
        "plaka": 61,
        "ilceleri": {
            "0": "TRABZON",
            "40": "AKÇAABAT",
            "41": "ARAKLI",
            "42": "ARSİN",
            "43": "BEŞİKDÜZÜ",
            "44": "ÇARŞIBAŞI",
            "45": "ÇAYKARA",
            "46": "DERNEKPAZARI",
            "47": "DÜZKÖY",
            "48": "HAYRAT",
            "49": "KÖPRÜBAŞI",
            "50": "MAÇKA",
            "51": "OF",
            "52": "SÜRMENE",
            "53": "ŞALPAZARI",
            "54": "TONYA",
            "55": "VAKFIKEBİR",
            "56": "YOMRA",
            "57": "ORTAHİSAR"
        }
    },
    {
        "il": "TUNCELİ",
        "plaka": 62,
        "ilceleri": {
            "0": "TUNCELİ",
            "40": "ÇEMİŞGEZEK",
            "41": "HOZAT",
            "42": "MAZGİRT",
            "43": "NAZIMİYE",
            "44": "OVACIK",
            "45": "PERTEK",
            "46": "PÜLÜMÜR"
        }
    },
    {
        "il": "ŞANLIURFA",
        "plaka": 63,
        "ilceleri": {
            "0": "ŞANLIURFA",
            "40": "AKÇAKALE",
            "41": "BİRECİK",
            "42": "BOZOVA",
            "43": "CEYLANPINAR",
            "44": "HALFETİ",
            "45": "HARRAN",
            "46": "HİLVAN",
            "47": "SİVEREK",
            "48": "SURUÇ",
            "49": "VİRANŞEHİR",
            "150": "HALİLİYE",
            "151": "EYYÜBİYE",
            "152": "KARAKÖPRÜ"
        }
    },
    {
        "il": "UŞAK",
        "plaka": 64,
        "ilceleri": {
            "0": "UŞAK",
            "40": "BANAZ",
            "41": "EŞME",
            "42": "KARAHALLI",
            "43": "SİVASLI",
            "44": "ULUBEY"
        }
    },
    {
        "il": "VAN",
        "plaka": 65,
        "ilceleri": {
            "0": "VAN",
            "40": "BAHÇESARAY",
            "41": "BAŞKALE",
            "42": "ÇALDIRAN",
            "43": "ÇATAK",
            "44": "EDREMİT",
            "45": "ERCİŞ",
            "46": "GEVAŞ",
            "47": "GÜRPINAR",
            "48": "MURADİYE",
            "49": "ÖZALP",
            "50": "SARAY",
            "51": "İPEKYOLU",
            "52": "TUŞBA"
        }
    },
    {
        "il": "YOZGAT",
        "plaka": 66,
        "ilceleri": {
            "0": "YOZGAT",
            "40": "AKDAĞMADENİ",
            "41": "AYDINCIK",
            "42": "BOĞAZLIYAN",
            "43": "ÇANDIR",
            "44": "ÇAYIRALAN",
            "45": "ÇEKEREK",
            "46": "KADIŞEHRİ",
            "47": "SARAYKENT",
            "48": "SARIKAYA",
            "49": "SORGUN",
            "50": "ŞEFAATLİ",
            "51": "YENİFAKILI",
            "52": "YERKÖY"
        }
    },
    {
        "il": "ZONGULDAK",
        "plaka": 67,
        "ilceleri": {
            "0": "ZONGULDAK",
            "40": "ALAPLI",
            "41": "ÇAYCUMA",
            "42": "DEVREK",
            "43": "EREĞLİ",
            "44": "GÖKÇEBEY",
            "45": "KOZLU"
        }
    },
    {
        "il": "AKSARAY",
        "plaka": 68,
        "ilceleri": {
            "0": "AKSARAY",
            "40": "AĞAÇÖREN",
            "41": "ESKİL",
            "42": "GÜLAĞAÇ",
            "43": "GÜZELYURT",
            "44": "ORTAKÖY",
            "45": "SARIYAHŞİ",
            "46": "SULTANHANI"
        }
    },
    {
        "il": "BAYBURT",
        "plaka": 69,
        "ilceleri": {
            "0": "BAYBURT",
            "40": "AYDINTEPE",
            "41": "DEMİRÖZÜ"
        }
    },
    {
        "il": "KARAMAN",
        "plaka": 70,
        "ilceleri": {
            "0": "KARAMAN",
            "40": "AYRANCI",
            "41": "BAŞYAYLA",
            "42": "ERMENEK",
            "43": "KAZIMKARABEKİR",
            "44": "SARIVELİLER"
        }
    },
    {
        "il": "KIRIKKALE",
        "plaka": 71,
        "ilceleri": {
            "0": "KIRIKKALE",
            "40": "BALIŞEYH",
            "41": "BAHŞILI",
            "42": "ÇELEBİ",
            "43": "DELİCE",
            "44": "KARAKEÇİLİ",
            "45": "KESKİN",
            "46": "SULAKYURT",
            "47": "YAHŞİHAN"
        }
    },
    {
        "il": "BATMAN",
        "plaka": 72,
        "ilceleri": {
            "0": "BATMAN",
            "40": "BEŞİRİ",
            "41": "GERCÜŞ",
            "42": "HASANKEYF",
            "43": "KOZLUK",
            "44": "SASON"
        }
    },
    {
        "il": "ŞIRNAK",
        "plaka": 73,
        "ilceleri": {
            "0": "ŞIRNAK",
            "40": "BEYTÜŞŞEBAP",
            "41": "CİZRE",
            "42": "GÜÇLÜKONAK",
            "43": "İDİL",
            "44": "SİLOPİ",
            "45": "ULUDERE"
        }
    },
    {
        "il": "BARTIN",
        "plaka": 74,
        "ilceleri": {
            "0": "BARTIN",
            "40": "AMASRA",
            "41": "KURUCAŞİLE",
            "42": "ULUS"
        }
    },
    {
        "il": "ARDAHAN",
        "plaka": 75,
        "ilceleri": {
            "0": "ARDAHAN",
            "40": "ÇILDIR",
            "41": "DAMAL",
            "42": "GÖLE",
            "43": "HANAK",
            "44": "POSOF"
        }
    },
    {
        "il": "IĞDIR",
        "plaka": 76,
        "ilceleri": {
            "0": "IĞDIR",
            "40": "ARALIK",
            "41": "KARAKOYUNLU",
            "42": "TUZLUCA"
        }
    },
    {
        "il": "YALOVA",
        "plaka": 77,
        "ilceleri": {
            "0": "YALOVA",
            "40": "ALTINOVA",
            "41": "ARMUTLU",
            "42": "ÇINARCIK",
            "43": "ÇİFTLİKKÖY",
            "44": "TERMAL"
        }
    },
    {
        "il": "KARABÜK",
        "plaka": 78,
        "ilceleri": {
            "0": "KARABÜK",
            "40": "EFLANİ",
            "41": "ESKİPAZAR",
            "42": "OVACIK",
            "43": "SAFRANBOLU",
            "44": "YENİCE"
        }
    },
    {
        "il": "KİLİS",
        "plaka": 79,
        "ilceleri": {
            "0": "KİLİS",
            "40": "ELBEYLİ",
            "41": "MUSABEYLİ",
            "42": "POLATELİ"
        }
    },
    {
        "il": "OSMANİYE",
        "plaka": 80,
        "ilceleri": {
            "0": "OSMANİYE",
            "40": "BAHÇE",
            "41": "DÜZİÇİ",
            "42": "HASANBEYLİ",
            "43": "KADİRLİ",
            "44": "SUNBAS",
            "45": "TOPRAKKALE"
        }
    },
    {
        "il": "DÜZCE",
        "plaka": 81,
        "ilceleri": {
            "0": "DÜZCE",
            "40": "AKÇAKOCA",
            "41": "CUMAYERİ",
            "42": "ÇİLİMLİ",
            "43": "GÖLYAKA",
            "44": "GÜMÜŞOVA",
            "45": "KAYNAŞLI",
            "46": "YIĞILCA"
        }
    }
]
function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].plaka == nameKey) {
            return myArray[i];
        }
    }
}
$( document ).ready(function() {
    $.each(data, function( index, value ) {
        $('#Iller').append($('<option>', {
            value: value.plaka,
            text:  value.il
        }));
    });
    $("#Ilceler").change(function(){
        $('.district_input_data').val($(this).find("option:selected").text());
    });
    $("#Iller").change(function(){
        var valueSelected = this.value;
        console.log(valueSelected);
        $('.city_input_data').val($(this).find("option:selected").text());
        if($('#Iller').val() > 0) {
            $('#Ilceler').prop("required",true);
            $('#Ilceler').html('');
            $('#Ilceler').append($('<option>', {value: '',text:  'Lütfen Bir İlçe seçiniz'}));
            $('#Ilceler').prop("disabled", false);
            var resultObject = search($('#Iller').val(), data);
            $.each(resultObject.ilceleri, function( index, value ) {
                console.log(value)
                $('#Ilceler').append($('<option>', {value: index,text:  value}));
            });
            return false;
        }
        $('#Ilceler').prop("required",false);
        $('#Ilceler').prop("disabled", true);
    });
});



function getTrafficSource() {
    const params = new URLSearchParams(window.location.search);
    const referrer = document.referrer;

    const adParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id', 'gclid', 'fbclid'];

    for (const param of adParams) {
        if (params.has(param)) return 'ad';
    }

    if (referrer) {
        const engines = ['google.', 'bing.', 'yahoo.', 'yandex.', 'duckduckgo.'];
        if (engines.some(e => referrer.includes(e))) return 'organic';
        return 'referral';
    }

    return 'direct';
}

function setCookie(name, value, seconds) {
    const d = new Date();
    d.setTime(d.getTime() + seconds * 1000);
    document.cookie = `${name}=${value}; expires=${d.toUTCString()}; path=/`;
}

function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
}

function initTrafficTracking() {
    let source = getCookie("traffic_source");

    if (!source) {
        source = getTrafficSource();
        setCookie("traffic_source", source, 3600); // 1 saat
    }
    console.log("Ziyaretçi kaynağı:", source);
    document.querySelectorAll("form.o-call-form").forEach(form => {
        let input = form.querySelector('[name="trafficType"]');
        if (input) {
            input.value = source;
        } else {
            input = document.createElement("input");
            input.type = "hidden";
            input.name = "trafficType";
            input.value = source;
            form.appendChild(input);
        }
    });
}

document.addEventListener("DOMContentLoaded", initTrafficTracking);