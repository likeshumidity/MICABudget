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
var $chooseBookmarks = {};
var $accounts = {};
var $funds = {};
var $departments = {};
var $programs = {};
var $years = {};

var filteredData = [];
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

var bookmarksPublic = {
  'All': {
    'accounts': [
      '*'
    ],
    'funds': [
      '*'
    ],
    'departments': [
      '*'
    ],
    'programs': [
      '*'
    ],
    'years': [
      '*'
    ]
  },
  'None': {
    'accounts': [
      ''
    ],
    'funds': [
      ''
    ],
    'departments': [
      ''
    ],
    'programs': [
      ''
    ],
    'years': [
      ''
    ]
  },
  'Expense - Capital': {
    'accounts': [
      "571212 - Building Improvement",
      "571223 - Equipment and Furnishing",
      "573002 - Construction in Process - Bldg"
    ],
    'funds': [
      '*'
    ],
    'departments': [
      "99101 - Capital - Land & Building",
      "99102 - Capital - Buildng Improvements",
      "99103 - Capital - Operations Equipment",
      "99105 - Capital - Offc Technology Proj"
    ],
    'programs': [
      '*'
    ],
    'years': [
      '*'
    ]
  },
  'Expense - Comp': {
    'accounts': [
      "312101 - Exempt Staff",
      "312102 - Non-exempt Staff",
      "312103 - Part Time Staff",
      "312108 - Temporary Staff MICA"
    ],
    'funds': [
      '*'
    ],
    'departments': [
      '*'
    ],
    'programs': [
      ''
    ],
    'years': [
      '*'
    ]
  },
  'Expense - NonComp': {
    'accounts': [
      "101002 - Office Supplies",
      "101006 - Special Event Supplies",
      "101007 - First Aid Supplies",
      "101008 - Uniforms",
      "104000 - Vehicle Maintenance",
      "104002 - Vehicle Fuel",
      "104003 - Vehicle Licences",
      "105011 - Staff Training",
      "111004 - Safety Inspections"
    ],
    'funds': [
      '*'
    ],
    'departments': [
      '*'
    ],
    'programs': [
      ''
    ],
    'years': [
      '*'
    ]
  },
  'Expense - Vehicles': {
    'accounts': [
      '104000 - Vehicle Maintenance',
      '104002 - Vehicle Fuel'
    ],
    'funds': [
      '110 - Current Unrestricted'
    ],
    'departments': [
      "71501 - FACMAN Vehicles"
    ],
    'programs': [
      ''
    ],
    'years': [
      '*'
    ]
  }
};

// name of autocomplete list, 0 = single select or 1 = multi-select, length of
// id value
var autocompletes = [
  ['accounts', 3, 6],
  ['funds', 3, 3],
  ['departments', 3, 5],
  ['programs', 3, 4],
  ['years', 3, 4],
  ['bookmarksPublic', 6, 0],
  ['bookmarksPrivate', 5, 0]
];

var autocompletes2 = {
  'accounts': [3, 6],
  'funds': [3, 3],
  'departments': [3, 5],
  'programs': [3, 4],
  'years': [3, 4],
  'bookmarksPublic': [6],
  'bookmarksPrivate': [5]
};

$('.userchange').click( function() {
  toggleOnChange('.filter-attributes', 'off');

  thisUser = $(this)
    .context
    .id
    .substr(11);

  loadAutocompletes();
  bookmarksUpdate();
  filterData();
  updateContent();

  $('.selected-user').toggleClass('selected-user');
  $(this).addClass('selected-user');

  toggleOnChange('.filter-attributes', 'on');
});

$(document).ready(function() {
  loadAutocompletes();
  bookmarksUpdate();
  filterData();

  $('.filter-attributes').change(function() {
    filterData();
    updateContent();
    $('.hide-this').removeClass('hide-this');
  });
});

