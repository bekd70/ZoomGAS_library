/**
* this is used to send a request to the zoom API to create a meeting.
* @param {String}    topic    Meeting Name
* @param {String}    startTime   Start time of meeting in YYYY-MM-DDTHH:MM:SS format
* @param {int}       duration    Meeting duration in minutes
* @param {String}    presenterEmail    meeting created will be in this account
* @param {String}    password    password for zoom meeting
* @return {object} data{"responseCode": int, "body": {"join_url": string, "start_url": string}}
**/
function createMeeting(topic,startTime,duration,presenterEmail,password) {
  
  var userId = presenterEmail;
  var url = 'https://api.zoom.us/v2/users/' + userId + '/meetings';
  var token = getZoomAccessToken();
  var timezone = 'Asia/Calcutta'; //select your timezone - https://marketplace.zoom.us/docs/api-reference/other-references/abbreviation-lists#timezones 
  var type = '2'; //this is for schedule meeting
  var payload = 
  '{"topic": "' + topic + '",' +
  '"type": "' + type + '",' +
  '"start_time": "' + startTime + '",' +
  '"duration": "' + duration + '",' +
  '"timezone": "' + timezone  + '",' +
  '"password": "' + password + '",' +
  '"settings": {' +
  '"host_video": true'  + ',' +
  '"participant_video": true'  + ',' +
  '"registration_type": 2'  + ',' +
  '"approval_type": 0'  + ',' +
  '"join_before_host": false'  + ',' +
  '"use_pmi": false' + ',' +
  '"waiting_room": false'  + '}}';
  var options =
      {
        'method'  : 'POST',   
        'followRedirects' : true,
        'muteHttpExceptions': true,
        "headers": {
          "Accept": "application/json, application/xml",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        'payload': payload
      };
  var response = UrlFetchApp.fetch(url, options);
  var json = response.getContentText();
  var rc = response.getResponseCode();
  var body = JSON.parse(json);
  var data ={
    "body": body,
    "responseCode": rc
  }
  return data;
}
