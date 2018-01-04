/* This file is for manipulation of the table - sorting, clearing, and sending table's results to the compiler */
import $ from 'jquery';

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
export function sortName() {

	let buttonsReordered = [],
	idsReordered = [],
	namesReordered = [],
	hiddenDateCreatedsReordered = [],
	dateCreatedsReordered = [],
	hiddenDateUpdatedsReordered = [],
	dateUpdatedsReordered = [];

	const sortAlphaNum = (a, b) => {
		let aA = a.replace(/[^a-zA-Z]/g, '');
    let bA = b.replace(/[^a-zA-Z]/g, '');
    if (aA === bA) {
      let aN = parseInt(a.replace(/[^0-9]/g, ''), 10);
      let bN = parseInt(b.replace(/[^0-9]/g, ''), 10);
      return aN === bN ? 0 : aN > bN ? 1 : -1;
    } else {
      return aA > bA ? 1 : -1;
    }
  };

	let challengeNames = [];
	let oldChallengeNames = [];
	let newClass = $('#sortName').hasClass('asc') ? 'dec' : 'asc';

	names.map(name => {
		challengeNames.push(name.innerHTML);
		oldChallengeNames.push(name.innerHTML);
	});

	$('#sortName').hasClass('asc') ? challengeNames.sort(sortAlphaNum) : challengeNames.sort(sortAlphaNum).reverse();

	for (let i = 0; i < challengeNames.length; i++) {
		let p = challengeNames.indexOf(oldChallengeNames[i]);

		//each array gets new values
		dateCreatedsReordered[p] = dateCreateds[i].innerHTML;
		dateUpdatedsReordered[p] = dateUpdateds[i].innerHTML;
		namesReordered[p] = links[i].innerHTML;
		buttonsReordered[p] = buttons[i];
		idsReordered[p] = ids[i].innerHTML;
		hiddenDateCreatedsReordered[p] = hiddenDateCreateds[i].innerHTML;
		hiddenDateUpdatedsReordered[p] = hiddenDateUpdateds[i].innerHTML;
	}

	$('#sortName').removeClass('asc dec').addClass(newClass);
	$('#sortCreated').removeClass('asc dec').addClass(newClass);
	$('#sortUpdated').removeClass('asc dec').addClass(newClass);

  var tableHTML = '';
  for (let i = 0; i < challengeNames.length; i++) {
    tableHTML +=
      `<tr>
				<td><button id="${buttonsReordered[i]}" class="btn btn-default add-remove">Add</button><span class="countX">x</span><input class="countBox" type="number" value="1" /></td>
      	<td>${idsReordered[i]}</td>
      	<td>${namesReordered[i]}</td>
      	<td><span style="display:none">${hiddenDateCreatedsReordered[i]}</span><span>${dateCreatedsReordered[i]}</span></td>
      	<td><span style="display:none">${hiddenDateUpdatedsReordered[i]}</span><span>${dateUpdatedsReordered[i]}</span></td>
      </tr>`;
  }

  $('#table-body').html(tableHTML);

	// Add event listeners to all the buttons
	$('.add-remove').click(addRemove);

  // Update buttons
  for (var j = 0; j < buttonArray.length; j++) {
    var button = $('#' + buttonArray[j]);
    button.html('Remove');
    button.siblings().val(countArray[j]);
  }
}

