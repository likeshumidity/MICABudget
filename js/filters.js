var accessPrivileges = {
  'vp': {
    'accounts': [
      "101002 - Office Supplies",
      "101006 - Special Event Supplies",
      "101007 - First Aid Supplies",
      "101008 - Uniforms",
      "104000 - Vehicle Maintenance",
      "104002 - Vehicle Fuel",
      "104003 - Vehicle Licences",
      "105011 - Staff Training",
      "111004 - Safety Inspections",
      "312101 - Exempt Staff",
      "312102 - Non-exempt Staff",
      "312103 - Part Time Staff",
      "312108 - Temporary Staff MICA",
      "450000 - Event & Program Income",
      "450001 - Ticket/Registration Sales",
      "450002 - Art/Goods Sales",
      "450003 - Food Sales",
      "571212 - Building Improvement",
      "571223 - Equipment and Furnishing",
      "573002 - Construction in Process - Bldg"
    ],
    'funds': [
      "110 - Current Unrestricted",
      "175 - Capital Acquistion -In Process"
    ],
    'departments': [
      "71180 - Main Building",
      "71196 - 1515 Mt Royal Ave",
      "71501 - FACMAN Vehicles",
      "75001 - Campus Safety",
      "90020 - College Store",
      "90091 - MICA Facilities Rentals",
      "90135 - Office of Events",
      "91030 - Commons",
      "91035 - Commons II",
      "91060 - Meyerhoff House Dorm",
      "91105 - Parkhurst Food Service",
      "99101 - Capital - Land & Building",
      "99102 - Capital - Buildng Improvements",
      "99103 - Capital - Operations Equipment",
      "99105 - Capital - Offc Technology Proj"
    ],
    'programs': [
      "6058 - 10 E. North Ave",
      "6056 - 1801 Falls Road",
      "6013 - Art Tech Center",
      "1201 - Elevators"
    ],
    'years': [
      "2016",
      "2015",
      "2014"
    ]
  },
  'hiringmanager': {
    'accounts': [
      "101002 - Office Supplies",
      "101006 - Special Event Supplies",
      "101007 - First Aid Supplies",
      "101008 - Uniforms",
      "104000 - Vehicle Maintenance",
      "104002 - Vehicle Fuel",
      "104003 - Vehicle Licences",
      "105011 - Staff Training",
      "111004 - Safety Inspections",
      "312101 - Exempt Staff",
      "312102 - Non-exempt Staff",
      "312103 - Part Time Staff",
      "312108 - Temporary Staff MICA"
    ],
    'funds': [
      "110 - Current Unrestricted",
      "175 - Capital Acquistion -In Process"
    ],
    'departments': [
      "71180 - Main Building",
      "71196 - 1515 Mt Royal Ave",
      "71501 - FACMAN Vehicles",
      "75001 - Campus Safety",
      "90020 - College Store",
      "90091 - MICA Facilities Rentals",
      "90135 - Office of Events",
      "91030 - Commons",
      "91035 - Commons II",
      "91060 - Meyerhoff House Dorm",
      "91105 - Parkhurst Food Service"
    ],
    'programs': [
      "6058 - 10 E. North Ave",
      "6056 - 1801 Falls Road",
      "6013 - Art Tech Center",
      "1201 - Elevators"
    ],
    'years': [
      "2016",
      "2015",
      "2014"
    ]
  },
  'budgetmanager': {
    'accounts': [
      "101002 - Office Supplies",
      "101006 - Special Event Supplies",
      "101007 - First Aid Supplies",
      "101008 - Uniforms",
      "104000 - Vehicle Maintenance",
      "104002 - Vehicle Fuel",
      "104003 - Vehicle Licences",
      "105011 - Staff Training",
      "111004 - Safety Inspections",
      "450000 - Event & Program Income",
      "450001 - Ticket/Registration Sales",
      "450002 - Art/Goods Sales",
      "450003 - Food Sales",
      "571212 - Building Improvement",
      "571223 - Equipment and Furnishing",
      "573002 - Construction in Process - Bldg"
    ],
    'funds': [
      "110 - Current Unrestricted",
      "175 - Capital Acquistion -In Process"
    ],
    'departments': [
      "71180 - Main Building",
      "71196 - 1515 Mt Royal Ave",
      "71501 - FACMAN Vehicles",
      "75001 - Campus Safety",
      "90020 - College Store",
      "90091 - MICA Facilities Rentals",
      "90135 - Office of Events",
      "91030 - Commons",
      "91035 - Commons II",
      "91060 - Meyerhoff House Dorm",
      "91105 - Parkhurst Food Service",
      "99101 - Capital - Land & Building",
      "99102 - Capital - Buildng Improvements",
      "99103 - Capital - Operations Equipment",
      "99105 - Capital - Offc Technology Proj"
    ],
    'programs': [
      "6058 - 10 E. North Ave",
      "6056 - 1801 Falls Road",
      "6013 - Art Tech Center",
      "1201 - Elevators"
    ],
    'years': [
      "2016",
      "2015",
      "2014"
    ]
  },
  'staffdriver': {
    'accounts': [
      "104000 - Vehicle Maintenance",
      "104002 - Vehicle Fuel"
    ],
    'funds': [
      "110 - Current Unrestricted"
    ],
    'departments': [
      "71501 - FACMAN Vehicles"
    ],
    'programs': [
    ],
    'years': [
      "2016"
    ]
  }
};

