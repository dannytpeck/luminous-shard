/* This file is for the initial loading of selected challenges table */
import $ from 'jquery';

// Displays dimensions or code popup - hides whichever one isn't being viewed
window.chooseDimens = (row, origin) => {
  const dimenPreview = $(`#popup${row} .dimenPreview`);
	const codePreview = $(`#popup${row} .codePreview`);

  $(`#popup${row}`).show();

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
window.move = (choose, drop) => {
	let d = '';

	for (let i = 0; i < choose.options.length; i++) {
		if (choose.options[i].selected) {
			d = drop.appendChild(document.createElement('OPTION'));
			d.value = choose.options[i].value;
			d.innerHTML = d.value;
			choose.removeChild(choose.options[i]);
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

// Adds commas to long numbers
function addCommasToNumber(number) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Makes proper selection on Team Challenge and Tracking Type selectors
function remainingDefaults(defaults, row) {

  // onChange handler for soloTeam selection
  $(`#soloTeam${row}`).change(() => {
    if ($(`#soloTeam${row}`).val() === 'Team') {
      $(`#teamMin${row}`).show();
      $(`#teamMax${row}`).show();
    } else {
      $(`#teamMin${row}`).hide();
      $(`#teamMax${row}`).hide();
    }
  });

  // Set team values based on defaults object
  if (defaults.team === 'Team') {
    $(`#soloTeam${row}`).val('Team');
    $(`#soloTeam${row}`).change();
  }

  var trackType = document.getElementById(`trackType${row}`);
  for (var i = 0; i < trackType.options.length; i++) {
    if (trackType.options[i].value === defaults.tracking) {
      trackType.options[i].selected = true;
    } else {
      trackType.options[i].selected = false;
    }
  }

}

// Populates one row of the table
function drawTableRow(row, post) {

  // Remove 2017: and 2018: from titles
  const title = post.title.rendered
    .replace(/2017: /, '')
    .replace(/2018: /, '');

  // Only use straight quotes
  const allCode = post.content.rendered
    .replace(/\u201C/g, '"')
    .replace(/\u201D/g, '"');

  const begin = allCode.indexOf('{ "defaults"');
	const end = allCode.indexOf(' </script> <!--end defaults-->');
	const objectText = allCode.substring(begin, end);

  let defaults;
	try {
		defaults = JSON.parse(objectText).defaults;
	} catch (e) {
		throw new Error(`Invalid JSON object at http://thelibrary.adurolife.com/wp-json/wp/v2/posts?${post.slug}`);
	}

  const checkChecked = defaults.device === 'yes' ? 'checked' : 'unchecked';
  $(`#challenge-name${row}`).html(
    `<p>
      <input type="text" id="chalTitle${row}" value="${title}" />
    </p>
    <p>
      <label for="deviceCheck${row}">Device Enabled</label>
      <input id="deviceCheck${row}" type="checkbox" style="padding-left:10px" ${checkChecked} /><br/>
      <label for="deviceRequired${row}">Device Required</label>
      <input id="deviceRequired${row}" type="checkbox" style="padding-left:10px" />
    </p>
    <p>
      <select id="soloTeam${row}">
        <option value="Individual">Individual</option>
        <option value="Team">Team</option>
      </select>

      <select id="teamMin${row}" style="display: none;">
        <option>2</option>
        <option>3</option>
        <option selected="selected">4</option>
        <option>5</option>
      </select>

      <select id="teamMax${row}" style="display: none;">
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
    </p>`
  );

  $(`#start-end-date${row}`).html(
    `<div>
      Start Date
      <input type="date" id="startDate${row}" value="${$('#begin').val()}" tabindex="${row + 101}" />
      <br>
      End Date
      <input type="date" id="endDate${row}" value="${$('#end').val()}" tabindex="${row + 101}" />
    </div>`
  );

  $(`#dimensions-and-code${row}`).html(
    `<p>
      <a class="btn btn-default" onclick="chooseDimens(${row},'dimen')">Dimensions</a>
    </p>`
  );

  // Invisible element to hold the imgLink
  $('body').append(
    `<a id="imgLink${row}" class="btn btn-default" style="display:none"
        href="https://mywellmetrics.com${defaults.imgUrl}" target="_new">
      Preview Image
    </a>`
  );

  $('#team-challenge' + row).html(
    `<p>
      <a class="btn btn-default" onclick="chooseDimens(${row},'code')">Edit Description</a>
    </p>`
  );

  $(`#tracking-type${row}`).html(
    `<input type="text" id="devText${row}" onkeyup="this.removeAttribute('value')" placeholder="activity" value="${defaults.text}" />
    <br/><br/>
    <input type="number" id="required${row}" onkeyup="modifyTrackingNumber(${row})" placeholder="units" value="${defaults.required}" />
    <br><br>
    <select id="trackType${row}">
			 <option value="One Time">One Time</option>
			 <option value="One Time Units">Units - Challenge Period</option>
			 <option value="One Time Days">Days - Challenge Period</option>
			 <option value="Weekly Units">Units each week</option>
			 <option value="Weekly Days">Days each Week</option>
     </select>`
  );

  $(`#point-value${row}`).html(
    `<input id="points${row}" type="text" style="width:50px" tabindex="${row + 1}" />
    <p>
      <label for="pointText${row}"><span class="glyphicon glyphicon-gift" data-toggle="tooltip" title="For 0 points challenges. Allows displaying flavor text when icon is hovered over in Limeade."></span></label>
      <input id="pointText${row}" type="checkbox" />
    </p>`
  );

  $(`#targeting${row}`).html(
    `<p>
      <a class="btn btn-default" onclick="showTargetingModal(${row})">Targeting</a>
    </p>`
	);

  $('#targetingModalContainer').append(
    `<div class="modal fade" id="targetingModal${row}" tabindex="-1" role="dialog" aria-labelledby="targetingModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="targetingModalLabel">Targeting</h4>
          </div>
          <div class="modal-body" id="targetingModalBody${row}">
            <input type="text" id="subgroup${row}" placeholder="Subgroup" />
            <br><br>
            <input type="text" id="field-one${row}" placeholder="Field1" />
            <br><br>
            <input type="text" id="field-one-value${row}" placeholder="Field1Value" />
            <br><br>
            <input type="text" id="field-two${row}" placeholder="Field2" />
            <br><br>
            <input type="text" id="field-two-value${row}" placeholder="Field2Value" />
            <br><br>
            <input type="text" id="field-three{row}" placeholder="Field3" />
            <br><br>
            <input type="text" id="field-three-value${row}" placeholder="Field3Value" />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>`
  );

  function getDefaultDimens(dimensions) {
    var platformDimens = [
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
      'Exercise &amp; Fitness',
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
      'Making &amp; Keeping Commitments',
      'Managing Depression',
      'Managing Stress &amp; Anxiety',
      'Nutrition',
      'Openness &amp; Optimism',
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
        x += `<option value="${selected[i]}">${selected[i]}</option>`;
      }
      return x;
    }

    function finalUN(leftover) {
      var x = '';
      var i;
      for (i = 0; i < leftover.length; i++) {
        x += `<option value="${leftover[i]}">${leftover[i]}</option>`;
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
  popUp.innerHTML =
    `<div class="dimenPreview">
      <select id="selectBefore${row}" class="selectBf" multiple>${sec.un}</select>
      <button id="add${row}" onclick="move(selectBefore${row}, selectAfter${row})">
        -->
      </button>
      <button id="remove${row}" style="position:absolute; bottom:40%; left:44%"
              onclick="move(selectAfter${row}, selectBefore${row})">
        <--
      </button>
      <select id="selectAfter${row}" class="selectAf" multiple>${sec.se}</select>
      <a onclick="$('#popup${row}').hide()">Submit</a>
    </div>

    <div class="codePreview">
      <div class="codeEdit">
        <h3>Short Description</h3>
        <textarea class="shortDescription" id="txtAreaS${row}" onkeyup="edit(txtAreaS${row}, sd${row}.getElementsByTagName('SPAN')[0])">${completeCode.shortDescription}</textarea>
        <h3>More Information</h3>
        <textarea class="moreInformation" id="txtAreaM${row}" onkeyup="edit(txtAreaM${row}, mi${row})">${completeCode.moreInformation}</textarea>
        <a class="linkSpec button" onclick="$('#popup${row}').hide()">
          <span class="glyphicon glyphicon-ok"></span>
        </a>
      </div>
      <div class="codeLive">
        <div class="codeLiveDisplay" id="codeCompile${row}">
          <span id="sd${row}"><span style="font-size:14px; font-weight:bold">${completeCode.shortDescription}</span></span>
          <span id="mi${row}">${completeCode.moreInformation}</span>
        </div>
      </div>
    </div>`;

  remainingDefaults(defaults, row);

}

// Makes an ajax request to a specific challenge page (by slug)
function requestOneChallenge(slug, row) {
  const url = `http://thelibrary.adurolife.com/wp-json/wp/v2/posts?slug=${slug}`;

  $.getJSON(`${url}`).done(function (data) {
    const post = data[0];
    drawTableRow(row, post);
  }).fail(function (jqxhr, textStatus, error) {
    const err = `${textStatus}, ${error}`;
    console.error(`Request Failed: ${err}`);
  });
}

// Uses an array of library IDs and begins making ajax requests to populate the table
function getContent(ids) {
  const tableBody = $('#challenge-list tbody')[0];

	for (let i = 0; i < ids.length; i++) {
		const slug = ids[i];
    const challengeUrl = `http://thelibrary.adurolife.com/${slug}`;

    // Create a new row for each challenge
    $('#challenge-list tbody').append(`<tr><td><a href="${challengeUrl}" target="_blank">${slug}</a></td></tr>`);

    // Build out the rest of the table
    tableBody.rows[i].appendChild(document.createElement('TD')).id = `challenge-name${i}`;
    tableBody.rows[i].appendChild(document.createElement('TD')).id = `start-end-date${i}`;
		tableBody.rows[i].appendChild(document.createElement('TD')).id = `dimensions-and-code${i}`;
		tableBody.rows[i].appendChild(document.createElement('TD')).id = `team-challenge${i}`;
		tableBody.rows[i].appendChild(document.createElement('TD')).id = `tracking-type${i}`;
		tableBody.rows[i].appendChild(document.createElement('TD')).id = `point-value${i}`;
		tableBody.rows[i].appendChild(document.createElement('TD')).id = `targeting${i}`;

    requestOneChallenge(slug, i);
	}

}

export function grabber() {

	// Get location and find the beginning of the query
	var url = window.location.href;
	var query = url.substr((url.indexOf('#?') + 2), url.length);

	// Create an array of query values
	var vars = query.split('&');

	// Create an empty object to hold key/value pairs
	var queryObject = {};

	// Read each value in vars, create pairs and add each pair to our object
	var i;
	for (i = 0; i < vars.length; i++) {

		var pair = vars[i].split('=');

		switch (pair[0]) {
      case 'file':
        console.log(pair);
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
    }
	}

  // Populate the fields from the query object
  $('#fileName').val(queryObject.file);
  $('#eid0').val(queryObject.eid);
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

	const shortCutHTML =
    `<h3>Estimations</h3>
		<p>
      <strong style="color:black">
        This text area is meant to display semi-annual and quarterly date estimations.
      </strong>
    </p>
		<p>
      <strong>
        <span style="color:black">Semi-annual, first half end: </span>
        ${semiEnd.getMonth() + 1}-${semiEnd.getDate()}-${semiEnd.getFullYear()}
      </strong>
    </p>
		<p>
		  <strong>
        <span style="color:black">Quarterly, first quarter end: </span>
        ${quartEnd1.getMonth() + 1}-${quartEnd1.getDate()}-${quartEnd1.getFullYear()}
      </strong>
		  <br>
      <strong>
        <span style="color:black">Quarterly, second quarter end: </span>
        ${quartEnd2.getMonth() + 1}-${quartEnd2.getDate()}-${quartEnd2.getFullYear()}
      </strong>
		  <br>
      <strong>
        <span style="color:black">Quarterly, third quarter end: </span>
        ${quartEnd3.getMonth() + 1}-${quartEnd3.getDate()}-${quartEnd3.getFullYear()}
      </strong>
    </p>`;
  $('#shortCut').html(shortCutHTML);
}
