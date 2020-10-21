/*******
* This library is used to use the Zoom API within
* Google Apps Scripts.  If you want create/update/delete meetings,
* for uther users, you must be an administrator on a Zoom Business
* account.  If you are not on a business account you will only be able 
* to use this for your account.
* 
* You will need to sign up for an account at marketplace.zoom.us/docs/guides
* You will need to create a JWT app and get the API_KEY and API_Secret for below
*******/

const ZOOM_API_KEY = '<yourAPIKey>';
const ZOOM_API_SECRET = '<yourAPISecret>';
const ZOOM_EMAIL = '<yourEmailAddress>';

/***********
* This function needs to be called in order to create/update/delete meetings, 
* or get users/userSettings
***********/

const getZoomAccessToken = () => {
  const encode = (text) => Utilities.base64Encode(text).replace(/=+$/, '');
  const header = { alg: 'HS256', typ: 'JWT' };
  const encodedHeader = encode(JSON.stringify(header));
  const payload = {
    iss: ZOOM_API_KEY,
    exp: Date.now() + 3600,
  };
  const encodedPayload = encode(JSON.stringify(payload));
  const toSign = `${encodedHeader}.${encodedPayload}`;
  const signature = encode(Utilities.computeHmacSha256Signature(toSign, ZOOM_API_SECRET));
  return `${toSign}.${signature}`;
};