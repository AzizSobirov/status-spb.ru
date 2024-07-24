// GSAP
gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
if (ScrollTrigger.isTouch !== 1 && window.innerWidth > 1024) {
  ScrollSmoother.create({
    wrapper: '.wrapper',
    content: '.content',
    smooth: 1.5,
    effects: true
  })


  const firstSection = gsap.utils.toArray('[data-intro]')
  firstSection.forEach(item => {
    gsap.fromTo(item, { opacity: 1 }, {
      opacity: 0,
      scrollTrigger: {
        trigger: item,
        start: 'center',
        end: 'bottom',
        scrub: true,
      }
    })
  })

  const introImg = document.querySelector('.intro__img')
  introImg && gsap.fromTo(introImg, { scale: 1 }, {
    scale: 0.8,
    scrollTrigger: {
      trigger: '.intro',
      start: 'top',
      end: 'bottom',
      scrub: true,
    }
  })

  const pricingImg = document.querySelector('.pricing__img')
  pricingImg && gsap.fromTo(pricingImg, { scale: 1 }, {
    scale: 0.8,
    scrollTrigger: {
      trigger: '.intro',
      start: 'top',
      end: 'bottom',
      scrub: true,
    }
  })

  const offersImg = document.querySelector('.offers__img')
  offersImg && ScrollTrigger.create({
    pin: offersImg,
    trigger: '.offers',
    start: 'top',
    end: '30%',
  })


  const itemsL = gsap.utils.toArray('[data-animation="fade-left"]')
  itemsL.forEach(item => {
    gsap.fromTo(item, { opacity: 0, x: -50 }, {
      opacity: 1, x: 0,
      scrollTrigger: {
        trigger: item,
        start: '-750',
        end: '-150',
        scrub: true
      }
    })
  })

  const itemsR = gsap.utils.toArray('[data-animation="fade-right"]')
  itemsR.forEach(item => {
    gsap.fromTo(item, { opacity: 0, x: 50 }, {
      opacity: 1, x: 0,
      scrollTrigger: {
        trigger: item,
        start: '-750',
        end: '-150',
        scrub: true,
      }
    })
  })


  const itemsZoomIn = gsap.utils.toArray('[data-animation="zoom-in"]')
  itemsZoomIn.forEach(item => {
    gsap.fromTo(item, { scale: 0.9 }, {
      scale: 1,
      scrollTrigger: {
        trigger: item,
        start: '-850',
        end: '-300',
        scrub: true,
      }
    })
  })
}

//** sticky header **/
const header = document.querySelector(".header");
window.addEventListener("scroll", function () {
  header.classList.toggle("header-sticky", window.scrollY > 0);
});

const menu = document.querySelector(".mobile__nav .menu");
function toggleMenu() {
  if (!menu.classList.contains('active')) {
    menu.style.display = 'flex'
    setTimeout(() => {
      menu.classList.add('active')
    }, 50)
  } else {
    menu.classList.remove('active')
    setTimeout(() => {
      menu.style.display = 'none'
    }, 250)
  }
}


//** Toast **/
window.addEventListener('DOMContentLoaded', () => {
  const isClosed = sessionStorage.getItem('is-closed')
  if (!isClosed) {
    document.querySelector('.toast').style.display = 'flex'
  }
})

function closeToast() {
  sessionStorage.setItem('is-closed', true)
  document.querySelector('.toast').style.display = 'none'
}

// ** swipers  **//
var swiperGallery = new Swiper(".gallery .swiper", {
  slidesPerView: 2,
  spaceBetween: 10,
  pagination: {
    el: ".gallery .swiper-pagination",
    clickable: true,
  },

});


//** popup */
class Popup {
  constructor(name, data) {
    this.popup = document.querySelector(name);
    this.popupContent = this.popup.querySelector(".popup__content");
    this.popupBook = this.popup.querySelector("#form-book");
    this.popupApplication = this.popup.querySelector("#form-application");
    this.body = document.querySelector("body");
    this.data = data;
  }
  open() {
    this.popup.style.display = "flex";
    if (this.data) {
      this.popupApplication.style.display = "none";
      this.popupBook.style.display = "flex";
    } else {
      this.popupBook.style.display = "none";
      this.popupApplication.style.display = "flex";
    }
    setTimeout(() => {
      this.popupContent.style.opacity = "1";
      this.popupContent.style.transform = "scale(1)";
      this.body.classList.add("overflow-hidden");
    }, 50);
  }
  close() {
    this.popupContent.style.opacity = "0";
    this.popupContent.style.transform = "scale(0.85)";
    this.body.classList.remove("overflow-hidden");

    setTimeout(() => {
      this.popup.style.display = "none";
    }, 500);
  }
}

const openPopup = (name, data) => {
  new Popup(`.popup--${name}`, data).open();
};

const closePopup = (name, data) => {
  new Popup(`.popup--${name}`, data).close();
};

// ** end popup

//** input mask **/
[].forEach.call(document.querySelectorAll(".v-mask"), function (input) {
  let keyCode;
  function mask(event) {
    event.keyCode && (keyCode = event.keyCode);
    let pos = this.selectionStart;
    if (pos < 3) event.preventDefault();
    let matrix = "+7 (___) ___-__-__",
      i = 0,
      def = matrix.replace(/\D/g, ""),
      val = this.value.replace(/\D/g, ""),
      newValue = matrix.replace(/[_\d]/g, function (a) {
        return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
      });
    i = newValue.indexOf("_");
    if (i != -1) {
      i < 5 && (i = 3);
      newValue = newValue.slice(0, i);
    }
    let reg = matrix
      .substr(0, this.value.length)
      .replace(/_+/g, function (a) {
        return "\\d{1," + a.length + "}";
      })
      .replace(/[+()]/g, "\\$&");
    reg = new RegExp("^" + reg + "$");
    if (
      !reg.test(this.value) ||
      this.value.length < 5 ||
      (keyCode > 47 && keyCode < 58)
    )
      this.value = newValue;
    if (event.type == "blur" && this.value.length < 5) this.value = "";

    if (this.value.length == 18 || this.value.length == 0) {
      input.dataset.numbervalid = "true";
    } else {
      input.dataset.numbervalid = "false";
    }
  }

  input.addEventListener("input", mask, false);
  input.addEventListener("focus", mask, false);
  input.addEventListener("blur", mask, false);
  input.addEventListener("keydown", mask, false);
});

const forms = document.querySelectorAll("form");
forms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let phone = form.querySelector("[name=phone]");

    if (phone.dataset.numbervalid === "true") {
      // alert("Спасибо за заявку. В ближайшее время с вами свяжутся.");
      successSend();
    }
  });
})

function successSend() {
  let formBook = document.querySelector("#form-book");
  let formApplication = document.querySelector("#form-application");
  let success = document.querySelector("#form-success");

  formBook.style.display = "none";
  formApplication.style.display = "none";
  success.style.display = "flex";

  setTimeout(() => {
    closePopup("form");
    setTimeout(() => {
      formApplication.style.display = "flex";
      success.style.display = "none";
    }, 500);
  }, 3000);
}

//** fancybox **//
let dataFancybox = ["gallery", 'club'];
dataFancybox.forEach((name) => {
  Fancybox.bind(`[data-fancybox="${name}"]`, {
    Images: { Panzoom: { maxScale: 3 } },
  });
});

