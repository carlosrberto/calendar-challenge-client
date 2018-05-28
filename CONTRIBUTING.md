## Contributing

### Install
```
yarn install
```

### Develop

```
yarn start
```

### All avaiable `yarn`|`npm` commands

```json
{
    "start": "npm run test -- --watch",
    "test": "jest",
    "cov": "jest --coverage",
    "cov:serve": "npm run cov && static-server .coverage/lcov-report --port 3000 --no-nocache",
    "cov:publish": "cat ./.coverage/lcov.info | coveralls",
    "lint": "eslint .",
    "clean": "rimraf lib",
    "build": "npm run clean && npm run lint && npm run test && rollup -c",
    "precommit": "npm run lint && npm run test",
    "bump": "bump --prompt --commit --tag --push",
    "prepublishOnly": "npm run build && npm run bump"
}
```

### Publish

```
npm publish
```
