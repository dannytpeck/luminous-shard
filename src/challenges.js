/* This file is for making all the ajax requests to WP and populating the table's contents */
import $ from 'jquery';
import { addRemove, throwToArray } from './sort';

// Draws the table
const drawTable = (posts) => {
	// Default to sorting by reverse-date
	posts.sort((a, b) => {
		if (a.date < b.date) {
			return 1;
		}
		if (a.date > b.date) {
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

	posts.map((post, i) => {
		tableHTML +=
			`<tr>
				<td><button id="${i}" class="btn btn-default add-remove">Add</button><span class="countX">x</span><input class="countBox" type="number" value="1" /></td>
				<td>${post.slug}</td>
				<td><a href="${post.url}" target="_new">${post.title.replace(/Protected\: /g, '').replace(/Private\: /g, '')}</a></td>
				<td><span style="display:none">${post.date}</span><span>${new Date(post.date).toDateString()}</span></td>
				<td><span style="display:none">${post.modified}</span><span>${new Date(post.modified).toDateString()}</span></td>
			</tr>`;
	});

	$('#table-body').html(tableHTML);

	// Add event listeners to all the buttons
	$('.add-remove').click(addRemove);

	// Creates an array used for sorting functionality
	throwToArray();
};

// Make ajax request on a single WP page, pushing the contents into an array
const requestOnePage = (page, posts, totalPages, pagesReceived) => {
	const url = `http://thelibrary.adurolife.com/api/get_posts/?count=10&page=${page}&callback=?`;
  $.getJSON(url)
		.done(data => {
			data.posts.map(post => {
				posts.push({
					slug: post.slug,
					title: post.title,
					url: post.url,
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

				const url = 'http://thelibrary.adurolife.com/thelibrary/challenges/';
				$.post(url, { data: JSON.stringify(posts) }).done(() => console.log('Saved table.'));
			}
		});
};

// Loads table JSON file from api
export function loadTable() {
  $.getJSON('http://thelibrary.adurolife.com/challenges-redirect/')
	.done(response => drawTable(response))
	.fail(() => window.location.href = 'http://thelibrary.adurolife.com/fragment-0-redirect/');
}

// Make ajax request to get the number of pages of posts in the Library, then request pages
export function buildTable() {
	// Create Spinning Progress Indicator
	$('#load').html('Loading...<img src="images/progressbar.gif" alt="An spinning progress indicator" /> <span style="margin-left:5px" id="progress">0</span>%');

	// Array to store all the posts
	let posts = [];

	// Keeps track of how many WP page requests have received responses - used for the progress bar
	let pagesReceived = [];

  $.getJSON('http://thelibrary.adurolife.com/api/get_posts/?count=10&callback=?')
    .done(function (data) {
			const totalPages = data.pages;
			// Loop through all the WP pages and make ajax request to each one
			for (let page = 1; page <= totalPages; page++) {
				requestOnePage(page, posts, totalPages, pagesReceived);
			}
    });
}
