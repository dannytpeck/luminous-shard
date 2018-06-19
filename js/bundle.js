/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 127);
/******/ })
/************************************************************************/
/******/ ({

/***/ 126:
/*!*********************!*\
  !*** ./src/sort.js ***!
  \*********************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.sortName = sortName;
exports.sortCreated = sortCreated;
exports.sortUpdated = sortUpdated;
exports.throwToArray = throwToArray;
exports.addRemove = addRemove;
exports.findChallenges = findChallenges;
exports.loadCompiler = loadCompiler;
exports.resetPage = resetPage;

var _jquery = __webpack_require__(/*! jquery */ 49);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buttons = [],
    ids = [],
    names = [],
    links = [],
    hiddenDateCreateds = [],
    dateCreateds = [],
    hiddenDateUpdateds = [],
    dateUpdateds = [],
    buttonArray = [],
    countArray = [];

// Sort list of challenges by name/date created/last updated
/* This file is for manipulation of the table - sorting, clearing, and sending table's results to the compiler */
function sortName() {

	var buttonsReordered = [],
	    idsReordered = [],
	    namesReordered = [],
	    hiddenDateCreatedsReordered = [],
	    dateCreatedsReordered = [],
	    hiddenDateUpdatedsReordered = [],
	    dateUpdatedsReordered = [];

	var sortAlphaNum = function sortAlphaNum(a, b) {
		var aA = a.replace(/[^a-zA-Z]/g, '');
		var bA = b.replace(/[^a-zA-Z]/g, '');
		if (aA === bA) {
			var aN = parseInt(a.replace(/[^0-9]/g, ''), 10);
			var bN = parseInt(b.replace(/[^0-9]/g, ''), 10);
			return aN === bN ? 0 : aN > bN ? 1 : -1;
		} else {
			return aA > bA ? 1 : -1;
		}
	};

	var challengeNames = [];
	var oldChallengeNames = [];
	var newClass = (0, _jquery2.default)('#sortName').hasClass('asc') ? 'dec' : 'asc';

	names.map(function (name) {
		challengeNames.push(name.innerHTML);
		oldChallengeNames.push(name.innerHTML);
	});

	(0, _jquery2.default)('#sortName').hasClass('asc') ? challengeNames.sort(sortAlphaNum) : challengeNames.sort(sortAlphaNum).reverse();

	for (var i = 0; i < challengeNames.length; i++) {
		var p = challengeNames.indexOf(oldChallengeNames[i]);

		//each array gets new values
		dateCreatedsReordered[p] = dateCreateds[i].innerHTML;
		dateUpdatedsReordered[p] = dateUpdateds[i].innerHTML;
		namesReordered[p] = links[i].innerHTML;
		buttonsReordered[p] = buttons[i];
		idsReordered[p] = ids[i].innerHTML;
		hiddenDateCreatedsReordered[p] = hiddenDateCreateds[i].innerHTML;
		hiddenDateUpdatedsReordered[p] = hiddenDateUpdateds[i].innerHTML;
	}

	(0, _jquery2.default)('#sortName').removeClass('asc dec').addClass(newClass);
	(0, _jquery2.default)('#sortCreated').removeClass('asc dec').addClass(newClass);
	(0, _jquery2.default)('#sortUpdated').removeClass('asc dec').addClass(newClass);

	var tableHTML = '';
	for (var _i = 0; _i < challengeNames.length; _i++) {
		tableHTML += '<tr>\n\t\t\t\t<td><button id="' + buttonsReordered[_i] + '" class="btn btn-default add-remove">Add</button><span class="countX">x</span><input class="countBox" type="number" value="1" /></td>\n      \t<td>' + idsReordered[_i] + '</td>\n      \t<td>' + namesReordered[_i] + '</td>\n      \t<td><span style="display:none">' + hiddenDateCreatedsReordered[_i] + '</span><span>' + dateCreatedsReordered[_i] + '</span></td>\n      \t<td><span style="display:none">' + hiddenDateUpdatedsReordered[_i] + '</span><span>' + dateUpdatedsReordered[_i] + '</span></td>\n      </tr>';
	}

	(0, _jquery2.default)('#table-body').html(tableHTML);

	// Add event listeners to all the buttons
	(0, _jquery2.default)('.add-remove').click(addRemove);

	// Update buttons
	for (var j = 0; j < buttonArray.length; j++) {
		var button = (0, _jquery2.default)('#' + buttonArray[j]);
		button.html('Remove');
		button.siblings().val(countArray[j]);
	}
}

function sortCreated() {

	var buttonsReordered = [],
	    idsReordered = [],
	    namesReordered = [],
	    linksReordered = [],
	    hiddenDateCreatedsReordered = [],
	    dateCreatedsReordered = [],
	    hiddenDateUpdatedsReordered = [],
	    dateUpdatedsReordered = [],
	    friend = [];

	var dateInt = [];
	var newClass = (0, _jquery2.default)('#sortCreated').hasClass('asc') ? 'dec' : 'asc';

	hiddenDateCreateds.map(function (dateCreated) {
		var time = new Date(dateCreated.innerHTML).getTime();
		dateInt.push(time);
		friend.push(time);
	});

	(0, _jquery2.default)('#sortCreated').hasClass('dec') ? dateInt.sort(function (a, b) {
		return a - b;
	}) : dateInt.sort(function (a, b) {
		return b - a;
	});

	for (var k = 0; k < friend.length; k++) {
		var p = dateInt.indexOf(friend[k]);
		//each array gets new values
		dateCreatedsReordered[p] = new Date(friend[k]).toDateString();
		dateUpdatedsReordered[p] = dateUpdateds[k].innerHTML;
		linksReordered[p] = links[k].innerHTML;
		buttonsReordered[p] = buttons[k];
		idsReordered[p] = ids[k].innerHTML;
		namesReordered[p] = links[k].innerHTML;
		hiddenDateUpdatedsReordered[p] = hiddenDateUpdateds[k].innerHTML;
	}

	hiddenDateCreatedsReordered = dateInt;

	(0, _jquery2.default)('#sortName').removeClass('asc dec');
	(0, _jquery2.default)('#sortCreated').removeClass('asc dec').addClass(newClass);
	(0, _jquery2.default)('#sortUpdated').removeClass('asc dec');

	var tableHTML = '';
	for (var i = 0; i < friend.length; i++) {
		tableHTML += '<tr>\n\t\t\t\t<td><button id="' + buttonsReordered[i] + '" class="btn btn-default add-remove">Add</button><span class="countX">x</span><input class="countBox" type="number" value="1" /></td>\n      \t<td>' + idsReordered[i] + '</td>\n      \t<td>' + namesReordered[i] + '</td>\n      \t<td><span style="display:none">' + hiddenDateCreatedsReordered[i] + '</span><span>' + dateCreatedsReordered[i] + '</span></td>\n      \t<td><span style="display:none">' + hiddenDateUpdatedsReordered[i] + '</span><span>' + dateUpdatedsReordered[i] + '</span></td>\n      </tr>';
	}

	(0, _jquery2.default)('#table-body').html(tableHTML);

	// Add event listeners to all the buttons
	(0, _jquery2.default)('.add-remove').click(addRemove);

	// Update buttons
	for (var j = 0; j < buttonArray.length; j++) {
		var button = (0, _jquery2.default)('#' + buttonArray[j]);
		button.html('Remove');
		button.siblings().val(countArray[j]);
	}
}

function sortUpdated() {

	var buttonsReordered = [],
	    idsReordered = [],
	    namesReordered = [],
	    linksReordered = [],
	    hiddenDateCreatedsReordered = [],
	    dateCreatedsReordered = [],
	    hiddenDateUpdatedsReordered = [],
	    dateUpdatedsReordered = [],
	    friend = [];

	var dateInt = [];
	var newClass = (0, _jquery2.default)('#sortUpdated').hasClass('asc') ? 'dec' : 'asc';

	hiddenDateUpdateds.map(function (dateUpdated) {
		var time = new Date(dateUpdated.innerHTML).getTime();
		dateInt.push(time);
		friend.push(time);
	});

	(0, _jquery2.default)('#sortUpdated').hasClass('dec') ? dateInt.sort(function (a, b) {
		return a - b;
	}) : dateInt.sort(function (a, b) {
		return b - a;
	});

	for (var k = 0; k < friend.length; k++) {
		var p = dateInt.indexOf(friend[k]);
		//each array gets new values
		dateCreatedsReordered[p] = dateCreateds[k].innerHTML;
		dateUpdatedsReordered[p] = new Date(friend[k]).toDateString();
		linksReordered[p] = links[k].innerHTML;
		buttonsReordered[p] = buttons[k];
		idsReordered[p] = ids[k].innerHTML;
		namesReordered[p] = links[k].innerHTML;
		hiddenDateCreatedsReordered[p] = hiddenDateCreateds[k].innerHTML;
	}

	hiddenDateUpdatedsReordered = dateInt;

	(0, _jquery2.default)('#sortName').removeClass('asc dec');
	(0, _jquery2.default)('#sortCreated').removeClass('asc dec');
	(0, _jquery2.default)('#sortUpdated').removeClass('asc dec').addClass(newClass);

	var tableHTML = '';
	for (var i = 0; i < friend.length; i++) {
		tableHTML += '<tr>\n\t\t\t\t<td><button id="' + buttonsReordered[i] + '" class="btn btn-default add-remove">Add</button><span class="countX">x</span><input class="countBox" type="number" value="1" /></td>\n      \t<td>' + idsReordered[i] + '</td>\n      \t<td>' + namesReordered[i] + '</td>\n      \t<td><span style="display:none">' + hiddenDateCreatedsReordered[i] + '</span><span>' + dateCreatedsReordered[i] + '</span></td>\n      \t<td><span style="display:none">' + hiddenDateUpdatedsReordered[i] + '</span><span>' + dateUpdatedsReordered[i] + '</span></td>\n      </tr>';
	}

	(0, _jquery2.default)('#table-body').html(tableHTML);

	// Add event listeners to all the buttons
	(0, _jquery2.default)('.add-remove').click(addRemove);

	// Update buttons
	for (var j = 0; j < buttonArray.length; j++) {
		var button = (0, _jquery2.default)('#' + buttonArray[j]);
		button.html('Remove');
		button.siblings().val(countArray[j]);
	}
}

// Put all the values into various arrays
function throwToArray() {
	setTimeout(function () {
		(0, _jquery2.default)('#table-body tr').toArray().map(function (row) {
			buttons.push(row.cells[0].getElementsByTagName('BUTTON')[0].id);
			ids.push(row.cells[1]);
			names.push(row.cells[2].getElementsByTagName('A')[0]);
			links.push(row.cells[2]);
			hiddenDateCreateds.push(row.cells[3].getElementsByTagName('SPAN')[0]);
			dateCreateds.push(row.cells[3].getElementsByTagName('SPAN')[1]);
			hiddenDateUpdateds.push(row.cells[4].getElementsByTagName('SPAN')[0]);
			dateUpdateds.push(row.cells[4].getElementsByTagName('SPAN')[1]);
		});
	}, 500);
}

// Function for add/remove button
function addRemove(event) {
	var idList = document.getElementById('idList');
	var count = event.target.parentNode.getElementsByTagName('input')[0];
	var libraryID = event.target.parentNode.parentNode.children[1].innerHTML;
	var idPlusComma = libraryID + ',';

	var prettyList = document.getElementById('pretty-list');
	var challengeName = event.target.parentNode.parentNode.children[2].innerText;
	var listItemHtml = '<li>' + challengeName + '</li>';

	if (idList.value.indexOf(libraryID) > -1) {
		event.target.innerHTML = 'Add';
		count.value = 1;
		idList.value = idList.value.replace(new RegExp(idPlusComma, 'g'), '');
		buttonArray.splice(buttonArray.indexOf(event.target.id), 1);

		prettyList.innerHTML = prettyList.innerHTML.replace(new RegExp(listItemHtml, 'g'), '');
	} else {
		event.target.innerHTML = 'Remove';
		buttonArray.push(event.target.id);
		countArray.push(count.value);

		for (var i = 0; i < count.value; i++) {
			idList.value += idPlusComma;
			prettyList.innerHTML += listItemHtml;
		}
	}
}

// Function for find challenge field - Uses text to search challenges by name/id
function findChallenges() {
	var text = (0, _jquery2.default)(this).val();

	// Look through each row to find match for a value in input field -- display none for all things that are not that
	(0, _jquery2.default)('#table-body tr').toArray().map(function (row) {
		if (text) {
			var slug = row.cells[1].innerText;
			var title = row.cells[2].innerText.toLowerCase();
			if (slug.indexOf(text) > -1 || title.indexOf(text) > -1) {
				row.style.display = 'table-row';
			} else {
				row.style.display = 'none';
			}
		} else {
			row.style.display = 'table-row';
		}
	});
}

// Function for 'Continue' button - Saves values then uses them in GET request to compiler page
function loadCompiler() {
	'use strict';

	var eid = (0, _jquery2.default)('#eid').val();
	var fileName = (0, _jquery2.default)('#file-name').val();
	var startDate = (0, _jquery2.default)('#date-begin').val();
	var endDate = (0, _jquery2.default)('#date-end').val();
	var idList = (0, _jquery2.default)('#idList').val().replace(/,\s*$/, '');

	(0, _jquery2.default)('#dateError').hide();
	(0, _jquery2.default)('#errmsg').html('');

	var errorText = '';
	if (!startDate) {
		errorText += '|Start Date';
	}
	if (!endDate) {
		errorText += '|End Date';
	}

	var a = document.createElement('a');
	if (errorText) {
		(0, _jquery2.default)('#dateError').show();
		(0, _jquery2.default)('#errmsg').html(errorText);
		a.setAttribute('href', '#dateError');
	} else {
		a.setAttribute('href', 'compile/index.html#?file=' + fileName + '&eid=' + eid + '&start_date=' + startDate + '&end_date=' + endDate + '&id_arr=' + idList);
		a.setAttribute('target', '_blank');
	}
	a.click();
}

// Resets the page's buttons and fields
function resetPage() {
	(0, _jquery2.default)('#dateError').hide();
	// Change all buttons in btnArr back to "Add"
	for (var i = 0; i < buttonArray.length; i++) {
		(0, _jquery2.default)('#' + buttonArray[i]).html('Add');
	}
	// Clear out the buttons array
	buttonArray = [];
	// Clear the values on the page
	(0, _jquery2.default)('#file-name').val(null);
	(0, _jquery2.default)('#eid').val(null);
	(0, _jquery2.default)('#date-begin').val(null);
	(0, _jquery2.default)('#date-end').val(null);
	(0, _jquery2.default)('#idList').val(null);
	(0, _jquery2.default)('#pretty-list').html('');
}

/***/ }),

