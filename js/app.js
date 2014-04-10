var frontImage = document.getElementById('front-image');

// Slide out the front image
frontImage.addEventListener('click', function(e) {
  frontImage.classList.toggle('out');
});

// Showing the label for toolbar buttons
var labelPlaceholder = document.getElementById('label-placeholder');
var toolbarButtons = document.querySelectorAll('.toolbar-button');
for (var i=0; i<toolbarButtons.length; i++) {
  toolbarButtons[i].addEventListener('mouseover', function(e) {
    var label = e.currentTarget.getAttribute('data-label');
    labelPlaceholder.innerHTML = label;
  });
  toolbarButtons[i].addEventListener('mouseout', function(e) {
    labelPlaceholder.innerHTML = "";
  });
}
