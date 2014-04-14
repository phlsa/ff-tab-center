var collect = function(selector) {
  var items = document.querySelectorAll(selector);
  var ar = [];
  for (var i=0; i<items.length; i++) {
    ar.push(items[i]);
  }
  return ar;
}

var select = function(selector) {
  return document.querySelectorAll(selector)[0];
}

var pluckClass = function(className, item, timeout) {
  if (!timeout) timeout = 0;
  item.classList.add(className);
  setTimeout(function() {
    item.classList.remove(className);
  }, timeout);
}

var frontImage = document.getElementById('front-image');
var trigger = document.getElementById('trigger');
var currentTabButton = select('.tab-button[data-tab-type="current"]');


// Slide out the front image
trigger.addEventListener('click', function(e) {
  e.stopPropagation();
  frontImage.classList.toggle('out');
});
frontImage.addEventListener('click', function(e) {
  frontImage.classList.remove('out');
});


// Switching sections
var sectionButtons = collect('.tab-button');
sectionButtons.forEach(function(button) {
  var type = button.getAttribute('data-tab-type');
  var section = select('.tabs[data-tab-type="' + type + '"]');
  button.addEventListener('click', function(e) {
    sectionButtons.forEach(function(item) { item.classList.remove('active') });
    collect('.tabs').forEach(function(item) { item.classList.remove('active') });
    button.classList.add('active');
    section.classList.add('active');
    if (type === "current") {
      select('.docked-bottom').classList.remove('hidden');
    } else {
      select('.docked-bottom').classList.add('hidden');
    }
  });
});


// Restoring tabs
var recentTabs = collect('.tabs[data-tab-type="recent"], .tabs[data-tab-type="synced"]');
recentTabs.forEach(function(item) {
  item.addEventListener('click', function(e) {
    pluckClass('pulse', currentTabButton, 500);
  });
});