var users = {
  'vp': {
    'title': 'Vice President',
  },
  'hiringmanager': {
    'title': 'Hiring Manager',
  },
  'budgetmanager': {
    'title': 'Budget Manager',
  },
  'staffdriver': {
    'title': 'Staff Driver'
  }
};

var thisUser = 'staffdriver' // Set default user if none selected
var thisUserFakeData = [];

var selectedAccounts = [];
var selectedFunds = [];
var selectedDepartments = [];
var selectedPrograms = [];
var selectedYears = [];

var availableAccounts = [];
var availableFunds = [];
var availableDepartments = [];
var availablePrograms = [];
var availableYears = [];

var bookmarksPublic = [
  'All',
  'None',
  'Expense - Capital',
  'Expense - Comp',
  'Expense - NonComp',
  'Expense - Vehicles',
  'Revenue'
];

// name of autocomplete list, 0 = single select or 1 = multi-select, length of
// id value
var autocompletes = [
  ['accounts', 3, 6],
  ['funds', 3, 3],
  ['departments', 3, 5],
  ['programs', 3, 4],
  ['years', 3, 4],
  ['bookmarksPublic', 4, 0],
  ['bookmarksPrivate', 5, 0]
];

$('.userchange').click( function() {
  thisUser = $(this)
    .context
    .id
    .substr(11);

  loadAutocompletes();
  loadUserChartfields();

  $('.selected-user').toggleClass('selected-user');
  $(this).addClass('selected-user');
});

$(document).ready(loadAutocompletes);
$(document).ready(loadUserChartfields); 

// must use below function due to lack of user permissions available
function loadUserChartfields() {
  $.getJSON('data/fakeDataTrans.json', function(data) {
    $.each(data, function(key, val) {
      if (($.inArray(val.acct, eval('accessPrivileges.' + thisUser + '.accounts')) > -1)
          && ($.inArray(val.fund, eval('accessPrivileges.' + thisUser + '.funds')) > -1)
          && ($.inArray(val.dept, eval('accessPrivileges.' + thisUser + '.departments')) > -1)
          && ($.inArray(val.year, eval('accessPrivileges.' + thisUser + '.years')) > -1)) {
        if (((eval('accessPrivileges.' + thisUser + '.programs').length) == 0)
            || ($.inArray(val.prog, eval('accessPrivileges.' + thisUser + '.programs')) > -1)) {
          thisUserFakeData.push(val);
        }
      }
    });
  });
}

function loadAutocompletes() {
  for (i = 0; i < autocompletes.length; i++) {
    if (autocompletes[i][1] == 0) {
      $('#choose-' + autocompletes[i]).autocomplete({
        source: eval(autocompletes[i][0])
      });
    } else if (autocompletes[i][1] == 1) {
      $('#filter-' + autocompletes[i][0]).append(
        inputSelectFromList(eval('available' + toCapitalized(autocompletes[i][0])),
          autocompletes[i][2])
      );

      $('#filter-' + autocompletes[i][0]).select2();
    } else if (autocompletes[i][1] == 2) {
      $('#choose-' + autocompletes[i]).append(
        inputSelectFromList(eval(autocompletes[i][0]),
          100)
      );

      $('#choose-' + autocompletes[i]).select2();
    } else if (autocompletes[i][1] == 3) {
      populateChartfieldLists(thisUser);

      $('#filter-' + autocompletes[i][0]).html('').append(
        inputSelectFromList(eval('available' + toCapitalized(autocompletes[i][0])),
          autocompletes[i][2])
      );

      $('#filter-' + autocompletes[i][0]).select2();
    } else if (autocompletes[i][1] == 4) {
      $('#choose-bookmarks').html('');
      $('#choose-bookmarks')
        .append('<optgroup label="Public" id="choose-bookmarks-public"></optgroup>');
      $('#choose-bookmarks-public')
        .append(inputSelectFromList(eval(autocompletes[i][0]), 100));
      $('#choose-bookmarks').select2();
    }
  }
}

function inputSelectFromList(listOfElements, valueLength) {
  var htmlFragment = '';
  for (j = 0; j < listOfElements.length; j++) {
    htmlFragment += '<option value="'
      + listOfElements[j].substr(0,valueLength)
      + '">'
      + listOfElements[j]
      + '</option>';
  }

  return htmlFragment;
}

function toCapitalized(txt) {
  return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
}

function populateChartfieldLists(username) {
  // Populate available code lists by permissions allowed
  // DO NOT USE IN PRODUCTION CAN EASILY BE HACKED
  availableAccounts = eval('accessPrivileges.' + username + '.accounts');
  availableFunds = eval('accessPrivileges.' + username + '.funds');
  availableDepartments = eval('accessPrivileges.' + username + '.departments');
  availablePrograms = eval('accessPrivileges.' + username + '.programs');
  availableYears = eval('accessPrivileges.' + username + '.years');
}

$('#choose-bookmarks').change(function() {
  // does this change trigger filter attributes change data refresh?
  console.log('refresh filters from bookmark');
});

$('.filter-attributes').change(function() {
  console.log('refresh data from updated filter list and mark as unsaved');
});

$('.select-all').click(function() {
  console.log('select all from '
              + $(this).context.id.substr(0,$(this).context.id.length - 11)
              + ' and refresh data');
});

$('.clear-all').click(function() {
  console.log('clear all from '
              + $(this).context.id.substr(0,$(this).context.id.length - 10)
              + ' and refresh data');
});



