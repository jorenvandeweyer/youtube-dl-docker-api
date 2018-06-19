# youtube-dl-docker-api (NodeJS)

## Description

This module should not be imported into existing repositories but should be run as a docker container in this current form.

You can connect to it by using `node-ipc` from a different container.

**Instead of also transferring the downloaded file over ipc connection. I recommend you share a volume between those two containers and get the file with `fs.readFileSync` after you received the event that tells you the download is finished.**

## Setup API

`docker-compose up --build -d`

Side note: make sure you use an existing network to connect with.

There is already written Client to connect to the API in:
[examples/docker](https://github.com/jorenvandeweyer/youtube-dl-docker-api/tree/master/examples/docker)

### Connect to the API

Connect to the ipc module from a **different** docker container.

```javascript
const ipc = require("node-ipc");

ipc.connectToNet(id, host, port, callback);
```

`id` is the ipc id where to connect to.

`host` the host address, which will be resolved to the API container api.

`port` the port to use.

`callback` is the function that will be executed when there is an connection to the API container.

### Send the url

The next step is to send the url the our API container after there was a connection established.

```javascript
ipc.of[id].emit("download", "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
```

### Listen for events

After the download message was emitted, the API will start to emit events on how far the download is progressed.

```javascript
ipc.of[id].on(event, listener);
```

| Event          | value | Description                                     |
| -------------- | ----- | ----------------------------------------------- |
| `connect`      | none  | Connected to the API container                  |
| `disconnect`   | none  | Disconnected to the API container               |
| `state-change` | state | Download state has been updated                 |
| `close`        | data  | Downloading has been stopped, finished or error |
| `error`        | none  | An error ocurred when downloading               |
