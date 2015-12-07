pageSections = ['overview',
             'yeartoyear',
             'flow',
             'table',
             'bookmark',
             'recentchanges'];

sectionDefault = pageSections[0];

$(document).ready(loadSectionFromHash);
$(window).on('hashchange', loadSectionFromHash);

function loadSectionFromHash() {
  sectionRequested = location.hash.slice(1);


  sectionToLoad = sectionDefault;
  for (i = 0; i < pageSections.length; i++) {
    if (sectionRequested == pageSections[i]) {
      sectionToLoad = pageSections[i];
    }
  }

  $("#mainContent").load("sections/" + sectionToLoad + ".html");
  $.getScript("js/" + sectionToLoad + ".js");
  $("li.active,button.active").toggleClass('active');
  $("#nav-" + sectionToLoad).toggleClass('active');
}


