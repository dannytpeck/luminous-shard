/* globals $ */

/* This file is for the initial loading of selected challenges table */
import Airtable from 'airtable';

// Used to store clients for Select(s)
window.clients = [];

// Used to move dimensions from one box to the other
window.move = (choose, drop) => {
  const chooseSelect = document.getElementById(choose);
  const dropSelect = document.getElementById(drop);

	let d = '';

	for (let i = 0; i < chooseSelect.options.length; i++) {
		if (chooseSelect.options[i].selected) {
			d = dropSelect.appendChild(document.createElement('OPTION'));
			d.value = chooseSelect.options[i].value;
			d.innerHTML = d.value;
			chooseSelect.removeChild(chooseSelect.options[i]);
    }
	}
};

// Onkeyup function that replaces the code preview with the text area's contents
window.edit = (a, b) => {
	b.innerHTML = a.value;
};

// Replace trackingNO value with the value manually entered
window.modifyTrackingNumber = (row) => {
  const newValue = $('#required' + row).val();
  $('#sd' + row + ' .trackingNO').html(addCommasToNumber(newValue));
  $('#mi' + row + ' .trackingNO').html(addCommasToNumber(newValue));
};

// Show targeting modal by row (used as onclick)
window.showTargetingModal = (row) => {
  $(`#targetingModal${row}`).modal('show');
};

// Show dimensions modal by row (used as onclick)
window.showDimensionsModal = (row) => {
  $(`#dimensionsModal${row}`).modal('show');
};

window.showContentModal = (row) => {
  $(`#contentModal${row}`).modal('show');
};

// Adds commas to long numbers
function addCommasToNumber(number) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Makes proper selection on Team Challenge and Tracking Type selectors
function remainingDefaults(post, rowNumber) {

  // onChange handler for soloTeam selection
  $(`#soloTeam${rowNumber}`).change(() => {
    if ($(`#soloTeam${rowNumber}`).val() === 'Team') {
      $(`#teamMin${rowNumber}`).show();
      $(`#teamMax${rowNumber}`).show();
    } else {
      $(`#teamMin${rowNumber}`).hide();
      $(`#teamMax${rowNumber}`).hide();
    }
  });

  // Set team values based on defaults object
  if (post.fields['Team Activity'] === 'yes') {
    $(`#soloTeam${rowNumber}`).val('Team');
    $(`#soloTeam${rowNumber}`).change();
  }

  let tracking = 'One Time';
  const rewardOccurrence = post.fields['Reward Occurrence'];
  const activityTrackingType = post.fields['Activity Tracking Type'];
  if (activityTrackingType === 'Days') {
    tracking = rewardOccurrence === 'Weekly' ? 'Days each Week' : 'Days - Challenge Period';
  } else if (activityTrackingType === 'Units') {
    tracking = rewardOccurrence === 'Weekly' ? 'Units each Week' : 'Units - Challenge Period';
  }

  let trackType = document.getElementById(`trackType${rowNumber}`);
  for (let i = 0; i < trackType.options.length; i++) {
    if (trackType.options[i].value === tracking) {
      trackType.options[i].selected = true;
    } else {
      trackType.options[i].selected = false;
    }
  }

}

