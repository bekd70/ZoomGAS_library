/**
* this is used to send a request to the zoom API to update a meeting.
* @param {int}       meetingId Zoom meeting ID
* @param {String}    topic    Meeting Name
* @param {String}    startTime   Start time of meeting in YYYY-MM-DDTHH:MM:SS format
* @param {int}       duration    Meeting duration in minutes
* @return {object} data{responseCode: int} responseCode of 204 = Metting Updated
**/
function updateMeeting(meetingId,topic,startTime,duration) {
  var url = 'https://api.zoom.us/v2/meetings/' + meetingId;
  var token = getZoomAccessToken();
  var payload = 
      '{"topic": "' + topic + '",' +
        '"start_time": "' + startTime + '",' +
          '"duration": ' + duration + '}';
  var options =
      {
        'method'  : 'PATCH',   
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
  if(rc>299){
    var body = JSON.parse(json);
  }
  else{
    var body ={"message": "Meeting Updated"};
  }
  var data ={
    "responseCode": rc,
    "body": body
  }
  return data;
}
