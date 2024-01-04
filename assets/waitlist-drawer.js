
document.addEventListener('DOMContentLoaded', function () {
  function openWaitlistDrawer() {
    document.getElementById('waitlistDrawerContainer').style.display = 'block';
    document.getElementById('waitlistDrawerBackground').style.display = 'block';
    document.getElementById('waitlistDrawerContainer').classList.add('claim-drawer-open');
    document.querySelector("body").classList.add("cart-drawer-open")
    if (document.getElementById('waitlistDrawerContainer').classList.contains('claim-drawer-close')) {
      document.getElementById('waitlistDrawerContainer').classList.add('claim-drawer-close');
    }
  }

  // document.querySelector('.header_button').addEventListener('click', () => {
  //     openWaitlistDrawer();
  // })

  // document.querySelector('.video-container .overlay-text__button').addEventListener('click', () => {
  //     openWaitlistDrawer();
  // })
  // document.querySelectorAll('.flavour_button').forEach(flavour => {
  //     flavour.addEventListener('click', () => {
  //         openWaitlistDrawer();
  //     })
  // })

  let waitlistDrawerBackgroundClick = document.getElementById('waitlistDrawerBackground');
  if (waitlistDrawerBackgroundClick) {
    waitlistDrawerBackgroundClick.addEventListener('click', function () {
      document.querySelector('.waitlist-drawer-summary__close').click()
      document.querySelector("body").classList.remove("cart-drawer-open")
    })
  }

  function validateForm(e) {
    document.querySelector('.waitlist_success_message').style.display = 'block';
    document.querySelector('.form-body').style.display = 'none';
    let customer_email = document.forms['email-form']['email'].value;
    let customer_state = document.forms['email-form']['address[province]'].value;
    console.log('Email: ', customer_email);
    console.log("State:", customer_state);
    addItemToAPI(customer_email, customer_state);
  }

  function addItemToAPI(customer_email, customer_state) {
    data = {
      "email": customer_email,
      "state": customer_state
    }
    jQuery.ajax({
      type: 'POST',
      url: 'https://chill-klaviyo.herokuapp.com/api/customer-update/',
      data: data,
      dataType: 'json'
    });
  }
})