/* globals $ */

/* This file is for making all the ajax requests to WP and populating the table's contents */

import Airtable from 'airtable';
import { addRemove, throwToArray } from './search';

// Draws the table
function drawTable(records) {

	// Default to sorting by reverse-date
	records.sort((a, b) => {
		if (a._rawJson.createdTime < b._rawJson.createdTime) {
			return 1;
		}
		if (a._rawJson.createdTime > b._rawJson.createdTime) {
			return -1;
		}
		return 0;
	});

	$('#load').html('<span>&nbsp;</span>');

	$('#search').attr('readonly', false);
	$('#exclusive').attr('disabled', false);
	$('#load-compiler').attr('disabled', false);
	$('#reset').attr('disabled', false);

	let tableHTML = '';

	records.map((record, i) => {
		let headerImage = record.fields['Header Image'];

		// Use a placeholder image if no header image is available
		if (!headerImage) {
			headerImage = 'http://via.placeholder.com/1000x500';
		}

		tableHTML +=
			`<tr>
				<td>
					<button id="${i}" class="btn btn-primary add-remove">Add</button>
					<input class="form-control count-box" type="number" value="1" />
				</td>
				<td>${record.id}</td>
				<td><a href="https://calendarbuilder.dev.adurolife.com/titancoil/#/${record.id}" target="_blank">${record.fields['Title']}</a></td>
				<td><span>${record.fields['Instructions']}</span></td>
				<td><img src="${headerImage}" width="100%"/></td>
				<td><span>${new Date(record._rawJson.createdTime).toDateString()}</span></td>
			</tr>`;
	});

	$('#table-body').append(tableHTML);

	// Creates an array used for sorting functionality
	throwToArray();
}

// Loads table JSON file from api
export function loadTable() {

	let allRecords = [];
	let loaded = 0;

	const base = new Airtable({ apiKey: 'keyCxnlep0bgotSrX' }).base('appa7mnDuYdgwx2zP');
	base('Challenges').select({
		view: 'Grid view'
	}).eachPage(function page(records, fetchNextPage) {

		allRecords = [...allRecords, ...records];
		$('#progress').html(loaded += 20);

		fetchNextPage();
	}, function done(err) {
		if (err) {
			console.error(err);
			return;
		}

		drawTable(allRecords);

		// Add event listeners to all the buttons
		$('.add-remove').click(addRemove);
	});

}

// Function for 'Continue' button - Saves values then uses them in GET request to compiler page
export function loadCompiler() {
  const eid = $('#eid').val();
  const fileName = $('#file-name').val();
  const startDate = $('#date-begin').val();
  const endDate = $('#date-end').val();
  const idList = $('#idList').val().replace(/,\s*$/, '');

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
    a.setAttribute('href', `compile/index.html#?file=${fileName}&eid=${eid}&start_date=${startDate}&end_date=${endDate}&id_list=${idList}`);
    a.setAttribute('target', '_blank');
  }
  a.click();
}
