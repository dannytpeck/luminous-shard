/* globals $ */

/* This file is for the initial loading of selected challenges table */
import Airtable from 'airtable';

// Used to store clients for Select(s)
window.clients = [];

// Used to add dimensions from left selector to right selector
window.addDimension = (element) => {
  const rowElement = element.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
  const index = rowElement.id.search(/\d+/);
  const rowNumber = rowElement.id.substring(index);

  const chooseSelect = document.querySelector(`#row${rowNumber} .select-before`);
  const dropSelect = document.querySelector(`#row${rowNumber} .select-after`);

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

// Used to remove dimensions
window.removeDimension = (element) => {
  const rowElement = element.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
  const index = rowElement.id.search(/\d+/);
  const rowNumber = rowElement.id.substring(index);

  const chooseSelect = document.querySelector(`#row${rowNumber} .select-after`);
  const dropSelect = document.querySelector(`#row${rowNumber} .select-before`);

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

// Onkeyup functions that replace the code preview with the textarea's contents
window.editShortDescription = (element) => {
  const rowElement = element.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
  const index = rowElement.id.search(/\d+/);
  const rowNumber = rowElement.id.substring(index);

  const editor = document.querySelector(`#row${rowNumber} .code-edit textarea`);
  const shortDescription = document.querySelector(`#row${rowNumber} .short-description`);

  shortDescription.innerHTML = editor.value;
};

window.editMoreInformation = (element) => {
  const rowElement = element.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
  const index = rowElement.id.search(/\d+/);
  const rowNumber = rowElement.id.substring(index);

  const editor = document.querySelectorAll(`#row${rowNumber} .code-edit textarea`)[1];
  const moreInformation = document.querySelector(`#row${rowNumber} .more-information`);

  moreInformation.innerHTML = editor.value;
};

// Toggles the team size units selects
window.toggleTeamSize = row => {
  if ($(`#row${row} .is-team`).val() === 'Team') {
    $(`#row${row} .team-size`).show();
  } else {
    $(`#row${row} .team-size`).hide();
  }
};

// Toggles the device units select
window.toggleDeviceUnits = (element) => {
  const rowElement = element.parentNode.parentNode.parentNode.parentNode;
  const index = rowElement.id.search(/\d+/);
  const rowNumber = rowElement.id.substring(index);

  $(`#row${rowNumber} .device-units`).toggle();
};

// Replace trackingNO value with the value manually entered
window.modifyTrackingNumber = (row) => {
  const newValue = $('#required' + row).val();
  $(`#row${row} .short-description .trackingNO`).html(addCommasToNumber(newValue));
  $(`#row${row} .more-information .trackingNO`).html(addCommasToNumber(newValue));
};

window.deleteRow = row => {
  const lastIndex = $('#row' + row).siblings().length - 1;

  $('#challenge-list tbody tr').each((i, item) => {
    const index = item.id.search(/\d+/);
    const rowNumber = item.id.substring(index);

    if (rowNumber > row) {
      $(`#row${rowNumber} > .delete-row`).html(`<i class="fas fa-times" onclick="deleteRow(${rowNumber - 1})"></i>`);

      item.id = 'row' + (rowNumber - 1);
    }
  });

  $('#row' + row).remove();
};

// Occurs when you change the tracking Type
window.changeTrackingType = row => {
  if ($(`#row${row} .tracking-type`).val() === 'Event') {
    $(`#row${row} .activity-goal`).hide();
  } else {
    $(`#row${row} .activity-goal`).show();
  }
};

window.showContentModal = (element) => {
  const rowElement = element.parentNode.parentNode;
  const index = rowElement.id.search(/\d+/);
  const row = rowElement.id.substring(index);

  $(`#row${row} .content-modal`).modal('show');
};

// Show targeting modal by row (used as onclick)
window.showTargetingModal = (element) => {
  const rowElement = element.parentNode.parentNode;
  const index = rowElement.id.search(/\d+/);
  const row = rowElement.id.substring(index);

  $(`#row${row} .targeting-modal`).modal('show');
};

// Show dimensions modal by row (used as onclick)
window.showDimensionsModal = (element) => {
  const rowElement = element.parentNode.parentNode;
  const index = rowElement.id.search(/\d+/);
  const row = rowElement.id.substring(index);

  $(`#row${row} .dimensions-modal`).modal('show');
};

// Adds commas to long numbers
function addCommasToNumber(number) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Populates one row of the table
function drawTableRow(row, post, record) {
  // post: a record from the Library, unedited
  // record: a record from Calendar Builder that an AM has modified

  // Remove years from Title
  let title = record ? record.fields['Title'].replace(/20\d\d: /, '') : post.fields['Title'].replace(/20\d\d: /, '');

  const activityGoal = record ? record.fields['Activity Goal'] : post.fields['Activity Goal'];
  const activityGoalText = record ? record.fields['Activity Goal Text'] : post.fields['Activity Goal Text'];
  const instructions = record ? record.fields['Instructions'] : post.fields['Instructions'];
  const moreInformationHtml = record ? record.fields['More Information Html'] : post.fields['More Information Html'];

  const checkDevice = post.fields['Device Enabled'] === 'yes' ? 'checked' : 'unchecked';
  const checkPartner = post.fields['Verified'] === 'Verified' ? 'checked' : 'unchecked';
  const deviceUnits = post.fields['Device Units'] ? post.fields['Device Units'] : '';
  const limeadeDimensions = post.fields['Limeade Dimensions'] ? post.fields['Limeade Dimensions'].split(',').map(item => item.trim()) : [];

  $(`#row${row} .challenge-title`).val(title);

  if (record) {
    $(`#start-end-date${row}`).html(
      `<div class="form-group">
        <label>Start Date</label>
        <input type="date" class="form-control start-date" value="${record.fields['Start date']}" tabindex="${row + 101}" />
      </div>

      <label>End Date</label>
      <input type="date" class="form-control end-date" value="${record.fields['End date']}" tabindex="${row + 101}" />`
    );
  } else {
    $(`#start-end-date${row}`).html(
      `<div class="form-group">
        <label>Start Date</label>
        <input type="date" class="form-control start-date" value="${$('#begin').val()}" tabindex="${row + 101}" />
      </div>

      <label>End Date</label>
      <input type="date" class="form-control end-date" value="${$('#end').val()}" tabindex="${row + 101}" />`
    );
  }

  $(`#trackingDetails${row}`).html(`
    <div class="input-group team-selects">
      <select class="form-control is-team col-md-5" onchange="toggleTeamSize(${row})">
        <option value="Individual">Individual</option>
        <option value="Team">Team</option>
      </select>
      <div class="input-group team-size col-md-7">
        <label class="my-1">Size</label>
        <select name="Min" class="form-control team-min mx-1">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4" selected="selected">4</option>
          <option value="5">5</option>
        </select>
        <select name="Max" class="form-control team-max">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12" selected="selected">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>

    <div class="form-group">
      <input type="text" class="form-control activity-goal-text" value="${activityGoalText}" placeholder="Activity Text" onkeyup="this.removeAttribute('value')" />
    </div>

    <div class="form-group" style="width: 42%; display: inline-block;">
      <select class="form-control tracking-type" onchange="changeTrackingType(${row})">
        <option>Event</option>
        <option>Days</option>
        <option>Units</option>
      </select>
    </div>

    <div class="form-group" style="width: 56%; display: inline-block;">
      <input type="number" class="form-control activity-goal" value="${activityGoal ? activityGoal : ''}" placeholder="Activity Goal" onkeyup="modifyTrackingNumber(${row})" />
    </div>
  `);

  $(`#point-value${row}`).html(`
    <div class="form-group">
      <input type="text" class="form-control points" value="${record ? record.fields['Points'] : ''}" tabindex="${row + 1}" />
    </div>
    <div class="form-group">
      <select class="form-control reward-occurrence">
        <option value="Once">One Time</option>
        <option value="Weekly">Weekly</option>
      </select>
    </div>
    <div class="form-check my-3">
      <label class="form-check-label"><input class="form-check-input is-partner" type="checkbox" ${checkPartner} /> Verified Challenge</label>
    </div>
  `);

  $(`#deviceSettings${row}`).html(`
    <div class="form-check my-3">
      <label class="form-check-label"><input class="form-check-input device-enabled" type="checkbox" ${checkDevice} onchange="toggleDeviceUnits(this)" /> Device Enabled</label>
    </div>
    <div class="form-group">
      <select class="form-control device-units">
        <option>steps</option>
        <option>miles</option>
      </select>
    </div>
  `);

  $(`#targeting${row}`).html(`
    <button type="button" class="btn btn-outline-info btn-block" onclick="showTargetingModal(this)">Targeting</button>
    <button type="button" class="btn btn-outline-info btn-block" onclick="showDimensionsModal(this)">Dimensions</button>
  `);

  $(`#row${row} > .delete-row`).html(`
    <i class="fas fa-times" onclick="deleteRow(${row})"></i>
  `);

  // Select proper choice from airtable or shiny stone page 1
  if (record) {
    $(`#row${row} .is-team`).val(record.fields['Team Activity'] === 'yes' ? 'Team' : 'Individual');
    $(`#row${row} .team-min`).val(record.fields['Team Size Minimum'] ? record.fields['Team Size Minimum'] : 4);
    $(`#row${row} .team-max`).val(record.fields['Team Size Maximum'] ? record.fields['Team Size Maximum'] : 12);
    $(`#row${row} .tracking-type`).val(record.fields['Activity Tracking Type']);
    $(`#row${row} .reward-occurrence`).val(record.fields['Reward Occurrence']);
    $(`#row${row} .is-partner`).prop('checked', record.fields['Verified'] === 'Verified');
  } else {
    $(`#row${row} .is-team`).val(post.fields['Team Activity'] === 'yes' ? 'Team' : 'Individual');
    $(`#row${row} .team-min`).val(post.fields['Team Size Minimum'] ? post.fields['Team Size Minimum'] : 4);
    $(`#row${row} .team-max`).val(post.fields['Team Size Maximum'] ? post.fields['Team Size Maximum'] : 12);
    $(`#row${row} .tracking-type`).val(post.fields['Activity Tracking Type']);
    $(`#row${row} .reward-occurrence`).val(post.fields['Reward Occurrence']);
    $(`#row${row} .is-partner`).prop('checked', post.fields['Verified'] === 'Verified');
  }

  if ($(`#row${row} .is-team`).val() === 'Individual') {
    $(`#row${row} .team-size`).hide();
  }

  if ($(`#row${row} .tracking-type`).val() === 'Event') {
    $(`#row${row} .activity-goal`).hide();
  }

  // Select proper choice from the Device Units <select>
  $(`#row${row} .device-units`).val(deviceUnits);
  if ($(`#row${row} .device-enabled`).prop('checked') === false) {
    $(`#row${row} .device-units`).hide();
  }

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

  let imageUrl = post.fields['Limeade Image Url'];
  if (imageUrl.includes('cfs-file')) {
    imageUrl = `https://mywellmetrics.com${imageUrl}`;
  }

  // Append Content Modal
  $(`#row${row}`).append(
    `<div class="modal content-modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content content-modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Content</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">

            <div class="code-edit">
              <h3>Short Description (HTML)</h3>
              <textarea class="form-control" rows="4" onkeyup="editShortDescription(this)">${instructions}</textarea>
              <h3>More Information (HTML)</h3>
              <textarea class="form-control" rows="12" onkeyup="editMoreInformation(this)">${moreInformationHtml}</textarea>
            </div>
            <div class="codeDisplay">
              <img class="image" src="${imageUrl}" width="100%" />
              <span class="short-description">${instructions}</span>
              <span class="more-information">${moreInformationHtml}</span>
            </div>

          </div>
          <div class="modal-footer content-modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>`
  );

  // Append Targeting Modal
  $(`#row${row}`).append(
    `<div class="modal targeting-modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Targeting</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">

            <div class="form-group">
              <input type="text" class="form-control subgroup" placeholder="Subgroup">
            </div>
            <div class="form-group">
              <input type="text" class="form-control field-one" placeholder="Field1">
            </div>
            <div class="form-group">
              <input type="text" class="form-control field-one-value" placeholder="Field1Value">
            </div>
            <div class="form-group">
              <input type="text" class="form-control field-two" placeholder="Field2">
            </div>
            <div class="form-group">
              <input type="text" class="form-control field-two-value" placeholder="Field2Value">
            </div>
            <div class="form-group">
              <input type="text" class="form-control field-three" placeholder="Field3">
            </div>
            <div class="form-group">
              <input type="text" class="form-control field-three-value" placeholder="Field3Value">
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>`
  );

  // Append Dimensions Modal
  $(`#row${row}`).append(
    `<div class="modal dimensions-modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Dimensions</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">

            <div class="dimensions-preview">
              <div class="labels">
                <h5>Unselected</h5>
                <h5 class="selected-label">Selected</h5>
              </div>

              <select multiple class="form-control select-before" size="5">${dimensionElements.unselected}</select>
              <button type="button" class="btn btn-primary add-dimensions" onclick="addDimension(this)">
                <i class="fas fa-arrow-right"></i>
              </button>
              <button type="button" class="btn btn-primary remove-dimensions" onclick="removeDimension(this)">
                <i class="fas fa-arrow-left"></i>
              </button>
              <select multiple class="form-control select-after" size="5">${dimensionElements.selected}</select>
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>`
  );

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

  ids.forEach((id, rowNumber) => {
    const challengeUrl = `https://calendarbuilder.dev.adurolife.com/titancoil/#/${id}`;

    // Create a new row for each challenge
    $('#challenge-list tbody').append(`
      <tr id="row${rowNumber}">
        <td>
          <input type="text" class="form-control challenge-title" />
          <button type="button" class="btn btn-outline-info btn-block my-3" onclick="showContentModal(this)">Content</button>
        </td>
      </tr>
    `);

    // Build out the rest of the table
    tableBody.rows[rowNumber].appendChild(document.createElement('TD')).id = `start-end-date${rowNumber}`;
		tableBody.rows[rowNumber].appendChild(document.createElement('TD')).id = `trackingDetails${rowNumber}`;
		tableBody.rows[rowNumber].appendChild(document.createElement('TD')).id = `deviceSettings${rowNumber}`;
		tableBody.rows[rowNumber].appendChild(document.createElement('TD')).id = `point-value${rowNumber}`;
		tableBody.rows[rowNumber].appendChild(document.createElement('TD')).id = `targeting${rowNumber}`;
    tableBody.rows[rowNumber].appendChild(document.createElement('TD')).classList.add('delete-row');

    // Make an ajax request to get the challenge content, then draw it to the table
    requestOneChallenge(id, rowNumber);
  });

}

// Like getContent but it takes records w/ start and end dates
function getContentWithDates(records) {
  const tableBody = $('#challenge-list tbody')[0];

  records.forEach((record, rowNumber) => {
    const challengeId = record.fields['Challenge Id'];

    // Create a new row for each challenge
    $('#challenge-list tbody').append(`
      <tr id="row${rowNumber}">
        <td>
          <input type="text" class="form-control challenge-title" value="${record.fields['Title']}" />
          <button type="button" class="btn btn-outline-info btn-block my-3" onclick="showContentModal(this)">Content</button>
        </td>
      </tr>
    `);

    // Build out the rest of the table
    tableBody.rows[rowNumber].appendChild(document.createElement('TD')).id = `start-end-date${rowNumber}`;
		tableBody.rows[rowNumber].appendChild(document.createElement('TD')).id = `trackingDetails${rowNumber}`;
    tableBody.rows[rowNumber].appendChild(document.createElement('TD')).id = `deviceSettings${rowNumber}`;
		tableBody.rows[rowNumber].appendChild(document.createElement('TD')).id = `point-value${rowNumber}`;
		tableBody.rows[rowNumber].appendChild(document.createElement('TD')).id = `targeting${rowNumber}`;
    tableBody.rows[rowNumber].appendChild(document.createElement('TD')).classList.add('delete-row');

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
