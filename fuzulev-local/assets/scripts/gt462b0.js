// Telefon tıklamalarını ölçümleyen eventtir
const phoneEvent = (location,element) => {
    let text = element.textContent.trim().replace(/\n/g, "");
    dataLayer.push({
        event: "call_button",
        button_location: location,
        sube: text
    });
};

const phoneEventSube = (location,element) => {
    let text = element.dataset.text;
    dataLayer.push({
        event: "call_button_sube",
        button_location: location,
        sube: text
    });
};

// Formu açan "Bilgi Almak İçin" butonuna tıklamaları için tetiklenecek eventtir.
const formEvent = (location) => {
    dataLayer.push({
        event: "form_button", // modal formu açan genel event ismidir
        button_location: location, // Butonun yerini anlatır parametredir.
        //Eğer sitenin üst kısmındaki butona tıklandıysa "header",
        //sitenin alt kısmındaki buton tıklantıysa "footer",
        //search alanının içindeyse "search",
        //farklı bir yerden form modal açılıyorsa onun lokasyonu yazılır
    });
};

// Menülere tıklandığında tetiklenecek eventtir
const menuEvent = (location, element) => {
    let text = element.textContent.trim().replace(/\n/g, ""); // Menü metni al
    let link = element.getAttribute("href") || ""; // Link al
    let category = element.dataset.category || ""; // Yeni sub_text değeri
    let subText = "";
    if(category){
        subText = text;
        text = category;
    }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: "menu_click",
        menu: {
            level: location, // top, header veya footer
            text: text, // Ana menü metni
            sub_text: subText, // Yeni eklenen sub_text
            city: link // Menü linki
        }
    });
};

// Sosyal medya buton tıklamaları
const socialEvent = (location, platform) => {
    dataLayer.push({
        event: "social_button", // sosyal medya ikonlarının tıklamasının event ismidir
        button: {
            location: location, // Şu anda sadece footer'da ikonlar var. İkonun bulunduğu yeri bu parametrede göndermemiz gerekiyor.
            platform: platform, // Tıklanan sosyal medya mecrası gönderilir
        },
    });
};

// Örnek hesaplama aracında çalıştırıcak event'tir
const calculateEvent = (total_value, advance_payment, installment) => {
    dataLayer.push({
        event: "calculation_button", // event'in genel adıdır. başarılı olarak hesaplama gerçekleştiğinde gönderilir
        total_value: total_value, // finansman değeridir
        advance_payment: advance_payment, // peşinat değeridir
        installment: installment, // vade sayısıdır
    });
};

// FAQ sorularına tıklandığında çalışacak eventtir.
const faqEvent = (element) => {
    question = $(element).find("h3").text();
    dataLayer.push({
        event: "faq", // genel faq soru-cevap takip event'idir.
        question: question, // hangi soruya tıklandıysa o soru gönderilir
    });
};

// Anasayfadaki birikim testine ilk seçenek seçilip ikinci soruya geçerken level_start event'i tetikleniyor
const testStartEvent = () => {
    dataLayer.push({
        event: "level_start", // birikim testinin başlatan event'tir
        level_name: "Birikim Testi", // testin adı gönderilir: Birikim testi
    });
};

// Anasayfadaki birikim testine ilk seçenek seçilip ikinci soruya geçerken level_up event'i de tetiklenecektir
const nextQuestionEvent = (index) => {
    dataLayer.push({
        event: "level_up", // birikim testinin başlatan event'tir
        level: index, // ilk soru cevaplandıktan sonra 1, ikincisi cevaplandıktan sonra 2, üçüncüsü cevaplandıktan sonra 3
    });
};

// Anasayfadaki birikim testin tamamlandığında level_end event'i tetiklenir.
const testEndEvent = () => {
    dataLayer.push({
        event: "level_end", // birikim testinin başlatan event'tir
        level_name: "Birikim Testi", // testin adı gönderilir: Birikim testi
        success: true, // başarılı tamamlandığında true değeri gönderilir
    });
};