function loadAutocompletes() {
  for (i = 0; i < autocompletes.length; i++) {
    if (autocompletes[i][1] == 0) {
      $('#choose-' + autocompletes[i]).autocomplete({
        source: eval(autocompletes[i][0])
      });
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

      eval('$' + autocompletes[i][0] + ' =  $("#filter-' + autocompletes[i][0] + '").select2();');
    } else if (autocompletes[i][1] == 4) {
      $('#choose-bookmarks').html('');
      $('#choose-bookmarks')
        .append('<optgroup label="Public" id="choose-bookmarks-public"></optgroup>');
      $('#choose-bookmarks-public')
        .append(inputSelectFromList(eval(autocompletes[i][0]), 100));
      $('#choose-bookmarks').select2();
    } else if (autocompletes[i][1] == 6) {
      $('#choose-bookmarks').html('');
      $('#choose-bookmarks')
        .append('<optgroup label="Public" id="choose-bookmarks-public"></optgroup>');
      $.each(bookmarksPublic, function(key, val) {
        $('#choose-bookmarks-public').append('<option value="'
            + key
            + '">'
            + key
            + '</option>');
      });

      var $chooseBookmarks = $('#choose-bookmarks').select2();

    }
  }
}

function inputSelectFromList(listOfElements, valueLength) {
  var htmlFragment = '';
  for (j = 0; j < listOfElements.length; j++) {
    htmlFragment += '<option value="'
//      + listOfElements[j].substr(0,valueLength)
      + listOfElements[j]
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
  bookmarksUpdate($(this).context.value);
});

// accepts bookmark name as string or sets 'All' as default
function bookmarksUpdate(bm) {
  if (bm === undefined) {
    bm = 'All';
  }

  $.each(bookmarksPublic, function(key, val) {
    var valueList = [];
    if (key == bm) {
      $.each(val, function(key2, val2) {
        eval('$' + key2 + '.val(null).trigger("change");');

        if (val2.length == 1 && val2[0] === "*") {
          eval('valueList = available' + toCapitalized(key2) + ';');
        } else {
          valueList = val2;
        }

        if(valueList.length > 0) {
          eval('$' + key2 + '.val(valueList).trigger("change");');
        }
      });
    }
  });

  $('.notice-unsaved').addClass('hide-this');
}

function filterClearAll(id) {
  eval('$' + id.substr(0, id.length - 10) + '.val(null).trigger("change");');
}

function filterSelectAll(id) {
  var filterName = id.substr(0, id.length - 11);
  var allValues = eval('available' + toCapitalized(filterName));

  if (allValues.length == 1) {
    eval('$' + filterName + '.val(allValues[0]).trigger("change");');
  } else if (allValues.length > 1) {
    eval('$' + filterName + '.val(allValues).trigger("change");');
  } else {
    // Do nothing
  }
}

$('.select-all').click(function() {
  filterSelectAll($(this).context.id);
});

$('.clear-all').click(function() {
  filterClearAll($(this).context.id);
});

// Load data available to user
function filterData() {
  filteredData = $.grep(rawData, isSelectedData);
//  console.log(filteredData.length);
}

function isSelectedData(val, key) {
  if (($.inArray(val.acct, $accounts.val()) > -1)
     && ($.inArray(val.fund, $funds.val()) > -1)
     && ($.inArray(val.dept, $departments.val()) > -1)
     && ($.inArray(val.year, $years.val()) > -1)
     && ((($programs.val() === null) && (val.prog.length < 1))
     || ($.inArray(val.prog, $programs.val()) > -1))) {
    return true;
  } else {
    return false;
  }
}

var rawData = [];

$.getJSON('data/fakeDataTrans.json', function(data) {
  rawData = data;
});

function toggleOnChange(selector, changeTo) {
  if (changeTo == 'on') {
    $(selector).change(function() {
      filterData();
      updateContent();
      $('.hide-this').removeClass('hide-this');
    });
  } else {
    $(selector).off('change');
  }
}

