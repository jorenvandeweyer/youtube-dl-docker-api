const ipc = require("node-ipc");
const EventEmitter = require("events");
const { id, connectTo, host, port } = require("./config.json");

ipc.config.id = id;
ipc.config.retry = 1500;
ipc.config.silent = true;

class YouTubeDownloader extends EventEmitter {
    constructor(url) {
        super();
        ipc.connectToNet(connectTo, host, port, () => { this.connect(url) });
    }

    connect(url) {
        ipc.of[connectTo].on("connect", () => {
            ipc.of[connectTo].emit("download", url);
            this.emit("open");
        });

        ipc.of[connectTo].on("disconnect", () => {
            this.emit("close");
        });

        ipc.of[connectTo].on("state-change", (data) => {
            this.emit("state-change", data);
        });

        ipc.of[connectTo].on("open", (data) => {
            this.emit("started", data);
        });

        ipc.of[connectTo].on("close", (data) => {
            this.emit("finished", data);
            ipc.disconnect(connectTo);
            this.emit
        });

        ipc.of[connectTo].on("error", () => {
            ipc.disconnect(connectTo);
        });
    }
}

function main() {
    const Downloader = new YouTubeDownloader("https://www.youtube.com/watch?v=dQw4w9WgXcQ");

    Downloader.on("open", d => console.log("open: ", d));
    Downloader.on("started", d => console.log("started: ", d));
    Downloader.on("state-change", d => console.log("state-change: ", d));
    Downloader.on("finished", d => console.log("finished: ", d));
    Downloader.on("close", d => console.log("close: ", d));
}

if (require.main === module) {
    main();
}

module.exports = YouTubeDownloader;
