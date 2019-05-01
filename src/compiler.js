/* globals $ */

/* This file is for Transporter CSV Compiler functionality */

const currentYear = new Date().getFullYear();

const sanitize = (code) => {
  var sanitized = code
    .replace(/\r?\n|\r/g, ' ')     // Strip out carriage returns and newlines
    .replace(/,/g, '&comma;')       // Escape commas since we're using a csv
    .replace(/\u2018/g, '\'')      // Left single quote
    .replace(/\u2019/g, '\'')      // Right single quote
    .replace(/\u201C/g, '"')       // Left double quote
    .replace(/\u201D/g, '"')       // Right double quote
    .replace(/\u2026/g, '...')     // Ellipsis
    .replace(/\u2013/g, '&ndash;') // Long dash
    .replace(/\u2014/g, '&mdash;') // Longer dash
    .replace(/\u00A9/g, '&copy;')  // Copyright symbol
    .replace(/#fff/gi, 'white')    // For hash issues in our URIs
    .replace(/#cccccc/gi, 'silver')
    .replace(/copyright\s*\d+/gi, `Copyright ${currentYear}`);
  return sanitized;
};

// Creates a string from the dimensions in the select on the modal
function dimensionsARR(row) {
  let dimensions = [];
  let options = $(`#row${row} .select-after option`);

  options.each((i, option) => {
    if (option.value !== 'undefined') {
      dimensions.push(option.value);
    }
  });

  return '"' + dimensions.toString() + '"';
}

const tracking = (trackType) => {

  switch (trackType) {
		case 'Event':
			return 'OneTimeEvent';
		case 'Days':
			return 'YesNoDaily';
		case 'Units':
			return 'AddAllNumbers';

		default:
			throw new Error('Tracking type is not one of the 3 valid values. (event/days/units)');
  }

};

const createCSV = (employer) => {

	var data = [[
    'EmployerName',
    'ChallengeId',
    'ChallengeType',
    'IsWeekly',
    'WinStrategy',
    'Target',
    'Activity',
    'ChallengeName',
    'DisplayPriority',
    'StartDate',
    'EndDate',
    'ShortDescription',
    'MoreInformation',
    'ImageUrl',
    'ShowInProgram',
    'RewardType',
    'Reward',
    'Dimensions',
    'LeaderboardTag',
    'EnableDeviceTracking',
    'AllowSelfReporting',
    'DeviceTrackingUnits',
    'IsTeamChallenge',
    'MinTeamSize',
    'MaxTeamSize',
    'Subgroup',
    'Field1',
    'Field1Value',
    'Field2',
    'Field2Value',
    'Field3',
    'Field3Value',
    'AppearanceInProgram',
    'IntegrationPartnerId',
    'ButtonText',
    'TargetUrl',
    'EventCode',
    'ShowExtendedDescription',
    'ActivityTemplateId',
    'IsFeatured',
    'FeaturedDescription',
    'FeaturedImageUrl'
  ]];

  for (var row = 0; row < $('#challenge-list tbody')[0].rows.length; row++) {

    $('#remove-coaching').prop('checked') ? $(`#row${row} .coachinginfo`).remove() : null;

    const trackingType = $(`#row${row} .tracking-type`).val();
    const challengeType = tracking(trackingType);
    const winStrategy = trackingType === 'Event' ? 'AccomplishOneTimeEvent' : 'MeetOrExceedTarget';
    const target = $(`#row${row} .activity-goal`).val();
    const isWeekly = $(`#row${row} .reward-occurrence`).val() === 'Weekly' ? 1 : 0;
    const enableDeviceTracking = $(`#row${row} .device-enabled`).prop('checked') ? 1 : 0;
    const activity = $(`#row${row} .activity-goal-text`).val();
    const deviceTrackingUnits = enableDeviceTracking ? $(`#row${row} .device-units`).val() : '';
    const isTeamChallenge = $(`#row${row} .is-team`).val() === 'Team' ? 1 : 0;

    let imageUrl = $(`#row${row} .image`).prop('src');
    if (imageUrl.includes('mywellmetrics.com')) {
      imageUrl = imageUrl.replace('https://mywellmetrics.com', '');
    }

    // partner varibles
    const isPartner =  $(`#row${row} .is-partner`).prop('checked') ? true : false;
    const allowSelfReporting = isPartner ? 0 : 1;
    const integrationPartnerId = isPartner ? 1 : '';
    const buttonText = isPartner ? 'CLOSE' : '';
    const targetUrl = isPartner ? '/Home?sametab=true' : '';
    const showExtendedDescription = isPartner ? 1 : '';

		data.push([
      $(`#eid${employer}`).val(),
      '', // ChallengeId
      challengeType,
      isWeekly,
      winStrategy,
      target,
      activity,
      '"' + $(`#row${row} .challenge-title`).val() + '"',
      '', // DisplayPriority
			$(`#row${row} .start-date`).val().replace(/-/g, '/'),
			$(`#row${row} .end-date`).val().replace(/-/g, '/'),
      sanitize($(`#row${row} .short-description`).html()),
      sanitize($(`#row${row} .more-information`).html()),
      imageUrl,
      '0', // ShowInProgram
      '0', // RewardType
      $(`#row${row} .points`).val(),
      dimensionsARR(row) === '"undefined"' ? '' : dimensionsARR(row),
      '', // LeaderboardTag
      enableDeviceTracking,
      allowSelfReporting,
      deviceTrackingUnits,
      isTeamChallenge,
      isTeamChallenge ? $(`#row${row} .team-min`).val() : '',
      isTeamChallenge ? $(`#row${row} .team-max`).val() : '',
      $(`#row${row} .subgroup`).val(),
      $(`#row${row} .field-one`).val(),
      $(`#row${row} .field-one-value`).val(),
      $(`#row${row} .field-two`).val(),
      $(`#row${row} .field-two-value`).val(),
      $(`#row${row} .field-three`).val(),
      $(`#row${row} .field-three-value`).val(),
      'Default', // AppearanceInProgram
      integrationPartnerId,
      buttonText,
      targetUrl,
      '', // EventCode
      showExtendedDescription,
      '', // ActivityTemplateId
      '0', // IsFeatured
      '', // FeaturedDescription
      '' // FeaturedImageUrl
    ]);

	}

  return data;

};

export function limeadeUpload() {
  // Open Modal
  $('#uploadModal').modal('show');
  $('#uploadModalBody').html('<p class="uploading-message">Uploading...</p>');

  const challengeList = createCSV(0);
  const challengeTracker = {
    totalChallenges: (challengeList.length - 1) * $('#loadNumber').val(),
    loadedChallenges: 0
  };

  // For debugging but it could be useful. Delete if desired
  console.log(`Uploading ${challengeTracker.totalChallenges} challenges...`);

  // Post a single challenge to each program
  for (let program = 0; program < $('#loadNumber').val(); program++) {

    const csv = createCSV(program);
    const headers = csv[0].join(',');
    const url = 'https://calendarbuilder.dev.adurolife.com/limeade-upload/';

    for (let row = 1; row < csv.length; row++) {
      const oneChallenge = csv[row].join(',');
      const params = {
        e: $(`#eid${program}`).val(),
        psk: $(`#psk${program}`).val(),
        data: headers + '\n' + oneChallenge,
        type: 'challenges'
      };
      $.post(url, params).done((data) => {
        logResponse(data, csv[row], challengeTracker);
      });
    }

  }

  function logResponse(data, challenge, tracker) {
    // When every challenge has been loaded, change loading message
    tracker.loadedChallenges += 1;
    if (tracker.loadedChallenges >= tracker.totalChallenges) {
      $('.uploading-message').html('Loading complete!');
    }

    const json = JSON.parse(data);
    const challengeName = challenge[7].replace(/"/g, '');
    try {
      if (json.status === 'error') {
        throw new Error();
      }
      if (json.logMessages && json.logMessages.log0.severity === 'Error') {
        throw new Error();
      }
      $('#uploadModalBody').append(`<p class="alert alert-success">Successfully uploaded ${challengeName}.</p>`);
    } catch (e) {
      const errorMessage = `<p class="alert alert-danger">There was an error uploading ${challengeName}.<br/>`;
      if (json.status === 'error') {
        $('#uploadModalBody').append(`${errorMessage}${json.detail}</p>`);
      } else {
        $('#uploadModalBody').append(`${errorMessage}${json.logMessages.log0.message}</p>`);
      }
    }
  }

}

export function compileTransporter() {

  // Download a CSV for each program
  for (let program = 0; program < $('#loadNumber').val(); program++) {
    const data = createCSV(program);
    let csvContent = '';
    data.forEach((infoArray, index) => {
      const dataString = infoArray.join();
      csvContent += index < (data.length - 1) ? dataString + '\n' : dataString;
    });

    const filename = $(`#eid${program}`).val() + '-' + 'Phase' + '-' + $('#fileName').val() + '-' + currentYear + '.csv';
    const csvData = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(csvData);

    let link = document.createElement('a');
    link.setAttribute('download', filename);
    link.setAttribute('href', url);
    link.click();
  }

}
