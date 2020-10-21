# ZoomGAS_library
Zoom Library for Google Apps Script

This library is used to use the Zoom API within Google Apps Scripts.  If you want create/update/delete meetings, for uther users, you must be an administrator on a Zoom Business account.  If you are not on a business account you will only be able to use this for your account.

You will need to sign up for an account at marketplace.zoom.us/docs/guides.  You will need to create a JWT app and get the API_KEY and API_Secret and save it in AccessToken.gs.

If you would like to use this as a library in any GAS script, in the script, got to File->Manage Versions and save a version.  Then go to File->Project Properties and copy the Project Key.  In the Script you would like to use it in, go to Resourses->Libraries, add the project key and choose the saved version.