/***/ 127:
/*!*******************************************!*\
  !*** multi babel-polyfill ./src/index.js ***!
  \*******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! babel-polyfill */128);
module.exports = __webpack_require__(/*! C:\Users\Danny Peck\Documents\projects\shiny-stone\src\index.js */330);


/***/ }),

/***/ 128:
/*!**************************************************!*\
  !*** ./node_modules/babel-polyfill/lib/index.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Users\\Danny Peck\\Documents\\projects\\shiny-stone\\node_modules\\babel-polyfill\\lib\\index.js'");

/***/ }),

/***/ 330:
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _lodash = __webpack_require__(/*! lodash */ 331);

var _lodash2 = _interopRequireDefault(_lodash);

var _jquery = __webpack_require__(/*! jquery */ 49);

var _jquery2 = _interopRequireDefault(_jquery);

var _challenges = __webpack_require__(/*! ./challenges */ 333);

var _sort = __webpack_require__(/*! ./sort */ 126);

var _loader = __webpack_require__(/*! ./loader */ 334);

var _compiler = __webpack_require__(/*! ./compiler */ 335);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.$ = window.jQuery = _jquery2.default;
__webpack_require__(/*! bootstrap */ 336);

if (window.location.pathname.includes('compile')) {

	window.onload = _loader.grabber;

	// Event Listeners
	(0, _jquery2.default)('.upload').click(_compiler.limeadeUpload);
	(0, _jquery2.default)('.download').click(_compiler.compileTransporter);
	(0, _jquery2.default)('#loadNumber').keyup(function () {
		var containerHTML = '';

		for (var i = 0; i < (0, _jquery2.default)('#loadNumber').val(); i++) {
			containerHTML += '\n\t\t\t\t<p>\n\t\t\t\t\t<input type="text" id="eid' + i + '" placeholder="Limeade e=" />\n\t\t\t\t\t<input type="text" id="psk' + i + '" placeholder="Limeade psk" />\n\t\t\t\t</p>\n\t\t\t';
		}

		(0, _jquery2.default)('#eidContainer').html(containerHTML);
	});
} else {

	window.onload = _challenges.loadTable;

	// Event listeners
	(0, _jquery2.default)('#build-table').click(_challenges.buildTable);
	(0, _jquery2.default)('#reset').click(_sort.resetPage);
	(0, _jquery2.default)('#load-compiler').click(_sort.loadCompiler);
	(0, _jquery2.default)('#sortName').click(_sort.sortName);
	(0, _jquery2.default)('#sortCreated').click(_sort.sortCreated);
	(0, _jquery2.default)('#sortUpdated').click(_sort.sortUpdated);
	(0, _jquery2.default)('#search').keyup(_lodash2.default.debounce(_sort.findChallenges, 175));
}