export function sortCreated() {

	let buttonsReordered = [],
	idsReordered = [],
	namesReordered = [],
	linksReordered = [],
	hiddenDateCreatedsReordered = [],
	dateCreatedsReordered = [],
	hiddenDateUpdatedsReordered = [],
	dateUpdatedsReordered = [],

	friend = [];

	let dateInt = [];
	let newClass = $('#sortCreated').hasClass('asc') ? 'dec' : 'asc';

	hiddenDateCreateds.map((dateCreated) => {
		var time = new Date(dateCreated.innerHTML).getTime();
		dateInt.push(time);
		friend.push(time);
	});


	$('#sortCreated').hasClass('dec') ? dateInt.sort((a, b) => a - b) : dateInt.sort((a, b) => b - a);

	for (var k = 0; k < friend.length; k++) {
		let p = dateInt.indexOf(friend[k]);
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


	$('#sortName').removeClass('asc dec');
	$('#sortCreated').removeClass('asc dec').addClass(newClass);
	$('#sortUpdated').removeClass('asc dec');

  var tableHTML = '';
  for (var i = 0; i < friend.length; i++) {
    tableHTML +=
      `<tr>
				<td><button id="${buttonsReordered[i]}" class="btn btn-default add-remove">Add</button><span class="countX">x</span><input class="countBox" type="number" value="1" /></td>
      	<td>${idsReordered[i]}</td>
      	<td>${namesReordered[i]}</td>
      	<td><span style="display:none">${hiddenDateCreatedsReordered[i]}</span><span>${dateCreatedsReordered[i]}</span></td>
      	<td><span style="display:none">${hiddenDateUpdatedsReordered[i]}</span><span>${dateUpdatedsReordered[i]}</span></td>
      </tr>`;
  }

  $('#table-body').html(tableHTML);

	// Add event listeners to all the buttons
	$('.add-remove').click(addRemove);

  // Update buttons
  for (var j = 0; j < buttonArray.length; j++) {
    var button = $('#' + buttonArray[j]);
    button.html('Remove');
    button.siblings().val(countArray[j]);
  }
}

export function sortUpdated() {

	let buttonsReordered = [],
	idsReordered = [],
	namesReordered = [],
	linksReordered = [],
	hiddenDateCreatedsReordered = [],
	dateCreatedsReordered = [],
	hiddenDateUpdatedsReordered = [],
	dateUpdatedsReordered = [],

	friend = [];

	let dateInt = [];
	let newClass = $('#sortUpdated').hasClass('asc') ? 'dec' : 'asc';

	hiddenDateUpdateds.map((dateUpdated) => {
		var time = new Date(dateUpdated.innerHTML).getTime();
		dateInt.push(time);
		friend.push(time);
	});


	$('#sortUpdated').hasClass('dec') ? dateInt.sort((a, b) => a - b) : dateInt.sort((a, b) => b - a);

	for (var k = 0; k < friend.length; k++) {
		let p = dateInt.indexOf(friend[k]);
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

	$('#sortName').removeClass('asc dec');
	$('#sortCreated').removeClass('asc dec');
	$('#sortUpdated').removeClass('asc dec').addClass(newClass);

  var tableHTML = '';
  for (var i = 0; i < friend.length; i++) {
    tableHTML +=
      `<tr>
				<td><button id="${buttonsReordered[i]}" class="btn btn-default add-remove">Add</button><span class="countX">x</span><input class="countBox" type="number" value="1" /></td>
      	<td>${idsReordered[i]}</td>
      	<td>${namesReordered[i]}</td>
      	<td><span style="display:none">${hiddenDateCreatedsReordered[i]}</span><span>${dateCreatedsReordered[i]}</span></td>
      	<td><span style="display:none">${hiddenDateUpdatedsReordered[i]}</span><span>${dateUpdatedsReordered[i]}</span></td>
      </tr>`;
  }

  $('#table-body').html(tableHTML);

	// Add event listeners to all the buttons
	$('.add-remove').click(addRemove);

  // Update buttons
  for (var j = 0; j < buttonArray.length; j++) {
    var button = $('#' + buttonArray[j]);
    button.html('Remove');
    button.siblings().val(countArray[j]);
  }
}

// Put all the values into various arrays
export function throwToArray() {
  setTimeout(() => {
		$('#table-body tr').toArray().map((row) => {
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
export function addRemove(event) {
	const idList = document.getElementById('idList');
	const count = event.target.parentNode.getElementsByTagName('input')[0];
  const libraryID = event.target.parentNode.parentNode.children[1].innerHTML;
  const idPlusComma = libraryID + ',';

	const prettyList = document.getElementById('pretty-list');
	const challengeName = event.target.parentNode.parentNode.children[2].innerText;
	const listItemHtml = '<li>' + challengeName + '</li>';

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

    for (let i = 0; i < count.value; i++) {
      idList.value += idPlusComma;
			prettyList.innerHTML += listItemHtml;
    }

  }
}

// Function for find challenge field - Uses text to search challenges by name/id
export function findChallenges() {
	const text = $(this).val();

	// Look through each row to find match for a value in input field -- display none for all things that are not that
	$('#table-body tr').toArray().map((row) => {
		if (text) {
			let slug = row.cells[1].innerText;
			let title = row.cells[2].innerText.toLowerCase();
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
export function loadCompiler() {
	'use strict';
  var eid = $('#eid').val();
  var fileName = $('#file-name').val();
  var startDate = $('#date-begin').val();
  var endDate = $('#date-end').val();
  var idList = $('#idList').val().replace(/,\s*$/, '');

  $('#dateError').hide();
  $('#errmsg').html('');

  var errorText = '';
  if (!startDate) {
    errorText += '|Start Date';
  }
  if (!endDate) {
    errorText += '|End Date';
  }

  var a = document.createElement('a');
  if (errorText) {
    $('#dateError').show();
    $('#errmsg').html(errorText);
    a.setAttribute('href', '#dateError');
  } else {
    a.setAttribute('href', `compile/#?file=${fileName}&eid=${eid}&start_date=${startDate}&end_date=${endDate}&id_arr=${idList}`);
    a.setAttribute('target', '_blank');
  }
  a.click();
}

// Resets the page's buttons and fields
export function resetPage() {
  $('#dateError').hide();
  // Change all buttons in btnArr back to "Add"
  for (var i = 0; i < buttonArray.length; i++) {
    $('#' + buttonArray[i]).html('Add');
  }
  // Clear out the buttons array
  buttonArray = [];
  // Clear the values on the page
  $('#file-name').val(null);
  $('#eid').val(null);
  $('#date-begin').val(null);
  $('#date-end').val(null);
  $('#idList').val(null);
	$('#pretty-list').html('');
}
