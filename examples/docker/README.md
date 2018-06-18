# YouTubeDownloader Client

## Description

This client connects to the API container

## Constructor
| State | Description       |
| ----- | ----------------- |
| url   | url of the video  |


## Events

| Event          | return value | Description  |
| -------------- | ------------ | ----- |
| `open`         | undefined    | Downloader successfully connected with other docker container |
| `started`      | url          | Downloader started downloading |
| `state-change` | state        | Download state has been updated |
| `finished`     | filename     | Download is finished, file can safely be downloaded/moved |
| `close`        | undefined    | Downloader connection is closed, there will be no future events |

## Download State

| State | Description       |
| ----- | ----------------- |
| `0`   | Not started yet   |
| `1`   | Processing        |
| `2`   | Downloading       |
| `3`   | Finished Download |


# Example Output
```
client_1  |
client_1  | > client@1.0.0 start /
client_1  | > node index.js
client_1  |
client_1  | open:  undefined
client_1  | started:  { info: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }
client_1  | state-change:  { state: 1 }
client_1  | state-change:  { state: 1 }
client_1  | state-change:  { state: 1 }
client_1  | state-change:  { state: 1 }
client_1  | state-change:  { state: 1 }
client_1  | state-change:  { state: 1 }
client_1  | state-change:  { state: 2, info: null }
client_1  | state-change:  { state: 1 }
client_1  | state-change:  { state: 2,
client_1  |   info: { percent: '0.0', total: '3.28', speed: '712.23', eta: '00:04' } }
client_1  | state-change:  { state: 2,
client_1  |   info: { percent: '0.1', total: '3.28', speed: '1.21', eta: '00:02' } }
client_1  | state-change:  { state: 2,
client_1  |   info: { percent: '0.2', total: '3.28', speed: '1.95', eta: '00:01' } }
client_1  | state-change:  { state: 2,
client_1  |   info: { percent: '0.4', total: '3.28', speed: '3.34', eta: '00:00' } }
client_1  | state-change:  { state: 2,
client_1  |   info: { percent: '0.9', total: '3.28', speed: '2.55', eta: '00:01' } }
client_1  | state-change:  { state: 2,
client_1  |   info: { percent: '1.9', total: '3.28', speed: '2.62', eta: '00:01' } }
client_1  | state-change:  { state: 2,
client_1  |   info: { percent: '3.8', total: '3.28', speed: '3.24', eta: '00:00' } }
client_1  | state-change:  { state: 2,
client_1  |   info: { percent: '7.6', total: '3.28', speed: '4.36', eta: '00:00' } }
client_1  | state-change:  { state: 2,
client_1  |   info: { percent: '15.2', total: '3.28', speed: '6.49', eta: '00:00' } }
client_1  | state-change:  { state: 2,
client_1  |   info: { percent: '30.5', total: '3.28', speed: '9.21', eta: '00:00' } }
client_1  | state-change:  { state: 2,
client_1  |   info: { percent: '61.0', total: '3.28', speed: '12.00', eta: '00:00' } }
client_1  | state-change:  { state: 2,
client_1  |   info: { percent: '100.0', total: '3.28', speed: '13.06', eta: '00:00' } }
client_1  | state-change:  { state: 2, info: null }
client_1  | state-change:  { state: 1 }
client_1  | state-change:  { state: 1 }
client_1  | state-change:  { state: 1 }
client_1  | state-change:  { state: 1 }
client_1  | state-change:  { state: 1 }
client_1  | state-change:  { state: 3, info: 'dQw4w9WgXcQ.mp3' }
client_1  | finished:  { info: 'dQw4w9WgXcQ.mp3' }
client_1  | close:  undefined
docker_client_1 exited with code 0
```
