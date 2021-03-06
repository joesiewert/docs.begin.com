## Overview

Begin JSON routes respond with HTTP `Content-Type: application/json`, and support routes with [`GET`](#get-routes), [`POST`](#post-routes), [`PUT`](#put-routes), [`PATCH`](#patch-routes), and [`DELETE`](#delete-routes).

Each JSON route (example: `POST /login`) in your app is assigned a folder in your project under `src/json/` (i.e. `src/json/post-login/`).

Within your project, each route can contain and utilize an arbitrary quantity of modules, packages, and other files (so long as the total uncompressed size of that route's folder is ≤5MB).
<!-- @todo more about cloud function limits doc(s) -->

> Note: Begin routes are plain AWS Lambda functions, and can function without requiring `@architect/functions`. However, we do not suggest removing that require, as you will lose middleware and session support.

---

## `GET` routes

Let's look at the default code for new JSON `GET` routes:

```js
// src/json/get-*/index.js
let begin = require('@architect/functions')

function route(req, res) {
  console.log(JSON.stringify(req, null, 2))
  res({
    json: {ok: true}
  })
}

exports.handler = begin.json.get(route)
```


## `begin.json.get()`

Invoked by the route's `handler`, `begin.json.get()` accepts one or more functions that follow an [Express-style middleware](https://expressjs.com/en/guide/writing-middleware.html) signature: `(req, res, next)`


## Parameters

### `req`

`req` returns a JavaScript object with the following keys:

- `method` - HTTP method (always returns `get`)
- `path` - path requested (i.e. `/api/hello-world`)
- `headers` - object containing HTTP request headers
- `query` - object containing query string fields & values
- `body` - always returns empty object
- `params` - object containing path params (returned empty unless your route contains params)
- [`session`](/en/routes-functions/sessions/#how-sessions-work) - object containing session data
- `csrf` - signed cross-site request forgery token (generated with all requests, but primarily intended to be used with HTML `POST` routes)


### `res()`

`res()` is a function that must be invoked; it accepts a JavaScript object with the following keys:

- Either `json` or `location` (**required**)
  - `json` - a JavaScript object or JSON object
  - `location` - a URL, either absolute or relative; sets HTTP status to `302` without using the `status` key
- [`session`](/en/routes-functions/sessions/#how-sessions-work) (optional) - object containing session data
- `status` (optional) - alternately `code` or `statusCode`, sets HTTP error status code, supports the following values:
  - `400` - Bad Request
  - `403` - Forbidden
  - `404` - Not Found
  - `406` - Not Acceptable
  - `409` - Conflict
  - `415` - Unsupported Media Type
  - `500` - Internal Server Error

`res()` can also be invoked with an instance of `Error`. You can also optionally define the `Error` object's HTTP status code by adding to it a `status`, `code`, or `statusCode` property (with one of the seven status codes above).


### `next` (optional)

Callback argument to continue execution.


## `GET` examples

### Example `GET` request

```js
// Client request made to GET /api/:endpoint
{ method: 'get',
  path: '/api/hello-world',
  headers: {
    host: 'begin.com',
    connection: 'keep-alive',
    authorization: 'Bearer 69HGohUjHbUBxejgD'
  },
  query: {},
  body: {},
  params: { endpoint: 'hello-world' },
  _idx: 'LbyL0kPK2xOLfdm_WnESzlsG',
  _secret: 'Sll0QZV2ouuvlOCSN3Msx1KP',
  csrf: 'aGQxg6ye-G_U-IXvLioZbmak3kFBCB8286aQ',
  session: { verified: true } }
```

---

## `POST` routes

Let's take a look at the default code Begin uses to provision new JSON `POST` routes:

```js
// src/json/post-*/index.js
let begin = require('@architect/functions')

function route(req, res) {
  console.log(JSON.stringify(req, null, 2))
  res({
    json: {ok: true}
  })
}

exports.handler = begin.json.post(route)
```


## `begin.json.post()`

Invoked by the route's `handler`, `begin.json.post()` accepts one or more functions that follow an [Express-style middleware](https://expressjs.com/en/guide/writing-middleware.html) signature: `(req, res, next)`


## Parameters

### `req`

`req` returns a JavaScript object with the following keys:

- `method` - HTTP method (always returns `post`)
- `path` - path requested (i.e. `/api/contact`)
- `headers` - object containing HTTP request headers
- `query` - object containing query string fields & values
- `body` - `POST` body object
- `params` - object containing path params (returned empty unless your route contains params)
- [`session`](/en/routes-functions/sessions) - object containing session data
leak to your clients
- `csrf` - signed cross-site request forgery token (generated with all requests, but primarily intended to be used with HTML `POST` routes)


### `res()`

`res()` is a function that must be invoked; it accepts a JavaScript object with the following keys:

- Either `json` or `location` (**required**)
  - `json` - a string containing a JSON object
  - `location` - a URL, either absolute or relative; sets HTTP status to `302` (temporary redirect) without using the `status` key
- [`session`](/en/routes-functions/sessions/#how-sessions-work) (optional) - object containing session data
- `status` (optional) - alternately `code` or `statusCode`, sets HTTP error status code, supports the following values:
  - `400` - Bad Request
  - `403` - Forbidden
  - `404` - Not Found
  - `406` - Not Acceptable
  - `409` - Conflict
  - `415` - Unsupported Media Type
  - `500` - Internal Server Error

Alternately, `res()` can be invoked with an `Error`. You can also optionally define the `Error` object's HTTP status code by adding to it a `status`, `code`, or `statusCode` property (with one of the seven status codes above).


### `next` (optional)

Callback argument to continue execution.


## `POST` examples

### Example `POST` request

```js
{ method: 'post',
  path: '/api/greetings',
  headers: {
    host: 'begin.com',
    'content-type': 'application/x-www-form-urlencoded',
    connection: 'keep-alive',
    accept: '*/*',
    'accept-language': 'en-us',
    'accept-encoding': 'gzip, deflate',
    'content-length': '32',
    authorization: 'Bearer 69HGohUjHbUBxejgD' },
  query: {},
  body: { greeting: 'Hello world!' },
  params: {},
  _idx: 'LbyL0kPK2xOLfdm_WnESzlsG',
  _secret: 'Sll0QZV2ouuvlOCSN3Msx1KP',
  csrf: 'aGQxg6ye-G_U-IXvLioZbmak3kFBCB8286aQ',
  session: {} }
```

---

## `PUT` routes

Let's take a look at the default code Begin uses to provision new JSON `PUT` routes:

```js
// src/json/put-*/index.js
let begin = require('@architect/functions')

function route(req, res) {
  console.log(JSON.stringify(req, null, 2))
  res({
    json: {ok: true}
  })
}

exports.handler = begin.json.put(route)
```


## `begin.json.put()`

Invoked by the route's `handler`, `begin.json.put()` accepts one or more functions that follow an [Express-style middleware](https://expressjs.com/en/guide/writing-middleware.html) signature: `(req, res, next)`


## Parameters

### `req`

`req` returns a JavaScript object with the following keys:

- `method` - HTTP method (always returns `put`)
- `path` - path requested (i.e. `/api/item`)
- `headers` - object containing HTTP request headers
- `query` - object containing query string fields & values
- `body` - `PUT` body object
- `params` - object containing path params (returned empty unless your route contains params)
- [`session`](/en/routes-functions/sessions) - object containing session data
leak to your clients
- `csrf` - signed cross-site request forgery token (generated with all requests, but primarily intended to be used with HTML `POST` routes)


### `res()`

`res()` is a function that must be invoked; it accepts a JavaScript object with the following keys:

- Either `json` or `location` (**required**)
  - `json` - a string containing a JSON object
  - `location` - a URL, either absolute or relative; sets HTTP status to `302` (temporary redirect) without using the `status` key
- [`session`](/en/routes-functions/sessions/#how-sessions-work) (optional) - object containing session data
- `status` (optional) - alternately `code` or `statusCode`, sets HTTP error status code, supports the following values:
  - `400` - Bad Request
  - `403` - Forbidden
  - `404` - Not Found
  - `406` - Not Acceptable
  - `409` - Conflict
  - `415` - Unsupported Media Type
  - `500` - Internal Server Error

Alternately, `res()` can be invoked with an `Error`. You can also optionally define the `Error` object's HTTP status code by adding to it a `status`, `code`, or `statusCode` property (with one of the seven status codes above).


### `next` (optional)

Callback argument to continue execution.


## `PUT` examples

```js
// coming soon, stand by!
```

---

## `PATCH` routes

Let's take a look at the default code Begin uses to provision new JSON `PATCH` routes:

```js
// src/json/patch-*/index.js
let begin = require('@architect/functions')

function route(req, res) {
  console.log(JSON.stringify(req, null, 2))
  res({
    json: {ok: true}
  })
}

exports.handler = begin.json.patch(route)
```


## `begin.json.patch()`

Invoked by the route's `handler`, `begin.json.patch()` accepts one or more functions that follow an [Express-style middleware](https://expressjs.com/en/guide/writing-middleware.html) signature: `(req, res, next)`


## Parameters

### `req`

`req` returns a JavaScript object with the following keys:

- `method` - HTTP method (always returns `patch`)
- `path` - path requested (i.e. `/api/item`)
- `headers` - object containing HTTP request headers
- `query` - object containing query string fields & values
- `body` - `PATCH` body object
- `params` - object containing path params (returned empty unless your route contains params)
- [`session`](/en/routes-functions/sessions) - object containing session data
leak to your clients
- `csrf` - signed cross-site request forgery token (generated with all requests, but primarily intended to be used with HTML `POST` routes)


### `res()`

`res()` is a function that must be invoked; it accepts a JavaScript object with the following keys:

- Either `json` or `location` (**required**)
  - `json` - a string containing a JSON object
  - `location` - a URL, either absolute or relative; sets HTTP status to `302` (temporary redirect) without using the `status` key
- [`session`](/en/routes-functions/sessions/#how-sessions-work) (optional) - object containing session data
- `status` (optional) - alternately `code` or `statusCode`, sets HTTP error status code, supports the following values:
  - `400` - Bad Request
  - `403` - Forbidden
  - `404` - Not Found
  - `406` - Not Acceptable
  - `409` - Conflict
  - `415` - Unsupported Media Type
  - `500` - Internal Server Error

Alternately, `res()` can be invoked with an `Error`. You can also optionally define the `Error` object's HTTP status code by adding to it a `status`, `code`, or `statusCode` property (with one of the seven status codes above).


### `next` (optional)

Callback argument to continue execution.


## `PATCH` examples

```js
// coming soon, stand by!
```

---

## `DELETE` routes

```js
// src/json/delete-*/index.js
let begin = require('@architect/functions')

function route(req, res) {
  console.log(JSON.stringify(req, null, 2))
  res({
    json: {ok: true}
  })
}

exports.handler = begin.json.delete(route)
```


## `begin.json.delete()`

Invoked by the route's `handler`, `begin.json.delete()` accepts one or more functions that follow an [Express-style middleware](https://expressjs.com/en/guide/writing-middleware.html) signature: `(req, res, next)`

Let's take a look at the default code Begin uses to provision new JSON `DELETE` routes:


## Parameters

### `req`

`req` returns a JavaScript object with the following keys:

- `method` - HTTP method (always returns `delete`)
- `path` - path requested (i.e. `/api/item`)
- `headers` - object containing HTTP request headers
- `query` - object containing query string fields & values
- `body` - `DELETE` body object
- `params` - object containing path params (returned empty unless your route contains params)
- [`session`](/en/routes-functions/sessions) - object containing session data
leak to your clients
- `csrf` - signed cross-site request forgery token (generated with all requests, but primarily intended to be used with HTML `POST` routes)


### `res()`

`res()` is a function that must be invoked; it accepts a JavaScript object with the following keys:

- Either `json` or `location` (**required**)
  - `json` - a string containing a JSON object
  - `location` - a URL, either absolute or relative; sets HTTP status to `302` (temporary redirect) without using the `status` key
- [`session`](/en/routes-functions/sessions/#how-sessions-work) (optional) - object containing session data
- `status` (optional) - alternately `code` or `statusCode`, sets HTTP error status code, supports the following values:
  - `400` - Bad Request
  - `403` - Forbidden
  - `404` - Not Found
  - `406` - Not Acceptable
  - `409` - Conflict
  - `415` - Unsupported Media Type
  - `500` - Internal Server Error

Alternately, `res()` can be invoked with an `Error`. You can also optionally define the `Error` object's HTTP status code by adding to it a `status`, `code`, or `statusCode` property (with one of the seven status codes above).


### `next` (optional)

Callback argument to continue execution.


## `DELETE` examples

```js
// coming soon, stand by!
```