/***/ }),

/***/ 331:
/*!***************************************!*\
  !*** ./node_modules/lodash/lodash.js ***!
  \***************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Users\\Danny Peck\\Documents\\projects\\shiny-stone\\node_modules\\lodash\\lodash.js'");

/***/ }),

/***/ 333:
/*!***************************!*\
  !*** ./src/challenges.js ***!
  \***************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.loadTable = loadTable;
exports.buildTable = buildTable;

var _jquery = __webpack_require__(/*! jquery */ 49);

var _jquery2 = _interopRequireDefault(_jquery);

var _sort = __webpack_require__(/*! ./sort */ 126);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Draws the table
/* This file is for making all the ajax requests to WP and populating the table's contents */
var drawTable = function drawTable(posts) {
	// Default to sorting by reverse-date
	posts.sort(function (a, b) {
		if (a.date < b.date) {
			return 1;
		}
		if (a.date > b.date) {
			return -1;
		}
		return 0;
	});

	(0, _jquery2.default)('#load').html('<strong style="color:blue"> </strong>');

	(0, _jquery2.default)('#search').attr('readonly', false);
	(0, _jquery2.default)('#exclusive').attr('disabled', false);
	(0, _jquery2.default)('#load-compiler').attr('disabled', false);
	(0, _jquery2.default)('#reset').attr('disabled', false);

	var tableHTML = '';

	posts.map(function (post, i) {
		tableHTML += '<tr>\n\t\t\t\t<td><button id="' + i + '" class="btn btn-default add-remove">Add</button><span class="countX">x</span><input class="countBox" type="number" value="1" /></td>\n\t\t\t\t<td>' + post.slug + '</td>\n\t\t\t\t<td><a href="' + post.url + '" target="_new">' + post.title.replace(/Protected: /g, '').replace(/Private: /g, '') + '</a></td>\n\t\t\t\t<td><span style="display:none">' + post.date + '</span><span>' + new Date(post.date).toDateString() + '</span></td>\n\t\t\t\t<td><span style="display:none">' + post.modified + '</span><span>' + new Date(post.modified).toDateString() + '</span></td>\n\t\t\t</tr>';
	});

	(0, _jquery2.default)('#table-body').html(tableHTML);

	// Add event listeners to all the buttons
	(0, _jquery2.default)('.add-remove').click(_sort.addRemove);

	// Creates an array used for sorting functionality
	(0, _sort.throwToArray)();
};

// Make ajax request on a single WP page, pushing the contents into an array
var requestOnePage = function requestOnePage(page, posts, totalPages, pagesReceived) {
	var url = 'http://thelibrary.adurolife.com/wp-json/wp/v2/posts?page=' + page;
	_jquery2.default.getJSON(url).done(function (data) {
		data.map(function (post) {
			posts.push({
				slug: post.slug,
				title: post.title.rendered,
				url: post.link,
				date: post.date,
				modified: post.modified
			});
		});
	}).fail(function (jqxhr, textStatus, error) {
		return console.error('Request Failed: ' + textStatus + ', ' + error);
	}).always(function () {
		pagesReceived.push(page);

		(0, _jquery2.default)('#progress').html(Math.round(pagesReceived.length / totalPages * 100));

		if (pagesReceived.length >= totalPages) {
			drawTable(posts);

			var _url = 'https://mywellnessnumbers.com/thelibrary/challenges/';
			_jquery2.default.post(_url, { data: JSON.stringify(posts) }).done(function () {
				return console.log('Saved table.');
			});
		}
	});
};

