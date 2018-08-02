const { spawn } = require("child_process");
const EventEmitter = require("events");

module.exports = class Download extends EventEmitter {
    constructor(url, filename) {
        super();
        this.state = 0; //0 idle, 1 processing, 2 downloading, 3 finished
        this.params = [
            url,
            "--id",
            "-x",
            "--audio-format",
            "mp3",
            "--exec",
            `mv ./{} files/${filename}`
        ];
    }

    start() {
        this.emit("open", this.params[0]);

        const downloader = spawn("youtube-dl", this.params);

        downloader.stdout.on("data", (data) => {
            if (data.includes("stopped")) return this.emit("error");
            this._process_output(data);

        });
        downloader.stdout.on("close", () => {
            this._state_change(3, this.filename);
            this.emit("close", this.filename);
        });
    }

    _process_output(output) {
        const lines = output.toString().split("\n");

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            if (line.includes("[download]")) {
                const info = parseDownloadLine(line);
                this._state_change(2, info);
            } else if (line.includes("Destination: ")) {
                this.filename = line.split("Destination: ")[1];
            } else {
                this._state_change(1)
            }
        }
    }

    _state_change(state, info) {
        this.state = state;
        this.emit("state-change", this.state, info);
    }
}

function parseDownloadLine(line) {
    const info = line.match(/(\d+\.*\d*)%\sof\s(\d+\.*\d*)\w+?\sat\s*(\d+\.*\d*)\w+?\/s\sETA\s(\d{2}:\d{2})/);
    if (!info) return null;
    return {
        percent: info[1],
        total: info[2],
        speed: info[3],
        eta: info[4],
    }
}
