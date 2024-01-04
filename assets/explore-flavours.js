//used in vape landing page
// Explore flavours drawer on new vape page
function openFlavourDrawer() {
  let flavourDrawerContainer = document.getElementById('flavourDrawerContainer');
  let flavourDrawerBg = document.getElementById('flavourDrawerBackground');

  if (flavourDrawerContainer && flavourDrawerBg) {
    flavourDrawerContainer.style.display = 'block';
    flavourDrawerContainer.classList.add('claim-drawer-open');
    flavourDrawerBg.style.display = 'block';
    document.querySelector("body").classList.add("vape-drawer-open")

    if (flavourDrawerContainer.classList.contains('claim-drawer-close')) {
      flavourDrawerContainer.classList.add('claim-drawer-close');
    }
  }
}

function closeFlavourDrawer() {
  let flavourDrawerContainer = document.getElementById('flavourDrawerContainer');
  let flavourDrawerBg = document.getElementById('flavourDrawerBackground');
  if (flavourDrawerContainer && flavourDrawerBg) {
    flavourDrawerContainer.classList.remove('claim-drawer-open');
    flavourDrawerBg.style.display = 'none';
    document.querySelector('body').classList.remove('vape-drawer-open');
  }
}

document.addEventListener('DOMContentLoaded', function () {

  $('.flavours_container').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    draggable: true,
    infinite: true,
    prevArrow: '<button type="button" class="slick-flavour-prev" aria-label=""><svg xmlns="http://www.w3.org/2000/svg" width="23.827" height="23.827" viewBox="0 0 23.827 23.827"><path id="arrow_forward_FILL0_wght400_GRAD0_opsz48" d="M11.913,23.827l-1.564-1.6,9.2-9.2H0V10.8H19.545l-9.2-9.2L11.913,0,23.827,11.913Z" transform="translate(23.827 23.827) rotate(180)"/></svg></button>',
    nextArrow: '<button type="button" class="slick-flavour-next" aria-label=""><svg xmlns="http://www.w3.org/2000/svg" width="23.827" height="23.827" viewBox="0 0 23.827 23.827"><path id="arrow_forward_FILL0_wght400_GRAD0_opsz48" d="M19.913,31.827l-1.564-1.6,9.2-9.2H8V18.8H27.545l-9.2-9.2L19.913,8,31.827,19.913Z" transform="translate(-8 -8)"/></svg></button>',
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 1,
          initialSlide: 0.5
        }
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
          arrows: false,
          initialSlide: 0.5
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
          arrows: false,
          initialSlide: 0.5
        }
      }
    ]
  });

  let viewAllBtn = document.querySelector('.view_all_button');
  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', () => {
      openFlavourDrawer();
      const flavourDrawerContainer = document.querySelector(`#flavourDrawerContainer`);
      if (flavourDrawerContainer && flavourDrawerContainer.classList.contains('claim-drawer-overflow')) {
        flavourDrawerContainer.classList.remove('claim-drawer-overflow');
      }
    })
  }

  let flavourDrawerBackgroundClick = document.getElementById('flavourDrawerBackground');
  if (flavourDrawerBackgroundClick) {
    flavourDrawerBackgroundClick.addEventListener('click', function () {
      document.querySelector('.flavour-drawer-summary__close').click();
      document.querySelectorAll('.product-drawer-summary__close').forEach(closeBtn => closeBtn.click());
      document.querySelector("body").classList.remove("vape-drawer-open")
    })
  }

  //Open vape product drawer
  document.querySelectorAll('[data-zero-product-modal]').forEach(element => {
    element.addEventListener("click", function (e) {
      let flavourTitle = this.nodeName == "P" ? this.innerText : this.getAttribute("data-title")
      flavourTitle = flavourTitle.replace(" ", "").toLowerCase();

      const productDrawerContainer = document.querySelector(`#productDrawerContainer.${flavourTitle}`)
      const flavourDrawerContainer = document.querySelector(`#flavourDrawerContainer`)
      const closeBtn = productDrawerContainer.querySelector(".product-drawer-summary__close")

      if (productDrawerContainer && flavourDrawerContainer && closeBtn) {
        document.getElementById('productDrawerBackground').style.display = 'none';
        document.querySelector("body").classList.add("vape-drawer-open");
        flavourDrawerContainer.scrollTop = 0;

        productDrawerContainer.style.display = 'block';
        productDrawerContainer.classList.add('claim-drawer-open');
        flavourDrawerContainer.classList.add('claim-drawer-overflow');

        if (productDrawerContainer.classList.contains('claim-drawer-close')) {
          productDrawerContainer.classList.add('claim-drawer-close');
        }

        if (this.nodeName == "BUTTON") {
          closeBtn.setAttribute("data-modal-type", "single")
          openFlavourDrawer()
        }
      }
    })
  })

  document.querySelectorAll('.product-drawer-summary__close').forEach(closebtn => {
    closebtn.addEventListener('click', () => {
      closebtn.parentElement.classList.remove('claim-drawer-open');
      document.getElementById('productDrawerBackground').style.display = 'none';
      // document.querySelector('body').classList.remove('cart-drawer-open');
      document.getElementById('flavourDrawerContainer').classList.remove('claim-drawer-overflow');

      if (closebtn.getAttribute("data-modal-type") == 'single') {
        closeFlavourDrawer()
      }
    })
  })

  let productDrawerBackgroundClick = document.getElementById('productDrawerBackground');
  if (productDrawerBackgroundClick) {
    productDrawerBackgroundClick.addEventListener('click', function () {
      document.querySelector('.product-drawer-summary__close').click();
      document.querySelector("body").classList.remove("vape-drawer-open");
    })
  }

  if (window.screen.width < 1200) {
    let $carousel = $('.flavour_block_container');
    $carousel.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: true,
      fade: true,
      autoplay: true,
      autoplaySpeed: 4800,
      adaptiveHeight: false,
      focusOnSelect: true,
      customPaging: function customPaging(slider, i) {
        return "<div class=\"custom-dot-wrapper" + "\" type=\"button\" data-role=\"none\" role=\"button\" tabindex=\"0\">" + "</div>";
      }

    })
    let customImages = document.querySelectorAll('.custom-dot-common');
    let custom_dots = document.querySelectorAll('.flavour_block_container .custom-dot-wrapper');

    for (let i = 0; i < customImages.length; i++) {
      for (let j = 0; j < custom_dots.length; j++) {
        if (i == j) {
          const customDotWapper = custom_dots[j]
          customDotWapper.innerHTML = `<div class=\"custom-dot" + "\" type=\"button\" data-role=\"none\" role=\"button\" tabindex=\"0\"></div>`

          const flavourTitle = document.createElement("div");
          flavourTitle.classList.add('custom_dot_title')
          console.log(customImages[i].dataset.flavourTitle)
          flavourTitle.innerHTML = customImages[i].dataset.flavourTitle
          customDotWapper.appendChild(flavourTitle)

          const customDot = customDotWapper.querySelector(".custom-dot")
          customDot.classList.add(`custom-color-${customImages[i].dataset.color.replace("#", "")}`)
          customDot.appendChild(customImages[i]);
        }
      }
    }
  }

})