// Loads table JSON file from api
function loadTable() {
	_jquery2.default.getJSON('https://mywellnessnumbers.com/thelibrary/challenges/').done(function (response) {
		return drawTable(response);
	}).fail(function (error) {
		return console.error(error.responseText);
	});
}

// Make ajax request to get the number of pages of posts in the Library, then request pages
function buildTable() {
	// Create Spinning Progress Indicator
	(0, _jquery2.default)('#load').html('Loading...<img src="images/progressbar.gif" alt="A spinning progress indicator" /> <span style="margin-left:5px" id="progress">0</span>%');

	// Array to store all the posts
	var posts = [];

	// Keeps track of how many WP page requests have received responses - used for the progress bar
	var pagesReceived = [];

	// Loop through 100 pages TODO: make this less brittle
	for (var page = 1; page <= 100; page++) {
		requestOnePage(page, posts, 100, pagesReceived);
	}
}

/***/ }),

/***/ 334:
/*!***********************!*\
  !*** ./src/loader.js ***!
  \***********************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.grabber = grabber;

var _jquery = __webpack_require__(/*! jquery */ 49);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Displays dimensions or code popup - hides whichever one isn't being viewed
window.chooseDimens = function (row, origin) {
  var dimenPreview = (0, _jquery2.default)('#popup' + row + ' .dimenPreview');
  var codePreview = (0, _jquery2.default)('#popup' + row + ' .codePreview');

  (0, _jquery2.default)('#popup' + row).show();

  switch (origin) {
    case 'dimen':
      dimenPreview.show();
      codePreview.hide();
      break;
    case 'code':
      dimenPreview.hide();
      codePreview.show();
      break;
    default:
      dimenPreview.hide();
      codePreview.hide();
      break;
  }
};

// Used to move dimensions from one box to the other
/* This file is for the initial loading of selected challenges table */
window.move = function (choose, drop) {
  var d = '';

  for (var i = 0; i < choose.options.length; i++) {
    if (choose.options[i].selected) {
      d = drop.appendChild(document.createElement('OPTION'));
      d.value = choose.options[i].value;
      d.innerHTML = d.value;
      choose.removeChild(choose.options[i]);
    }
  }
};

// Onkeyup function that replaces the code preview with the text area's contents
window.edit = function (a, b) {
  b.innerHTML = a.value;
};

// Replace trackingNO value with the value manually entered
window.modifyTrackingNumber = function (row) {
  var newValue = (0, _jquery2.default)('#required' + row).val();
  (0, _jquery2.default)('#sd' + row + ' .trackingNO').html(addCommasToNumber(newValue));
  (0, _jquery2.default)('#mi' + row + ' .trackingNO').html(addCommasToNumber(newValue));
};

// Show targeting modal by row (used as onclick)
window.showTargetingModal = function (row) {
  (0, _jquery2.default)('#targetingModal' + row).modal('show');
};

// Adds commas to long numbers
function addCommasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Makes proper selection on Team Challenge and Tracking Type selectors
function remainingDefaults(defaults, row) {

  // onChange handler for soloTeam selection
  (0, _jquery2.default)('#soloTeam' + row).change(function () {
    if ((0, _jquery2.default)('#soloTeam' + row).val() === 'Team') {
      (0, _jquery2.default)('#teamMin' + row).show();
      (0, _jquery2.default)('#teamMax' + row).show();
    } else {
      (0, _jquery2.default)('#teamMin' + row).hide();
      (0, _jquery2.default)('#teamMax' + row).hide();
    }
  });

  // Set team values based on defaults object
  if (defaults.team === 'Team') {
    (0, _jquery2.default)('#soloTeam' + row).val('Team');
    (0, _jquery2.default)('#soloTeam' + row).change();
  }

  var trackType = document.getElementById('trackType' + row);
  for (var i = 0; i < trackType.options.length; i++) {
    if (trackType.options[i].value === defaults.tracking) {
      trackType.options[i].selected = true;
    } else {
      trackType.options[i].selected = false;
    }
  }
}

