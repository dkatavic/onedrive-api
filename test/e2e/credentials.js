// credentials.js
module.exports = {
  // access token is only valid for 1 hour, so I can't set up dev access token
  accessToken: process.env.ONEDRIVE_ACCESS_TOKEN || "YOUR_ACCESS_TOKEN",
};
