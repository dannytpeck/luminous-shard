/* This file is for Transporter CSV Compiler functionality */
import $ from 'jquery';

const currentYear = new Date().getFullYear();

const sanitize = (code) => {
  var sanitized = code
    .replace(/\r?\n|\r/g, ' ')     // Strip out carriage returns and newlines
    .replace(/,/g, '&#44;')       // Escape commas since we're using a csv
    .replace(/\u2018/g, '\'')      // Left single quote
    .replace(/\u2019/g, '\'')      // Right single quote
    .replace(/\u201C/g, '"')       // Left double quote
    .replace(/\u201D/g, '"')       // Right double quote
    .replace(/\u2026/g, '...')     // Ellipsis
    .replace(/\u2013/g, '&ndash;') // Long dash
    .replace(/\u2014/g, '&mdash;') // Longer dash
    .replace(/\u00A9/g, '&copy;')  // Copyright symbol
    .replace(/copyright\s*\d+/gi, `Copyright ${currentYear}`);
  return sanitized;
};

function dimensionsARR(row) {
  var d = [];
  var options = $('#selectAfter' + row + ' option');
  var i;
  for (i = 0; i < options.length; i++) {
    d.push(options[i].value);
  }
  return '"' + d.join(',') + '"';
}

function trackingText1(id, tf) {
  var use = tf.toString();
  var pipe = ' | ';
  if (use === '1') {
    var a = id.indexOf(pipe);
    var b = 0;
    var c = id.substring(b, a);
    c.replace(/ /g, '');
    return c;
  } else if (use === '0') {
    return id;
  } else {
    return null;
  }
}

function trackingText2(id, tf) {
  var use = tf.toString();
  var pipe = ' | ';
  if (use === '1') {
    var a = id.indexOf(pipe) + pipe.length;
    var b = (id.length + pipe.length) - 1;
    var c = id.substring(a, b);
    c.replace(/ /g, '');
    return c;
  } else if (use === '0') {
    return 0;
  } else {
    return null;
  }
}

const tracking = (trackType) => {

  switch (trackType) {
		case 'One Time':
			return 'OneTimeEvent';

		case 'One Time Days':
		case 'Weekly Days':
			return 'YesNoDaily';

		case 'One Time Units':
		case 'Weekly Units':
			return 'AddAllNumbers';

		default:
			throw new Error('Tracking type in the json object is not one of the 5 valid values.');
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
    'Field3Value'
  ]];

  for (var row = 0; row < $('#challenge-list tbody')[0].rows.length; row++) {

    $('#remove-coaching').prop('checked') ? $(`#mi${row} .coachinginfo`).remove() : null;

    var trackType = $('#trackType' + row).val(),
    challengeType = tracking(trackType),
    isWeekly = trackType.includes('Weekly') ? '1' : '0',
    winStrategy = trackType === 'One Time' ? 'AccomplishOneTimeEvent' : 'MeetOrExceedTarget',

    enableDeviceTracking = $('#deviceCheck' + row).prop('checked') ? 1 : 0,
    allowSelfReporting = $('#deviceRequired' + row).prop('checked') ? 0 : 1,

		devText = $('#devText' + row).val(),
    activity = enableDeviceTracking ? trackingText2(devText, enableDeviceTracking) : trackingText1(devText, enableDeviceTracking) === '0' ? '' : trackingText1(devText, enableDeviceTracking),
		deviceTrackingUnits = enableDeviceTracking ? trackingText1(devText, enableDeviceTracking) : '',

    rewardType = $('#pointText' + row).prop('checked') ? 1 : 0,

		isTeamChallenge = $('#soloTeam' + row).val() === 'Individual' ? 0 : 1;

		data.push([
      $(`#eid${employer}`).val(),
      '',
      challengeType,
      isWeekly,
      winStrategy,
      $('#required' + row).val() === '0' ? '1' : $('#required' + row).val(),
      activity,
      '"' + $('#chalTitle' + row).val() + '"',
      '',
			$('#startDate' + row).val().replace(/-/g, '/'),
			$('#endDate' + row).val().replace(/-/g, '/'),
      sanitize($('#sd' + row).html()),
      sanitize($('#mi' + row).html()),
      $('#imgLink' + row).attr('href').replace(/https:\/\/mywellmetrics\.com/g, ''),
      '0',
      rewardType,
      $('#points' + row).val(),
      dimensionsARR(row) === '"undefined"' ? '' : dimensionsARR(row),
      '',
      enableDeviceTracking,
      allowSelfReporting,
      deviceTrackingUnits,
      isTeamChallenge,
      isTeamChallenge ? $('#teamMin' + row).val() : '',
      isTeamChallenge ? $('#teamMax' + row).val() : '',
      $(`#subgroup${row}`).val(),
      $(`#field-one${row}`).val(),
      $(`#field-one-value${row}`).val(),
      $(`#field-two${row}`).val(),
      $(`#field-two-value${row}`).val(),
      $(`#field-three${row}`).val(),
      $(`#field-three-value${row}`).val()
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
    const url = 'http://mywellnessnumbers.sftp.adurolife.com/limeade-upload/';

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
  'use strict';

  // Download a CSV for each program
  for (var program = 0; program < $('#loadNumber').val(); program++) {

    var data = createCSV(program);
    var csvContent = '';
    data.forEach(function (infoArray, index) {
      var dataString = infoArray.join(',');
      csvContent += index < (data.length - 1) ? dataString + '\n' : dataString;
    });

    var file = encodeURI('data:text/csv;charset=utf-8,' + csvContent);
    var filename = $(`#eid${program}`).val() + '-' + 'Phase' + '-' + $('#fileName').val() + '-' + currentYear + '.csv';

    var link = document.createElement('a');
    link.setAttribute('download', filename);
    link.setAttribute('href', file);
    link.click();

  }

}
