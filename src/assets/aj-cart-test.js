console.log('aj cart test');

jQuery(function($) {
  console.log('ajax cart test')

 // ajaxCart.init({
  // formSelector: '.shopify-product-form',
  // cartContainer: '#CartContainer',
  // addToCartSelector: '.c-btn--product-form-submit',
  // cartCountSelector: '.CartCount',
  // cartCostSelector: '#CartCost',
  // moneyFormat: theme.moneyFormat
  // );
});

jQuery(document.body).on('afterCartLoad.ajaxCart', function(evt, cart) {
  // Bind to 'afterCartLoad.ajaxCart' to run any javascript after the cart has loaded in the DOM
  timber.RightDrawer.open();
  console.log("Cart loaded")
  console.log('[data-js-sticky-bottom 123]');
  console.log($('[data-js-sticky-bottom]'));
  let checkoutBtn = $('[data-js-sticky-bottom]');


  if (checkoutBtn.length){
    let elementBottom = checkoutBtn.offset().top + checkoutBtn.outerHeight();
    console.log('el bottom');
    console.log(elementBottom);
    let screenBottom = $(window).scrollTop() + $(window).innerHeight();
    console.log('screenBottom');
    console.log(screenBottom);

    if(elementBottom > screenBottom){
      checkoutBtn.addClass('is-sticky-bottom');
      $('.l-quick-cart__cart-list').addClass('is-sticky-bottom')
      $('.l-cart-list').addClass('is-sticky-bottom')
    }
  }


});

jQuery(document.body).on('completeAddItem.ajaxCart', function(evt, cart, text) {
  // Bind to 'afterCartLoad.ajaxCart' to run any javascript after the cart has loaded in the DOM

  //freeshipping();


});
