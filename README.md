# Yourte-api

[![dependency Status](https://img.shields.io/david/joaopintom/yourte-api.svg?maxAge=1000)](https://david-dm.org/joaopintom/yourte-api)

API for yourte porject; it uses `async-await`-based Koa 2 API's with ES7 using `babel` for **Node v6 and above!**.

Based on the koa2 boilerplate from Jeff Hansen - [@Jeffijoe](https://github.com/jeffijoe/koa-es7-boilerplate)

## Setting up shop

Clone this repo and yarn

## What's in the package?

* Auto-loading of API "controllers"
* Nifty `npm run` scripts, see next section for details
* `babel` with `es2015-node6` + `stage-1` presets, `transform-runtime` plugin and sourcemaps
* `mocha-sinon-chai` testing, as well as `supertest` for API testing
* Code coverage with `istanbul` + `nyc` (yes, **with ES7 support!**)
* Routing with `koa-router`
* Parsing request bodies with `koa-bodyparser`
* **Source map support with nice stack traces!**
* `eslint` (+ optional watch-mode) with [standard][standard], works with ES7 thanks to `babel-eslint`
* CORS middleware with `kcors`
* `app-module-path` for improving your life when importing code in tests
* `nodemon` for development to auto-restart when your files change
* [`icebug`][icebug] for debugging
* [`koa-respond`][respond] for helper functions on the context.
* [`yenv`][yenv] for environment variable management
* [`awilix`][awilix] for dependency injection / IoC

## `npm run` scripts

There are a few defined run scripts, here's a list of them with a description of what they do. To run them, simply execute `npm run <script name>` - e.g. `npm run dev`

* `start`: Used by the production environment to start the app. This will run a compiled version, so you need to execute `build` first.
* `build`: Runs the `babel` CLI to compile the app. Files are emitted to `dist/`.
* `dev`: Runs the app in development mode - uses `babel-node` to compile on-the-fly. Also uses `nodemon` to automatically restart when stuff changes.
* `debug`: Runs the app in development mode with `icebug` (a combo of `nodemon` + `node-inspector`).
* `test`: Runs `mocha` tests.
* `test-watch`: Runs `mocha` tests in watch-mode.
* `lint`: Lints the code in `src` and `test` with `eslint`.
* `lint-watch`: Same as above, in watch-mode.

**Tip**: to pass additional arguments to the actual CLI's being called, do it like in this example:

```bash
npm run test -- --debug
```

*Note the __`--`__ before the actual arguments.*


## Dependency injection

This boilerplate uses the [`Awilix`](https://github.com/jeffijoe/awilix) container for managing dependencies - please check out the Awilix documentation
for details. The container is configured in `lib/configureContainer.js`.

# Authors

* Joao Pinto - [@joaopintom](https://github.com/JoaoPintoM)
