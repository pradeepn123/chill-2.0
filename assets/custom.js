function updateContainer() {
  if ($(window).width() >= 1200 ){
    $('.image-wrapper').hover(
      function() {
        $('.image-wrapper').not(this).toggleClass('squeeze');
        $(this).toggleClass('stretch');
      }, 
      function() {
        $('.image-wrapper').not(this).toggleClass('squeeze');
        $(this).toggleClass('stretch');
      }
    );
  }
}

function scrollAbout(){
  if ($(window).width() >= 1200 ){
    //our story value scoll
    const stickyContainer = document.querySelector('.faq-index__sticky-container');
    if(stickyContainer){
        const currentElement =  document.querySelector('.chill-story-value-block-section, .featured_block_list');
        const stickyContainerRect = stickyContainer.getBoundingClientRect();
        const currentElementRect = currentElement.getBoundingClientRect();
        stickyContainer.style.height = currentElementRect.bottom - stickyContainerRect.top + 'px';
    }
  }
}

//vimeo video player on hover
var videoBlog = $(".chill-videos-item");
[].forEach.call(videoBlog, function (item,index) {
  item.addEventListener('mouseover', hoverVideo.bind(item,index), false);
  item.addEventListener('mouseout', hideVideo.bind(item,index), false);    
});

function hoverVideo(index, e) {  
  this.querySelector('.video_image_container').style.display = "none";
  this.querySelector('.play_overlay').style.display = "block";
  var num = index+1;
  var iframes = $('#player-'+num)[0];
  var player = $f(iframes); 
  player.api('play');  
}

function hideVideo(index, e) {    
  this.querySelector('.video_image_container').style.display = "block";
  this.querySelector('.play_overlay').style.display = "none";
  var num = index+1;
  var iframes = $('#player-'+num)[0];
  var player = $f(iframes);     
  player.api('pause');
}

$(document).ready(function () {
    AOS.init({duration: 1200})
    let items = document.querySelectorAll('.menu-mega-nav li');

    items.forEach( item => item.addEventListener('mouseenter', handleHover))

    document.addEventListener("TikShop:cart:updated", function(e) {
        document.documentElement.dispatchEvent(new CustomEvent('theme:cartchanged', { bubbles: true, cancelable: false }))
    })

  function handleHover() {
    const items = this.parentElement.querySelectorAll(".menu-item")
    items.forEach(item => item.classList.remove('active'))
    this.classList.add('active')
  }
  
  $('.custom_sub_button').click(function(){
    $(this).closest('.block-inner').find('.block-inner-card-info').addClass('add_info_sub');
  });
  $('.close_card_info').click(function(){
    $(this).closest('.block-inner').find('.block-inner-card-info').removeClass('add_info_sub');
  });
  
  $('.readmore').click(function (event) {
    event.preventDefault();
    var descriptionFull = document.querySelector('.product-description-full');
    descriptionFull.style.display = 'block';
    var descriptionShort = document.querySelector('.product-description-short');
    descriptionShort.style.display = 'none';
  });
  $('.readless').click(function (event) {
    event.preventDefault();
    var descriptionFull = document.querySelector('.product-description-full');
    descriptionFull.style.display = 'none';
    var descriptionShort = document.querySelector('.product-description-short');
    descriptionShort.style.display = 'block';
  });  
  
  $('#imageCarouselContainer .image_carousel_div').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 8000,
    pauseOnHover: false,
    infinite: true,
    cssEase: 'linear',
    responsive: [
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
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
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true
            }
        }
    ]
    
});

if(window.screen.width < 1200){
    var $carousel = $('.flavour_block_container');
    $carousel.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        autoplay:true,
        autoplaySpeed:3000,
        adaptiveHeight: true,
        asNavFor: '.progressBar'
    })
    
    $('.progressBar ').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.flavour_block_container',
        dots: false,
        autoplay:true,
        autoplaySpeed:3000,
        centerMode: false,
        focusOnSelect: true
    });
// //remove active class from all thumbnail slides
$('.flavour_block_container .slick-slide').removeClass('slick-active');

// //set active class to first thumbnail slides
$('.flavour_block_container .slick-slide').eq(0).addClass('slick-active');

