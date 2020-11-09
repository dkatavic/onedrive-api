const beforeRequestHookGot = (accessToken) => [
  (options) => {
    if (accessToken) {
      options.headers.Authorization = accessToken;
    }
  },
];

module.exports = {
  beforeRequestHookGot: beforeRequestHookGot,
  headerJSON: { "Content-Type": "application/json" },
  responseJSON: "json",
};
