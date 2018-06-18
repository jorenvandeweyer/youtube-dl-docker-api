# youtube-dl-docker-api (NodeJS)

## Description

This module should not be imported into existing repositories but should be run as a docker container in this current form.

You can connect to it by using `node-ipc`

## Setup API

`docker-compose up --build -d`

Side note: make sure you use an existing network to connect with.

There is already written Client to connect to the API in:
[examples/docker/](https://github.com/jorenvandeweyer/youtube-dl-docker-api/tree/master/examples/docker)

### Connect to the API

Connect to the ipc module from a **different** docker container.

```javascript
const ipc = require("node-ipc");

ipc.connectToNet("youtube", "downloader", callback);
```

`youtube` is the ipc id where to connect to.

`downloader` the host address, which will be resolved to the API container api.

`callback` is the function that will be executed when there is an connection to the API container.

### Send the url

The next step is to send the url the our API container after there was a connection established.

```javascript
ipc.of.youtube.emit("download", "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
```

### Listen for events

After the download message was emitted, the API will start to emit events on how far the download is progressed.

```javascript
ipc.of.youtube.on(event, listener);
```

| Event          | value | Description                                     |
| -------------- | ----- | ----------------------------------------------- |
| `connect`      | none  | Connected to the API container                  |
| `disconnect`   | none  | Disconnected to the API container               |
| `state-change` | state | Download state has been updated                 |
| `close`        | data  | Downloading has been stopped, finished or error |
| `error`        | none  | An error ocurred when downloading               |
