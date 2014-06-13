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

var after = function(timeout, fn) {
  return setTimeout(fn, timeout);
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
      select('.pinned').classList.remove('hidden');
    } else {
      select('.docked-bottom').classList.add('hidden');
      select('.pinned').classList.add('hidden');
    }
  });
});


// Restoring tabs
var recentTabs = collect('.tabs[data-tab-type="recent"] li:not(.last-entry), .tabs[data-tab-type="synced"] li:not(.last-entry)');
recentTabs.forEach(function(item) {
  item.addEventListener('click', function(e) {
    this.classList.add('animate-shrink');
    var self = this;
    after(500, function() {
      pluckClass('pulse', currentTabButton, 500);
      self.remove();
    });
  });
});

// Switching between MVP and full mode
select('#toggle-mvp').addEventListener('click', function() {
  select('.sections').classList.toggle('hidden');
  select('.docked-bottom').classList.toggle('hidden');
});

// Toggling small mode
select('#toggle-small-mode').addEventListener('click', function() {
  select('#app').classList.toggle('small-mode')
});

