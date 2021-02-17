/**
* this is used to send a request to the zoom API to create a meeting.
* @param {string}   meetingId    meeting ID for the Zoom meeting
* @return {object} data{"responseCode:	int,body{id: string,string,host_id:	string,host_email: string,assistant_id:	string,topic:	string,type: int,status: string,
start_time:	string,duration:	int,timezone:	string,agenda:	string,created_at:	string,start_url:	string,join_url:	string,h323_password:	string,pstn_password:	string,encrypted_password	:string}
**/
function getZoomLinks(meetingId) {
  var url = 'https://api.zoom.us/v2/meetings/' + meetingId;
  var token = getZoomAccessToken();
  var payload = "";
  var options =
      {
        'method'  : 'GET',   
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
      "responseCode": rc,
      "body": body
    };
  return data;
  
}