// Populates one row of the table
function drawTableRow(row, post, record) {

  // Remove 2017: and 2018: from titles
  let title= post.fields['Title']
    .replace(/2017: /, '')
    .replace(/2018: /, '');

  const checkChecked = post.fields['Device Enabled'] === 'yes' ? 'checked' : 'unchecked';
  const activityGoal = post.fields['Activity Goal'] ? post.fields['Activity Goal'] : '';
  const activityGoalText = post.fields['Activity Goal Text'] ? post.fields['Activity Goal Text'] : '';
  const deviceUnits = post.fields['Device Units'] ? post.fields['Device Units'] : '';
  const instructions = record ? record.fields['Instructions'] : post.fields['Instructions'];
  const moreInformationHtml = record ? record.fields['More Information Html'] : post.fields['More Information Html'];
  const limeadeDimensions = post.fields['Limeade Dimensions'] ? post.fields['Limeade Dimensions'].split(',') : [];

  $(`#device-and-team${row}`).html(
    `<p>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="deviceCheck${row}" ${checkChecked} />
        <label class="form-check-label" for="deviceCheck${row}">Device Enabled</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="deviceRequired${row}" />
        <label class="form-check-label" for="deviceRequired${row}">Device Required</label>
      </div>
    </p>
    <p>
      <select class="form-control" id="soloTeam${row}">
        <option value="Individual">Individual</option>
        <option value="Team">Team</option>
      </select>

      <div class="form-row">
        <div class="col">
          <select class="form-control" id="teamMin${row}" style="display: none;">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option selected="selected">4</option>
            <option>5</option>
          </select>
        </div>
        <div class="col">
          <select class="form-control" id="teamMax${row}" style="display: none;">
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option selected="selected">12</option>
            <option>13</option>
            <option>14</option>
            <option>15</option>
            <option>16</option>
            <option>17</option>
            <option>18</option>
            <option>19</option>
            <option>20</option>
          </select>
        </div>
      </div>
    </p>`
  );

  if (record) {
    $(`#start-end-date${row}`).html(
      `<div class="form-group">
        <label for="startDate${row}">Start Date</label>
        <input type="date" class="form-control" id="startDate${row}" value="${record.fields['Start date']}" tabindex="${row + 101}" />
      </div>

      <label for="endDate${row}">End Date</label>
      <input type="date" class="form-control" id="endDate${row}" value="${record.fields['End date']}" tabindex="${row + 101}" />`
    );
  } else {
    $(`#start-end-date${row}`).html(
      `<div class="form-group">
        <label for="startDate${row}">Start Date</label>
        <input type="date" class="form-control" id="startDate${row}" value="${$('#begin').val()}" tabindex="${row + 101}" />
      </div>

      <label for="endDate${row}">End Date</label>
      <input type="date" class="form-control" id="endDate${row}" value="${$('#end').val()}" tabindex="${row + 101}" />`
    );
  }

  $(`#content-and-dimensions${row}`).html(
    `<button type="button" class="btn btn-info btn-block" onclick="showContentModal(${row})">Content</button>
    <button type="button" class="btn btn-info btn-block" onclick="showDimensionsModal(${row})">Dimensions</button>`
  );

  const activityText = post.fields['Device Enabled'] === 'yes' ? `${deviceUnits} | ${activityGoalText}` : activityGoalText;

  $(`#tracking-type${row}`).html(
    `<div class="form-group">
      <input type="text" class="form-control" id="devText${row}" value="${activityText}" placeholder="activity" onkeyup="this.removeAttribute('value')" />
    </div>

    <div class="form-group">
      <input type="number" class="form-control" id="required${row}" value="${activityGoal}" placeholder="units" onkeyup="modifyTrackingNumber(${row})" />
    </div>

    <select class="form-control" id="trackType${row}">
      <option value="One Time">One Time</option>
      <option value="Units - Challenge Period">Units - Challenge Period</option>
      <option value="Days - Challenge Period">Days - Challenge Period</option>
      <option value="Units each Week">Units each Week</option>
      <option value="Days each Week">Days each Week</option>
    </select>`
  );

  $(`#point-value${row}`).html(
    `<div class="form-group">
      <input type="text" class="form-control" id="points${row}" value="${record ? record.fields['Points'] : ''}" tabindex="${row + 1}" />
    </div>

    <div class="form-check">
      <input type="checkbox" class="form-check-input" id="pointText${row}" />
      <label class="form-check-label" for="pointText${row}">
        <i class="fas fa-gift" data-toggle="tooltip" title="For 0 points challenges. Allows displaying flavor text when icon is hovered over in Limeade."></i>
      </label>
    </div>`
  );

  $(`#targeting${row}`).html(
    `<button type="button" class="btn btn-info btn-block" onclick="showTargetingModal(${row})">Targeting</button>`
	);

  $('#targetingModalContainer').append(
    `<div class="modal" tabindex="-1" role="dialog" id="targetingModal${row}">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Targeting</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" id="targetingModalBody${row}">

            <div class="form-group">
              <input type="text" class="form-control" id="subgroup${row}" placeholder="Subgroup">
            </div>
            <div class="form-group">
              <input type="text" class="form-control" id="field-one${row}" placeholder="Field1">
            </div>
            <div class="form-group">
              <input type="text" class="form-control" id="field-one-value${row}" placeholder="Field1Value">
            </div>
            <div class="form-group">
              <input type="text" class="form-control" id="field-two${row}" placeholder="Field2">
            </div>
            <div class="form-group">
              <input type="text" class="form-control" id="field-two-value${row}" placeholder="Field2Value">
            </div>
            <div class="form-group">
              <input type="text" class="form-control" id="field-three${row}" placeholder="Field3">
            </div>
            <div class="form-group">
              <input type="text" class="form-control" id="field-three-value${row}" placeholder="Field3Value">
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>`
  );

  function getDefaultDimensions(dimensions) {
    const allDimensions = [
      'Appreciating Life',
      'Back Health',
      'Belief in Organization',
      'Belief in Your Abilities',
      'Concern for Others',
      'Concern for the Environment',
      'Dream Job',
      'Drinking Moderately',
      'Energy Level',
      'Enjoying Work',
      'Exercise & Fitness',
      'Feeling Energized',
      'Financial Well-being',
      'Fit with Culture',
      'Growth',
      'Healthy Blood Sugar',
      'Healthy Weight',
      'Heart Health',
      'In the Flow',
      'Job Satisfaction',
      'Knowing Yourself',
      'Life Meaning',
      'Making & Keeping Commitments',
      'Managing Depression',
      'Managing Stress & Anxiety',
      'Nutrition',
      'Openness & Optimism',
      'Positive Living',
      'Positive Relationships',
      'Pregnancy',
      'Resilience',
      'Self-Acceptance',
      'Self-Care',
      'Self-Leadership',
      'Sense of Team',
      'Sleep',
      'Smoke-Free Living',
      'Square Deal',
      'Work Growth',
      'Work Meaning',
      'Work-Life Balance',
      'Vision'
    ];

    let selected = [];
    let j = '';

    for (let i = 0; i < dimensions.length; i++) {
      j = allDimensions.indexOf(dimensions[i]);
      selected.push(allDimensions[j]);
      allDimensions.splice(j, 1);
    }

    function createOptionElements(dimensions) {
      let x = '';
      for (let i = 0; i < dimensions.length; i++) {
        x += `<option value="${dimensions[i]}">${dimensions[i]}</option>`;
      }
      return x;
    }

    return {
      unselected: createOptionElements(allDimensions),
      selected: createOptionElements(selected)
    };
  }

  const dimensionElements = getDefaultDimensions(limeadeDimensions);

  $('#dimensionsModalContainer').append(
    `<div class="modal" tabindex="-1" role="dialog" id="dimensionsModal${row}">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Dimensions</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" id="dimensionsModalBody${row}">

            <div class="dimensions-preview">
              <div class="labels">
                <h5>Unselected</h5>
                <h5 class="selected-label">Selected</h5>
              </div>

              <select multiple class="form-control select-before" id="selectBefore${row}" size="5">${dimensionElements.unselected}</select>
              <button type="button" class="btn btn-primary add-dimensions" id="add${row}" onclick="move('selectBefore${row}', 'selectAfter${row}')">
                -->
              </button>
              <button type="button" class="btn btn-primary remove-dimensions" id="remove${row}" onclick="move('selectAfter${row}', 'selectBefore${row}')">
                <--
              </button>
              <select multiple class="form-control select-after" id="selectAfter${row}" size="5">${dimensionElements.selected}</select>
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>`
  );

  $('#contentModalContainer').append(
    `<div class="modal" tabindex="-1" role="dialog" id="contentModal${row}">
      <div class="modal-dialog" role="document">
        <div class="modal-content content-modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Content</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" id="contentModalBody${row}">

            <div class="codeEdit">
              <h3>Short Description (HTML)</h3>
              <textarea class="form-control" id="txtAreaS${row}" rows="4" onkeyup="edit(txtAreaS${row}, sd${row}.getElementsByTagName('SPAN')[0])">${instructions}</textarea>
              <h3>More Information (HTML)</h3>
              <textarea class="form-control" id="txtAreaM${row}" rows="12" onkeyup="edit(txtAreaM${row}, mi${row})">${moreInformationHtml}</textarea>
            </div>
            <div class="codeDisplay" id="codeCompile${row}">
              <img id="image${row}" src="${post.fields['Limeade Image Url']}" width="100%" />
              <span id="sd${row}"><span style="font-size:14px; font-weight:bold">${instructions}</span></span>
              <span id="mi${row}">${moreInformationHtml}</span>
            </div>

          </div>
          <div class="modal-footer content-modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>`
  );

  remainingDefaults(post, row);

}

