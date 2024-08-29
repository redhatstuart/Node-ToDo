var os = require("os");

module.exports = {
    hostdata: { hostname: (process.env.HOSTNAME || os.hostname()) },
};
