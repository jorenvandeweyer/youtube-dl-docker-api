const Download = require("./download");
const ipc = require('node-ipc');

ipc.config.id   = 'youtube';
ipc.config.retry= 1500;
ipc.config.silent = true;

ipc.serveNet("downloader", () => {
    ipc.server.on("download", (url, socket) => {
        console.log("downloading: ", url);

        const download = new Download(url);

        download.on("state-change", (state, info) => {
            ipc.server.emit(socket, "state-change", {
                state,
                info,
            });
        });

        download.on("open", (info) => {
            ipc.server.emit(socket, "open", {
                info,
            });
        });

        download.on("close", (info) => {
            ipc.server.emit(socket, "close", {
                info,
            });
        });

        download.on("error", () => {
            ipc.server.emit(socket, "error");
        });

        download.start();
    });

    ipc.server.on('socket.disconnected', (socket, destroyedSocketID) => {
        ipc.log('client ' + destroyedSocketID + ' has disconnected!');
    });
});

ipc.server.start();