// Anasayfa slider'ın altındaki butonların tıklamasını ölçen event'tir
const sliderButtonEvent = (element) => {
    let text = $(element).find("h3").text();
    dataLayer.push({
        event: "slider_button", // slider buttonlarını ölçümleyen event'in adıdır
        slider_text: text, // Anasayfada şu anda 5 farklı seçenek vardır. Bu 5 seçenekten hangisi tıklandıysa o gönderilmelidir
    });
};

// Header notification ikonunun üstüne gelindiğinde/tıklandığında ve altındaki seçeneklere tıklandığında tetiklenecek eventtir
const notificationEvent = (element) => {
    const eventData = {
        event: "notification_click",
    };

    if (element) {
        let order = $(element).index();
        let text = $(element).find(".noti-title").text();
        let link = $(element).attr("href");
        const notificationData = {
            order: order,
            text: text,
            city: link,
        };
        eventData.notification = notificationData;
        console.log(notificationData);
    }
    dataLayer.push(eventData);
};

// Form başarılı olarak doldurulduğunda gönderilecek event'tir
const formSuccessEvent = (location) => {
    return false;
    dataLayer.push({
        event: "generate_lead", // başarılı lead gönderiminde çalıştırılacak event'in adıdır
        location: location, // talebin gönderildiği form hangi tip ya da sayfada tetiklendiyse gönderilmesi gerekir
        //modal: sayfada modal olarak açılan popup'larda form gönderiliyorsa gönderilir
        //contact: iletişim sayfasındaki form gönderiliyorsa gönderilir
        //test: birikim testi sonrasında form gönderiliyorsa gönderilir
        //plan_detail: plan detay gibi detay sayfalarından form gönderiliyorsa gönderilir
        //campaign: kampanya sayfasından form gönderiliyorsa gönderilir
        //faq: merak edilenler sayfasından form gönderiliyorsa gönderilir
        //other: diğer tüm sayfalardan gönderilen formlarda other olarak gönderilebilir
    });
    var send_id = "";
    if(location == "modal"){
        send_id = "Footer–Bilgi_Al";
    }else if(location == "home"){
        send_id = "Anasayfa-Bilgilerimi_Gonder"
    }else if(location == "test"){
        send_id = "Anasayfa-Birikim_Testi"
    }else if(location == "plan_detail"){
        send_id = planDetailData
    }else if(location == "contact"){
      send_id = "Iletisim_formu";
    }else{
        send_id = location;
    }
};

function sendPromotionView(slide, index,event = 'view_promotion') {
    let promotionId = slide.dataset.promotionid || "unknown_id";
    let promotionName = slide.dataset.promotionname || "unknown_promotion";
    let creativeName = slide.querySelector("img")?.src || "https://www.fuzulev.com.tr/banner.webp";
    let creativeSlot = `slot_${index}`;
    let locationId = slide.dataset.locationid || "unknown_location";

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: event,
        promotion_id: promotionId,
        promotion_name: promotionName,
        creative_name: creativeName,
        creative_slot: creativeSlot,
        location_id: locationId
    });
    console.log("GTM View Event Gönderildi:", {
        event: event,
        promotion_id: promotionId,
        promotion_name: promotionName,
        creative_name: creativeName,
        creative_slot: creativeSlot,
        location_id: locationId
    });
}

function checkAndSendEvent(slide, index) {
    if($('main.plan_detail_main').length && !$('.c-tab__item#campaignTab').hasClass('js-active')) {
        return false;
    }
    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                sendPromotionView(slide, index);
                observer.disconnect(); // Event gönderildikten sonra Observer'ı kapat
            }
        });
    }, { threshold: 0.5 }); // %50 görünür olursa tetiklenir
    observer.observe(slide);
}

const callBtnEvent = (location,element) => {
    let text = element.textContent.trim().replace(/\n/g, "");
    dataLayer.push({
        event: "call_button",
        button_location: location ,
        sube: text
    })
};

