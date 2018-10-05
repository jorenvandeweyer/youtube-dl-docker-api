const RawIPC = require('node-ipc').IPC;
const EventEmitter = require("events");
const { id, connectTo, host, port } = require("./config.json");

class YouTubeDownloader extends EventEmitter {
    constructor(url, filename="") {
        super();
        this.ipc = new RawIPC;
        this.ipc.config.id = id;
        this.ipc.config.retry = 1500;
        this.ipc.config.silent = true;

        this.ipc.connectToNet(connectTo, host, port, () => { this.connect({url, filename}) });
    }

    connect(url) {
        this.ipc.of[connectTo].on("connect", () => {
            this.ipc.of[connectTo].emit("download", url);
            this.emit("open");
        });

        this.ipc.of[connectTo].on("disconnect", () => {
            this.emit("close");
        });

        this.ipc.of[connectTo].on("state-change", (data) => {
            this.emit("state-change", data);
        });

        this.ipc.of[connectTo].on("open", (data) => {
            this.emit("started", data);
        });

        this.ipc.of[connectTo].on("close", (data) => {
            this.emit("finished", data);
            this.ipc.disconnect(connectTo);
        });

        this.ipc.of[connectTo].on("error", () => {
            this.ipc.disconnect(connectTo);
        });
    }
}

function main() {
    const Downloader = new YouTubeDownloader("https://soundcloud.com/octobersveryown/drake-back-to-back-freestyle", "test.mp3");

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
