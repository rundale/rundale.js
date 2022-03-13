# Rundale.js
Helper services for Node.js

### Usage
```js
  const { Log } = require('rundale')

  Log.info('Hello world')
```

### Configuration
Here is the default Rundale configuration. You can create a `rundale.config.json` file in your project's root directory and override these configuration.
```json
{
  "log": {
    "path": "./rundale.log"
  }
}
```