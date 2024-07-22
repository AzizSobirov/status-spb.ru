//** sticky header **/
const header = document.querySelector(".header");
window.addEventListener("scroll", function () {
  header.classList.toggle("header-sticky", window.scrollY > 0);
});


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

//** fancybox **//
let dataFancybox = ["gallery"];
dataFancybox.forEach((name) => {
  Fancybox.bind(`[data-fancybox="${name}"]`, {
    Images: { Panzoom: { maxScale: 3 } },
  });
});


