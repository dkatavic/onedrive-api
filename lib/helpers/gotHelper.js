const beforeRequestHookGot = (accessToken) => [
  (options) => {
    if (accessToken) {
      options.headers.Authorization = "Bearer " + accessToken;
    }
  },
];

module.exports = {
  beforeRequestHookGot: beforeRequestHookGot,
  headerJSON: { "Content-Type": "application/json" },
  responseJSON: "json",
};
