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
    const currentElement =  document.querySelector('.chill-story-value-block-section');
    const stickyContainerRect = stickyContainer.getBoundingClientRect(),
    currentElementRect = currentElement.getBoundingClientRect();
    stickyContainer.style.height = currentElementRect.bottom - stickyContainerRect.top + 'px';
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
  this.querySelector('.play_overlay').style.display = "none";
  var num = index+1;
  var iframes = $('#player-'+num)[0];
  var player = $f(iframes); 
  player.api('play');  
}
function hideVideo(index, e) {    
  this.querySelector('.video_image_container').style.display = "block";
  this.querySelector('.play_overlay').style.display = "block";
  var num = index+1;
  var iframes = $('#player-'+num)[0];
  var player = $f(iframes);     
  player.api('pause');
}


$(document).ready(function () {
  updateContainer();
  $(window).resize(function() {
      updateContainer();
      scrollAbout();
  });
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
  scrollAbout();

  $('.custom_sub_button').click(function(){
    $(this).closest('.block-inner').find('.block-inner-card-info').addClass('add_info_sub');
  });
  $('.close_card_info').click(function(){
    $(this).closest('.block-inner').find('.block-inner-card-info').removeClass('add_info_sub');
  });
  
  $('.add_to_cart_btn').click(function(){    
    addItemToCart( $(this).attr("data-product-id") , 1)
  });

  function addItemToCart(variant_id, qty) {
    data = {
      "id": variant_id,
      "quantity": qty
    }
    jQuery.ajax({
      type: 'POST',
      url: '/cart/add.js',
      data: data,
      dataType: 'json',
      success: function() { 
        document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
        bubbles: true  
       }));
      }
    });
    document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
    	bubbles: true 
 	 }));
  }

  theme.icons = {    
    chevronLeft: '<svg xmlns="http://www.w3.org/2000/svg" width="23.827" height="23.827" viewBox="0 0 23.827 23.827"><path id="arrow_forward_FILL0_wght400_GRAD0_opsz48" d="M11.913,23.827l-1.564-1.6,9.2-9.2H0V10.8H19.545l-9.2-9.2L11.913,0,23.827,11.913Z" transform="translate(23.827 23.827) rotate(180)"/></svg>',
    chevronRight: '<svg xmlns="http://www.w3.org/2000/svg" width="23.827" height="23.827" viewBox="0 0 23.827 23.827"><path id="arrow_forward_FILL0_wght400_GRAD0_opsz48" d="M19.913,31.827l-1.564-1.6,9.2-9.2H8V18.8H27.545l-9.2-9.2L19.913,8,31.827,19.913Z" transform="translate(-8 -8)"/></svg>',
  };

  $('.testimonial_list__inner').slick({
    infinite: false,
    slidesToShow: 1.6,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: '<button type="button" class="slick-product-prev" aria-label="">' + theme.icons.chevronLeft + '</button>',
    nextArrow: '<button type="button" class="slick-product-next" aria-label="">' + theme.icons.chevronRight + '</button>',
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
        breakpoint: 1008,
        settings: {
          slidesToShow: 1.4,
          slidesToScroll: 1,
          arrows: false,
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1,
          arrows: false,
        }
        // settings: "unslick"
      }
  
    ]
  });
});
(function(){
  var d = document,
      tabs = d.querySelector('.tabs'),
      tab = d.querySelectorAll('li'),
      contents = d.querySelectorAll('.content');
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
        d.querySelector(tabId).classList.toggle('active'); 
      }  
  });
})();
