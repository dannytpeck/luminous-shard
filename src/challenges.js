/* This file is for making all the ajax requests to WP and populating the table's contents */
import $ from 'jquery';
import Airtable from 'airtable';
import { addRemove, throwToArray } from './sort';

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

	$('#load').html('<strong style="color:blue"> </strong>');

	$('#search').attr('readonly', false);
	$('#exclusive').attr('disabled', false);
	$('#load-compiler').attr('disabled', false);
	$('#reset').attr('disabled', false);

	let tableHTML = '';

	records.map((record, i) => {
		tableHTML +=
			`<tr>
				<td><button id="${i}" class="btn btn-default add-remove">Add</button><span class="countX">x</span><input class="countBox" type="number" value="1" /></td>
				<td>${record.id}</td>
				<td><a href="${record.fields['Header Image']}" target="_blank">${record.fields['Title']}</a></td>
				<td><span style="display:none">${record._rawJson.createdTime}</span><span>${new Date(record._rawJson.createdTime).toDateString()}</span></td>
				<td><span style="display:none">${record._rawJson.createdTime}</span><span>${new Date(record._rawJson.createdTime).toDateString()}</span></td>
			</tr>`;
	});

	$('#table-body').append(tableHTML);

	// Add event listeners to all the buttons
	$('.add-remove').click(addRemove);

	// Creates an array used for sorting functionality
	throwToArray();
}

// Make ajax request on a single WP page, pushing the contents into an array
const requestOnePage = (page, posts, totalPages, pagesReceived) => {
	const url = `http://thelibrary.adurolife.com/wp-json/wp/v2/posts?page=${page}`;
  $.getJSON(url)
		.done(data => {
			data.map(post => {
				posts.push({
					slug: post.slug,
					title: post.title.rendered,
					url: post.link,
					date: post.date,
					modified: post.modified
				});
			});
    })
    .fail((jqxhr, textStatus, error) => console.error(`Request Failed: ${textStatus}, ${error}`))
		.always(() => {
      pagesReceived.push(page);

			$('#progress').html(Math.round((pagesReceived.length / totalPages) * 100));

			if (pagesReceived.length >= totalPages) {
				drawTable(posts);

				const url = 'https://mywellnessnumbers.com/thelibrary/challenges/';
				$.post(url, { data: JSON.stringify(posts) }).done(() => console.log('Saved table.'));
			}
		});
};

// Loads table JSON file from api
export function loadTable() {

	const base = new Airtable({ apiKey: 'keyCxnlep0bgotSrX' }).base('appa7mnDuYdgwx2zP');
	base('Challenges').select({
		view: 'Grid view'
	}).eachPage(function page(records, fetchNextPage) {

		drawTable(records);

		fetchNextPage();
	}, function done(err) {
		if (err) {
			console.error(err);
			return;
		}
	});

  // $.getJSON('https://mywellnessnumbers.com/thelibrary/challenges/').done(response => {
	// 	drawTable(response);
	// }).fail((error) => console.error(error.responseText));
}

// Make ajax request to get the number of pages of posts in the Library, then request pages
export function buildTable() {
	// Create Spinning Progress Indicator
	$('#load').html('Loading...<img src="images/progressbar.gif" alt="A spinning progress indicator" /> <span style="margin-left:5px" id="progress">0</span>%');

	// Array to store all the posts
	let posts = [];

	// Keeps track of how many WP page requests have received responses - used for the progress bar
	let pagesReceived = [];

	// Loop through 100 pages TODO: make this less brittle
	for (let page = 1; page <= 100; page++) {
		requestOnePage(page, posts, 100, pagesReceived);
	}
}
