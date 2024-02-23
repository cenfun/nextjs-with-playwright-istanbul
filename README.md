# Next.js + Playwright + Istanbul

This example shows how to configure Playwright to work with Next.js.

## Generate Coverage Report
```sh
npm i
npm run test
```
Coverage report will be found here: `test-results/coverage/index.html`

## Tips
- add [babel.config.json](babel.config.json) with `istanbul` plugin for babel
- force swc (disable babel) if not test, see [next.config.js](next.config.js)
- run `next dev` with env `INSTRUMENT_CODE=true` and `NODE_OPTIONS=--inspect`
- take client side coverage with [e2e/fixtures.js](e2e/fixtures.js)
- take server side coverage manually with CDP, see [global-teardown.js](global-teardown.js)

### Debugging port
The debugging port is `9229` by default
```sh
"test:start": "cross-env INSTRUMENT_CODE=true NODE_OPTIONS=--inspect=9229 next dev"
```
But we should use `9230` (9229+1) as the CDP (chrome-remote-interface) port base on the following prompt:
```sh
[WebServer] Debugger listening on ws://127.0.0.1:9229/07ad38a2-2d5a-48df-a4de-07010e2d9b18
For help, see: https://nodejs.org/en/docs/inspector
[WebServer] Debugger listening on ws://127.0.0.1:9230/a3a46ea2-6994-43f2-b6a6-e5834362da4c
For help, see: https://nodejs.org/en/docs/inspector
[WebServer]    the --inspect option was detected, the Next.js router server should be inspected at port 9230.
[WebServer]    ▲ Next.js 14.1.0
[WebServer]    - Local:        http://localhost:3000
```
see [global-teardown.js](global-teardown.js)
```js
const client = await CDP({
    port: 9230
});
```
If you are using a different port like `8112`, then the CDP port should be `8113` (8112 + 1).

## Issues
- In fact, Next.js uses `swc` as the default compiler, and it has a plugin [swc-plugin-coverage-instrument](https://github.com/kwonoj/swc-plugin-coverage-instrument) for instrumentation the code for Istanbul, but there is an issue [here](https://github.com/kwonoj/swc-plugin-coverage-instrument/issues/197) that is unacceptable.