// Populates one row of the table
function drawTableRow(row, post, record) {

  // Remove 2017: and 2018: from titles
  var title = post.title.rendered.replace(/2017: /, '').replace(/2018: /, '');

  // Only use straight quotes
  var allCode = post.content.rendered.replace(/\u201C/g, '"').replace(/\u201D/g, '"');

  var objectText = allCode.substring(allCode.indexOf('{ "defaults"'), allCode.indexOf(' </script> <!--end defaults-->'));

  var defaults = void 0;
  try {
    defaults = JSON.parse(objectText).defaults;
  } catch (e) {
    throw new Error('Invalid JSON object at http://thelibrary.adurolife.com/wp-json/wp/v2/posts?' + post.slug);
  }

  var checkChecked = defaults.device === 'yes' ? 'checked' : 'unchecked';
  (0, _jquery2.default)('#challenge-name' + row).html('<p>\n      <input type="text" id="chalTitle' + row + '" value="' + (record ? record.fields['Name'] : title) + '" />\n    </p>\n    <p>\n      <label for="deviceCheck' + row + '">Device Enabled</label>\n      <input id="deviceCheck' + row + '" type="checkbox" style="padding-left:10px" ' + checkChecked + ' /><br/>\n      <label for="deviceRequired' + row + '">Device Required</label>\n      <input id="deviceRequired' + row + '" type="checkbox" style="padding-left:10px" />\n    </p>\n    <p>\n      <select id="soloTeam' + row + '">\n        <option value="Individual">Individual</option>\n        <option value="Team">Team</option>\n      </select>\n\n      <select id="teamMin' + row + '" style="display: none;">\n        <option>1</option>\n        <option>2</option>\n        <option>3</option>\n        <option selected="selected">4</option>\n        <option>5</option>\n      </select>\n\n      <select id="teamMax' + row + '" style="display: none;">\n        <option>2</option>\n        <option>3</option>\n        <option>4</option>\n        <option>5</option>\n        <option>6</option>\n        <option>7</option>\n        <option>8</option>\n        <option>9</option>\n        <option>10</option>\n        <option>11</option>\n        <option selected="selected">12</option>\n        <option>13</option>\n        <option>14</option>\n        <option>15</option>\n        <option>16</option>\n        <option>17</option>\n        <option>18</option>\n        <option>19</option>\n        <option>20</option>\n      </select>\n    </p>');

  if (record) {
    (0, _jquery2.default)('#start-end-date' + row).html('<div>\n        Start Date\n        <input type="date" id="startDate' + row + '" value="' + record.fields['Start date'] + '" tabindex="' + (row + 101) + '" />\n        <br>\n        End Date\n        <input type="date" id="endDate' + row + '" value="' + record.fields['End date'] + '" tabindex="' + (row + 101) + '" />\n      </div>');
  } else {
    (0, _jquery2.default)('#start-end-date' + row).html('<div>\n        Start Date\n        <input type="date" id="startDate' + row + '" value="' + (0, _jquery2.default)('#begin').val() + '" tabindex="' + (row + 101) + '" />\n        <br>\n        End Date\n        <input type="date" id="endDate' + row + '" value="' + (0, _jquery2.default)('#end').val() + '" tabindex="' + (row + 101) + '" />\n      </div>');
  }

  (0, _jquery2.default)('#dimensions-and-code' + row).html('<p>\n      <a class="btn btn-default" onclick="chooseDimens(' + row + ',\'dimen\')">Dimensions</a>\n    </p>');

  // Invisible element to hold the imgLink
  (0, _jquery2.default)('body').append('<a id="imgLink' + row + '" class="btn btn-default" style="display:none"\n        href="https://mywellmetrics.com' + defaults.imgUrl + '" target="_new">\n      Preview Image\n    </a>');

  (0, _jquery2.default)('#team-challenge' + row).html('<p>\n      <a class="btn btn-default" onclick="chooseDimens(' + row + ',\'code\')">Edit Description</a>\n    </p>');

  (0, _jquery2.default)('#tracking-type' + row).html('<input type="text" id="devText' + row + '" onkeyup="this.removeAttribute(\'value\')" placeholder="activity" value="' + defaults.text + '" />\n    <br/><br/>\n    <input type="number" id="required' + row + '" onkeyup="modifyTrackingNumber(' + row + ')" placeholder="units" value="' + defaults.required + '" />\n    <br><br>\n    <select id="trackType' + row + '">\n\t\t\t <option value="One Time">One Time</option>\n\t\t\t <option value="One Time Units">Units - Challenge Period</option>\n\t\t\t <option value="One Time Days">Days - Challenge Period</option>\n\t\t\t <option value="Weekly Units">Units each week</option>\n\t\t\t <option value="Weekly Days">Days each Week</option>\n     </select>');

  (0, _jquery2.default)('#point-value' + row).html('<input id="points' + row + '" type="text" value="' + (record ? record.fields['Points'] : '') + '" style="width:50px" tabindex="' + (row + 1) + '" />\n    <p>\n      <label for="pointText' + row + '"><span class="glyphicon glyphicon-gift" data-toggle="tooltip" title="For 0 points challenges. Allows displaying flavor text when icon is hovered over in Limeade."></span></label>\n      <input id="pointText' + row + '" type="checkbox" />\n    </p>');

  (0, _jquery2.default)('#targeting' + row).html('<p>\n      <a class="btn btn-default" onclick="showTargetingModal(' + row + ')">Targeting</a>\n    </p>');

  (0, _jquery2.default)('#targetingModalContainer').append('<div class="modal fade" id="targetingModal' + row + '" tabindex="-1" role="dialog" aria-labelledby="targetingModalLabel">\n      <div class="modal-dialog" role="document">\n        <div class="modal-content">\n          <div class="modal-header">\n            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n            <h4 class="modal-title" id="targetingModalLabel">Targeting</h4>\n          </div>\n          <div class="modal-body" id="targetingModalBody' + row + '">\n            <input type="text" id="subgroup' + row + '" placeholder="Subgroup" />\n            <br><br>\n            <input type="text" id="field-one' + row + '" placeholder="Field1" />\n            <br><br>\n            <input type="text" id="field-one-value' + row + '" placeholder="Field1Value" />\n            <br><br>\n            <input type="text" id="field-two' + row + '" placeholder="Field2" />\n            <br><br>\n            <input type="text" id="field-two-value' + row + '" placeholder="Field2Value" />\n            <br><br>\n            <input type="text" id="field-three{row}" placeholder="Field3" />\n            <br><br>\n            <input type="text" id="field-three-value' + row + '" placeholder="Field3Value" />\n          </div>\n          <div class="modal-footer">\n            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n          </div>\n        </div>\n      </div>\n    </div>');

  function getDefaultDimens(dimensions) {
    var platformDimens = ['Appreciating Life', 'Back Health', 'Belief in Organization', 'Belief in Your Abilities', 'Concern for Others', 'Concern for the Environment', 'Dream Job', 'Drinking Moderately', 'Energy Level', 'Enjoying Work', 'Exercise &amp; Fitness', 'Feeling Energized', 'Financial Well-being', 'Fit with Culture', 'Growth', 'Healthy Blood Sugar', 'Healthy Weight', 'Heart Health', 'In the Flow', 'Job Satisfaction', 'Knowing Yourself', 'Life Meaning', 'Making &amp; Keeping Commitments', 'Managing Depression', 'Managing Stress &amp; Anxiety', 'Nutrition', 'Openness &amp; Optimism', 'Positive Living', 'Positive Relationships', 'Pregnancy', 'Resilience', 'Self-Acceptance', 'Self-Care', 'Self-Leadership', 'Sense of Team', 'Sleep', 'Smoke-Free Living', 'Square Deal', 'Work Growth', 'Work Meaning', 'Work-Life Balance', 'Vision'];
    var selected = [];
    var j = '';
    var i;

    for (i = 0; i < dimensions.length; i++) {
      j = platformDimens.indexOf(dimensions[i]);
      selected.push(platformDimens[j]);
      platformDimens.splice(j, 1);
    }

    function finalSE(selected) {
      var x = '';
      var i;
      for (i = 0; i < selected.length; i++) {
        x += '<option value="' + selected[i] + '">' + selected[i] + '</option>';
      }
      return x;
    }

    function finalUN(leftover) {
      var x = '';
      var i;
      for (i = 0; i < leftover.length; i++) {
        x += '<option value="' + leftover[i] + '">' + leftover[i] + '</option>';
      }
      return x;
    }

    return {
      un: finalUN(platformDimens),
      se: finalSE(selected)
    };
  }

  function gatherCode(allCode) {
    var element = document.createElement('div');
    document.body.appendChild(element);
    element.setAttribute('style', 'display:none');
    element.innerHTML = allCode;

    var sd = document.getElementById('shD').innerHTML;
    var mi = document.getElementById('lnD').innerHTML;

    document.body.removeChild(element);

    return {
      shortDescription: sd,
      moreInformation: mi
    };
  }

  var popUp = document.createElement('DIV');
  document.body.appendChild(popUp);
  popUp.setAttribute('style', 'display:none');
  popUp.setAttribute('class', 'popup');
  popUp.id = 'popup' + row;
  var sec = getDefaultDimens(defaults.dimensions);
  var completeCode = gatherCode(allCode);
  popUp.innerHTML = '<div class="dimenPreview">\n      <select id="selectBefore' + row + '" class="selectBf" multiple>' + sec.un + '</select>\n      <button id="add' + row + '" onclick="move(selectBefore' + row + ', selectAfter' + row + ')">\n        -->\n      </button>\n      <button id="remove' + row + '" style="position:absolute; bottom:40%; left:44%"\n              onclick="move(selectAfter' + row + ', selectBefore' + row + ')">\n        <--\n      </button>\n      <select id="selectAfter' + row + '" class="selectAf" multiple>' + sec.se + '</select>\n      <a onclick="$(\'#popup' + row + '\').hide()">Submit</a>\n    </div>\n\n    <div class="codePreview">\n      <div class="codeEdit">\n        <h3>Short Description</h3>\n        <textarea class="shortDescription" id="txtAreaS' + row + '" onkeyup="edit(txtAreaS' + row + ', sd' + row + '.getElementsByTagName(\'SPAN\')[0])">' + completeCode.shortDescription + '</textarea>\n        <h3>More Information</h3>\n        <textarea class="moreInformation" id="txtAreaM' + row + '" onkeyup="edit(txtAreaM' + row + ', mi' + row + ')">' + completeCode.moreInformation + '</textarea>\n        <a class="linkSpec button" onclick="$(\'#popup' + row + '\').hide()">\n          <span class="glyphicon glyphicon-ok"></span>\n        </a>\n      </div>\n      <div class="codeLive">\n        <div class="codeLiveDisplay" id="codeCompile' + row + '">\n          <span id="sd' + row + '"><span style="font-size:14px; font-weight:bold">' + completeCode.shortDescription + '</span></span>\n          <span id="mi' + row + '">' + completeCode.moreInformation + '</span>\n        </div>\n      </div>\n    </div>';

  remainingDefaults(defaults, row);
}

