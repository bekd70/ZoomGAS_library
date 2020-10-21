/**
* this is used to send a request to the zoom API to get all users.
* @return {object} data{"responseCode": int, "body": {"page_count": int,"page_size": int, "total_records": int,"users": object}}
**/
function getUsers() {
  var url = 'https://api.zoom.us/v2/users?page_size=300&status=active';
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
  //Logger.log(data.body.message);
    return data;
  
}
