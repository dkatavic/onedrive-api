# Tests

### unit

TODO: unit tests

### e2e

It's hard to do e2e tests because we can't get dev/static access token for graph API, but these are providing most of the value. For now, we have manual e2e testing which is consisted of:

- Getting the access token (easiest way is grabing the token from graph explorer https://developer.microsoft.com/en-us/graph/graph-explorer)
- set `ONEDRIVE_ACCESS_TOKEN` env variable with the value of the token `export ONEDRIVE_ACCESS_TOKEN=12345`
- run `npm run test:e2e`