document.addEventListener("DOMContentLoaded", function () {
    let observedElement = document.querySelector("#campany-section"); // İzlenecek alanı seç
    if (!observedElement) return;
    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                sendPromotionView(observedElement,1);
                observer.unobserve(observedElement);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(observedElement);
});
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".video_play_event").forEach(button => {
        button.addEventListener("click", function () {
            let category = this.dataset.category || "default_category";
            let videoLink = this.dataset.video || "";
            let city = this.dataset.city || "Bilinmeyen";
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({event: "video_play", category: category, video_link: videoLink, cd_il: city});
        });
    });
    document.querySelectorAll(".click_send_event .swiper-slide a").forEach(link => {
        link.addEventListener("click", function (event) {
            let slide = this.closest(".swiper-slide");
            sendPromotionView(slide, [...slide.parentElement.children].indexOf(slide),'select_promotion');
        });
    });

    document.querySelectorAll(".campaignListView .c-campaigns__box_li a").forEach(link => {
        link.addEventListener("click", function (event) {
            let campaign = this.closest(".c-campaigns__box_li");
            let campaignList = Array.from(document.querySelectorAll(".campaignListView .c-campaigns__box_li"));
            let index = campaignList.indexOf(campaign);
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({event: "select_product", products: [{name: campaign.dataset.name, category: "kampanyalar", index: index }]});
        });
    });

    document.querySelectorAll(".productPaymentListView .c-plan-boxes__box_li a").forEach(link => {
        link.addEventListener("click", function (event) {
            let proudct = this.closest(".c-plan-boxes__box_li");
            let planList = Array.from(document.querySelectorAll(".productPaymentListView .c-plan-boxes__box_li"));
            let index = planList.indexOf(proudct);
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({event: "select_product", products: [{name: proudct.dataset.title, category: proudct.dataset.category, index: index,price: formatCurrency(proudct.dataset.price) }]});
            console.log("GTM Event Gönderildi:", {
                event: "select_product",
                products: [{ name: proudct.dataset.title, category: proudct.dataset.category, index: index,price: formatCurrency(proudct.dataset.price) }]
            });
        });
    });

    var stepForm = document.querySelector("#steps-wizard #next");
    if(stepForm){
        stepForm.addEventListener("click", function (event) {
            var qsection = stepForm.closest("#steps-wizard");
            var visibleSection = qsection.querySelector(".question-section.visible")
            window.dataLayer = window.dataLayer|| [];
            var firstSection = qsection.querySelector('.question-section.first-question-section');
            var firstQuestion = firstSection.querySelector("input[type='radio']:checked").nextElementSibling.textContent.trim()
            if(visibleSection.dataset.index > 1){
                var twoSection = qsection.querySelector('.question-section[data-index="2"]')
                var twoQuestion = twoSection.querySelector('input[type="radio"]:checked').nextElementSibling.textContent.trim()
            }
            if(visibleSection.dataset.index > 2){
                var threeSection = qsection.querySelector('.question-section[data-index="3"]')
                var threeQuestion = threeSection.querySelector('input[type="radio"]:checked').nextElementSibling.textContent.trim()
            }
            if(visibleSection.dataset.index > 3){
                var fourSection = qsection.querySelector('.question-section[data-index="4"]')
                var fourQuestion = fourSection.querySelector('input[type="radio"]:checked').nextElementSibling.textContent.trim()
            }
            if(visibleSection.dataset.index > 4){
                var fiveSection = qsection.querySelector('.question-section[data-index="5"]')
                var fiveQuestion = fiveSection.querySelector('input[type="radio"]:checked').nextElementSibling.textContent.trim()
            }

            if((visibleSection.dataset.index == 1 || !visibleSection.dataset.index) && firstQuestion) {
                window.dataLayer.push({event: "form_start", form_name: "Birikim Testi", varlik_secimi: firstQuestion});
                window.dataLayer.push({event: "form",form_name: "Birikim Testi",step_name: "step_1",varlik_secimi: firstQuestion});
            }else if(visibleSection.dataset.index == 2 && twoQuestion) {
                window.dataLayer.push({
                    event: "form", form_name: "Birikim Testi", step_name: "step_2",
                    varlik_secimi: firstQuestion, birikim_tercihi: twoQuestion
                });
            }else if(visibleSection.dataset.index == 3 && threeQuestion) {
                window.dataLayer.push({
                    event: "form", form_name: "Birikim Testi", step_name: "step_3",
                    varlik_secimi: firstQuestion, birikim_tercihi: twoQuestion,
                    finansman_tutari: threeQuestion
                });
            }else if(visibleSection.dataset.index == 4 && fourQuestion) {
                window.dataLayer.push({
                    event: "form", form_name: "Birikim Testi", step_name: "step_4",
                    varlik_secimi: firstQuestion, birikim_tercihi: twoQuestion,
                    finansman_tutari: threeQuestion,taksit_tutari: fourQuestion
                });
            }else if(visibleSection.dataset.index == 5 && fiveQuestion) {
                window.dataLayer.push({
                    event: "form", form_name: "Birikim Testi", step_name: "step_5",
                    varlik_secimi: firstQuestion, birikim_tercihi: twoQuestion,
                    finansman_tutari: threeQuestion,taksit_tutari: fourQuestion,
                    pesinat_tutari: fiveQuestion
                });
                window.dataLayer.push({
                    event: "form_end", form_name: "Birikim Testi",
                    varlik_secimi: firstQuestion, birikim_tercihi: twoQuestion,
                    finansman_tutari: threeQuestion,taksit_tutari: fourQuestion,
                    pesinat_tutari: fiveQuestion
                });
            }
        });
    }

    document.querySelectorAll('.o-call-form,.o-call-form_contact').forEach(form => {
        form.addEventListener("submit", function (event) {

        });
    });
});

