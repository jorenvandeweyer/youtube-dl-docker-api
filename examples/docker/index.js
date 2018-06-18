const ipc = require("node-ipc");
const EventEmitter = require("events");

ipc.config.id   = "dupbit";
ipc.config.retry = 1500;
ipc.config.silent = true;

class YouTubeDownloader extends EventEmitter {
    constructor(url) {
        super();
        ipc.connectToNet("youtube", "downloader", () => { this.connect(url) });
    }

    connect(url) {
        ipc.of.youtube.on("connect", () => {
            ipc.of.youtube.emit("download", url);
            this.emit("open");
        });

        ipc.of.youtube.on("disconnect", () => {
            this.emit("close");
        });

        ipc.of.youtube.on("state-change", (data) => {
            this.emit("state-change", data);
        });

        ipc.of.youtube.on("open", (data) => {
            this.emit("started", data);
        });

        ipc.of.youtube.on("close", (data) => {
            this.emit("finished", data);
            ipc.disconnect("youtube");
            this.emit
        });

        ipc.of.youtube.on("error", () => {
            ipc.disconnect("youtube");
        });
    }
}

function main() {
    const Downloader = new YouTubeDownloader("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
}

main();