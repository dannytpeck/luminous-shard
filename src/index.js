/* globals $ */
import _ from 'lodash';

import { loadTable } from './challenges';
import { findChallenges, resetPage, loadCompiler, sortName, sortCreated, sortUpdated } from './sort';
import { getClientList, renderEmployerNames } from './loader';
import { limeadeUpload, compileTransporter } from './compiler';

if (window.location.pathname.includes('compile')) {

window.onload = getClientList;

	// Event Listeners
	$('.upload').click(limeadeUpload);
	$('.download').click(compileTransporter);
	$('#loadNumber').keyup(() => {
		let containerHTML = '';

		for (let i = 0; i < $('#loadNumber').val(); i++) {
			containerHTML += `
				<div class="form-group">
					<select id="eid${i}" class="form-control eid-select" onchange="fetchPsk(this.value, ${i})">
						<option defaultValue>Select Limeade e=</option>
						${renderEmployerNames()}
					</select>
					<input type="text" class="form-control psk-select" id="psk${i}" placeholder="Limeade psk" />
				</div>
			`;
		}

		$('#eidContainer').html(containerHTML);
	});

} else {

	window.onload = loadTable;

	// Event listeners
	$('#reset').click(resetPage);
	$('#load-compiler').click(loadCompiler);
	$('#sortName').click(sortName);
	$('#sortCreated').click(sortCreated);
	$('#sortUpdated').click(sortUpdated);
	$('#search').keyup(_.debounce(findChallenges, 175));

}
