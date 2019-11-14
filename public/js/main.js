document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems,{});
});

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {
        hoverEnabled: false
    });
  });

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems,{
        coverTrigger:false,
        constrainWidth:false
    });
});

document.addEventListener("DOMContentLoaded", function(){
	$('.preloader-background').delay(750).fadeOut('slow');
	$('.preloader-wrapper').delay(750).fadeOut();
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then((reg) => {
            });
    });
}
