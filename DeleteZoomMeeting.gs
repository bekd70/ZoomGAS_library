/**
* this is used to send a request to the zoom API to delete a meeting.
* @param {int}    meetingId    Meeting ID to delete
* @return {object} data{"responseCode": int, "body": {"join_url": string, "start_url": string}}
**/
function deleteMeeting(meetingId) {
    var url = 'https://api.zoom.us/v2/meetings/' + meetingId;
    var token = getZoomAccessToken();
    var payload = '{"schedule_for_reminder": \'false\'}';
    //var payload = '{}';
    var options =
        {
          'method'  : 'DELETE',   
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
    var rc = response.getResponseCode();
    if (rc===204){
        var responseBody = "Delete Successful";
    }
    else{
        var json = response.getContentText();
        var responseBody = JSON.parse(json);
    }
    var data = {
        "body": responseBody,
        "responseCode": rc
    };
    return data;
  }