// Makes an ajax request to a specific challenge page (by slug)
function requestOneChallenge(slug, row) {
  var url = 'http://thelibrary.adurolife.com/wp-json/wp/v2/posts?slug=' + slug;

  _jquery2.default.getJSON('' + url).done(function (data) {
    var post = data[0];
    drawTableRow(row, post);
  }).fail(function (jqxhr, textStatus, error) {
    var err = textStatus + ', ' + error;
    console.error('Request Failed: ' + err);
  });
}

// Uses an array of library IDs and begins making ajax requests to populate the table
function getContent(ids) {
  var tableBody = (0, _jquery2.default)('#challenge-list tbody')[0];

  for (var i = 0; i < ids.length; i++) {
    var slug = ids[i];
    var challengeUrl = 'http://thelibrary.adurolife.com/' + slug;

    // Create a new row for each challenge
    (0, _jquery2.default)('#challenge-list tbody').append('<tr><td><a href="' + challengeUrl + '" target="_blank">' + slug + '</a></td></tr>');

    // Build out the rest of the table
    tableBody.rows[i].appendChild(document.createElement('TD')).id = 'challenge-name' + i;
    tableBody.rows[i].appendChild(document.createElement('TD')).id = 'start-end-date' + i;
    tableBody.rows[i].appendChild(document.createElement('TD')).id = 'dimensions-and-code' + i;
    tableBody.rows[i].appendChild(document.createElement('TD')).id = 'team-challenge' + i;
    tableBody.rows[i].appendChild(document.createElement('TD')).id = 'tracking-type' + i;
    tableBody.rows[i].appendChild(document.createElement('TD')).id = 'point-value' + i;
    tableBody.rows[i].appendChild(document.createElement('TD')).id = 'targeting' + i;

    requestOneChallenge(slug, i);
  }
}

// Like getContent but it takes records w/ start and end dates
function getContentWithDates(records) {
  var tableBody = (0, _jquery2.default)('#challenge-list tbody')[0];

  records.forEach(function (record, i) {
    var slug = record.fields['Slug'];
    var challengeUrl = 'http://thelibrary.adurolife.com/' + slug;

    // Create a new row for each challenge
    (0, _jquery2.default)('#challenge-list tbody').append('<tr><td><a href="' + challengeUrl + '" target="_blank">' + slug + '</a></td></tr>');

    // Build out the rest of the table
    tableBody.rows[i].appendChild(document.createElement('TD')).id = 'challenge-name' + i;
    tableBody.rows[i].appendChild(document.createElement('TD')).id = 'start-end-date' + i;
    tableBody.rows[i].appendChild(document.createElement('TD')).id = 'dimensions-and-code' + i;
    tableBody.rows[i].appendChild(document.createElement('TD')).id = 'team-challenge' + i;
    tableBody.rows[i].appendChild(document.createElement('TD')).id = 'tracking-type' + i;
    tableBody.rows[i].appendChild(document.createElement('TD')).id = 'point-value' + i;
    tableBody.rows[i].appendChild(document.createElement('TD')).id = 'targeting' + i;

    // Make an ajax request to get the challenge content, then draw it to the table
    var requestUrl = 'http://thelibrary.adurolife.com/wp-json/wp/v2/posts?slug=' + slug;

    _jquery2.default.getJSON('' + requestUrl).done(function (data) {
      var post = data[0];
      drawTableRow(i, post, record);
    }).fail(function (jqxhr, textStatus, error) {
      var err = textStatus + ', ' + error;
      console.error('Request Failed: ' + err);
    });
  });
}