// Makes an ajax request to a specific challenge page (by slug)
function requestOneChallenge(id, rowNumber) {
  const base = new Airtable({ apiKey: 'keyCxnlep0bgotSrX' }).base('appa7mnDuYdgwx2zP');

  base('Challenges').find(id, function(err, record) {
    if (err) {
      console.error(err);
      return;
    }
    drawTableRow(rowNumber, record);
  });
}

// Uses an array of library IDs and begins making ajax requests to populate the table
function getContent(ids) {
  const tableBody = $('#challenge-list tbody')[0];

  ids.map((id, i) => {
    const challengeUrl = `https://calendarbuilder.dev.adurolife.com/titancoil/#/${id}`;

    // Create a new row for each challenge
    $('#challenge-list tbody').append(`<tr><td><a href="${challengeUrl}" target="_blank">${id}</a></td></tr>`);

    // Build out the rest of the table
    tableBody.rows[i].appendChild (document.createElement('TD')).id = `device-and-team${i}`;
    tableBody.rows[i].appendChild(document.createElement('TD')).id = `start-end-date${i}`;
		tableBody.rows[i].appendChild(document.createElement('TD')).id = `content-and-dimensions${i}`;
		tableBody.rows[i].appendChild(document.createElement('TD')).id = `tracking-type${i}`;
		tableBody.rows[i].appendChild(document.createElement('TD')).id = `point-value${i}`;
		tableBody.rows[i].appendChild(document.createElement('TD')).id = `targeting${i}`;

    // Make an ajax request to get the challenge content, then draw it to the table
    requestOneChallenge(id, i);
  });

}

