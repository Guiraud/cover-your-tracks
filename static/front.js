// Send browsers that support JavaScript to the AJAX version of the
// test

var aat_link = '/kcarter?aat=1';
var no_aat_link = '/kcarter';

$(document).ready(function(){
  $('#kcarterlink').attr('href', aat_link);

  $('#acceptable_ads input').change(function(){
    if(this.checked){
      $('#kcarterlink').attr('href', aat_link);
    } else {
      $('#kcarterlink').attr('href', no_aat_link);
    }
  });


  tippy('#whats-this', {
      content: "Afin de tester si certaines régies publicitaires ont été autorisées (liste blanche) par vos outils de protection, votre navigateur tentera de se connecter à l'une d'elles. Vous pouvez activer ou désactiver cette option selon votre préférence."
  });

  $('.stop').on( 'click', function(e) {
    $('.footprints').css('--animation-duration', '0s');
    $('.static-tracks').show();
    $(this).hide();
  });

});
