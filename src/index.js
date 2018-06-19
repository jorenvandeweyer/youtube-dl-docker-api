const ipc = require("node-ipc");
const Download = require("./download");
const { id, host, port } = require("../config.json");

ipc.config.id = id;
ipc.config.retry= 1500;
ipc.config.silent = true;

ipc.serveNet(host, port, () => {
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