// // On before slide change match active thumbnail to current slide
$('.flavour_block_container').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    var mySlideNumber = nextSlide;
    $('.flavour_block_container .slick-slide').removeClass('slick-active');
    $('.flavour_block_container .slick-slide').eq(mySlideNumber).addClass('slick-active');
});
    // $('.flavour_block_container.slider').slick({
    //     draggable:true,    
    //     arrows:false,    
    //     autoplay:false,
    //     autoplaySpeed:800,     
    //     slidesToShow:1,     
    //     slidesToScroll:1,   
    //     dots: false
    // });
    // $('.flavour_block_container.slider').css({
    //     'padding-bottom': '80px'
    // })
    // var percentTime;
    // var tick;
    // var time = 1;
    // var progressBarIndex = 0;
    // $('.progressBarContainer .progressBar').each(function(index) {        
    //     console.log(this.parentElement)
    //     var progress = "<div class='inProgress inProgress" + index + "'></div>";
    //     $(this).html(progress);
    //     function startProgressbar() {
    //         resetProgressbar();
    //         percentTime = 0;
    //         tick = setInterval(interval, 10);
    //     }
    
    //     function interval() {
    //         if (($('.flavour_block_container.slider .slick-track div[data-slick-index="' + progressBarIndex + '"]').attr("aria-hidden")) === "true") {
    //             progressBarIndex = $('.flavour_block_container.slider .slick-track div[aria-hidden="false"]').data("slickIndex");
    //             startProgressbar();
    //         } else {
    //             percentTime += 1 / (time + 5);
    //             $('.inProgress' + progressBarIndex).css({
    //                 width: percentTime + "%"
    //             });
                
    //             if (percentTime >= 100) {
    //                 $('.single-item').slick('slickNext');
    //                 progressBarIndex++;
    //                 if (progressBarIndex > 2) {
    //                     progressBarIndex = 0;
    //                 }
    //                 startProgressbar();
    //             }
    //         }
    //     }
    
    //     function resetProgressbar() {
    //         $('.inProgress').css({
    //             width: 0 + '%'
    //         });
    //         $('#activeThumbnail').removeClass('active')
    //         clearInterval(tick);
    //     }
    //     startProgressbar();
    //     // End ticking machine
    
    //     $('.progressBarContainer div').click(function () {
    //         clearInterval(tick);
    //         var goToThisIndex = $(this).find("span").data("slickIndex");
    //         $('.single-item').slick('slickGoTo', goToThisIndex, false);
    //         startProgressbar();
    //     });
    // });


    // document.querySelectorAll('.flavour_block_container .custom-dot').forEach(e => {
    //     let customImages = document.querySelectorAll('.customSlickDots');
    //     var customimage;
    //     customImages.forEach((customImage) => {
    //         customimage = customImage;
    //     })
    //     e.appendChild(customimage);
    //     if(e.parentNode.classList.contains('slick-active')){
    //         e.style.borderColor = customimage.dataset.color;
    //     }else{
    //         e.style.borderColor = 'transparent';
    //     }
        
    // })
}
  if(window.screen.width < 1200){
    $('.stress-effect-block-list .fixed-layout').slick({
        draggable:true,    
        arrows:false,    
        autoplay:true,
        autoplaySpeed:2500,     
        slidesToShow:1,     
        slidesToScroll:1,   
        dots:true
      });
    $('.slider_image_wrapper_mobile').slick({
        draggable:true,    
        arrows:false,  
        autoplay:false,
        autoplaySpeed:2500,     
        slidesToShow:1,     
        slidesToScroll:1,   
        dots:true,
        infinite: false
    })
    var tabContentParentProduct = $('.product_ingredients_sec .content-section .content.active')
    for(i = 0; i< tabContentParentProduct.length; i++){
        var tabContentList = tabContentParentProduct[i].querySelector('.tab-content-list ');
        $(tabContentList).slick({
            draggable:true,    
            arrows:false,    
            autoplay:true,
            autoplaySpeed:3500,     
            slidesToShow:1,     
            slidesToScroll:1,   
            dots:true
        })
    }
    var tabContentParent = $('.section-home-ingredients .content-section .content.active')
    for(i = 0; i< tabContentParent.length; i++){
        var tabContentList = tabContentParent[i].querySelector('.tab-content-list');
        $(tabContentList).slick({
            draggable:true,    
            arrows:false,    
            autoplay:true,
            autoplaySpeed:3500,     
            slidesToShow:1,     
            slidesToScroll:1,   
            dots:true
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

  $('.testimonial_list__inner').slick({
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
  $('#gallery').slick({
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

  function handleResizeBannerText () {
    const claimBannerTextDesktop = document.querySelectorAll(".claim_banner_text_desktop")
    const claimBannerTextMobile = document.querySelectorAll(".claim_banner_text_mobile")

    if (claimBannerTextDesktop && claimBannerTextMobile) {
        if (window.innerWidth < 768) {
            claimBannerTextDesktop.forEach(elem => elem.style.display = "none")
            claimBannerTextMobile.forEach(elem => elem.style.display = "")
        } else {
            claimBannerTextDesktop.forEach(elem => elem.style.display = "")
            claimBannerTextMobile.forEach(elem => elem.style.display = "none")
        }
    }
  }

  $(window).resize(function() {
      updateContainer();
      scrollAbout();
      handleResizeBannerText()
  });
  // const animation_items = [...document.getElementsByClassName('list__item')];
//   const containerElem = document.getElementById('containerElem');
//   if (containerElem) {
//     const leftSideOfContainer = containerElem.getBoundingClientRect().left; 
//     const listElem = document.getElementById('list');
//     let currentLeftValue = 0;
            
//     window.setInterval(animationLoop, 10);    
//     function animationLoop() {
//         const firstListItem = listElem.querySelector('.list__item:first-child');      
//         let rightSideOfFirstItem = firstListItem.getBoundingClientRect().right;
//         if(rightSideOfFirstItem == leftSideOfContainer){
//         currentLeftValue = -1;
//         listElem.appendChild(firstListItem);
//         }      
//         listElem.style.marginLeft = `${currentLeftValue}px`;
//         currentLeftValue--;
//     }
//   }
  var figure2 = $(".chill-videos-item");
  var vid = figure2.find(".play-video");
  var videoNo = vid.length;

  for (let i = 1; i <= videoNo; i++){
      let iframees = document.querySelector('#player-'+i);
      let playeer1 = new Vimeo.Player(iframees);
      playeer1.getDuration().then(function(duration) {
          var ids =  document.querySelector('#player-'+i);
          ids.parentElement.parentElement.querySelector('.video-length').innerHTML  = duration.toFixed(0)+' sec';
      });
  }  
  
//   $('.add_to_cart_btn').click(function(){    
//     addItemToCart( $(this).attr("data-product-id") , 1)
//   });

//   function addItemToCart(variant_id, qty) {
//     data = {
//       "id": variant_id,
//       "quantity": qty
//     }
//     jQuery.ajax({
//       type: 'POST',
//       url: '/cart/add.js',
//       data: data,
//       dataType: 'json',
//       success: function() { 
//         document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
//         bubbles: true  
//        }));
//       }
//     });
//     document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
//     	bubbles: true 
//  	 }));
//   }

});

(function(){
  var d = document,
      tabs = d.querySelector('.tabs, .product-tabs'),
      tab = d.querySelectorAll('li'),
      contents = d.querySelectorAll('.content');
      if (!tabs) {
        return false;
      }
      tabs.addEventListener('click', function(e) {
      if (e.target && e.target.nodeName === 'LI') {
        // change tabs
        for (var i = 0; i < tab.length; i++) {
          tab[i].classList.remove('active');
        }
        e.target.classList.toggle('active');
        // change content
        for (i = 0; i < contents.length; i++) {
          contents[i].classList.remove('active');
        }
        
        var tabId = '#' + e.target.dataset.tabId;
        const contentTab = d.querySelector(tabId)
        contentTab.classList.toggle('active');

        if(window.screen.width < 1200){
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
})();


function customFeatureProductSubcriptionEvents (){
    $('.custom_sub_button').click(function() {
        $(this).closest('.block-inner').find('.block-inner-card-info').addClass('add_info_sub');
    });
    featureProductSubscriptionUtil.EventHandler();

    $('.close_card_info').click(function(){
        $(this).closest('.block-inner').find('.block-inner-card-info').removeClass('add_info_sub');
    });

    const sortDropdownHeading = document.getElementById('sort-dropdown-heading')

    if (sortDropdownHeading) {
        sortDropdownHeading.addEventListener('click',  function() {
            if (document.querySelector('.utility-bar .link-dropdown__button').hasAttribute('disabled')) {
                document.querySelector('.utility-bar .link-dropdown__button').removeAttribute('disabled');
                document.addEventListener('click', handleDocumentClick);
            } else {
                document.querySelector('.utility-bar .link-dropdown__button').setAttribute('disabled', 'disabled');
                document.removeEventListener('click', handleDocumentClick);
            }

            document.querySelector('.utility-bar .link-dropdown__button-icon').toggleAttribute('active');
        })
    }

    var loadMoreFilters = document.querySelectorAll('.loadmore');
    if (loadMoreFilters.length) {
        loadMoreFilters.forEach(el => el.addEventListener('click', function() {
            var forloopIndex = this.dataset.forloop;
            document.querySelectorAll('.filter-group--' + forloopIndex + ' .filter_full').forEach(el => el.style.display = 'block');
            document.querySelectorAll('.filter-group--' + forloopIndex + ' .filter_limited').forEach(el => el.style.display = 'none');
        }))
    }
}

function handleDocumentClick(evt) {
    const utilityBar = evt.target.closest(".utility-bar__right")
    if (evt.target.closest("#sort-dropdown-heading") || (utilityBar && utilityBar.querySelector(".link-dropdown__button-text"))) {
        return false
    }
    document.querySelector('.utility-bar .link-dropdown__button-icon').toggleAttribute('active');
    document.querySelector('.utility-bar .link-dropdown__button').setAttribute('disabled', true);
    document.removeEventListener('click', handleDocumentClick)
}


const featureProductSubscriptionUtil = (function () {
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
        const updateVariantPrice = (currentInstance, variantObj) =>{
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
                formAddToCartBtn.classList.add(classUtil.activeButtonPreloader);
                
                if(getOtherAddToCartBtn){
                    getOtherAddToCartBtn.classList.add(classUtil.activeButtonPreloader);
                }

            }

            const hidePreloaderState = () => {
                formAddToCartBtn.classList.remove(classUtil.activeButtonPreloader);
                if(getOtherAddToCartBtn){
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
            subPopup.classList.remove(classUtil.activeSubPopup);
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
})();

document.addEventListener('DOMContentLoaded', () => {
    featureProductSubscriptionUtil.EventHandler();
    let customProductForms = document.querySelectorAll("#custom-product-form")
    if (customProductForms.length) {
        customProductForms.forEach((customProductForm) => {
            customProductForm.addEventListener("submit", theme.customAddToCart)
        })
    }
})

theme.customAddToCart = function(e) {
    e.preventDefault()
    const $form = $(this)

    $form.find('button[type="submit"]')
    .attr('disabled', 'disabled')
    .val(theme.strings.products_product_adding_to_cart);

    var formData = new FormData(this);
    formData.append('sections', 'cart-drawer');

    $.post(theme.routes.cart_add_url, new URLSearchParams(formData).toString(), function() {
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
        successMessageContainers.forEach((successMessageContainer)=> successMessageContainer.remove())
        theme.offerSliderInstances.forEach((autoSlide) => {
            autoSlide.reinit()
        })

    }.bind(this), 'json')
    .fail(function (data) {
        $form.find('button[type="submit"]').removeAttr('disabled')
    })

    return false
}
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
        currentSlide.style.opacity = 1;
        currentSlide.style.position = 'relative';
  
        for (let i = 0; i < this.slides.length; i++) {
            let slide = this.slides[i];
            if (slide !== currentSlide) {
                if(slide.style.opacity == 1){
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

// theme.openDrawerCartQuickView = function () {
//     var cartSummary = document.querySelector("#quick-view-product-drawer")
//     cartSummary.classList.add("cart-drawer-open")
//     $('body').addClass("cart-drawer-open")
//     $('#cart-drawer-backdrop')
//     .fadeIn(100)
//     .on("click", theme.closeDrawerCart.bind(theme))
// };

// theme.closeDrawerCartQuickView = function () {
//     var cartSummary = document.querySelector("#quick-view-product-drawer")
//     cartSummary.classList.remove("cart-drawer-open")
//     $('body').removeClass("cart-drawer-open")

//     $('#cart-drawer-backdrop')
//     .fadeOut(100)
//     .off("click", theme.closeDrawerCart.bind(theme))
// };
// document.querySelector('.utility-bar .link-dropdown__button').removeAttribute('disabled');
var marqueeAnimations = document.querySelectorAll('.marquee_container.animate-with-scroll');
window.addEventListener('wheel', evt => {
    evt.preventDefault();
    marqueeAnimations.forEach(marqueeAnimation => {
        evt.preventDefault();
        if(evt.deltaY > 0){
            marqueeAnimation.classList.remove('scroll_up');
            marqueeAnimation.classList.add('scroll_down');
        }
        else if(evt.deltaY <= 0){
            marqueeAnimation.classList.remove('scroll_down');
            marqueeAnimation.classList.add('scroll_up');
        }
    })
})