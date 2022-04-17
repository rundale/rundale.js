# Rundale.js
Helper services for Node.js

### Supporting services
Currently Rundale.js support log service only. We are working on more services. Hopefully it will available soon.

### Log
#### Usage
| Type        | Usage                    | Message                     |
|-------------|--------------------------|-----------------------------|
| `emergency` | `log.emergency(message)` | `string \| Object \| Error` |
| `alert`     | `log.alert(message)`     | `string \| Object \| Error` |
| `critical`  | `log.critical(message)`  | `string \| Object \| Error` |
| `error`     | `log.error(message)`     | `string \| Object \| Error` |
| `warning`   | `log.warning(message)`   | `string \| Object \| Error` |
| `notice`    | `log.notice(message)`    | `string \| Object \| Error` |
| `info`      | `log.info(message)`      | `string \| Object \| Error` |
| `debug`     | `log.debug(message)`     | `string \| Object \| Error` |

#### Example
```js
  const { log } = require('rundale')

  log.info('User logged in')
  log.debug({ status: 404 })
  log.error(new Error('Unable to process mail'))
```

### Configuration
Here is the default Rundale configuration.
```json
{
  "log": {
    "path": "./rundale.log",
    "maxSize": "10MB" 
  }
}
```
You can create a `rundale.config.json` file in your project's root directory and override these configuration by initializing Rundale by running following command.
```sh
npx rundale
```
```sh
> init
Successfully initialized. You can find the config file from rundale.config.json
```
