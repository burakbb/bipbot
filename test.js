var BipBot = require('./index.js');

var bot = new BipBot("username", "password");

var data = {
    txnid: "30",
    receiver: {
        type: "0",
        address: "149b1d658bef2596ffc58e6442bc5141"
    },
    composition: {
        list: [{
            type: "0",
            message: "Hello Node.js"
        }]
    }
};


bot.sendmsgserv(data, function(response) {
    console.log("response");
    console.log(response);
});
