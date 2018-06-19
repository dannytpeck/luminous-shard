import _ from 'lodash';
import $ from 'jquery';
window.$ = window.jQuery = $;
require('bootstrap');

import { loadTable, buildTable } from './challenges';
import { findChallenges, resetPage, loadCompiler, sortName, sortCreated, sortUpdated } from './sort';
import { loadSelectedChallenges } from './loader';
import { limeadeUpload, compileTransporter } from './compiler';

if (window.location.pathname.includes('compile')) {

	window.onload = loadSelectedChallenges;

	// Event Listeners
	$('.upload').click(limeadeUpload);
	$('.download').click(compileTransporter);
	$('#loadNumber').keyup(() => {
		let containerHTML = '';

		for (let i = 0; i < $('#loadNumber').val(); i++) {
			containerHTML += `
				<p>
					<input type="text" id="eid${i}" placeholder="Limeade e=" />
					<input type="text" id="psk${i}" placeholder="Limeade psk" />
				</p>
			`;
		}

		$('#eidContainer').html(containerHTML);
	});

} else {

	window.onload = loadTable;

	// Event listeners
	$('#build-table').click(buildTable);
	$('#reset').click(resetPage);
	$('#load-compiler').click(loadCompiler);
	$('#sortName').click(sortName);
	$('#sortCreated').click(sortCreated);
	$('#sortUpdated').click(sortUpdated);
	$('#search').keyup(_.debounce(findChallenges, 175));

}