function formSubmitEvent(form) {
    let formId = generateUUID();
    let formName = form.querySelector("input[name='callFullName']");
    formName = formName ? formName.value.trim():"";
    let FormType = form.querySelector("button[type='submit']").dataset.formtype;
    let phoneInput = form.querySelector("input[name='callPhone']");
    let city = form.querySelector("input[name='cityText']");
    city = city?city.value.trim():"";
    let district = form.querySelector("input[name='districtText']");
    district = district?district.value.trim():"";
    let phoneNumber = formatPhoneNumber(phoneInput ? phoneInput.value.trim() : "");
    hashPhone(phoneNumber).then(hashedPhone => {
        let userId = hashedPhone?hashedPhone.substring(0, 32):"";
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: "form", form_name: "İletişim Formu", user_id: userId, form_id: formId,
            sha256_phone: hashedPhone, cd_il: city, cd_ilce: district, location: location.pathname
        });
        console.log("GTM Form Event Gönderildi:", {
            event: "form", form_name: "İletişim Formu",
            user_id: userId, form_id: formId, sha256_phone: hashedPhone,
            cd_il: city, cd_ilce: district, location: location.pathname
        });
    });
}

function campaignListView(){
    var campaignArray = [];
    var index = 0;
    document.querySelectorAll(".campaignListView .c-campaigns__box_li").forEach(campain => {
        campaignArray.push({name: campain.dataset.name, category: "kampanyalar", index: index++});
    });
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({event: "product_list", products: campaignArray});
}

function campaignView(name){
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({event: "view_product", products: [{name: name, category: "kampanyalar", index: 0}]});
}

// SHA-256 ile telefon numarasını hashleme fonksiyonu
async function hashPhone(phone) {
    if (!phone) return "";
    const encoder = new TextEncoder();
    const data = encoder.encode(phone);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashHex = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, "0")).join("");
    return hashHex;
}

// Her seferinde benzersiz bir form_id oluşturma (UUID v4)
function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        let r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
function formatPhoneNumber(maskedPhone) {
    if (!maskedPhone) return "";
    let digits = maskedPhone.replace(/\D/g, ""); // Sadece rakamları al
    if (digits.length === 10) {
        return `+90${digits}`; // Başına +90 ekle
    }
    return `+${digits}`; // Eğer zaten uluslararası formatta ise değişme
}

function formatCurrency(amount) {
    amount = amount.replace(/\D/g, "");
    return new Intl.NumberFormat("tr-TR", {
        minimumFractionDigits: 2
    }).format(amount);
}

function productPaymentListView() {
    var productPaymentArray = [];
    var index = 0;
    document.querySelectorAll(".productPaymentListView .c-plan-boxes__box_li").forEach(proudct => {
        productPaymentArray.push({name: proudct.dataset.title, category: proudct.dataset.category, index: index++,price: formatCurrency(proudct.dataset.price) });
    });
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({event: "product_list", products: productPaymentArray});
}

function productPaymentView(name,category,price) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({event: "view_product", products: [{name:name, category: category,  price: formatCurrency(price), index: 0}]});
}