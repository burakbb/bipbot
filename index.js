var request = require('request');

function BipBot(username, password) {
    this.username = username;
    this.password = password;
}

// Bip API endpoint
BipBot.ENDPOINT = "https://tims.turkcell.com.tr/tes/rest/spi/";
BipBot.ENDPOINTPRe = "http://prptims.turkcell.com.tr/tes/rest/spi/";

BipBot.auth = function(username, password) {
    return "Basic " + new Buffer(username + ":" + password).toString("base64");
}
BipBot.request = function(method, opts, cb) {
    var settings = {
        method: 'POST',
        url: BipBot.ENDPOINTPRe + method,
        json: true,
        headers: {
            "Authorization": BipBot.auth(this.username, this.password),
            "Content-Type": "application/json",
        }
    };

    if (Object.keys(opts).length) {
        settings["body"] = opts;
    }

    request(settings, function(error, response, body) {
        if (error) throw new Error(error);
        cb(body);
    });
    return this;
};

BipBot.prototype.invoke = function(method, opts, cb) {
    return BipBot.request.apply(this, [method, opts, cb]);
}

// https://tims.turkcell.com.tr/tes/rest/spi/sendmsgserv
BipBot.prototype.sendmsgserv = function(params, cb) {
        return this.invoke('sendmsgserv', params, cb);
    }
    // https://tims.turkcell.com.tr/tes/rest/spi/sendmsgservlist

BipBot.prototype.sendmsgservlist = function(params, cb) {
        return this.invoke('sendmsgservlist', params, cb);
    }
    // https://tims.turkcell.com.tr/tes/rest/spi/sendmultiusermulticontent

BipBot.prototype.sendmultiusermulticontent = function(params, cb) {
    return this.invoke('sendmultiusermulticontent', params, cb);
}

module.exports = BipBot;