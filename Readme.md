
# redux-action-translator

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Translate dispatched actions to other actions, for compatibility with reducers/middleware you don't control.  
E.g. when an action should trigger a history change in [redux-router](https://github.com/acdlite/redux-router)

It's preferable to update your reducers/middleware to acknowledge the source action, but that's not always possible.

## Installation

    $ npm install redux-action-translator

## Usage

Installing the middleware:

```javascript
import translator from 'redux-action-translator'
import {createStore, applyMiddleware} from 'redux'

const translation = translator({})
applyMiddleware(translation)(createStore)
```

Translations match on action.type and expect a value of the type `[Action] | (a: Action) => [Action]`


E.g.

```javascript

const evenAction = (n) => ({ type: "even", payload: a.payload })
const oddAction = (n) => ({ type: "odd", payload: n })

const translation = translator({
  "login_complete": [replace("/")],
  "registration_complete": [replace("/"), welcome()],
  "number": a => a.payload % 2 ? [oddAction(a.payload)] : [evenAction(a.payload)],
});

applyMiddleware(translation)(createStore)

...

// dispatches registrationComplete, then replace("/), then welcome()
dispatch(registrationComplete())

// dispatches numberAction, then oddAction if it's odd, or evenAction if it's even
dispatch(numberAction(n)) 

```