function grabber() {

  // Get location and find the beginning of the query
  var url = window.location.href;
  var query = url.substr(url.indexOf('#?') + 2, url.length);

  // Create an array of query values
  var vars = query.split('&');

  // Create an empty object to hold key/value pairs
  var queryObject = {};

  // Read each value in vars, create pairs and add each pair to our object
  for (var i = 0; i < vars.length; i++) {

    var pair = vars[i].split('=');

    switch (pair[0]) {
      case 'file':
        queryObject.file = pair[1];
        break;
      case 'eid':
        queryObject.eid = pair[1].replace('%20', ' ');
        break;
      case 'start_date':
        queryObject.start = pair[1];
        break;
      case 'end_date':
        queryObject.end = pair[1];
        break;
      case 'id_arr':
        queryObject.ids = pair[1].split(',');
        break;
      case 'calendar':
        queryObject.calendar = pair[1];
        break;
    }
  }

  // Using airtable here, working to add a feature where we can load a calendar from a Hash
  // Format looks something like:
  // http://localhost:3000/compile/index.html#?file=Yearlong&calendar=a9d1e8102ac4cb
  if (queryObject.calendar) {
    // Hide fields that don't make sense for importing a calendar from airtable
    (0, _jquery2.default)('#start-and-end-dates').hide();
    (0, _jquery2.default)('#shortCut').hide();

    var calendarHash = queryObject.calendar;
    _jquery2.default.getJSON('https://api.airtable.com/v0/appN1J6yscNwlzbzq/Challenges?api_key=keyCxnlep0bgotSrX&filterByFormula={Calendar}=\'' + calendarHash + '\'').done(function (data) {
      // Populate first EID with EmployerName from results
      if (data.records) {
        (0, _jquery2.default)('#eid0').val(data.records[0].fields['EmployerName']);
      }

      var filteredRecords = data.records.filter(function (record) {
        return record.fields.Slug;
      });
      getContentWithDates(filteredRecords);
    });
  }

  // Populate the fields from the query object
  (0, _jquery2.default)('#fileName').val(queryObject.file);
  (0, _jquery2.default)('#eid0').val(queryObject.eid);
  (0, _jquery2.default)('#begin').val(queryObject.start);
  (0, _jquery2.default)('#end').val(queryObject.end);

  // Make ajax requests based on the array of IDs and build the table
  if (queryObject.ids) {
    getContent(queryObject.ids);
  }

  var startDate = new Date((0, _jquery2.default)('#begin').val());
  var endDate = new Date((0, _jquery2.default)('#end').val());

  var semi = (endDate - startDate) / 2;
  var semiEnd = new Date(startDate.getTime() + semi);

  var quart = (endDate - startDate) / 4;
  var quartEnd1 = new Date(startDate.getTime() + quart);
  var quartEnd2 = new Date(startDate.getTime() + quart + quart);
  var quartEnd3 = new Date(startDate.getTime() + quart + quart + quart);

  var shortCutHTML = '<h3>Estimations</h3>\n\t\t<p>\n      <strong style="color:black">\n        This text area is meant to display semi-annual and quarterly date estimations.\n      </strong>\n    </p>\n\t\t<p>\n      <strong>\n        <span style="color:black">Semi-annual, first half end: </span>\n        ' + (semiEnd.getMonth() + 1) + '-' + semiEnd.getDate() + '-' + semiEnd.getFullYear() + '\n      </strong>\n    </p>\n\t\t<p>\n\t\t  <strong>\n        <span style="color:black">Quarterly, first quarter end: </span>\n        ' + (quartEnd1.getMonth() + 1) + '-' + quartEnd1.getDate() + '-' + quartEnd1.getFullYear() + '\n      </strong>\n\t\t  <br>\n      <strong>\n        <span style="color:black">Quarterly, second quarter end: </span>\n        ' + (quartEnd2.getMonth() + 1) + '-' + quartEnd2.getDate() + '-' + quartEnd2.getFullYear() + '\n      </strong>\n\t\t  <br>\n      <strong>\n        <span style="color:black">Quarterly, third quarter end: </span>\n        ' + (quartEnd3.getMonth() + 1) + '-' + quartEnd3.getDate() + '-' + quartEnd3.getFullYear() + '\n      </strong>\n    </p>';
  (0, _jquery2.default)('#shortCut').html(shortCutHTML);
}

/***/ }),

/***/ 335:
/*!*************************!*\
  !*** ./src/compiler.js ***!
  \*************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.limeadeUpload = limeadeUpload;
exports.compileTransporter = compileTransporter;

var _jquery = __webpack_require__(/*! jquery */ 49);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var currentYear = new Date().getFullYear(); /* This file is for Transporter CSV Compiler functionality */


var sanitize = function sanitize(code) {
  var sanitized = code.replace(/\r?\n|\r/g, ' ') // Strip out carriage returns and newlines
  .replace(/,/g, '&#44;') // Escape commas since we're using a csv
  .replace(/\u2018/g, '\'') // Left single quote
  .replace(/\u2019/g, '\'') // Right single quote
  .replace(/\u201C/g, '"') // Left double quote
  .replace(/\u201D/g, '"') // Right double quote
  .replace(/\u2026/g, '...') // Ellipsis
  .replace(/\u2013/g, '&ndash;') // Long dash
  .replace(/\u2014/g, '&mdash;') // Longer dash
  .replace(/\u00A9/g, '&copy;') // Copyright symbol
  .replace(/copyright\s*\d+/gi, 'Copyright ' + currentYear);
  return sanitized;
};

function dimensionsARR(row) {
  var d = [];
  var options = (0, _jquery2.default)('#selectAfter' + row + ' option');
  var i;
  for (i = 0; i < options.length; i++) {
    d.push(options[i].value);
  }
  return '"' + d.join(',') + '"';
}

function trackingText1(id, tf) {
  var use = tf.toString();
  var pipe = ' | ';
  if (use === '1') {
    var a = id.indexOf(pipe);
    var b = 0;
    var c = id.substring(b, a);
    c.replace(/ /g, '');
    return c;
  } else if (use === '0') {
    return id;
  } else {
    return null;
  }
}

function trackingText2(id, tf) {
  var use = tf.toString();
  var pipe = ' | ';
  if (use === '1') {
    var a = id.indexOf(pipe) + pipe.length;
    var b = id.length + pipe.length - 1;
    var c = id.substring(a, b);
    c.replace(/ /g, '');
    return c;
  } else if (use === '0') {
    return 0;
  } else {
    return null;
  }
}

var tracking = function tracking(trackType) {

  switch (trackType) {
    case 'One Time':
      return 'OneTimeEvent';

    case 'One Time Days':
    case 'Weekly Days':
      return 'YesNoDaily';

    case 'One Time Units':
    case 'Weekly Units':
      return 'AddAllNumbers';

    default:
      throw new Error('Tracking type in the json object is not one of the 5 valid values.');
  }
};