// Like getContent but it takes records w/ start and end dates
function getContentWithDates(records) {
  const tableBody = $('#challenge-list tbody')[0];

  records.forEach((record, rowNumber) => {
    const challengeId = record.fields['Challenge Id'];
    const challengeTitle = record.fields['Title'];

    // Create a new row for each challenge
    $('#challenge-list tbody').append(`<tr><td id="challenge-name${rowNumber}"><input type="text" class="form-control" id="chalTitle${rowNumber}" value="${challengeTitle}" /></td></tr>`);


    // Build out the rest of the table
    tableBody.rows[rowNumber].appendChild(document.createElement('TD')).id = `device-and-team${rowNumber}`;
    tableBody.rows[rowNumber].appendChild(document.createElement('TD')).id = `start-end-date${rowNumber}`;
		tableBody.rows[rowNumber].appendChild(document.createElement('TD')).id = `content-and-dimensions${rowNumber}`;
		tableBody.rows[rowNumber].appendChild(document.createElement('TD')).id = `tracking-type${rowNumber}`;
		tableBody.rows[rowNumber].appendChild(document.createElement('TD')).id = `point-value${rowNumber}`;
		tableBody.rows[rowNumber].appendChild(document.createElement('TD')).id = `targeting${rowNumber}`;

    // Make an ajax request to get the challenge content, then draw it to the table
    const base = new Airtable({ apiKey: 'keyCxnlep0bgotSrX' }).base('appa7mnDuYdgwx2zP');

    base('Challenges').find(challengeId, function(err, post) {
      if (err) {
        console.error(err);
        return;
      }
      drawTableRow(rowNumber, post, record);
    });

  });

}

