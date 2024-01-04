document.addEventListener('DOMContentLoaded', function () {
  $('.custom_sub_button').click(function () {
    $(this).closest('.block-inner').find('.block-inner-card-info').addClass('add_info_sub');
    $(this).closest('.block-inner').find('#addToCartPopupBackground').addClass('show');
    $('body').css('overflow', 'hidden');
  });
  $('.close_card_info').click(function () {
    $(this).closest('.block-inner').find('.block-inner-card-info').removeClass('add_info_sub');
    $(this).closest('.block-inner').find('#addToCartPopupBackground').removeClass('show');
    $('body').css('overflow', 'auto');
  });
  $('.close_card_info_mobile').click(function () {
    $(this).closest('.block-inner').find('.block-inner-card-info').removeClass('add_info_sub');
    $(this).closest('.block-inner').find('#addToCartPopupBackground').removeClass('show');
    $('body').css('overflow', 'auto');
  });

  //   product description
  const readMoreBtn = document.querySelector('.readmore');
  if (readMoreBtn) {
    readMoreBtn.addEventListener('click', function (event) {
      event.preventDefault();
      const descriptionFull = document.querySelector('.product-description-full');
      const descriptionShort = document.querySelector('.product-description-short');
      if (descriptionFull && descriptionShort) {
        descriptionFull.style.display = 'block';
        descriptionShort.style.display = 'none';
      }
    });
  }

  //used in PDP
  const readLessBtn = document.querySelector('.readless');
  if (readLessBtn) {
    readLessBtn.addEventListener('click', function (event) {
      event.preventDefault();
      const descriptionFull = document.querySelector('.product-description-full');
      const descriptionShort = document.querySelector('.product-description-short');
      if (descriptionFull && descriptionShort) {
        descriptionFull.style.display = 'none';
        descriptionShort.style.display = 'block';
      }
    });
  }

  if (window.screen.width < 1200) {
    $('.slider_image_wrapper_mobile').slick({
      draggable: true,
      arrows: false,
      autoplay: false,
      autoplaySpeed: 2500,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      infinite: false
    })
    let tabContentParentProduct = $('.product_ingredients_sec .content-section .content.active')
    for (i = 0; i < tabContentParentProduct.length; i++) {
      let tabContentList = tabContentParentProduct[i].querySelector('.tab-content-list ');
      $(tabContentList).slick({
        draggable: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3500,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true
      })
    }
  }

  $('.add_to_cart_btn').click(() => {
    document.querySelectorAll('.block-inner #addToCartPopupBackground').forEach(elem => {
      elem.classList.remove('show');
      elem.style.transitionDelay = '0.5s';
      $('body').css('overflow', 'auto');
    })
  })
  const featureProductSubscriptionUtils = featureProductSubscriptionUtil() || {};
  featureProductSubscriptionUtils.EventHandler();
  let customProductForms = document.querySelectorAll("#custom-product-form")
  customProductForms.forEach((customProductForm) => {
    customProductForm.addEventListener("submit", theme.customAddToCart);
  })

  // Open add to cart popup on product page
  let buyButtonContainer = document.querySelector('.buy-buttons-row_container');
  let closeBuyContainer = document.querySelectorAll('.close_buy_container');
  closeBuyContainer.forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
      if (buyButtonContainer) {
        buyButtonContainer.classList.remove('buy_buttons_show');
      }
    })
  })

  window.addEventListener('scroll', () => {
    document.querySelectorAll('.product-recommendations').forEach(product_recommendation => {
      let pdpBuyBtns = document.querySelector('.product_page_buy_buttons.buy-buttons-row');
      if (pdpBuyBtns) {
        if (window.scrollY + window.innerHeight - 100 > product_recommendation.offsetTop) {
          document.querySelector('.product_page_buy_buttons.buy-buttons-row').style.display = 'none';
        }
        else {
          document.querySelector('.product_page_buy_buttons.buy-buttons-row').style.display = 'block';
        }
      }
    })
  })
})