var createCSV = function createCSV(employer) {

  var data = [['EmployerName', 'ChallengeId', 'ChallengeType', 'IsWeekly', 'WinStrategy', 'Target', 'Activity', 'ChallengeName', 'DisplayPriority', 'StartDate', 'EndDate', 'ShortDescription', 'MoreInformation', 'ImageUrl', 'ShowInProgram', 'RewardType', 'Reward', 'Dimensions', 'LeaderboardTag', 'EnableDeviceTracking', 'AllowSelfReporting', 'DeviceTrackingUnits', 'IsTeamChallenge', 'MinTeamSize', 'MaxTeamSize', 'Subgroup', 'Field1', 'Field1Value', 'Field2', 'Field2Value', 'Field3', 'Field3Value', 'AppearanceInProgram', 'IntegrationPartnerId', 'ButtonText', 'TargetUrl', 'EventCode', 'ShowExtendedDescription', 'ActivityTemplateId', 'IsFeatured', 'FeaturedDescription', 'FeaturedImageUrl']];

  for (var row = 0; row < (0, _jquery2.default)('#challenge-list tbody')[0].rows.length; row++) {

    (0, _jquery2.default)('#remove-coaching').prop('checked') ? (0, _jquery2.default)('#mi' + row + ' .coachinginfo').remove() : null;

    var trackType = (0, _jquery2.default)('#trackType' + row).val(),
        challengeType = tracking(trackType),
        isWeekly = trackType.includes('Weekly') ? '1' : '0',
        winStrategy = trackType === 'One Time' ? 'AccomplishOneTimeEvent' : 'MeetOrExceedTarget',
        enableDeviceTracking = (0, _jquery2.default)('#deviceCheck' + row).prop('checked') ? 1 : 0,
        allowSelfReporting = (0, _jquery2.default)('#deviceRequired' + row).prop('checked') ? 0 : 1,
        devText = (0, _jquery2.default)('#devText' + row).val(),
        activity = enableDeviceTracking ? trackingText2(devText, enableDeviceTracking) : trackingText1(devText, enableDeviceTracking) === '0' ? '' : trackingText1(devText, enableDeviceTracking),
        deviceTrackingUnits = enableDeviceTracking ? trackingText1(devText, enableDeviceTracking) : '',
        rewardType = (0, _jquery2.default)('#pointText' + row).prop('checked') ? 1 : 0,
        isTeamChallenge = (0, _jquery2.default)('#soloTeam' + row).val() === 'Individual' ? 0 : 1;

    data.push([(0, _jquery2.default)('#eid' + employer).val(), '', // ChallengeId
    challengeType, isWeekly, winStrategy, (0, _jquery2.default)('#required' + row).val() === '0' ? '1' : (0, _jquery2.default)('#required' + row).val(), activity, '"' + (0, _jquery2.default)('#chalTitle' + row).val() + '"', '', // DisplayPriority
    (0, _jquery2.default)('#startDate' + row).val().replace(/-/g, '/'), (0, _jquery2.default)('#endDate' + row).val().replace(/-/g, '/'), sanitize((0, _jquery2.default)('#sd' + row).html()), sanitize((0, _jquery2.default)('#mi' + row).html()), (0, _jquery2.default)('#imgLink' + row).attr('href').replace(/https:\/\/mywellmetrics\.com/g, ''), '0', // ShowInProgram
    rewardType, (0, _jquery2.default)('#points' + row).val(), dimensionsARR(row) === '"undefined"' ? '' : dimensionsARR(row), '', // LeaderboardTag
    enableDeviceTracking, allowSelfReporting, deviceTrackingUnits, isTeamChallenge, isTeamChallenge ? (0, _jquery2.default)('#teamMin' + row).val() : '', isTeamChallenge ? (0, _jquery2.default)('#teamMax' + row).val() : '', (0, _jquery2.default)('#subgroup' + row).val(), (0, _jquery2.default)('#field-one' + row).val(), (0, _jquery2.default)('#field-one-value' + row).val(), (0, _jquery2.default)('#field-two' + row).val(), (0, _jquery2.default)('#field-two-value' + row).val(), (0, _jquery2.default)('#field-three' + row).val(), (0, _jquery2.default)('#field-three-value' + row).val(), 'Default', // AppearanceInProgram
    '', // IntegrationPartnerId
    '', // ButtonText
    '', // TargetUrl
    '', // EventCode
    '', // ShowExtendedDescription
    '', // ActivityTemplateId
    '0', // IsFeatured
    '', // FeaturedDescription
    '' // FeaturedImageUrl
    ]);
  }

  return data;
};

function limeadeUpload() {
  // Open Modal
  (0, _jquery2.default)('#uploadModal').modal('show');
  (0, _jquery2.default)('#uploadModalBody').html('<p class="uploading-message">Uploading...</p>');

  var challengeList = createCSV(0);
  var challengeTracker = {
    totalChallenges: (challengeList.length - 1) * (0, _jquery2.default)('#loadNumber').val(),
    loadedChallenges: 0
  };

  // For debugging but it could be useful. Delete if desired
  console.log('Uploading ' + challengeTracker.totalChallenges + ' challenges...');

  // Post a single challenge to each program

  var _loop = function _loop(program) {

    var csv = createCSV(program);
    var headers = csv[0].join(',');
    var url = 'http://mywellnessnumbers.sftp.adurolife.com/limeade-upload/';

    var _loop2 = function _loop2(row) {
      var oneChallenge = csv[row].join(',');
      var params = {
        e: (0, _jquery2.default)('#eid' + program).val(),
        psk: (0, _jquery2.default)('#psk' + program).val(),
        data: headers + '\n' + oneChallenge,
        type: 'challenges'
      };
      _jquery2.default.post(url, params).done(function (data) {
        logResponse(data, csv[row], challengeTracker);
      });
    };

    for (var row = 1; row < csv.length; row++) {
      _loop2(row);
    }
  };

  for (var program = 0; program < (0, _jquery2.default)('#loadNumber').val(); program++) {
    _loop(program);
  }

  function logResponse(data, challenge, tracker) {
    // When every challenge has been loaded, change loading message
    tracker.loadedChallenges += 1;
    if (tracker.loadedChallenges >= tracker.totalChallenges) {
      (0, _jquery2.default)('.uploading-message').html('Loading complete!');
    }

    var json = JSON.parse(data);
    var challengeName = challenge[7].replace(/"/g, '');
    try {
      if (json.status === 'error') {
        throw new Error();
      }
      if (json.logMessages && json.logMessages.log0.severity === 'Error') {
        throw new Error();
      }
      (0, _jquery2.default)('#uploadModalBody').append('<p class="alert alert-success">Successfully uploaded ' + challengeName + '.</p>');
    } catch (e) {
      var errorMessage = '<p class="alert alert-danger">There was an error uploading ' + challengeName + '.<br/>';
      if (json.status === 'error') {
        (0, _jquery2.default)('#uploadModalBody').append('' + errorMessage + json.detail + '</p>');
      } else {
        (0, _jquery2.default)('#uploadModalBody').append('' + errorMessage + json.logMessages.log0.message + '</p>');
      }
    }
  }
}

function compileTransporter() {
  'use strict';

  // Download a CSV for each program

  for (var program = 0; program < (0, _jquery2.default)('#loadNumber').val(); program++) {

    var data = createCSV(program);
    var csvContent = '';
    data.forEach(function (infoArray, index) {
      var dataString = infoArray.join(',');
      csvContent += index < data.length - 1 ? dataString + '\n' : dataString;
    });

    var file = encodeURI('data:text/csv;charset=utf-8,' + csvContent);
    var filename = (0, _jquery2.default)('#eid' + program).val() + '-' + 'Phase' + '-' + (0, _jquery2.default)('#fileName').val() + '-' + currentYear + '.csv';

    var link = document.createElement('a');
    link.setAttribute('download', filename);
    link.setAttribute('href', file);
    link.click();
  }
}

/***/ }),

/***/ 336:
/*!***********************************************!*\
  !*** ./node_modules/bootstrap/dist/js/npm.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Users\\Danny Peck\\Documents\\projects\\shiny-stone\\node_modules\\bootstrap\\dist\\js\\npm.js'");

/***/ }),

/***/ 49:
/*!********************************************!*\
  !*** ./node_modules/jquery/dist/jquery.js ***!
  \********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Users\\Danny Peck\\Documents\\projects\\shiny-stone\\node_modules\\jquery\\dist\\jquery.js'");

/***/ })

/******/ });