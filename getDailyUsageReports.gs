/**
* this is used to send a request to the zoom API to get the daily usage reports.
* @param {int}    month    Month for report
* @param {int}    year   year for report
* @return {object} data{"responseCode":INT,"body":{"year":INT,"month":INT,"dates":[{"date":string,"new_users":INT,"meetings":INT,"participants":INT,"meeting_minutes":INT}]}
**/
function getDailyUsageReport(month,year) {
  var url = `https://api.zoom.us/v2/report/daily?month=${month}&year=${year}`;
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
