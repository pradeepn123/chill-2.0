
  const featureProductSubscriptionUtil = function () {
    // Reference all your elements here
    const elUtil = {
      variantDropDownSelector: '[feature-productvaraintselector]',
      productDataInfo: '[data-productInfo]',
      subscriptionDataInfo: '[data-productSubscriptionData]',
      form: 'form.feature-product-purchase-form',
      oneTimeRadioSelector: '[product-oneTime-selection]',
      subscriptionRadioSelector: '[product-subscription-selection]',
      originalProductIdInputEl: '[original-productId-input]',
      subscriptionProductInputEl: '[subscription-varaintId-input]',
      subscriptionFrequencyInputEl: '[subscription-frequency-input]',
      subscriptionUnitInputEl: '[subscription-unit-input]',
      subscriptionIntervalSelector: '[subscription-interval-selectors-wrap]',
      intervalFrequencySelector:
        '[interval-frequency-selector]',
      onetimepriceEl: '[onetime-price]',
      subscriptionPriceEl: '[subscription-price]',
      buttonAddtocart: '[feature-addto-cart]',
      buttonDirectAddToCart: '[direct-addToCart-btn]',
      productInfoWrapper: '[product-main-block]',
      featureProductPopup: '[featureProduct-subscription-popup]',
      sellingPlanGroup: 'input[name="selling-plan-group"]',
      active: "active",
      hide: 'hide',
      sellingPlan: 'select[name="selling_plan"]'
    };
  
    const classUtil = {
      activeSubRadio: 'sub-radio-active',
      activeButtonPreloader: 'show--preloader',
      activeSubPopup: 'add_info_sub'

    };

    // Common helper functions required

    const _helperFunc = {
      getVaraintData: (productData) => {
        let { getProductObj, getSelectedValue } = productData;
        let filteredObj = getProductObj.variants.filter(
          (item) => item.title == getSelectedValue
        );
        return {
          id: filteredObj[0].id,
          varaintData: filteredObj[0],
        };
      },
  
      getDuplicateVaraintId: function (actualProductId, currentEl) {
        let productSubData = JSON.parse(
          currentEl
            .closest(elUtil.form)
            .querySelector(elUtil.subscriptionDataInfo).innerText
        );
  
        return productSubData.original_to_hidden_variant_map[
          actualProductId
        ];
      },
  
      getProductObj: (currentEl) => {
        return JSON.parse(
          currentEl
            .closest(elUtil.form)
            .querySelector(elUtil.productDataInfo).innerText
        );
      },
  
      dispatchOpenDrawerEvent: () => {
        document.documentElement.dispatchEvent(
          new CustomEvent('theme:cartchanged', {
            bubbles: true,
            cancelable: false,
          })
        );
        console.log('Open cart drawer triggered');
      },
      dispatchCloseDrawerEvent: () => {
        document.dispatchEvent(new CustomEvent('theme:cartDrawer:close'));
      },
      removeInputActiveClassfromEl: (currentInstance) => {
        currentInstance.querySelectorAll('label').forEach((_el) => {
          _el.classList.remove(classUtil.activeSubRadio);
        });
      },
    };
  
    // Handle View for input elements
  
    const ViewHandler = function () {
      const updateVariantPrice = (currentInstance, variantObj) => {
        // let getSubscriptionVaraintData =  _helperFunc.getDuplicateVaraintId(variantObj.id, currentInstance);
        let getActualVaraintPrice = variantObj.varaintData.price;
        let formatPrice = theme.Shopify.formatMoney(getActualVaraintPrice, theme.money_format)
        let currFormEl = currentInstance.closest(elUtil.form);
  
        // Update subscription price
        const sellingPlan = variantObj.varaintData.selling_plan_allocations.find((sp) => sp.selling_plan_id == getSelectedOrFirstSellingPlanId(currFormEl))
        if (sellingPlan) {
          currFormEl.querySelector(elUtil.subscriptionPriceEl).innerHTML = theme.Shopify.formatMoney(sellingPlan.price, theme.money_format)
        }
  
        // Update actual product price
        currFormEl.querySelector(elUtil.onetimepriceEl).innerHTML = formatPrice
      }
  
      const getSelectedOrFirstSellingPlanId = (currFormEl) => {
        const sellingPlan = currFormEl.querySelector(elUtil.sellingPlan)
        if (!sellingPlan) {
          return 0
        }
        if (sellingPlan.value) {
          return sellingPlan.value
        }

        return sellingPlan.options[0].value
      }

      const updateVariantRelatedData = (currentEl, variantObj) => {
        const { id } = variantObj;
        const currFormEl = currentEl.closest(elUtil.form);
        currFormEl.querySelector('input[name="id"]').value = id
        // *** Update varaint price.. will be done later
        updateVariantPrice(currentEl, variantObj);
      };

      const updateAddToCartButton = (currentInstance) => {
        let formAddToCartBtn = currentInstance.querySelector(elUtil.buttonAddtocart);
        let getOtherAddToCartBtn = currentInstance.closest(elUtil.productInfoWrapper).querySelector(elUtil.buttonDirectAddToCart);
        const showPreloaderState = () => {
          if (formAddToCartBtn) {
            formAddToCartBtn.classList.add(classUtil.activeButtonPreloader);
          }

          if (getOtherAddToCartBtn) {
            getOtherAddToCartBtn.classList.add(classUtil.activeButtonPreloader);
          }

        }

        const hidePreloaderState = () => {
          if (formAddToCartBtn) {
            formAddToCartBtn.classList.remove(classUtil.activeButtonPreloader);
          }
          if (getOtherAddToCartBtn) {
            getOtherAddToCartBtn.classList.remove(classUtil.activeButtonPreloader);
          }
        }


        return {
          showPreloaderState,
          hidePreloaderState
        }

      }

      const hideSubscriptionPopup = (currentInstance) => {
        const subPopup = currentInstance.closest(elUtil.productInfoWrapper).querySelector(elUtil.featureProductPopup);
        if (subPopup) {
          subPopup.classList.remove(classUtil.activeSubPopup);
        }
      }
      return {
        updateVariantRelatedData,
        updateAddToCartButton,
        hideSubscriptionPopup,
        getSelectedOrFirstSellingPlanId
      };
    };

    const EventHandler = function () {
      const featureProductVariantSelectorEl = document.querySelectorAll(
        elUtil.variantDropDownSelector
      );

      const featureProductFormEl = document.querySelectorAll(elUtil.form);

      const intervalFrequencySelectorEl = document.querySelectorAll(elUtil.intervalFrequencySelector);

      if (featureProductFormEl) {
        featureProductFormEl.forEach((_formEl) => {

          _formEl.querySelectorAll(elUtil.sellingPlanGroup).forEach((_sellingPlanInput) => {
            const sellingPlanSelect = _formEl.querySelector(elUtil.sellingPlan)
            if (sellingPlanSelect) {
              sellingPlanSelect.value = ''
            }

            _sellingPlanInput.addEventListener("click", function (e) {
              if (!e.target.checked) {
                return
              }

              _formEl.querySelectorAll(elUtil.sellingPlanGroup).forEach((_el) => {
                _el.labels.forEach((_label) => {
                  _label.classList.remove(elUtil.active)
                })
              })

              e.currentTarget.labels.forEach((_label) => {
                _label.classList.add(elUtil.active)
              })

              const sellingPlanSelect = _formEl.querySelector(elUtil.sellingPlan)

              if (e.target.value) {
                sellingPlanSelect.classList.remove(elUtil.hide)
                sellingPlanSelect.value = sellingPlanSelect.options[0].value
              } else {
                sellingPlanSelect.value = ''
                sellingPlanSelect.classList.add(elUtil.hide)
              }
            })
          })

          _formEl.addEventListener('submit', function (e) {
            e.preventDefault();
            let serializeFormData = new URLSearchParams(
              new FormData(this)
            );
            try {
              // Add preloader to button
              ViewHandler().updateAddToCartButton(_formEl).showPreloaderState();

              // Make fetch reques to add product to cart
              fetch(window.Shopify.routes.root + 'cart/add.js', {
                method: 'POST',
                body: serializeFormData,
              })
                .then((response) => {
                  if (!response.ok) {

                    ViewHandler().updateAddToCartButton(_formEl).hidePreloaderState();

                    throw new Error(
                      `HTTP error! Status: ${response.status}`
                    );

                  }

                  return response.json();
                })
                .then((data) => {
                  console.log(data);
                  // On successfully adding product to cart
                  // Fire event to open drawer
                  _helperFunc.dispatchOpenDrawerEvent();
                  // Hide Preloader part
                  ViewHandler().updateAddToCartButton(_formEl).hidePreloaderState();
                  ViewHandler().hideSubscriptionPopup(_formEl);
                })
                .catch((error) => {
                  console.log(error);
                  console.log('Something went wrong');
                });
            } catch (err) {
              console.log(err);
            }
          });
        });
      }

      // Variant Dropdown selector change event handler
      if (featureProductVariantSelectorEl) {
        featureProductVariantSelectorEl.forEach((_el) => {
          _el.addEventListener('change', function (e) {
            let getSelectedValue = this.value;
            let getProductObj = _helperFunc.getProductObj(this);
            let getVaraintData = _helperFunc.getVaraintData({
              getProductObj,
              getSelectedValue,
            });

            ViewHandler().updateVariantRelatedData(
              this,
              getVaraintData
            );

            // console.log(getVaraintData);
          });
        });
      }

      if (window.ReCharge && ReCharge.showAddToCartButton) {
        ReCharge.showAddToCartButton()
      }
    };

    return {
      EventHandler: EventHandler,
    };
  }
  //used globally
  function handleDocumentClick(evt){
    const utilityBar = evt.target.closest(".utility-bar__right")
    if (evt.target.closest("#sort-dropdown-heading") || (utilityBar && utilityBar.querySelector(".link-dropdown__button-text"))) {
      return false
    }
    if (document.querySelector('.utility-bar')) {
      document.querySelector('.utility-bar .link-dropdown__button-icon').toggleAttribute('active');
      document.querySelector('.utility-bar .link-dropdown__button').setAttribute('disabled', true);
      document.removeEventListener('click', handleDocumentClick)
    }
  }

  function customFeatureProductSubcriptionEvents() {
    const featureProductSubscriptionUtils = featureProductSubscriptionUtil() || {};
    $('.custom_sub_button').click(function () {
      $(this).closest('.block-inner').find('.block-inner-card-info')?.addClass('add_info_sub');
    });
    featureProductSubscriptionUtils.EventHandler();
    $('.close_card_info').click(function () {
      $(this).closest('.block-inner').find('.block-inner-card-info')?.removeClass('add_info_sub');
    });
    $('.close_card_info_mobile').click(function () {
      $(this).closest('.block-inner').find('.block-inner-card-info')?.removeClass('add_info_sub');
    });
  }



  document.addEventListener('DOMContentLoaded', function () {
      //used in multiple sections
      const sortDropdownHeading = document.getElementById('sort-dropdown-heading')
      if (sortDropdownHeading) {
        sortDropdownHeading.addEventListener('click', function () {
          if (document.querySelector('.utility-bar .link-dropdown__button')?.hasAttribute('disabled')) {
            document.querySelector('.utility-bar .link-dropdown__button')?.removeAttribute('disabled');
            document.addEventListener('click', handleDocumentClick);
          }
          else{
            document.querySelector('.utility-bar .link-dropdown__button')?.setAttribute('disabled', 'disabled');
          }
          document.querySelector('.utility-bar .link-dropdown__button-icon')?.toggleAttribute('active');
        })
      }
      // used in collection page
      let loadMoreFilters = document.querySelectorAll('.loadmore');
      if (loadMoreFilters.length) {
        loadMoreFilters.forEach(el => el.addEventListener('click', function () {
          let forloopIndex = this.dataset.forloop;
          document.querySelectorAll('.filter-group--' + forloopIndex + ' .filter_full').forEach(
            el => {
              el.style.display = 'block'
              el.parentElement.classList.add('scroller_height')
            }
          );
          document.querySelectorAll('.filter-group--' + forloopIndex + ' .filter_limited').forEach(el => el.style.display = 'none');
        }))
      }

  // used in homepage and collection page
  function updateContainer() {
    if (window.innerWidth >= 1200) {
      $('.image-wrapper').hover(
        function () {
          $('.image-wrapper').not(this).toggleClass('squeeze');
          $(this).toggleClass('stretch');
        },
        function () {
          $('.image-wrapper').not(this).toggleClass('squeeze');
          $(this).toggleClass('stretch');
        }
      );
    }
  }

  // used in multiple sections
  function scrollAbout() {
    if (window.innerWidth >= 1200) {
      //our story value scoll
      const stickyContainer = document.querySelector('.faq-index__sticky-container');
      const currentElement = document.querySelector('.chill-story-value-block-section, .featured_block_list');
      if (stickyContainer && currentElement) {
        const stickyContainerRect = stickyContainer.getBoundingClientRect();
        const currentElementRect = currentElement.getBoundingClientRect();
        stickyContainer.style.height = currentElementRect.bottom - stickyContainerRect.top + 'px';
      }
    }
  }

  customFeatureProductSubcriptionEvents();

  //used globally
  theme.customAddToCart = function (e) {
    e.preventDefault()
    const $form = $(this)

    $form.find('button[type="submit"]')
      .attr('disabled', 'disabled')
      .val(theme.strings.products_product_adding_to_cart);

    let formData = new FormData(this);
    formData.append('sections', 'cart-drawer');

    $.post(theme.routes.cart_add_url, new URLSearchParams(formData).toString(), function () {
      theme.addedToCartHandler.call(this)
      let customProductForms = document.querySelectorAll("#custom-product-form")
      customProductForms.forEach((customProductForm) => {
        const bannerProductFrom = customProductForm.closest(".claim_banner_product_page_container")
        const slide = bannerProductFrom.closest(".slide")
        if (slide && bannerProductFrom) {
          slide.remove()
        } else if (bannerProductFrom) {
          bannerProductFrom.remove()
        }
      })
      const claimInfoContainers = document.querySelectorAll(".claim_info_container")
      claimInfoContainers.forEach((claimInfoContainer) => claimInfoContainer.remove())

      const successMessageContainers = document.querySelectorAll('.claim_success_message')
      successMessageContainers.forEach((successMessageContainer) => successMessageContainer.remove())
      theme.offerSliderInstances.forEach((autoSlide) => {
        autoSlide.reinit()
      })

    }.bind(this), 'json')
      .fail(function (data) {
        $form.find('button[type="submit"]').removeAttr('disabled')
      })

    return false
  }

    //when mobile navigation is active body should not overflow  
    //  const HeaderButton = document.querySelector("#HeaderButton");
    //  const HiddenBody = document.querySelector("body");
    //  const mobileHeader = document.querySelector("#mobileNavClose");
    //  const pageShade = document.querySelector(".page-shade");

    //  function toggleOverflow() {
    //    HiddenBody.style.overflow = HiddenBody.style.overflow === "hidden" ? "auto" : "hidden";
    //  }

    //  HeaderButton.addEventListener("click", toggleOverflow);
    //  mobileHeader.addEventListener("click", toggleOverflow);
    //  pageShade.addEventListener("click", toggleOverflow);

    //used globally
    let items = document.querySelectorAll('.menu-mega-nav li');
    items.forEach(item => item.addEventListener('mouseenter', handleHover))

    document.addEventListener("TikShop:cart:updated", function (e) {
      document.documentElement.dispatchEvent(new CustomEvent('theme:cartchanged', { bubbles: true, cancelable: false }))
    })

    function handleHover() {
      const items = this.parentElement.querySelectorAll(".menu-item")
      items.forEach(item => item.classList.remove('active'))
      this.classList.add('active')
    }

    //   collection description
    const readMoreBtn2 = document.querySelector('.readmore_btn');
    if (readMoreBtn2) {
      readMoreBtn2.addEventListener('click', function (event) {
        event.preventDefault();
        const descriptionFull = document.querySelector('.collection-description-full');
        const descriptionShort = document.querySelector('.collection-description-short');
        if (descriptionFull && descriptionShort) {
          descriptionFull.style.display = 'block';
          descriptionShort.style.display = 'none';
        }
      });
    }

    const readLessBtn2 = document.querySelector('.readless_btn');
    if (readLessBtn2) {
      readLessBtn2.addEventListener('click', function (event) {
        event.preventDefault();
        const descriptionFull = document.querySelector('.collection-description-full');
        const descriptionShort = document.querySelector('.collection-description-short');
        if (descriptionFull && descriptionShort) {
          descriptionFull.style.display = 'none';
          descriptionShort.style.display = 'block';
        }
      });
    }

    //used in image-carousel section
    $('#imageCarouselContainer .image_carousel_div').slick({
      slidesToShow: 4.3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 0,
      speed: 8000,
      pauseOnHover: false,
      infinite: true,
      cssEase: 'linear',
      responsive: [
        {
          breakpoint: 578,
          settings: {
            slidesToShow: 1.2,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 1400,
          settings: {
            slidesToShow: 2.7,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 1700,
          settings: {
            slidesToShow: 3.2,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 1800,
          settings: {
            slidesToShow: 3.8,
            slidesToScroll: 1,
            infinite: true
          }
        }
      ]
    });


    //used in blog page
    if (window.screen.width < 1024) {
      $('.blog-category-list-wrap').slick({
        slidesToShow: 1.5,
        slidesToScroll: 1,
        draggable: true,
        arrows: false,
        infinite: false,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1.2
            }
          }
        ]
      })
      let $slider = $('.blog-category-list-wrap');

      $slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        let $progressBar = $(this).siblings()[1];
        console.log($progressBar)
        let calc = ((nextSlide) / (slick.slideCount - 1)) * 100;

        $progressBar.style.backgroundSize = calc + '% 100%'
        $progressBar.setAttribute('aria-valuenow', calc);
      });
    }


    $('.featured_blocks_container').slick({
      slidesToShow: 8,
      slidesToScroll: 1,
      arrows: true,
      draggable: true,
      prevArrow: '<button type="button" class="slick-header-prev" aria-label=""><svg xmlns="http://www.w3.org/2000/svg" width="23.827" height="23.827" viewBox="0 0 23.827 23.827"><path id="arrow_forward_FILL0_wght400_GRAD0_opsz48" d="M11.913,23.827l-1.564-1.6,9.2-9.2H0V10.8H19.545l-9.2-9.2L11.913,0,23.827,11.913Z" transform="translate(23.827 23.827) rotate(180)"/></svg></button>',
      nextArrow: '<button type="button" class="slick-header-next" aria-label=""><svg xmlns="http://www.w3.org/2000/svg" width="23.827" height="23.827" viewBox="0 0 23.827 23.827"><path id="arrow_forward_FILL0_wght400_GRAD0_opsz48" d="M19.913,31.827l-1.564-1.6,9.2-9.2H8V18.8H27.545l-9.2-9.2L19.913,8,31.827,19.913Z" transform="translate(-8 -8)"/></svg></button>',
      responsive: [
        {
          breakpoint: 1440,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 1199,
          settings: 'unslick'
        }
      ]
    })


    if (window.screen.width < 1200) {
      //used in homepage
      $('.stress-effect-block-list .fixed-layout').slick({
        draggable: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2500,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true
      });
      // used globally
      let tabContentParent = $('.section-home-ingredients .content-section .content.active')
      for (i = 0; i < tabContentParent.length; i++) {
        let tabContentList = tabContentParent[i].querySelector('.tab-content-list');
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


    //sub collection image
    $('.subcollection_slider').slick({
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 8,
      slidesToScroll: 1,
      arrows: true,
      prevArrow: '<div class="slick-nav prev-arrow"><i></i><svg><use xlink:href="#circle"></svg></div>',
      nextArrow: '<div class="slick-nav next-arrow"><i></i><svg><use xlink:href="#circle"></svg></div>',
      responsive: [
        {
          breakpoint: 1680,
          settings: {
            slidesToShow: 7,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 1300,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 769,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 600,
          settings: {
            arrows: false,
            slidesToShow: 3,
            slidesToScroll: 1
          }
        }
      ]
    });
    $(".subcollection_slider").show();
    $('.navigation__item .country_selector').click(() => {
      $('.navigation__item .country_selector').toggleClass('active');
      $('.navigation__item .country_selector #dropdown_linebreak').toggleClass('show');
    })

    //used in homepage
    $('.testimonial_list__inner')?.slick({
      infinite: false,
      slidesToShow: 1.6,
      slidesToScroll: 1,
      arrows: true,
      prevArrow: '<button type="button" class="slick-product-prev" aria-label=""><svg xmlns="http://www.w3.org/2000/svg" width="23.827" height="23.827" viewBox="0 0 23.827 23.827"><path id="arrow_forward_FILL0_wght400_GRAD0_opsz48" d="M11.913,23.827l-1.564-1.6,9.2-9.2H0V10.8H19.545l-9.2-9.2L11.913,0,23.827,11.913Z" transform="translate(23.827 23.827) rotate(180)"/></svg></button>',
      nextArrow: '<button type="button" class="slick-product-next" aria-label=""><svg xmlns="http://www.w3.org/2000/svg" width="23.827" height="23.827" viewBox="0 0 23.827 23.827"><path id="arrow_forward_FILL0_wght400_GRAD0_opsz48" d="M19.913,31.827l-1.564-1.6,9.2-9.2H8V18.8H27.545l-9.2-9.2L19.913,8,31.827,19.913Z" transform="translate(-8 -8)"/></svg></button>',
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 1.4,
            slidesToScroll: 1,
            arrows: false,
          }
        },
        {
          breakpoint: 1112,
          settings: {
            slidesToShow: 2.2,
            slidesToScroll: 1,
            arrows: false,
          }
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 2.2,
            slidesToScroll: 1,
            arrows: false,
          }
        },
        {
          breakpoint: 625,
          settings: {
            slidesToShow: 1.2,
            slidesToScroll: 1,
            arrows: false,
          }
        }

      ]
    });

    //used in multiple sections
    $('#gallery')?.slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 0,
      speed: 6000,
      pauseOnHover: false,
      cssEase: 'linear',
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1.5,
            slidesToScroll: 1,
            arrows: false,
          }
        }
      ]
    });

    updateContainer();
    scrollAbout();
    handleResizeBannerText();

    //used globally
    function handleResizeBannerText() {
      const claimBannerTextDesktop = document.querySelectorAll(".claim_banner_text_desktop")
      const claimBannerTextMobile = document.querySelectorAll(".claim_banner_text_mobile")
      if (window.innerWidth < 768) {
        claimBannerTextDesktop.forEach(elem => elem.style.display = "none")
        claimBannerTextMobile.forEach(elem => elem.style.display = "")
      } else {
        claimBannerTextDesktop.forEach(elem => elem.style.display = "")
        claimBannerTextMobile.forEach(elem => elem.style.display = "none")
      }
    }

    $(window).resize(function () {
      updateContainer();
      scrollAbout();
      handleResizeBannerText()
    });


    //used in PDP and Homepage
    let d = document,
      tabs = d.querySelector('.tabs, .product-tabs'),
      tab = d.querySelectorAll('li'),
      contents = d.querySelectorAll('.content');
    if (tabs) {
      tabs.addEventListener('click', function (e) {
        if (e.target && e.target.nodeName === 'LI') {
          // change tabs
          for (let i = 0; i < tab.length; i++) {
            tab[i].classList.remove('active');
          }
          e.target.classList.toggle('active');
          // change content
          for (i = 0; i < contents.length; i++) {
            contents[i].classList.remove('active');
          }

          let tabId = '#' + e.target.dataset.tabId;
          const contentTab = d.querySelector(tabId)
          contentTab.classList.toggle('active');

          if (window.screen.width < 1200) {
            const tabContentList = contentTab.querySelectorAll(".tab-content-list");
            tabContentList.forEach((elem) => {
              if (elem && elem.classList.contains("slick-initialized")) {
                $(elem).slick('unslick')
              }
              if (elem) {
                $(elem).slick({
                  draggable: true,
                  arrows: false,
                  autoplay: true,
                  autoplaySpeed: 3500,
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  dots: true
                })
              }
            })
          }
        }
      });
    }

    var buyButtonContainer = document.querySelector('.buy-buttons-row_container');
      // buyButtonContainer.classList.remove('buy_buttons_show');
    if (location.pathname != '/pages/chillzero ') {
      document.querySelectorAll('.mobile_popup_buy_button').forEach(popupButton => {
        popupButton.addEventListener('click', () => {
          if (buyButtonContainer) {
            buyButtonContainer.classList.add('buy_buttons_show');
          }
        })
      })
    }

    document.querySelectorAll('.mobile_popup_buy_button').forEach(popupButton => {
      if (!popupButton.querySelector('.outOfStock_btn')) {
        popupButton.addEventListener('click', () => {
          if (buyButtonContainer) {
            buyButtonContainer.classList.add('buy_buttons_show');
          }
        })
      }
    })

    document.addEventListener("scroll", function () {
      getProgress();
    });

    function getProgress() {
      let topPos = document.documentElement.scrollTop;
      // Alternatively, you can use document.body.scrollTop || document.documentElement.scrollTop;

      // Remaining left to scroll
      let remaining = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      // scrollHeight is the measurement of the element's entire content, whether all the content is visible or not
      // clientHeight is the inner height of the element, including padding

      let percentage = (topPos / remaining) * 100 * 2;

      document.querySelectorAll('.marquee_container .marquee_content_wrapper').forEach((el, index) => {
        if (index >= 10) {
          return el.style.transform = 'translateX(-' + percentage + '%)';
        }
        else {
          return el.style.transform = 'translateX(-' + percentage / 2 + '%)';
        }
      })
    }


        //used globally
  class AutoSlider {
    constructor(element) {
      this.element = element
      this.el = document.querySelector(this.element);
      if (!this.el) {
        return
      }
      this.init();
    }

    reinit() {
      if (this.timer) {
        clearInterval(this.timer)
      }
      this.el = document.querySelector(this.element);
      if (!this.el) {
        return
      }
      this.init()
    }

    init() {
      this.slides = this.el.querySelectorAll('.slide');
      if (this.slides.length) {
        const selectedSlide = this.slides[0]
        selectedSlide.style.opacity = 1;
        selectedSlide.style.position = 'relative';
      }
      this.index = 0;
      this.timer = null;
      this.delay = 4000;
      this.action();
      this.addHoverListener();
    }

    _slideTo(slide) {
      const currentSlide = this.slides[slide];
      if (currentSlide) {
        currentSlide.style.opacity = 1;
        currentSlide.style.position = 'relative';
      }

      for (let i = 0; i < this.slides.length; i++) {
        let slide = this.slides[i];
        if (slide !== currentSlide) {
          if (slide.style.opacity == 1) {
            slide.style.opacity = '';
            slide.style.position = '';
          }
          slide.style.opacity = 0;
          slide.style.position = '';
          slide.style.transition = 'all 250ms linear';
        }
      }
    }

    action() {
      this.timer = setInterval(function () {
        this.index++;
        if (this.index == this.slides.length) {
          this.index = 0;
        }
        this._slideTo(this.index);
      }.bind(this), this.delay);
    }

    addHoverListener() {
      this.el.addEventListener("mouseover", function () {
        clearInterval(this.timer);
        this.timer = null;
      }.bind(this));

      this.el.addEventListener("mouseout", function () {
        this.action();
      }.bind(this));
    }
  }
    theme.offerSliderInstances = [];
    theme.offerSliderInstances = [new AutoSlider(".slider-section #main-slider"), new AutoSlider(".slideshow_offer_mobile #main-slider")]
  })