function loadSelectedChallenges() {

	// Get location and find the beginning of the query
	const url = window.location.href;
	const query = url.substr((url.indexOf('#?') + 2), url.length);

	// Create an array of query values
	const vars = query.split('&');

	// Create an empty object to hold key/value pairs
	let queryObject = {};

	// Read each value in vars, create pairs and add each pair to our object
	for (let i = 0; i < vars.length; i++) {

		const pair = vars[i].split('=');

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
      case 'id_list':
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
    $('#start-and-end-dates').hide();
    $('#dateEstimations').hide();

    const calendarHash = queryObject.calendar;
    $.getJSON(`https://api.airtable.com/v0/appN1J6yscNwlzbzq/Challenges?api_key=keyCxnlep0bgotSrX&filterByFormula={Calendar}='${calendarHash}'`).done((data) => {
      // Populate first EID with EmployerName from results
      if (data.records) {
        const employerName = data.records[0].fields['EmployerName'];
        $('#eid0').val(employerName);
        window.fetchPsk(employerName, 0);
      }

      const filteredRecords = data.records.filter(record => record.fields['Challenge Id']);
      getContentWithDates(filteredRecords);
    });
  }

  // Populate the fields from the query object
  $('#fileName').val(queryObject.file);

  $('#eid0').val(queryObject.eid);
  window.fetchPsk(queryObject.eid, 0);

  $('#begin').val(queryObject.start);
  $('#end').val(queryObject.end);

  // Make ajax requests based on the array of IDs and build the table
	if (queryObject.ids) {
		getContent(queryObject.ids);
	}

	const startDate = new Date( $('#begin').val() );
	const endDate = new Date( $('#end').val() );

	const semi = (endDate - startDate) / 2;
	const semiEnd = new Date(startDate.getTime() + semi);

	const quart = (endDate - startDate) / 4;
	const quartEnd1 = new Date(startDate.getTime() + quart);
	const quartEnd2 = new Date(startDate.getTime() + quart + quart);
	const quartEnd3 = new Date(startDate.getTime() + quart + quart + quart);

	const dateEstimationsHTML =
    `<h3>Date Estimations</h3>
		<p><strong>Helpful guidelines for picking challenge dates.</strong></p>
		<p>
      <strong>Semi-annual, first half end: <span style="color: blue;">${semiEnd.getMonth() + 1}-${semiEnd.getDate()}-${semiEnd.getFullYear()}</span></strong>
    </p>
		<p>
		  <strong>Quarterly, first quarter end: <span style="color: blue;">${quartEnd1.getMonth() + 1}-${quartEnd1.getDate()}-${quartEnd1.getFullYear()}</span></strong>
		  <br />
      <strong>Quarterly, second quarter end: <span style="color: blue;">${quartEnd2.getMonth() + 1}-${quartEnd2.getDate()}-${quartEnd2.getFullYear()}</span></strong>
		  <br />
      <strong>Quarterly, third quarter end: <span style="color: blue;">${quartEnd3.getMonth() + 1}-${quartEnd3.getDate()}-${quartEnd3.getFullYear()}</span></strong>
    </p>`;
  $('#dateEstimations').html(dateEstimationsHTML);
}

export function renderEmployerNames() {
	let html = '';
  window.clients.map((client) => {
    html += `<option>${client.fields['Limeade e=']}</option>`;
  });
	return html;
}

window.fetchPsk = (value, i) => {
	window.clients.map((client) => {
		if (client.fields['Limeade e='] === value) {
			$('#psk' + i).val(client.fields['Limeade PSK']);
		}
	});
};

function drawClientSelect() {
	let containerHTML = '';
	containerHTML +=
	`<div>
		<div class="form-group">
			<select id="eid0" class="form-control custom-select" onchange="fetchPsk(this.value, 0)">
				<option defaultValue>Select Limeade e=</option>
				${renderEmployerNames()}
			</select>
		</div>

		<div class="form-group" style="display: none;">
			<input id="psk0" class="form-control" type="text" />
		</div>
	</div>`;
	$('.eid-select').html(containerHTML);
}

export function getClientList() {
  $.getJSON('https://api.airtable.com/v0/appHXXoVD1tn9QATh/Clients?api_key=keyCxnlep0bgotSrX&view=sorted').done(data => {
    window.clients = data.records;
    if (data.offset) {
      $.getJSON(`https://api.airtable.com/v0/appHXXoVD1tn9QATh/Clients?api_key=keyCxnlep0bgotSrX&view=sorted&offset=${data.offset}`).done(data => {
        window.clients = [...window.clients, ...data.records];
        drawClientSelect();
        loadSelectedChallenges();
      });
    }
  });
}
