# Next.js + Playwright + Istanbul

This example shows how to configure Playwright to work with Next.js.

## Generate Coverage Report
```sh
npm i
npm run test
```
Coverage report will be found here: test-results/coverage/index.html

## Tips
- add [babel.config.json](babel.config.json), and dynamically add `istanbul` plugin for babel, see [next.config.js](next.config.js)
- run `next dev` with env `INSTRUMENT_CODE=true` and `NODE_OPTIONS=--inspect`
- take client side coverage with [e2e/fixtures.js](e2e/fixtures.js)
- take server side coverage manually with CDP, see [global-teardown.js](global-teardown.js)


## Issues
- In fact, Next.js uses `swc` as the default compiler, and it has a plugin [swc-plugin-coverage-instrument](https://github.com/kwonoj/swc-plugin-coverage-instrument) for instrumentation the code for Istanbul, but there is an issue [here](https://github.com/kwonoj/swc-plugin-coverage-instrument/issues/197) that is unacceptable.
